var Auction = require('../models/Auction');
var Player = require('../models/Player');
var PlayerItem = require('../models/PlayerItem');

var currentAuction = null;


// export function for listening to the io socket
module.exports = function (io, socket) {
  // notify other clients that a new user has joined
  socket.broadcast.emit('user:joined', {
    username: socket.username
  });

  // send to user the current auction
  socket.emit('auction:init', {
    auction: currentAuction
  });
  
  // listen to new auction
  socket.on('auction:new', function (data, callback) {
    // check for open Auction
    if (!currentAuction) {
      // if there is no current auction
      // create an open auction
      var auctionData = data.auction;
      currentAuction = new Auction(auctionData.seller, auctionData.item, 
        auctionData.quantity, auctionData.minimumBid);
      // save to the DB
      Auction.create(currentAuction, function(result) {
        currentAuction = result;

        // Broadcast the started new auction to all connected users including the current socket
        io.sockets.emit('auction:start', {
          message: 'A new Auction will start soon.',
          auction: currentAuction
        });

        // start counting down
        countdown(onAuctionEnd);
      });
    } else {
      // send to user that his auction will not start
      callback('Your auction will not start. There is a current auction.');
    }
  });

  // Save new bid to current auction and broadcast it on success
  socket.on('auction:update', function (data, callback) {
    if (!currentAuction) {
      callback('No bid placed. There is no current auction.');
    }
    // add bid
    try {
      Auction.addBid(currentAuction, data.player, data.bid);

      // if less than 10s remaining, the time left is raise up again to 10s
      if (currentAuction.timeLeft <= 10) {
        currentAuction.timeLeft = 10;
      }
      emitAuctionChange(currentAuction, callback);
    } catch (error) {
      callback(error.message);
    }
  });

  // clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', function () {
    socket.broadcast.emit('user:left', {
      username: socket.username
    });
  });


  // Helper methods
  //

  // Called when current auction is finished
  function onAuctionEnd() {
    // when no time left
    // change state of current auction to closed
    // save in db
    Auction.close(currentAuction);

    // broadcast to everyone
    io.sockets.emit('auction:end', { winner: currentAuction.winningBid });

    // if there is a winning bid
    if (currentAuction.winningBid) {
      // update seller and winner stats and inventory
      Player.updateWinner(currentAuction, function(result) {
        // notify every user that player has changed
        io.sockets.emit('player:change:'+result.username, {
          message: 'Your players stats has changed.',
          player: result
        });
      });
      // update player item
      PlayerItem.updateWinner(currentAuction, function(result) {
        // notify every user that player has changed
        io.sockets.emit('player:change:'+result.username, {
          message: 'Your players inventory has changed.',
          player: result
        });
      });
      Player.updateSeller(currentAuction, function(result) {
        // notify every user that player has changed
        io.sockets.emit('player:change:'+result.username, {
          message: 'Your players stats has changed.',
          player: result
        });
      });
      PlayerItem.updateSeller(currentAuction, function(result) {
        // notify every user that player has changed
        io.sockets.emit('player:change:'+result.username, {
          message: 'Your players inventory has changed.',
          player: result
        });
      });
    }
    
    // clean current auction
    currentAuction = null;
  }

  function emitAuctionChange(auction, callback) {
    socket.broadcast.emit('auction:change', {
      message: 'New bid placed.',
      auction: auction
    });
    callback(null, auction);
  }

  var timerId; // id of the setInterval
  function countdown(done) {
    if (timerId) {
      stopCountdown();
    }
    timerId = setInterval(function() {
      // broadcast to every client
      io.sockets.emit('timer', { timeLeft: currentAuction.timeLeft });

      if (currentAuction.timeLeft === 0) {
        // when no time left, stop counting down
        stopCountdown();
        done();
      } else {
        // count down
        currentAuction.timeLeft--;
      }
    }.bind(this), 1000);
  }

  function stopCountdown() {
    clearInterval(timerId);
  }

};
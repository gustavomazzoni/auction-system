var db = require('../lib/db');

function Auction(seller, item, quantity, minimumBid) {
	this.seller = seller;
  this.item = item;
  this.quantity = quantity;
  this.minimumBid = minimumBid;
  this.timeLeft = 90;
  this.status = 'open';
}
function Bid(player, bid) {
  this.player = player;
  this.bid = bid;
}
Auction.addBid = function(auction, player, bid) {
  // if there is no bid yet or this bid is bigger
  if (!auction.winningBid || (bid > auction.winningBid.bid)) {
    // if player has the money
    if (player.coins >= bid) {
      // add to current auction
      var newBid = new Bid(player, bid);
      auction.winningBid = newBid;
    } else {
      throw new Error('Bid not placed. You dont have this amount of coins.');
    }
  } else {
    throw new Error('Bid not placed. There is a higher bid.');
  }
};
Auction.create = function(auction, callback) {
  // create auction
  var auctionDB = {
    seller_username: auction.seller.username,
    id_item: auction.item.id,
    quantity: auction.quantity,
    minimum_bid: auction.minimumBid,
    status: 'open'
  };

  db.getPoolConnection(function(connection) {
    // insert auction
    connection.query('INSERT INTO auctions SET ?', auctionDB, function(error, result) {
      if (error) throw new Error('Unexpected error when inserting Auction', error);

      // And done with the connection.
      connection.release();

      auction.id = result.insertId;
      callback(auction);
    });
  });
};
Auction.close = function(auction) {
  db.getPoolConnection(function(connection) {
    var query = 'UPDATE auctions SET status = ?';
    var params = ['closed'];

    // update auction
    if (auction.winningBid) {
      query += ', winner_bid = ?, winner_username = ?';
      params.push(auction.winningBid.bid);
      params.push(auction.winningBid.player.username);
    }

    query += ' WHERE id = ?';
    params.push(auction.id);

    connection.query(query, params, function(error, result) {
      if (error) throw new Error('Unexpected error when updating Auction', error);

      // And done with the connection.
      connection.release();
    });
  });
};
Auction.findOpen = function(callback) {
  // fetch player
  db.getPoolConnection(function(connection) {
    connection.query('SELECT * FROM auctions WHERE status = ?', ['open'], function(err, results) {
      //inform the callback of auth success/failure
      if (err) throw new Error('Unexpected error when querying for Auction');
      
      // And done with the connection.
      connection.release();
      // return first result (it must be only one)
      callback(results[0]);
    });
  });
};

module.exports = Auction;
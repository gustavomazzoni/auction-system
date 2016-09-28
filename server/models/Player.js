var db = require('../lib/db'),
  PlayerItem = require('./PlayerItem'),
  Item = require('./Item');

function Player(username) {
  this.username = username;
  this.coins = 1000;
  this.inventory = [
    new PlayerItem(Item.getBread(), 30),
    new PlayerItem(Item.getCarrot(), 18),
    new PlayerItem(Item.getDiamond(), 1)
  ];
}
Player.prototype.sumCoins = function(coins) {
  if (coins) {
    this.coins += coins;
  }
};
Player.prototype.subtractCoins = function(coins) {
  if (coins) {
    this.coins -= coins;
  }
};
Player.init = function(username, callback) {
  var player = new Player(username);

  // init player
  var playerDB = {
    username: player.username,
    coins: player.coins
  };
  console.log('inserting player', playerDB);

  db.getPoolConnection(function(connection) {
    // insert player
    connection.query('INSERT INTO players SET ?', playerDB, function(error, result) {
      if (error) throw new Error('Unexpected error when inserting Player', error);

      // And done with the connection.
      connection.release();
    });

    // insert inventory list
    PlayerItem.init(player, function(player) {
      callback(player);
    });
  });
};
Player.find = function(username, callback) {
  // fetch player
  db.getPoolConnection(function(connection) {
    connection.query('SELECT * FROM players WHERE username = ?', [username], function(err, results) {
      //inform the callback of auth success/failure
      if (err) throw new Error('Unexpected error when querying for Player');
      
      // And done with the connection.
      connection.release();
      callback(results[0]);
    });
  });
};
Player.update = function(player) {
  db.getPoolConnection(function(connection) {
    // insert player
    connection.query('UPDATE players SET coins = ? WHERE username = ?', [player.coins, player.username], function(error, result) {
      if (error) throw new Error('Unexpected error when updating Player', error);

      // And done with the connection.
      connection.release();
    });
  });
};
Player.updateWinner = function(auction, callback) {
  if (!auction.winningBid) return false;
  // subtract from his coins
  var winner = auction.winningBid.player;
  winner.coins -= auction.winningBid.bid;

  // save in db
  Player.update(winner);
  callback(winner);
};
Player.updateSeller = function(auction, callback) {
  if (!auction.winningBid) return false;
  var seller = auction.seller;
  seller.coins += auction.winningBid.bid;

  // save in db
  Player.update(seller);
  callback(seller);
};

module.exports = Player;
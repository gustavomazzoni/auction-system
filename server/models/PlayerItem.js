var db = require('../lib/db'),
  async = require('async'),
  Item = require('./Item');

function PlayerItem(item, quantity) {
  this.item = item;
  this.quantity = quantity;
}
PlayerItem.init = function(player, callback) {
  // insert inventory list
  
  db.getPoolConnection(function(connection) {

    async.each(player.inventory, function(playerItem, cb) {
      // create player item
      var playerItemDb = {
        id_item: playerItem.item.id,
        username: player.username,
        quantity: playerItem.quantity
      };

      // insert inventory item
      connection.query('INSERT INTO players_items SET ?', playerItemDb, function(error, result) {
        if (error) throw new Error('Unexpected error when inserting player item', error);

        playerItem.id = result.insertId;
      });

      cb();
    }, function(err) {
      if (err) {
        console.log('error:',err);
        // One of the iterations produced an error.
        throw err;
      } else {
        // And done with the connection.
        connection.release();
        // All player items have been inserted successfully
        callback(player);
      }
    });

  });
};
PlayerItem.findAll = function(username, callback) {
  // fetch player item
  db.getPoolConnection(function(connection) {
    connection.query('SELECT * FROM players_items WHERE username = ?', [username], function(err, results) {
      //inform the callback of auth success/failure
      if (err) throw new Error('Unexpected error when querying for PlayerItem');
      
      // And done with the connection.
      connection.release();

      var list = results.map(function(item) {
        var playerItem = new PlayerItem(Item.getById(item.id_item), item.quantity);
        playerItem.id = item.id;
        return playerItem;
      });

      // return all results
      callback(list);
    });
  });
};
PlayerItem.update = function(playerItem) {
  db.getPoolConnection(function(connection) {
    // insert player
    connection.query('UPDATE players_items SET quantity = ? WHERE id = ?', [playerItem.quantity, playerItem.id], function(error, result) {
      if (error) throw new Error('Unexpected error when updating Player Item', error);

      // And done with the connection.
      connection.release();
    });
  });
};
PlayerItem.updateWinner = function(auction, callback) {
  if (!auction.winningBid) return false;
  var winner = auction.winningBid.player;
  if (winner.inventory) {
    for (var i = 0, l = winner.inventory.length; i < l; i++) {
      var playerItem = winner.inventory[i];
      if (playerItem.item && playerItem.item.id === auction.item.id) {
        // sum player item quantity
        playerItem.quantity += auction.quantity;
        // save in db
        PlayerItem.update(playerItem);
        break;
      }
    }
    callback(winner);
  } else {
    // fetch player item from db
    // sum and update
  }
};
PlayerItem.updateSeller = function(auction, callback) {
  var seller = auction.seller;
  if (seller.inventory) {
    for (var i = 0, l = seller.inventory.length; i < l; i++) {
      var playerItem = seller.inventory[i];
      if (playerItem.item && playerItem.item.id === auction.item.id) {
        // subtract player item quantity
        playerItem.quantity -= auction.quantity;
        // save in db
        PlayerItem.update(playerItem);
        break;
      }
    }
    callback(seller);
  } else {
    // fetch player item from db
    // sum and update
  }
};

module.exports = PlayerItem;
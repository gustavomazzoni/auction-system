(function () {
  'use strict';

  angular
    .module('game')
    .service('GameManager', GameManager);

  GameManager.$inject = ['auctionService', 'socket'];
  function GameManager(auctionService, socket) {
    this.init = function() {
      // Socket listeners
      // ================
      var self = this;
      socket.on('timer', function (data) {
        if (self.auction) {
          self.auction.timeLeft = data.timeLeft;
        }
      });
      socket.on('player:init', function (data) {
        // fetch init data for player
        self.player = data.player;
        self.inventory = data.player.inventory;

        // show message to the user if any
        self.message = data.message;
      });
      socket.on('player:change:'+socket.username, function (data) {
        // fetch data change for player
        self.player = data.player;
        self.inventory = data.player.inventory;

        // show message to the user if any
        self.message = data.message;
      });
      socket.on('auction:init', function (data) {
        // fetch init data for auction
        self.auction = data.auction;

        // show message to the user if any
        self.message = data.message;
      });
      socket.on('auction:start', function (data) {
        // fetch starting auction
        self.auction = data.auction;

        // show message to the user if any
        self.message = data.message;
      });
      socket.on('auction:change', function (data) {
        // fetch current auction
        self.auction = data.auction;

        // show message to the user if any
        self.message = data.message;
      });
      socket.on('auction:end', function (data) {
        // fetch winner from the ended auction and show it for 10s
        self.winner = data.winner;
        // clean the current auction
        self.auction = null;

        // show message to the user if any
        self.message = data.message;
      });
    };

    this.clean = function() {
      this.winner = null;
      this.player = null;
      this.inventory = null;
      this.auction = null;
      this.message = null;
    };

    this.startAuction = function(auction) {
      auction.seller = this.player;
      auctionService.newAuction(auction).then(function(result) {
        self.auction = result;
      }, function(message) {
        // show message to the user if any
        self.message = message;
      });
    };

    this.placeBid = function(newBid) {
      var self = this;
      auctionService.placeBid(this.player, newBid, this.auction.timeLeft).then(function(result) {
        self.auction = result;

        // show message to the user if any
        self.message = 'New bid placed.';
      }, function(message) {
        // show message to the user if any
        self.message = message;
      });
    };

    this.isSeller = function() {
      if (!this.auction || !this.player) {
        return false;
      }
      return this.auction.seller.username === this.player.username;
    };

  }

})();
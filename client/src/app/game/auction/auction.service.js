(function () {
  'use strict';
 
  angular
    .module('game.auction', ['socket'])
    .factory('auctionService', auctionService);
 
  auctionService.$inject = ['socket', '$q'];
  function auctionService(socket, $q) {

    return {
      newAuction: function(auction) {
        var deferred = $q.defer();
        
        socket.emit('auction:new', {
          auction: auction
        }, function (message, result) {
          if (message) {
            deferred.reject(message);
          } else {
            deferred.resolve(result);
          }
        });
        return deferred.promise;
      },
      placeBid: function(player, newBid, timeLeft) {
        var deferred = $q.defer();

        socket.emit('auction:update', {
          player: player,
          bid: newBid,
          timeLeft: timeLeft
        }, function (message, result) {
          if (message) {
            deferred.reject(message);
          } else {
            deferred.resolve(result);
          }
        });
        return deferred.promise;
      }
    };

  }
 
})();
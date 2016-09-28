(function () {
  'use strict';
 
  /**
  * @desc directive to present the current auction
  * @example <act-current></act-current>
  */
  angular
    .module('actCurrent', [])
    .directive('actCurrent', actCurrent);

  actCurrent.$inject = [];
  function actCurrent() {

    function link(scope, element, attrs) {
      var callPlaceBid = scope.onPlaceBid();
      scope.placeBid = function(newBid) {
        callPlaceBid(newBid);
      };

      // return actual minimum bid
      scope.getMinimumBid = function() {
        return scope.auction.winningBid ? (scope.auction.winningBid.bid + 1) : scope.auction.minimumBid;
      };
      
      element.on('$destroy', function() {
        delete scope.auction;
      });
    }

    return {
      restrict: 'E',
      templateUrl: 'game/act-current/act-current.tpl.html',
      link: link,
      scope: {
        auction: '=',
        isSeller: '=',
        onPlaceBid: '&'
      }
    };
  }

})();

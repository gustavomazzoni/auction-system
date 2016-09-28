(function () {
  'use strict';
 
  /**
  * @desc directive to present an alert dialog with the auction winner
  * @example <act-winner></act-winner>
  */
  angular
    .module('actWinner', [])
    .directive('actWinner', actWinner);

  actWinner.$inject = ['$mdDialog', '$interval'];
  function actWinner($mdDialog, $interval) {

    function link(scope, element, attrs) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(false)
          .title('The Auction has ended')
          .textContent('Congratulations for '+scope.winner.player.username+' with the winning bid of '+scope.winner.bid+' coins!')
          .ariaLabel('Alert Winner Dialog')
      );

      var time = 10;
      var timeoutId = $interval(function() {
        time--;

        if (time === 0) {
          $interval.cancel(timeoutId);
          $mdDialog.hide();
        }
      }, 1000);
      
      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
        $mdDialog.hide();
      });
    }

    return {
      restrict: 'E',
      link: link,
      scope: {
        winner: '='
      }
    };
  }

})();

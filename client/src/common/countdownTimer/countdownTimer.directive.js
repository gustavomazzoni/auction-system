(function() {
  'use strict';

  angular
    .module('countdownTimer', [])
    .directive('countdownTimer', countdownTimer);

  countdownTimer.$inject = ['$interval'];
  function countdownTimer($interval) {
    function link(scope, element, attrs) {
      var value,
          timeoutId;

      function updateTime() {
        element.text(value-- + 's');
        if (value < 0) {
          // if there is no time left, stop counting
          $interval.cancel(timeoutId);
          // make sure value is at least zero
          value = 0;
        }
      }

      scope.$watch(attrs.countdownTimer, function(newValue) {
        value = newValue || 0;
      });

      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });

      // start the UI update process; save the timeoutId for canceling
      timeoutId = $interval(function() {
        updateTime(); // update DOM each 1 second
      }, 1000);
    }

    return {
      restrict: 'A',
      link: link
    };
  }

})();

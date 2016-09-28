(function () {
  'use strict';
 
  /**
  * @desc directive to present player stats
  * @example <act-player-stats></act-player-stats>
  */
  angular
    .module('actPlayerStats', [])
    .directive('actPlayerStats', actPlayerStats);

  actPlayerStats.$inject = [];
  function actPlayerStats() {

    function link(scope, element, attrs) {
      scope.logout = function() {
        var callback = scope.onLogout();
        callback();
      };
      element.on('$destroy', function() {
        delete scope.player;
      });
    }

    return {
      restrict: 'E',
      templateUrl: 'game/act-player-stats/act-player-stats.tpl.html',
      link: link,
      scope: {
        player: '=',
        onLogout: '&'
      }
    };
  }

})();

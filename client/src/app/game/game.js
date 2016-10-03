(function () {
  'use strict';
 
  angular
    .module('game', [
      'ui.router',
      'game.auction',
      'actPlayerStats',
      'actInventory',
      'actCurrent',
      'actWinner',
      'socket',
      'toastNotification'
    ])
    .constant('SERVER_URL', 'http://localhost:3000')
    .config(config)
    .controller('GameCtrl', GameController);

  config.$inject = ['$stateProvider'];
  function config( $stateProvider ) {
    $stateProvider.state( 'game', {
      url: '/',
      templateUrl: 'game/game.tpl.html',
      controller: 'GameCtrl',
      controllerAs: 'vm',
      resolve: {
        // Call service to init game
        gamePromise: ['GameManager', function(GameManager) {
          return GameManager.init();
        }]
      },
      data:{ pageTitle: 'Game' }
    });
  }
 
  GameController.$inject = ['$mdSidenav', 'GameManager', 'socket', '$state'];
  function GameController($mdSidenav, GameManager, socket, $state) {
    var vm = this;
    vm.game = GameManager;

    vm.startAuction = function(auction) {
      vm.game.startAuction(auction);
    };

    vm.placeBid = function(newBid) {
      vm.game.placeBid(newBid);
    };

    vm.logout = function() {
      // Clean user game data
      vm.game.clean();
      $state.go('logout', {toState: 'game'});
    };

    /**
     * Hide or Show the 'left' sideNav Widgets area
     */
    vm.toggleSide = function() {
      $mdSidenav('left').toggle();
    };


    // Socket listeners
    // ================
    socket.on('user:joined', function (data) {
      // check if it is same user
      console.log('user:joined', data);
      if (socket.username === data.username) {
        console.log('Same user. logout');
        // than go to logout
        $state.go('logout', {toState: 'game'});
      } 
    });

    socket.on('user:left', function (data) {
      console.log('user:left', data);
    });
  }
 
})();
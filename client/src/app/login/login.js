(function () {
  'use strict';
 
  angular
    .module('login', [
      'auth',
      'ui.router'
    ])
    .config(config)
    .controller('LoginCtrl', LoginController)
    .controller('LogoutCtrl', LogoutController);

  config.$inject = ['$stateProvider'];
  function config( $stateProvider ) {
    $stateProvider
      .state( 'login', {
        url: '/login',
        templateUrl: 'login/login.tpl.html',
        params: { toState: null },
        controller: 'LoginCtrl',
        controllerAs: 'vm',
        data: { pageTitle: 'Login' }
      })
      .state( 'logout', {
        url: '/logout',
        params: { toState: null },
        controller: 'LogoutCtrl',
        data: { pageTitle: 'Logout' }
      });
  }
 
  LoginController.$inject = ['authService', '$state', '$stateParams', '$location'];
  function LoginController(authService, $state, $stateParams, $location) {
    var vm = this;

    vm.credentials = {
      username: ''
    };

    vm.login = function (credentials) {
      authService.login(credentials).then(function (user) {
        if ($stateParams.toState) {
          $state.go($stateParams.toState);
        } else {
          $location.path('/');
        }
      }, function (message) {
        console.log('Error on login', message);
        // show error message to the user
      });
    };
  }

  LogoutController.$inject = ['authService', '$state', '$stateParams'];
  function LogoutController(authService, $state, $stateParams) {
    authService.logout();
    $state.go('login', {toState: $stateParams.toState});
  }
 
})();
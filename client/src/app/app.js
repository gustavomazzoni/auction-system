(function () {
  'use strict';
 
  angular
    .module('auction', [
      'ngMaterial',
      'templates-app',
      'templates-common',
      'httpInterceptor',
      'ui.router',
      'login',
      'game'
    ])
    .run(appRun)
    .config(appConfig)
    .controller('AppCtrl', AppController);

  appRun.$inject = ['$rootScope', 'authService', '$state'];
  function appRun ( $rootScope, authService, $state ) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      // if next state is different from login and user is not logged in
      if (toState.name !== 'login' && !authService.isAuthenticated()) {
        console.log('User not authenticated');
        // user is not logged in
        // prevent state to proceed the change
        event.preventDefault();
        // Go to login with the state requested by the user as parameter
        $state.go('login', {toState: toState.name});
      }
    });
  }

  appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function appConfig ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/' );
  }

  AppController.$inject = ['$scope'];
  function AppController ( $scope ) {
    $scope.appName = 'Auction System';
    $scope.today = new Date();
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if ( angular.isDefined( toState.data.pageTitle ) ) {
        $scope.pageTitle = toState.data.pageTitle + ' | ' + $scope.appName;
      }
    });
  }

})();

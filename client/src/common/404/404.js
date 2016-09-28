angular.module( '404page', ['ui.router'] )

.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( '404', {
    url: '/404',
    templateUrl: '404/404.tpl.html',
    data:{ pageTitle: 'Booking - Page Not Found' }
  });
}]);


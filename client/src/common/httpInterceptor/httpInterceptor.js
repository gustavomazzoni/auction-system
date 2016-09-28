var httpInterceptor = function ($provide, $httpProvider) {
  $provide.factory('httpInterceptor', function ($q) {
    return {
      response: function (response) {
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        var newMessage = 'XHR Failed';
        if (rejection.data) {
          if (rejection.data.description) {
            newMessage = newMessage + '\n' + rejection.data.description;
          }
          rejection.data.description = newMessage;
        }
        console.log(newMessage, rejection);

        if (rejection.status === 401) {
          // not autorized
        }
        return $q.reject(rejection);
      }
    };
  });
  $httpProvider.interceptors.push('httpInterceptor');
};

angular.module('httpInterceptor', []).config(httpInterceptor);

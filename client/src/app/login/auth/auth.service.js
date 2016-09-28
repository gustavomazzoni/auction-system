(function () {
  'use strict';
 
  angular
    .module('auth', ['socket'])
    .factory('authService', authService);

  authService.$inject = ['socket', '$q'];
  function authService(socket, $q) {
    
    return {
      login: function(credentials) {
        var deferred = $q.defer();
        socket.connect(function() {
          socket.emit('authentication', credentials);
          socket.on('unauthorized', function(err){
            console.log("There was an error with the authentication:", err.message); 
            deferred.reject(err.message);
          });
          socket.on('authenticated', function(data) {
            // user authenticated. Use the socket as usual
            console.log('User is authenticated.', data);
            socket.username = credentials.username;
            deferred.resolve(credentials);
          });
        });
        return deferred.promise;
      },
      logout: function() {
        // disconnect user
        socket.disconnect();
        // delete username from socket
        delete socket.username;
      },
      isAuthenticated: function() {
        return !!socket.username;
      },
      getCurrentUser: function() {
        return socket.username;
      }
    };

  }

})();
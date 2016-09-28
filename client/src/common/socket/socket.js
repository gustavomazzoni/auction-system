(function() {
  'use strict';

  angular
    .module('socket', [])
    .factory('socket', socket);

  // Service to interact with the socket.io library
  socket.$inject = ['SERVER_URL', '$rootScope'];
  function socket(SERVER_URL, $rootScope) {
    var ioSocket;
    return {
      connect: function (callback) {
        if (!ioSocket || !ioSocket.connected) {
          ioSocket = io.connect(SERVER_URL);
        }
        ioSocket.on('connect', callback);
      },
      disconnect: function () {
        ioSocket.disconnect();
        ioSocket = null;
      },
      on: function (eventName, callback) {
        ioSocket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(ioSocket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        ioSocket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(ioSocket, args);
            }
          });
        });
      }
    };
  }

})();
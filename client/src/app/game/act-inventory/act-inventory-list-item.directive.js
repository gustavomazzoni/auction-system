(function () {
  'use strict';
 
	/**
	* @desc directive to present auction inventory
	* @example <act-inventory-list-item></act-inventory-list-item>
	*/
	angular.module('actInventoryItem', [])
    .directive('actInventoryListItem', actInventoryListItem)
    .controller('DialogCtrl', DialogController);

	actInventoryListItem.$inject = ['$mdDialog'];
	function actInventoryListItem($mdDialog) {

    function link(scope, element, attrs) {
      var startAuction = scope.onStartAuction();
      scope.openDialog = function(event) {
        $mdDialog.show({
          controller: 'DialogCtrl',
          controllerAs: 'vm',
          scope: scope.$new(),   // Uses prototypal inheritance to gain access to parent scope
          templateUrl: 'game/act-inventory/act-inventory-dialog.tpl.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: false
        })
        .then(function(auction) {
          startAuction(auction);
        });
      };

      element.on('$destroy', function() {
        delete scope.item;
      });
    }

    return {
      restrict: 'E',
      transclude: true,
      scope: {
        onStartAuction: '&',
        item: '='
      },
      templateUrl: 'game/act-inventory/act-inventory-list-item.tpl.html',
      link: link
    };

  }

  DialogController.$inject = ['$mdDialog', '$scope'];
  function DialogController($mdDialog, $scope) {
    var vm = this;
    vm.max = $scope.item.quantity;
    vm.auction = {
      item: $scope.item.item,
      quantity: 1,
      minimumBid: 1
    };
    
    vm.hide = function() {
      $mdDialog.hide();
    };
    vm.cancel = function() {
      $mdDialog.cancel();
    };
    vm.answer = function(auction) {
      $mdDialog.hide(auction);
    };
  }

})();

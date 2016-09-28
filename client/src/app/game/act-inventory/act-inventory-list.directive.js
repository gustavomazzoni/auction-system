(function () {
  'use strict';
 
  /**
  * @desc directive to present auction inventory
  * @example <act-inventory-list></act-inventory-list>
  */
  angular
    .module('actInventory', ['actInventoryItem'])
    .directive('actInventoryList', actInventoryList);

  actInventoryList.$inject = ['$mdDialog'];
  function actInventoryList($mdDialog) {

    function link(scope, element, attrs) {
      scope.startAuction = scope.onStartAuction();
      element.on('$destroy', function() {
        delete scope.inventoryList;
      });
    }

    return {
      restrict: 'E',
      templateUrl: 'game/act-inventory/act-inventory-list.tpl.html',
      link: link,
      scope: {
        inventoryList: '=',
        onStartAuction: '&'
      }
    };
  }

})();

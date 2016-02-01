angular.module('expensesApp')
  .factory('itemFactory', ['$http', function($http) {
      var Item = function() {

      };

      Item.prototype.newItem = function(name, amount, category) {
        return {
          name: name,
          amount: amount,
          category: category
        };
      };

      return Item;
  }]);

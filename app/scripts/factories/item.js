angular.module('expensesApp')
  .factory('itemFactory', ['$http', function($http) {
      var Item = function() {

      };

      Item.prototype.add = function(name, amount, category) {
        var params = {
          name: name,
          amount: amount,
          category: category
        };
        return $http.post('/api/item', params)
      };

      return Item;
  }]);

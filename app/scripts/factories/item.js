angular.module('expensesApp')
  .factory('itemFactory', function() {
    var Item = function(name, amount, category) {
      return {
        name: name,
        amount: amount,
        category_id: category
      };
    };

    return Item;
  });

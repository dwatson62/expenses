angular.module('expensesApp')
  .factory('itemFactory', function() {
    var Item = function() {

    };

    Item.prototype.add = function(name, price) {
      return { 'name': name, 'amount': price };
    };

    return Item;
});

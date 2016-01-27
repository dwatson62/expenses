angular.module('expensesApp')
  .factory('categoryFactory', function() {
    var Category = function() {

    };

    Category.prototype.add = function(name) {
      return { 'name': name, 'itemList': [] };
    };

    Category.prototype.total = function(itemList) {
      var total = 0;
      for (var i in itemList) {
        total += parseFloat(itemList[i].amount, 10);
      }
      return total;
    };

    return Category;
  });
angular.module('expensesApp')
  .factory('categoryFactory', ['$http', function($http) {
    var Category = function() {

    };

    Category.prototype.total = function(items) {
      var total = 0;
      for (var i in items) {
        total += parseFloat(items[i].amount, 10);
      }
      return total;
    };

    return Category;
  }]);

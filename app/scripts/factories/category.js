angular.module('expensesApp')
  .factory('categoryFactory', function() {
    var Category = function(name) {
      return {
        name: name
      };
    };

    return Category;
  });

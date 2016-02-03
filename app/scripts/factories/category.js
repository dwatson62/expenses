angular.module('expensesApp')
  .factory('categoryFactory', ['$http', function($http) {
    var Category = function(name) {
      return {
        name: name
      }
    };

    return Category;
  }]);

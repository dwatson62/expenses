angular.module('expensesApp')
  .directive('category', function() {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: '/app/scripts/templates/category.html'
    };
  });

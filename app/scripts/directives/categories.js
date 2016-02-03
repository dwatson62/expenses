angular.module('expensesApp')
  .directive('category', function() {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: '/app/scripts/templates/category.html'
    };
  })
  .directive('categoryForm', function() {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: '/app/scripts/templates/categoryForm.html'
    };
  });

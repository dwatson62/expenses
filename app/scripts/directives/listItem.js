angular.module('expensesApp')
  .directive('listItem', function() {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: '/app/scripts/templates/listItem.html'
    };
  });

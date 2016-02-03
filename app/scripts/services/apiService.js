angular.module('expensesApp')
  .service('apiService', ['$http', function($http) {
    var url = '/api/';

    this.createItem = function(item) {
      return $http.post(url + 'item', item);
    };

    this.createCategory = function(category) {
      return $http.post(url + 'category', category);
    };

    this.getCategoryItems = function() {
      return $http.get(url + 'categories/items');
    };

    this.deleteItem = function(item) {
      return $http.delete(url + 'item/' + item);
    };

    this.deleteCategory = function(category) {
      return $http.delete(url + 'category/' + category);
    };
  }]);

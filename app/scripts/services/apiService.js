angular.module('expensesApp')
  .service('apiService', ['$http', function($http) {
    var url = '/api/';

    this.createItem = function(params) {
      return $http.post(url + 'item', params);
    };

    this.createCategory = function(name) {
      return $http.post(url + 'category', { name: name });
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

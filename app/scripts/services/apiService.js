angular.module('expensesApp')
  .service('apiService', ['$http', function($http) {
    var url = '/api/';

    this.createItem = function(item) {
      return $http.post(url + 'item', item);
    };

    this.editItem = function(item, amount, name) {
      var params = { 'amount': amount, 'name': name };
      return $http.put(url + 'item/' + item, params);
    };

    this.createCategory = function(category) {
      return $http.post(url + 'category', category);
    };

    this.editCategory = function(category, name) {
      var params = { 'name': name };
      return $http.put(url + 'category/' + category, params);
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

    this.allItems = function() {
      return $http.get(url + 'items');
    };
  }]);

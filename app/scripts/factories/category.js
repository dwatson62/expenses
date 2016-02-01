angular.module('expensesApp')
  .factory('categoryFactory', ['$http', function($http) {
    var Category = function() {

    };

    Category.prototype.allItems = function() {
      return $.get('/api/categories/items');
    };

    Category.prototype.add = function(name) {
      return $http.post('/api/category', { name: name });
    };

    Category.prototype.total = function(items) {
      var total = 0;
      for (var i in items) {
        total += parseFloat(items[i].amount, 10);
      }
      return total;
    };

    Category.prototype.getIndexOfList = function(list, name) {
      for (var i = 0; i < list.length; i ++) {
        if (list[i].name === name) { return i; }
      }
    };

    Category.prototype.deleteItem = function(categoryList, item, catIndex) {
      var itIndex = this.getIndexOfList(categoryList[catIndex].itemList, item);
      categoryList[catIndex].itemList.splice(itIndex, 1);
      return categoryList;
    };

    return Category;
  }]);

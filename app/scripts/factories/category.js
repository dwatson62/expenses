angular.module('expensesApp')
  .factory('categoryFactory', function() {
    var Category = function() {

    };

    Category.prototype.add = function(name) {
      return { 'name': name, 'itemList': [] };
    };

    Category.prototype.total = function(itemList) {
      var total = 0;
      for (var i in itemList) {
        total += parseFloat(itemList[i].amount, 10);
      }
      return total;
    };

    Category.prototype.getIndexOfList = function(list, name) {
      for (var i = 0; i < list.length; i ++) {
        if (list[i].name === name) { return i; }
      }
    };

    Category.prototype.deleteItem = function(categoryList, item, category) {
      var catIndex = this.getIndexOfList(categoryList, category);
      var itIndex = this.getIndexOfList(categoryList[catIndex].itemList, item);
      categoryList[catIndex].itemList.splice(itIndex, 1);
      return categoryList;
    };

    return Category;
  });
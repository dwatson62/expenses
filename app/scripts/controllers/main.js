'use strict';

/**
 * @ngdoc function
 * @name expensesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expensesApp
 */
angular.module('expensesApp')
  .controller('MainCtrl', ['itemFactory', 'categoryFactory', function (ItemFactory, CategoryFactory) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

    var itemFactory = new ItemFactory();
    var categoryFactory = new CategoryFactory();

    var self = this;
    self.total = 0;
    self.categoryList = [];

    self.itemForm = { 'Bills': false, 'Food': false, 'Coffee': false };
    self.categoryForm = false;

    self.addItem = function(index) {
      var item = itemFactory.add(self.newItem, self.newPrice);
      self.categoryList[index].itemList.push(item);
      self.newItem = '';
      self.newPrice = '';
      self.updateTotal();
      var category = self.categoryList[index].name;
      self.itemForm[category] = false;
    };

    self.updateTotal = function() {
      var total = 0;
      for (var i in self.categoryList) {
        total += categoryFactory.total(self.categoryList[i].itemList);
      }
      self.total = total;
    };

    self.showItemForm = function(category) {
      for (var i in self.itemForm) {
        self.itemForm[i] = false;
      }
      self.itemForm[category] = true;
    };

    self.toggleCategoryForm = function() {
      self.categoryForm = !self.categoryForm;
    };

    self.addCategory = function() {
      var category = categoryFactory.add(self.newCategory);
      self.categoryList.push(category);
      self.newCategory = '';
      self.toggleCategoryForm();
    };

    self.deleteItem = function(item, catIndex) {
      self.categoryList = categoryFactory.deleteItem(self.categoryList, item, catIndex);
      self.updateTotal();
    };

    self.deleteCategory = function(category) {
      for (var i = 0; i < self.categoryList.length; i ++) {
        if (self.categoryList[i].name === category) {
          self.categoryList.splice(i, 1);
        }
      }
      self.updateTotal();
    };

    }]);

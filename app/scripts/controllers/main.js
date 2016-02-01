'use strict';

/**
 * @ngdoc function
 * @name expensesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expensesApp
 */
angular.module('expensesApp')
  .controller('MainCtrl', ['itemFactory', 'categoryFactory', '$http', function (ItemFactory, CategoryFactory, $http) {
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

    self.initialize = function() {
      self.allItems();
    };

    self.allItems = function() {
      categoryFactory.allItems()
        .done(function(response) {
          self.categoryList = response.categories;
          self.updateTotal();
        });
    };

    self.addItem = function(index) {
      var category = self.categoryList[index].name;
      itemFactory.add(self.newItem, self.newAmount, category)
        .success(function(item) {
          console.log('success!');
          self.categoryList[index].items.push(item);
        });
      self.updateTotal();
      self.clearItemForm(category);
    };

    self.clearItemForm = function(category) {
      self.newItem = '';
      self.newAmount = '';
      self.itemForm[category] = false;
    };

    self.updateTotal = function() {
      var total = 0;
      for (var i in self.categoryList) {
        total += categoryFactory.total(self.categoryList[i].items);
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
      categoryFactory.add(self.newCategory)
        .success(function(category) {
          self.categoryList.push(category);
        });
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

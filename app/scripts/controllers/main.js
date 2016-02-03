'use strict';

/**
 * @ngdoc function
 * @name expensesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expensesApp
 */
angular.module('expensesApp')
  .controller('MainCtrl', ['itemFactory', 'categoryFactory', 'apiService', function (Item, Category, apiService) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

    var self = this;

    self.initialize = function() {
      self.total = 0;
      self.categoryList = [];
      self.categoryForm = false;
      self.itemForm = {};
      self.allItems();
    };

    self.allItems = function() {
      apiService.getCategoryItems()
        .success(function(response) {
          self.categoryList = response.categories;
          self.updateTotal();
        });
    };

    // Forms

    self.showItemForm = function(category) {
      for (var i in self.itemForm) {
        self.itemForm[i] = false;
      }
      self.itemForm[category] = true;
    };

    self.toggleCategoryForm = function() {
      self.newCategory = '';
      self.categoryForm = !self.categoryForm;
    };

    self.clearItemForm = function(category) {
      self.newItem = '';
      self.newAmount = '';
      self.itemForm[category] = false;
    };

    // Totals

    self.updateTotal = function() {
      var total = 0;
      for (var i in self.categoryList) {
        for (var j in self.categoryList[i].items) {
          total += parseFloat(self.categoryList[i].items[j].amount, 10);
        }
      }
      self.total = total;
    };

    // Items

    self.addItem = function(index) {
      var category = self.categoryList[index].name;
      var item = new Item(self.newItem, self.newAmount, category);
      apiService.createItem(item)
        .success(function(item) {
          self.categoryList[index].items.push(item);
          self.updateTotal();
        });
      self.clearItemForm(category);
    };

    self.deleteItem = function(item, itemIndex, catIndex) {
      self.itemIndex = itemIndex;
      self.catIndex = catIndex;
      apiService.deleteItem(item)
        .success(function() {
          self.categoryList[self.catIndex].items.splice(self.itemIndex, 1);
          self.itemIndex = null;
          self.catIndex = null;
          self.updateTotal();
        });
    };

    // Categories

    self.addCategory = function() {
      var category = new Category(self.newCategory);
      apiService.createCategory(category)
        .success(function(category) {
          self.categoryList.push(category);
          self.itemForm[category.name] = false;
        });
      self.toggleCategoryForm();
    };

    self.deleteCategory = function(category, catIndex) {
      self.catIndex = catIndex;
      apiService.deleteCategory(category)
        .success(function() {
          self.categoryList.splice(self.catIndex, 1);
          self.catIndex = null;
          self.updateTotal();
        });
    };

  }]);

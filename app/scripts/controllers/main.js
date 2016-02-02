'use strict';

/**
 * @ngdoc function
 * @name expensesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expensesApp
 */
angular.module('expensesApp')
  .controller('MainCtrl', ['itemFactory', 'categoryFactory', 'apiService', '$http', function (ItemFactory, CategoryFactory, apiService, $http) {
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
      apiService.getCategoryItems()
        .success(function(response) {
          self.categoryList = response.categories;
          self.updateTotal();
        });
    };

    self.addItem = function(index) {
      var category = self.categoryList[index].name;
      var params = itemFactory.newItem(self.newItem, self.newAmount, category);
      apiService.createItem(params)
        .success(function(item) {
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
      apiService.createCategory(self.newCategory)
        .success(function(category) {
          self.categoryList.push(category);
        });
      self.newCategory = '';
      self.toggleCategoryForm();
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

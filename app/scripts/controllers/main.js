'use strict';

/**
 * @ngdoc function
 * @name expensesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the expensesApp
 */
angular.module('expensesApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  var self = this;
  self.total = 0;
  self.categoryList = [{ 'name': 'Bills', 'itemList': [] }, { 'name': 'Food', 'itemList': [] }, { 'name': 'Coffee', 'itemList': [] }];
  self.itemForm = { 'Bills': false, 'Food': false, 'Coffee': false };

  self.addItem = function(index) {
    self.categoryList[index]['itemList'].push({ 'name': self.newItem, 'amount': self.newPrice });
    self.newItem = '';
    self.newPrice = '';
    self.updateTotal();
    var category = self.categoryList[index]['name'];
    self.itemForm[category] = false;
  };

  self.updateTotal = function() {
    var total = 0;
    for (var i in self.categoryList) {
      for (var j in self.categoryList[i].itemList) {
        total += parseInt(self.categoryList[i].itemList[j].amount, 10);
      }
    }
    self.total = total;
  };

  self.showItemForm = function(category) {
    for (var i in self.itemForm) {
      self.itemForm[i] = false;
    }
    self.itemForm[category] = true;
  };

  });

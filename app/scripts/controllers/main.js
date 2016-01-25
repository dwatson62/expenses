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
  self.itemList = [];
  self.total = 0;

  self.addItem = function() {
    self.itemList.push({ 'name': self.newItem, 'amount': self.newPrice });
    self.newItem = '';
    self.newPrice = '';
    self.updateTotal();
  };

  self.updateTotal = function() {
    var total = 0;
    for (var i in self.itemList) {
      total += parseInt(self.itemList[i].amount, 10);
    }
    self.total = total;
  };

  });

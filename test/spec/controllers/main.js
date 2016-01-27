'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('expensesApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MainCtrl.awesomeThings.length).toBe(3);
  });

  var addItem = function(name, price) {
    MainCtrl.newItem = name;
    MainCtrl.newPrice = price;
    MainCtrl.addItem(0);
  };

  var deleteItem = function(name, catIndex) {
    MainCtrl.deleteItem(name, catIndex);
  };

  describe('Items', function() {
    it('can add an item to the list with a price', function() {
      addItem('Rent', '525');
      expect(MainCtrl.categoryList[0]['itemList'].length).toBe(1);
      expect(MainCtrl.categoryList[0]['itemList']).toEqual([{ 'name': 'Rent', 'amount': '525' }]);
    });

    it('can delete an item from the list', function() {
      addItem('Rent', '525');
      deleteItem('Rent', 0);
      expect(MainCtrl.categoryList[0]['itemList'].length).toBe(0);
    });
  });

  describe('Totals', function() {
    it('can handle decimals', function() {
      MainCtrl.newItem = 'Coffee';
      MainCtrl.newPrice = '2.80';
      MainCtrl.addItem(0);
      expect(MainCtrl.categoryList[0]['itemList'].length).toBe(1);
      expect(MainCtrl.categoryList[0]['itemList']).toEqual([{ 'name': 'Coffee', 'amount': '2.80' }]);
      expect(MainCtrl.total).toEqual(2.8);
    });

    it('keeps a running total', function() {
      MainCtrl.newItem = 'Rent';
      MainCtrl.newPrice = '525';
      MainCtrl.addItem(0);
      MainCtrl.newItem = 'Oyster';
      MainCtrl.newPrice = '160';
      MainCtrl.addItem(0);
      expect(MainCtrl.total).toEqual(685);
    });

    it('deleting an item updates the total', function() {
      addItem('Rent', '525');
      deleteItem('Rent', 0);
      expect(MainCtrl.total).toEqual(0);
    });
  });

  describe('Categories', function() {
    it('can create a new category', function() {
      expect(MainCtrl.categoryList.length).toEqual(3);
      MainCtrl.newCategory = 'Eating out';
      MainCtrl.addCategory();
      expect(MainCtrl.categoryList.length).toEqual(4);
    });

    it('can delete a category and all its items', function() {
      MainCtrl.deleteCategory('Bills');
      expect(MainCtrl.categoryList.length).toEqual(2);
    });

    it('deleting a category updates the total', function() {
      addItem('Rent', '525');
      MainCtrl.deleteCategory('Bills');
      expect(MainCtrl.total).toEqual(0);
    });
  });
});

'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('expensesApp'));

  var MainCtrl,
    scope;
  var httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
    });
    httpBackend
      .when("POST", "/api/item")
      .respond(
        { 'name': 'Rent', 'amount': '525' }
      );
    httpBackend
      .when("POST", "/api/category")
      .respond(
        { 'name': 'Bills', }
      );
    httpBackend
      .when("GET", "/api/categories")
      .respond(
        [{'name': 'Bills', 'items': [] }]
      );
    MainCtrl.categoryList = [{'name': 'Bills', 'items': [] }];
  }));

  var addItem = function() {
    MainCtrl.addItem(0);
    httpBackend.flush();
  };

  var deleteItem = function(name, catIndex) {
    MainCtrl.deleteItem(name, catIndex);
  };

  describe('Items', function() {
    it('can add an item to the list with a price', function() {
      addItem();
      expect(MainCtrl.categoryList[0].items.length).toBe(1);
      expect(MainCtrl.categoryList[0].items).toEqual([{ 'name': 'Rent', 'amount': '525' }]);
    });

    it('can delete an item from the list', function() {
      addItem();
      deleteItem('Rent', 0);
      expect(MainCtrl.categoryList[0]['items'].length).toBe(0);
    });
  });

  describe('Totals', function() {
    it('can handle decimals', function() {
      MainCtrl.newItem = 'Coffee';
      MainCtrl.newPrice = '2.80';
      MainCtrl.addItem(0);
      expect(MainCtrl.categoryList[0]['items'].length).toBe(1);
      expect(MainCtrl.categoryList[0]['items']).toEqual([{ 'name': 'Coffee', 'amount': '2.80' }]);
      expect(MainCtrl.total).toEqual(2.8);
    });

    it('keeps a running total', function() {
      MainCtrl.addItem(0);
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
      expect(MainCtrl.categoryList.length).toEqual(1);
      MainCtrl.addCategory();
      httpBackend.flush();
      expect(MainCtrl.categoryList.length).toEqual(2);
    });

    it('can delete a category and all its items', function() {
      expect(MainCtrl.categoryList.length).toEqual(1);
      MainCtrl.deleteCategory('Bills');
      expect(MainCtrl.categoryList.length).toEqual(0);
    });

    it('deleting a category updates the total', function() {
      addItem('Rent', '525');
      MainCtrl.deleteCategory('Bills');
      expect(MainCtrl.total).toEqual(0);
    });
  });
});

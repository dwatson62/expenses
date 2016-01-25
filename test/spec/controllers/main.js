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

  it('can add an item to the list with a price', function() {
    MainCtrl.newItem = 'Rent';
    MainCtrl.newPrice = '525';
    MainCtrl.addItem();
    expect(MainCtrl.itemList.length).toBe(1);
    expect(MainCtrl.itemList[0]).toEqual({ 'name': 'Rent', 'amount': '525' });
  });

  it('keeps a running total', function() {
    MainCtrl.newItem = 'Rent';
    MainCtrl.newPrice = '525';
    MainCtrl.addItem();
    MainCtrl.newItem = 'Oyster';
    MainCtrl.newPrice = '160';
    MainCtrl.addItem();
    expect(MainCtrl.total).toEqual(685);
  });
});

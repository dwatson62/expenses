describe('Controller: MainCtrl', function () {
  beforeEach(module('expensesApp'));

  var MainCtrl;
  var scope;
  var mockApi;

  var billsCategory = { '_id': 1, 'name': 'Bills', 'items': [] };
  var rentItem = { '_id': 1, 'name': 'Rent', 'amount': '525' };
  var oysterItem = { '_id': 2, 'name': 'Oyster', 'amount': '160' };
  var coffeeItem = { '_id': 3, 'name': 'Coffee', 'amount': '2.80' };

  var allItems = {
    'categories': [{'name': 'Bills', 'items': [rentItem, oysterItem] }]
  };

  beforeEach(inject(function ($controller, apiService) {
    MainCtrl = $controller('MainCtrl');
    mockApi = apiService;
  }));

  var mockAPICall = function(method, response) {
    spyOn(mockApi, method).and.callFake(function() {
      return {
        success: function(callback) {
          callback(response);
        }
      };
    });
  };

  describe('On initialize', function() {
    beforeEach(function() {
      mockAPICall('getCategoryItems', allItems);
      MainCtrl.initialize();
    });

    it('displays all previously held data', function() {
      expect(MainCtrl.categoryList).toEqual(allItems.categories);
    });

    it('displays the correct total from previous data', function() {
      expect(MainCtrl.total).toEqual(685);
    });
  });

  describe('Items', function() {
    beforeEach(function() {
      MainCtrl.initialize();
      MainCtrl.categoryList = [{'name': 'Bills', 'items': [] }];
      mockAPICall('createItem', rentItem);
      mockAPICall('deleteItem', {});
    });

    it('can add an item to the list with a price', function() {
      MainCtrl.addItem(0);
      expect(MainCtrl.categoryList[0].items.length).toBe(1);
      expect(MainCtrl.categoryList[0].items).toEqual([rentItem]);
    });

    it('can delete an item from the list', function() {
      MainCtrl.addItem(0);
      MainCtrl.deleteItem(rentItem._id, 0, 0);
      expect(MainCtrl.categoryList[0]['items'].length).toBe(0);
    });
  });

  describe('Totals', function() {
    beforeEach(function() {
      MainCtrl.initialize();
      MainCtrl.categoryList = [{'name': 'Coffee', 'items': [] }];
    });

    it('can handle decimals', function() {
      mockAPICall('createItem', coffeeItem);

      MainCtrl.addItem(0);
      MainCtrl.addItem(0);
      expect(MainCtrl.categoryList[0]['items'].length).toBe(2);
      expect(MainCtrl.categoryList[0]['items']).toEqual([coffeeItem, coffeeItem]);
      expect(MainCtrl.total).toEqual(5.6);
    });

    it('keeps a running total', function() {
      mockAPICall('createItem', rentItem);

      MainCtrl.addItem(0);
      MainCtrl.addItem(0);
      expect(MainCtrl.total).toEqual(1050);
    });

    it('deleting an item updates the total', function() {
      mockAPICall('createItem', rentItem);
      mockAPICall('deleteItem', {});

      MainCtrl.addItem(0);
      expect(MainCtrl.total).toEqual(parseInt(rentItem.amount, 10));
      MainCtrl.deleteItem(rentItem._id, 0, 0);
      expect(MainCtrl.total).toEqual(0);
    });
  });

  describe('Categories', function() {
    beforeEach(function() {
      MainCtrl.initialize();
      mockAPICall('createCategory', billsCategory);
      mockAPICall('deleteCategory', {});
    });

    it('can create a new category', function() {
      expect(MainCtrl.categoryList.length).toEqual(0);
      MainCtrl.addCategory();
      expect(MainCtrl.categoryList.length).toEqual(1);
    });

    it('can delete a category', function() {
      MainCtrl.addCategory();
      expect(MainCtrl.categoryList.length).toEqual(1);

      MainCtrl.deleteCategory(billsCategory._id, 0);
      expect(MainCtrl.categoryList.length).toEqual(0);
    });

    it('deleting a category updates the total', function() {
      mockAPICall('createItem', rentItem);
      MainCtrl.addCategory();
      MainCtrl.addItem(0);
      expect(MainCtrl.total).toEqual(parseInt(rentItem.amount, 10));

      MainCtrl.deleteCategory(billsCategory._id, 0);
      expect(MainCtrl.total).toEqual(0);
    });
  });
});

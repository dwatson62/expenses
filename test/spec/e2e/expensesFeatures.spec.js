describe('Expenses App', function() {
  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Expenses');
  });

  var newCategoryButton = element.all(by.css('.new-category-button')).get(0);
  var categoryForm = element.all(by.css('.category-form')).get(0);
  var categoryInput = element.all(by.css('.category-form-input'));
  var saveCategoryButton = element.all(by.css('.save-category-button')).get(0);

  var billsCategoryButton = element.all(by.css('.new-item-button')).get(0);
  var itemForm = element.all(by.css('.item-form')).get(0);
  var itemInput = element(by.css('#Bills-item-input'));
  var saveItemButton = element.all(by.css('.save-item-button')).get(0);
  var billsList = element.all(by.css('.item-list')).get(0);

  var totalAmount = element.all(by.css('.total-amount')).get(0);

  var isVisible = function(element) {
    expect(element.isDisplayed()).toBeTruthy();
  };

  var isInvisible = function(element) {
    expect(element.isDisplayed()).toBeFalsy();
  };

  var fillItemForm = function(name, price) {
    element(by.model('mainCtrl.newItem')).sendKeys(name);
    element(by.model('mainCtrl.newAmount')).sendKeys(price);
  };

  var addCategory = function(name) {
    newCategoryButton.click();
    element(by.model('mainCtrl.newCategory')).sendKeys(name);
    saveCategoryButton.click();
  };

  describe('Items', function() {
    beforeEach(function() {
      addCategory('Bills');
    });

    it('can add a new item', function() {
      isVisible(billsCategoryButton);
      billsCategoryButton.click();
      isVisible(itemForm);
      isInvisible(billsCategoryButton);
      isVisible(itemInput);
      fillItemForm('Rent', '525');
      saveItemButton.click();
      isInvisible(itemForm);
      expect(billsList.getText()).toContain('£525 Rent');
    });

    it('can delete an item', function() {
      billsCategoryButton.click();
      element(by.model('mainCtrl.newItem')).sendKeys('Rent');
      element(by.model('mainCtrl.newAmount')).sendKeys('525');
      saveItemButton.click();
      expect(billsList.getText()).toContain('£525 Rent');
      var deleteButton = element.all(by.css('.delete-item-button'));
      deleteButton.click();
      expect(element.all(by.css('.item-list')).count()).toBe(0);
    });
  });

  describe('Categories', function() {
    it('can add a new item', function() {
      expect(element.all(by.css('.category')).count()).toBe(0);
      isVisible(newCategoryButton);
      newCategoryButton.click();
      isInvisible(newCategoryButton);
      isVisible(categoryForm);
      isVisible(saveCategoryButton);
      element(by.model('mainCtrl.newCategory')).sendKeys('Eating out');
      saveCategoryButton.click();
      isInvisible(categoryForm);
      isInvisible(saveCategoryButton);
      isVisible(newCategoryButton);
      expect(element.all(by.css('.category')).count()).toBe(1);
    });

    it('can delete a category', function() {
      addCategory('Bills');
      expect(element.all(by.css('.category')).count()).toBe(1);
      var deleteButton = element.all(by.css('.delete-category-button'));
      deleteButton.click();
      expect(element.all(by.css('.category')).count()).toBe(0);
    });
  });

  describe('Totals', function() {
    beforeEach(function() {
      addCategory('Bills');
    });

    it('keeps a running total', function() {
      billsCategoryButton.click();
      fillItemForm('Rent', '525');
      saveItemButton.click();
      billsCategoryButton.click();
      fillItemForm('Oyster', '160');
      saveItemButton.click();
      expect(totalAmount.getText()).toEqual('Total: £685.00');
    });
  });
});

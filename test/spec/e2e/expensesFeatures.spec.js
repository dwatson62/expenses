describe('Expenses App', function() {
  beforeEach(function() {
    browser.get('http://localhost:3000/specs/clear');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Expenses');
  });

  var newCategoryButton = element.all(by.css('.new-category-button')).get(0);
  var saveCategoryButton = element.all(by.css('.save-category-button')).get(0);
  var categoryForm = element.all(by.css('.category-form')).get(0);
  var categoryInput = element.all(by.css('.category-form-input'));

  var billsCategoryButton = element.all(by.css('.new-item-button')).get(0);
  var itemForm = element.all(by.css('.item-form')).get(0);
  var itemInput = element(by.css('#Bills-item-input'));

  var saveItemButton = element.all(by.css('.save-item-button')).get(0);
  var saveEditItemButton = element.all(by.css('.edit-item-submit'));
  var saveEditCategoryButton = element.all(by.css('.edit-category-submit'));

  var billsList = element.all(by.css('.item-list')).get(0);
  var totalAmount = element.all(by.css('.total-amount')).get(0);

  var isVisible = function(element) {
    expect(element.isDisplayed()).toBeTruthy();
  };

  var isInvisible = function(element) {
    expect(element.isDisplayed()).toBeFalsy();
  };

  var fillItemForm = function(name, amount) {
    element(by.model('mainCtrl.newItem')).sendKeys(name);
    element(by.model('mainCtrl.newAmount')).sendKeys(amount);
  };

  var fillEditItemForm = function(name, amount) {
    element(by.model('mainCtrl.editItemName')).sendKeys(name);
    element(by.model('mainCtrl.editItemAmount')).sendKeys(amount);
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
      expect(billsList.getText()).toContain('£525 Rent');
    });

    it('must fill in all fields to add an item', function() {
      billsCategoryButton.click();
      saveItemButton.click();
      expect(element.all(by.css('.item-list')).count()).toBe(0);
    });

    it('can edit an item', function() {
      billsCategoryButton.click();
      fillItemForm('Rent', '525');
      saveItemButton.click();
      expect(billsList.getText()).toContain('£525 Rent');
      billsList.click();
      isVisible(element.all(by.css('.edit-item-name')));
      isVisible(element.all(by.css('.edit-item-amount')));
      fillEditItemForm('Oyster', '160');
      saveEditItemButton.click();
      isInvisible(element.all(by.css('.edit-item-name')).get(0));
      isInvisible(element.all(by.css('.edit-item-amount')).get(0));
      expect(billsList.getText()).toContain('£160 Oyster');
    });

    it('when editing, keeps originals if none supplied', function() {
      billsCategoryButton.click();
      fillItemForm('Rent', '525');
      saveItemButton.click();
      expect(billsList.getText()).toContain('£525 Rent');
      billsList.click();
      saveEditItemButton.click();
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
    it('can add a new category', function() {
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

    it('name must be filled in', function() {
      addCategory('');
      expect(element.all(by.css('.category')).count()).toBe(0);
    });

    it('can edit a category name', function() {
      addCategory('Bills');
      var category = element.all(by.css('.category-name')).get(0);
      var categoryList = element.all(by.css('.category'));
      expect(category.getText()).toEqual('Bills');
      expect(categoryList.count()).toBe(1);

      category.click();
      isVisible(element.all(by.css('.edit-category-name')));
      element(by.model('mainCtrl.editCategoryName')).sendKeys('Food');
      saveEditCategoryButton.click();
      isInvisible(element.all(by.css('.edit-category-name')).get(0));

      expect(categoryList.count()).toBe(1);
      expect(category.getText()).toEqual('Food');
    });

    it('when editing, if no name supplied, keeps original', function() {
      addCategory('Bills');
      var category = element.all(by.css('.category-name')).get(0);
      var categoryList = element.all(by.css('.category'));
      expect(category.getText()).toEqual('Bills');
      expect(categoryList.count()).toBe(1);

      category.click();
      element(by.model('mainCtrl.editCategoryName')).sendKeys('');
      saveEditCategoryButton.click();

      expect(categoryList.count()).toBe(1);
      expect(category.getText()).toEqual('Bills');
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

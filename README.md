[![Build Status](https://travis-ci.org/dwatson62/expenses.svg?branch=master)](https://travis-ci.org/dwatson62/expenses) [![Code Climate](https://codeclimate.com/github/dwatson62/expenses/badges/gpa.svg)](https://codeclimate.com/github/dwatson62/expenses)

# Expenses

Creating an app in Angular to keep track of my monthly expenses. Main aim is to finish an Angular project that I can use.

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

To run unit tests:

```grunt test```

To run feature tests with protractor, in separate terminal windows:

```
grunt serve
webdriver-manager-update && webdriver-manager-start
protractor test/protractor.conf.js
```

## To Do

- Store data on database
- Styling with scss
- Category totals
- Create months

## Technologies Used

- Javascript, Angular
- Karma, Jasmine, Protractor
- Yeoman, Git, Travis, Grunt

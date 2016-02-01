[![Build Status](https://travis-ci.org/dwatson62/expenses.svg?branch=master)](https://travis-ci.org/dwatson62/expenses) [![Code Climate](https://codeclimate.com/github/dwatson62/expenses/badges/gpa.svg)](https://codeclimate.com/github/dwatson62/expenses)

# Expenses

Creating an app in Angular to keep track of my monthly expenses. Main aim is to finish an Angular project that I can use.

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular) version 0.15.1.

Currently in a basic mode, can add items and categories, which gets saved in the Mongo database. Can delete in-app, but this not yet hooked up to the backend. Most tests are currently broken while I redo all the specs.

## Build & development

``` npm start ```

## Testing

To run unit tests:

```grunt test```

To run feature tests with protractor, in separate terminal windows:

```
npm start
webdriver-manager-update && webdriver-manager-start
npm run protractor
```

## To Do

- Fix tests
- Styling with scss
- Category totals
- Create months

## Technologies Used

- Javascript, Angular
- Karma, Jasmine, Protractor
- Yeoman, Git, Travis, Grunt, MongoDB, Mongoose

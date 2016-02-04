[![Build Status](https://circleci.com/gh/dwatson62/expenses.svg?&style=shield&circle-token=7ad3e35e7a1bca3bb2c0f7ffb8daf5c50b3b1f60)](https://circleci.com/gh/dwatson62/expenses.svg?&style=shield&circle-token=7ad3e35e7a1bca3bb2c0f7ffb8daf5c50b3b1f60) [![Build Status](https://travis-ci.org/dwatson62/expenses.svg?branch=master)](https://travis-ci.org/dwatson62/expenses) [![Code Climate](https://codeclimate.com/github/dwatson62/expenses/badges/gpa.svg)](https://codeclimate.com/github/dwatson62/expenses)

# Expenses

Creating an app in Angular to keep track of my monthly expenses. Main aim is to finish an Angular project that I can use.

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular) version 0.15.1.

Currently in a basic mode, can add items and categories, which gets saved in the Mongo database. Can delete items and categories. Unable to get Travis to run protractor tests succesfully.

## Build & development

``` npm start ```

## Testing

To run unit tests:

```npm run test```

To run feature tests with protractor, in separate terminal windows:

```
npm run test-server
npm run webdriver
npm run protractor
```

## To Do

- Styling with scss
- Category totals
- Create months
- Allow user to edit category and item after creation
- Add date to item field

## Technologies Used

- Javascript, Angular
- Karma, Jasmine, Protractor
- Yeoman, Git, Travis, Grunt, MongoDB, Mongoose

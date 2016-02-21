# Expenses

Creating an app in Angular to keep track of my monthly expenses. Main aim is to finish an Angular project that I can use.

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular) version 0.15.1.

Currently in basic, unstyled mode. Can perform CRUD operations for items and categories, which gets saved in the Mongo database. Unable to get Travis to run protractor tests succesfully.

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
- Add date to item field

## Technologies Used

- Javascript, Angular
- Karma, Jasmine, Protractor
- Yeoman, Git, Travis, Grunt, MongoDB, Mongoose

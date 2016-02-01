'use strict';

/**
 * @ngdoc overview
 * @name expensesApp
 * @description
 * # expensesApp
 *
 * Main module of the application.
 */
angular
  .module('expensesApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

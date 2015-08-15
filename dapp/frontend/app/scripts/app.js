'use strict';

/**
 * @ngdoc overview
 * @name web2App
 * @description
 * # web2App
 *
 * Main module of the application.
 */
angular
  .module('web2App', [
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/buyer', {
        templateUrl: 'views/buyer.html',
        controller: 'BuyerCtrl',
        controllerAs: 'buyer'
      })
      .when('/seller', {
        templateUrl: 'views/seller.html',
        controller: 'SellerCtrl',
        controllerAs: 'seller'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

'use strict';

/**
 * @ngdoc overview
 * @name EscrowRajApp
 * @description
 * # EscrowRajApp
 *
 * Main module of the application.
 */
angular
  .module('EscrowRajApp', [
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
        controllerAs: 'buyer',
        access: {
          requiresLogin: true
        }
      })
      .when('/seller', {
        templateUrl: 'views/seller.html',
        controller: 'SellerCtrl',
        controllerAs: 'seller',
        access: {
          requiresLogin: true
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/contract/:contractAddress', {
        templateUrl: 'views/contract.html',
        controller: 'ContractCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope','$location', 'auth', function($rootScope, $location, auth){
    $rootScope.$on('$routeChangeStart', function(event, next) {
        if(next.access && next.access.requiresLogin) {
            if (!auth.isAuthenticated()) {
                $rootScope.preLoginLocation = $location.path();
                $location.path('/login');
            }
        }
    });
    $rootScope.$on('user:authenticated', function (event) {
        if(!$rootScope.preLoginLocation) {
            $rootScope.preLoginLocation = '/';
        }
        $location.path('/seller');
        $rootScope.$apply();
    });
    $rootScope.$on('$viewContentLoaded', function(){
        //Here your view content is fully loaded !!
        $('select').material_select();
    });
  }]);

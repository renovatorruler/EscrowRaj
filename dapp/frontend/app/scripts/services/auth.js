'use strict';

/**
 * @ngdoc service
 * @name EscrowRajApp.auth
 * @description
 * # auth
 * Service in the EscrowRajApp.
 */
angular.module('EscrowRajApp')
  .service('auth', ['$location', function ($location) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.user = null;

    this.isAuthenticated = function(){
      return !!this.user;
    };

    this.ensureAuthenticated = function(){
      if(!this.user) {
        $location.path( "/login" );
      }
    };

  }]);

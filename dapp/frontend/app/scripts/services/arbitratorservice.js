'use strict';

/**
 * @ngdoc service
 * @name EscrowRajApp.arbitratorService
 * @description
 * # arbitratorService
 * Service in the EscrowRajApp.
 */
angular.module('EscrowRajApp')
  .service('arbitratorService', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getArbitrators = function () {
        return $http.get('/arbitrators.json');
    };
  }]);

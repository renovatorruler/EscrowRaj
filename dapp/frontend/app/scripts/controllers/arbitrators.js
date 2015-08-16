'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:ArbitratorsCtrl
 * @description
 * # ArbitratorsCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('ArbitratorsCtrl', ['$scope', 'arbitratorService', function ($scope, arbitratorService) {
      arbitratorService.getArbitrators().then(function (data) {
          console.debug(data);
          $scope.arbitrators = data.data;
      });
  }]);

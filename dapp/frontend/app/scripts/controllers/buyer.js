'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:BuyerCtrl
 * @description
 * # BuyerCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('BuyerCtrl', ['$scope', function ($scope) {
      $scope.encKeySecret = '';
      $scope.sendContract = function () {
          escrow.createContract($scope.encKeySecret);
      };
  }]);

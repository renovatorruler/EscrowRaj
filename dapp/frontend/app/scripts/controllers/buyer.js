'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:BuyerCtrl
 * @description
 * # BuyerCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('BuyerCtrl', ['$scope', 'escrow', function ($scope, escrow) {
      $scope.encKeySecret = 'loverboy';
      $scope.sellerAddress = '46fa4c2d60305df40a74b8cbc04773d9bd5ad295';
      $scope.etherAmount = '0.5';
      $scope.memo = 'For Bar Mitzvah';

      $scope.sendContract = function () {
          console.debug(escrow.createContract($scope.encKeySecret));
      };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:SellerCtrl
 * @description
 * # SellerCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('SellerCtrl', ['$scope', 'escrow', function ($scope, escrow) {
      $scope.encKeySecret = '';
      $scope.sendContract = function () {
          escrow.createContract($scope.encKeySecret);
      };
  }]);

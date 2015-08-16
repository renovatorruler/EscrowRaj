'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:SellerCtrl
 * @description
 * # SellerCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('SellerCtrl', ['$scope', '$location', function ($scope, $location) {
      $scope.contractAddress = '';
      $scope.loadContract = function () {
          if($scope.contractAddress !== '') {
              $location.path('/contract/' + $scope.contractAddress);
          }
      };
  }]);

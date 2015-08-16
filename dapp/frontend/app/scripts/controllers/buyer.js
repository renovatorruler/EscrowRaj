'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:BuyerCtrl
 * @description
 * # BuyerCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('BuyerCtrl', ['$scope', '$location', 'escrow', function ($scope, $location, escrow) {
      $scope.preFillAddresses = [
        {name: 'Kevin', address: '46fa4c2d60305df40a74b8cbc04773d9bd5ad295'},
        {name: 'Josh', address: '041e0f42d6efddc7beab4143b30730dbe834f299'}
      ];
      $scope.encKeySecret = '';
      $scope.sellerAddress = '';
      $scope.etherAmount = 1;
      $scope.gasPrice = 100;
      $scope.memo = '';

      $scope.loadSeller = function (address) {
          $scope.sellerAddress = address;
      };

      $scope.sendContract = function () {
          $scope.inprogress = true;
          Materialize.toast('Submitting the contract to the Ethereum network. Please wait', 4000) // 4000 is the duration of the toast
          var unsubmittedContract = escrow.createContract($scope.encKeySecret);
          escrow.submitContract(unsubmittedContract, {
              sellerAddress: $scope.sellerAddress,
              gasPrice: $scope.gasPrice,
              etherAmount: $scope.etherAmount,
              memo: $scope.memo
          }, $scope.encKeySecret)
          .then(function (contract) {
              $scope.inprogress = false;
              $location.path('/contract/' + contract.address.toString());
          });
      };
  }]);

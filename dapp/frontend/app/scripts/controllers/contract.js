'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:ContractCtrl
 * @description
 * # ContractCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('ContractCtrl', ['$scope', '$routeParams', 'escrow',
    function ($scope, $routeParams, escrow) {
        $scope.contract = {};
        $scope.contract.address = $routeParams.contractAddress;
        escrow.getContractInfo($scope.contract.address).then(function (data) {
            $scope.contract = data;
        });
  }]);

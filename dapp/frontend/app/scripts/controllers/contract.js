'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:ContractCtrl
 * @description
 * # ContractCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('ContractCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
      $scope.contractAddress = $routeParams.contractAddress;
      console.debug($routeParams);
  }]);

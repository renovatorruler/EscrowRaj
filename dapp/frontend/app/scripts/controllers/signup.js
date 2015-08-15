'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('SignupCtrl', function ($scope) {
      $scope.seed = '';
      $scope.generateWallet = function () {
          $scope.seed = 'hello world';
      };
  });

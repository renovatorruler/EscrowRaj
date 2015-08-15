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
    var keystore;
    $scope.seed = '';
    $scope.password = '';
    $scope.address = '';
    $scope.generateWallet = function () {
        if($scope.seed === '') {
            $scope.seed = ethlightjs.keystore.generateRandomSeed();
        }
        keystore = new ethlightjs.keystore($scope.seed, $scope.password);
        $scope.address = keystore.generateNewAddress($scope.password);
      };

      var init = function () {
      };
  });

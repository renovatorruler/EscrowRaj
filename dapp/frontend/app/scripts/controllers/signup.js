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
        if($scope.seed === '' && $scope.randomizeSeedOption) {
            $scope.seed = ethlightjs.keystore.generateRandomSeed();
        }
        keystore = new ethlightjs.keystore($scope.seed, $scope.password);
        $scope.address = keystore.generateNewAddress($scope.password);
    };

    $scope.randomizeSeed = function () {
        if($scope.randomizeSeedOption) {
            $scope.seed = ethlightjs.keystore.generateRandomSeed();
        } else {
            $scope.seed = '';
        }
    };
  });

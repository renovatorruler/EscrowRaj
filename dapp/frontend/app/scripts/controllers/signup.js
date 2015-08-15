'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
.controller('SignupCtrl', ['$scope', 'auth', function ($scope, auth) {
    var keystore;
    $scope.email = '';
    $scope.seed = '';
    $scope.password = '';
    $scope.address = '';

    $scope.generateWallet = function () {
        if ($scope.seed === '' && $scope.randomizeSeedOption) {
            $scope.seed = ethlightjs.keystore.generateRandomSeed();
        }
        if ($scope.password.trim() === '') {
            $scope.emptyPassword = true;
            return;
        } else {
            $scope.emptyPassword = false;
        }

        keystore = new ethlightjs.keystore($scope.seed, $scope.password);
        $scope.address = keystore.generateNewAddress($scope.password);

        auth.register(keystore);
    };

    $scope.randomizeSeed = function () {
        if($scope.randomizeSeedOption) {
            $scope.seed = ethlightjs.keystore.generateRandomSeed();
        } else {
            $scope.seed = '';
        }
    };
  }]);

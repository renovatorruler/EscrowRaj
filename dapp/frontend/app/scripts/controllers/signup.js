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
    $scope.email = {
        value: '',
        valid: null
    };
    $scope.seed = '';
    $scope.encPassword = {
        value: '',
        valid: null
    };
    $scope.loginPassword = {
        value: '',
        valid: null
    };
    $scope.address = '<empty>';

    var checkForNullValues = function (model) {
        if (model.value.trim() === '') {
            model.valid = false;
        } else {
            model.valid = true;
        }
        return model.valid;
    };

    $scope.generateWallet = function () {
        var user = {
            email: '',
            loginpass: ''
        };
        if ($scope.seed === '' && $scope.randomizeSeedOption) {
            $scope.seed = ethlightjs.keystore.generateRandomSeed();
        }

        if(!checkForNullValues($scope.email)) {
            return;
        }

        if(!checkForNullValues($scope.loginPassword)) {
            return;
        }

        if(!checkForNullValues($scope.encPassword)) {
            return;
        }

        keystore = new ethlightjs.keystore($scope.seed, $scope.encPassword.value);
        $scope.address = keystore.generateNewAddress($scope.encPassword.value);

        user.email = $scope.email.value;
        user.loginpass = $scope.loginPassword.value;
        user.address = $scope.address;

        auth.register(user, keystore);
    };

    $scope.randomizeSeed = function () {
        if($scope.randomizeSeedOption) {
            $scope.seed = ethlightjs.keystore.generateRandomSeed();
        } else {
            $scope.seed = '';
        }
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('LoginCtrl', ['$scope', 'auth', function ($scope, auth) {
        //Intialize $scope
        $scope.email = {
            value: '',
            valid: null
        };
        $scope.password = {
            value: '',
            valid: null
        };
        $scope.address = {
          value: '',
          valid: null
        };

      var checkForNullValues = function (model) {
          if (model.value.trim() === '') {
              model.valid = false;
          } else {
              model.valid = true;
          }
          return model.valid;
      };

        $scope.authenticate = function () {
            if(!checkForNullValues($scope.email)) {
                return;
            }
            if(!checkForNullValues($scope.password)) {
                return;
            }
            if(!checkForNullValues($scope.address)) {
              return;
            }
            auth.login({
              email: $scope.email.value,
              loginpass: $scope.password.value,
              address: $scope.address.value
            });

        };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('LoginCtrl', function ($scope) {
        //Intialize $scope
        $scope.email = {
            value: '',
            valid: null
        };
        $scope.password = {
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
  });

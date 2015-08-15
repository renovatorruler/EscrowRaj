'use strict';

/**
 * @ngdoc service
 * @name EscrowRajApp.auth
 * @description
 * # auth
 * Service in the EscrowRajApp.
 */
angular.module('EscrowRajApp')
  .service('auth', ['$http', function ($http) {
    var apiEndpoint = window.apiURL;
    var ethlightjs = window.ethlightjs;

    this.user = null;

    this.isAuthenticated = function(){
      return !!this.user;
    };

    this.authenticate = function (address){
      return $http.get(apiEndpoint + '/query/account?address=' + userObj.address)
    };

    this.register = function(user, keyStore) {
      return $http.post(apiEndpoint + '/eth/v1.0/wallet', {
        email: user.email,
        loginpass: user.password,
        address: keyStore.addresses[0],
        enckey: keystore.serialize()
      });
    }

    this.loadAccountInfo = function() {};

  }]);

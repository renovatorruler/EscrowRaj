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

    this.register = function(keyStore) {
        submitUser({
            email: '',
            loginpass: '',
            app: window.appName,
            address: keyStore.addresses[0],
            enckey: keyStore.serialize()
        }, function(response){
            console.log(response);
        });
    };

    this.loadAccountInfo = function() {};

  }]);

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

    this.register = function(user, keyStore) {
        submitUser({
            email: user.email,
            loginpass: user.loginpass,
            app: window.appName,
            address: user.address,
            enckey: keyStore.serialize()
        }, function(response){
            console.log(response);
        });
    };


    this.login = function (user) {
        retrieveUser({
            app: window.appName,
            email: user.email,
            loginpass: user.loginpass,
            address: user.address,
        }, function(response){
            console.log(response);
        });
    };

    this.loadAccountInfo = function() {};

  }]);

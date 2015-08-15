'use strict';

/**
 * @ngdoc service
 * @name EscrowRajApp.auth
 * @description
 * # auth
 * Service in the EscrowRajApp.
 */
angular.module('EscrowRajApp')
  .service('auth', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var apiEndpoint = window.apiURL;
    var ethlightjs = window.ethlightjs;

    this.user = sessionStorage.getItem('user');
    $rootScope.authenticated = this.user;

    this.isAuthenticated = function(){
      return !!this.user;
    };

    this.getUser = function () {
        return this.user;
    };

    this.register = function(user, keyStore) {
        submitUser({
            email: user.email,
            loginpass: user.loginpass,
            app: window.appName,
            address: user.address,
            enckey: keyStore.serialize()
        }, (function(response){
            this.user = response;
        }).bind(this));
    };


    this.login = function (user) {
        var deferred = $q.defer();
        retrieveUser({
            app: window.appName,
            email: user.email,
            loginpass: user.loginpass,
            address: user.address,
        }, (function(response){
            this.user = response;
            sessionStorage.setItem('user', this.user);
            $rootScope.$broadcast('user:authenticated');
            deferred.resolve(response);
        }).bind(this));
        return deferred.promise;
    };

    this.loadAccountInfo = function() {};

  }]);

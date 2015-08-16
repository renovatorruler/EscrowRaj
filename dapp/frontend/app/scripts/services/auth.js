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
    var apiEndpoint = window.apiURL + '/eth/v1.0';
    var ethlightjs = window.ethlightjs;
    var localSession = sessionStorage.getItem('user');
    this.user = localSession ? ethlightjs.keystore.deserialize(localSession) : '';
    $rootScope.authenticated = this.user;

    this.isAuthenticated = function(){
      return !!this.user;
    };

    this.getUser = function () {
        return this.user;
    };

    this.getUserAddress = function () {
      return this.user.addresses()[0];
    };

    this.getUserPrivateKey = function(encPassword) {
      return this.user.exportPrivateKey(
        this.getUserAddress(),
        encPassword
      );
    };

    this.getBalance = function () {
        $http.get(apiEndpoint + '/account?address=' + this.user.addresses[0])
        .then(function (response) {
            $rootScope.accountBalance = web3.fromWei(response.data[0].balance, 'ether');
        });
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
            $http.post(apiEndpoint + '/faucet', {
                address: this.user.address.address
            });
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
            sessionStorage.setItem('user', this.user.serialize());
            $rootScope.$broadcast('user:authenticated');
            this.getBalance();
            deferred.resolve(response);
        }).bind(this));
        return deferred.promise;
    };

    this.loadAccountInfo = function() {};

    if(this.isAuthenticated()) {
        this.getBalance();
    }
  }]);

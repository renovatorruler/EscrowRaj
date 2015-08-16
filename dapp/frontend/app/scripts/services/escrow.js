'use strict';

/**
 * @ngdoc service
 * @name EscrowRajApp.escrow
 * @description
 * # escrow
 * Service in the EscrowRajApp.
 */
angular.module('EscrowRajApp')
  .service('escrow', ['$http', 'auth', '$q', function ($http, auth, $q) {
    var userKeyStore;
    var blockapi = window.blockapi;
    this.contract = null;

    $http
      .get('/contracts/EscrowRaj.json')
      .then((function(res){
        this.contract = res.data;
      }).bind(this));

    this.buildContractSource = function (source) {
        var contract = blockapi.Solidity('');
        contract.vmCode = source.vmCode;
        contract.symtab = source.symtab;
        return contract;
    };

    /*
    apiURL:
    fromAccount
    gasPrice,
    gasLimit
    value:
    */

    this.createContract = function(encPassword) {
      return this.buildContractSource(this.contract)
    }

    this.submitContract = function(contract, encPassword) {
        var deferred = $q.defer();
        userKeyStore = auth.getUser();
        var address = userKeyStore.getAddresses()[0];
        var privateKey = userKeyStore.exportPrivateKey(address, encPassword);
        var options = {
            apiURL: window.apiURL,
            value: 1,
            fromAccount: blockapi.Contract({privkey: privateKey}),
            gasPrice: 100,
            gasLimit: 2000000
        };
        contract.submit(options, function(contract){
            deferred.resolve(contract);
        });
        return deferred.promise;
    };

    this.getContractBalance = function (contract) {
        
    };
  }]);

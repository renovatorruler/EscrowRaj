'use strict';

/**
 * @ngdoc service
 * @name EscrowRajApp.escrow
 * @description
 * # escrow
 * Service in the EscrowRajApp.
 */
angular.module('EscrowRajApp')
  .service('escrow', ['$http', 'auth', function ($http, auth) {
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
      userKeyStore = auth.getUser();
      var address = userKeyStore.getAddresses()[0];
      var privateKey = userKeyStore.exportPrivateKey(address, encPassword);
      var options = {
        apiURL: window.apiURL,
        value: 1,
        fromAccount: blockapi.Contract({privkey: privateKey}),
        gasPrice: 1,
        gasLimit: 200
      };
      console.debug(options, this.contract);
      return this.buildContractSource(this.contract).submit(options, function(contract){
        console.log('submitted contract', contract);
      });
    }
  }]);

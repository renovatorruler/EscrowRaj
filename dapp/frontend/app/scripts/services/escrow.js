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

    this.createContract = function(encPassword) {
      userKeyStore = auth.getUser();
      var address = userKeyStore.getAddresses()[0];
      var privateKey = userKeyStore.exportPrivateKey(address, encPassword);
      var contract = this.buildContractSource(this.contract);
      console.log('creating contract', encPassword, nullContract);
    }
  }]);

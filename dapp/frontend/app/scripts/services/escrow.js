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
    var noop = function noop () {};
    var blockapi = window.blockapi;
    this.contract = window.EscrowRaj;

    this.createContract = function (encPassword) {
      buildContractSource(this.contract);
    }

    this.submitContract = function(contract, contractOptions, encPassword) {
      var deferred = $q.defer(),
        privateKey = auth.getUserPrivateKey(encPassword),
        transactionOptions = {
          fromAccount: blockapi.Contract({privkey: privateKey}),
          value: parseInt(contractOptions.etherAmount),
          gasPrice: parseInt(contractOptions.gasPrice),
          gasLimit: 2000000
        };
      contract.submit(
        Object.assign({
          apiURL: window.apiURL
        }, transactionOptions),
        populateContract);
      return deferred.promise;

      function populateContract (contract) {
          var options = Object.assign(
            {
              funcName: 'setSellerAndAmt'
            },
            transactionOptions
          );
          contract.call(apiURL, noop, options, {
            sellerAddress: contractOptions.sellerAddress,
            amt: contractOptions.etherAmount
          });
      }
    };

    this.getContractInfo = function (contractAddress) {
        var deferred = $q.defer(),
          contract = blockapi.Contract({
            address: contractAddress,
            symtab: this.contract.symtab
          });
        contract.sync(window.apiURL, function() {
            deferred.resolve(contract);
        });
        return deferred.promise;
    };

    function buildContractSource (source) {
        var contract = blockapi.Solidity('');
        contract.vmCode = source.vmCode;
        contract.symtab = source.symtab;
        return contract;
    };
}]);

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
    var apiEndpoint = window.apiURL + '/eth/v1.0';
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

    this.submitContract = function(contract, contractOptions, encPassword) {
        var deferred = $q.defer();
        userKeyStore = auth.getUser();
        var address = userKeyStore.getAddresses()[0];
        var privateKey = userKeyStore.exportPrivateKey(address, encPassword);
        var options = {
          apiURL: window.apiURL,
          value: parseInt(contractOptions.etherAmount),
          fromAccount: blockapi.Contract({privkey: privateKey}),
          gasPrice: parseInt(contractOptions.gasPrice),
          gasLimit: 2000000
        };
        contract.submit(options, function(contract){
            var callback = function(){};
            // contract.call(apiURL, callback, {
            //   functionName: 'setSeller',
            //   fromAccount: blockapi.Contract({privkey: privateKey},
            //   gasPrice: parseInt(contractValues.gasPrice),

            // })
            // contract.call.setSeller(contractValues.sellerAddress);
            // console.log('submitted contract', contract);
            deferred.resolve(contract);
        });
        return deferred.promise;
    };

    this.getContractInfo = function (contractAddress) {
        var deferred = $q.defer();
        $http.get(apiEndpoint + '/account?address=' + contractAddress).
            then(function (response) {
                deferred.resolve(response.data[0]);
            });
        return deferred.promise;
    };
}]);

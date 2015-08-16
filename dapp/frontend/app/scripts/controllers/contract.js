'use strict';

/**
 * @ngdoc function
 * @name EscrowRajApp.controller:ContractCtrl
 * @description
 * # ContractCtrl
 * Controller of the EscrowRajApp
 */
angular.module('EscrowRajApp')
  .controller('ContractCtrl', ['$scope', '$routeParams', 'escrow', 'auth',
    function ($scope, $routeParams, escrow, auth) {
        var contract;
        $scope.contract = {};
        $scope.contract.address = $routeParams.contractAddress;
        var user = auth.getUser();

        var loadContractInfo = function () {
            escrow.getContractInfo($scope.contract.address)
                .then(function (c) {
                    contract = c;
                    if(contract) {
                        $scope.contract.seller = contract.get["seller"];
                        $scope.contract.buyer = contract.get["buyer"];
                        $scope.contract.amount = contract.get["amount"];
                        $scope.contract.balance = contract.balance.toString();
                    }
                });
        };

        var fundsReleased = function () {
            if($scope.contract.buyer == user.addresses[0]) {
                $scope.contract.balance = 0;
                Materialize.toast('Seller has been paid', 4000)
            }
            $scope.$apply();
        };

        $scope.releaseFunds = function (amount) {
            var userKeyStore = auth.getUser();
            var address = userKeyStore.getAddresses()[0];
            var privateKey = userKeyStore.exportPrivateKey(address, $scope.passphrase);
            contract.call(window.apiURL, fundsReleased, {
                funcName: 'release',
                value: 0,
                fromAccount: blockapi.Contract({privkey: privateKey}),
                gasPrice: 100,
                gasLimit: 200000,
            }, { })
        };

        loadContractInfo();
  }]);

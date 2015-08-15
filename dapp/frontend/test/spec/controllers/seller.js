'use strict';

describe('Controller: SellerCtrl', function () {

  // load the controller's module
  beforeEach(module('EscrowRajApp'));

  var SellerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SellerCtrl = $controller('SellerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});

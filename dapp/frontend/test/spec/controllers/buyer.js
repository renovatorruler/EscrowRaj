'use strict';

describe('Controller: BuyerCtrl', function () {

  // load the controller's module
  beforeEach(module('EscrowRajApp'));

  var BuyerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BuyerCtrl = $controller('BuyerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BuyerCtrl.awesomeThings.length).toBe(3);
  });
});

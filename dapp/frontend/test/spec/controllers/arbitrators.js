'use strict';

describe('Controller: ArbitratorsCtrl', function () {

  // load the controller's module
  beforeEach(module('EscrowRajApp'));

  var ArbitratorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArbitratorsCtrl = $controller('ArbitratorsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
  });
});

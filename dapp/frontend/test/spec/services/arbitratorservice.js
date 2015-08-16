'use strict';

describe('Service: arbitratorService', function () {

  // load the service's module
  beforeEach(module('EscrowRajApp'));

  // instantiate service
  var arbitratorService;
  beforeEach(inject(function (_arbitratorService_) {
    arbitratorService = _arbitratorService_;
  }));

  it('should do something', function () {
    expect(!!arbitratorService).toBe(true);
  });

});

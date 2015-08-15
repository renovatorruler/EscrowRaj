'use strict';

describe('Service: escrow', function () {

  // load the service's module
  beforeEach(module('EscrowRajApp'));

  // instantiate service
  var escrow;
  beforeEach(inject(function (_escrow_) {
    escrow = _escrow_;
  }));

  it('should do something', function () {
    expect(!!escrow).toBe(true);
  });

});

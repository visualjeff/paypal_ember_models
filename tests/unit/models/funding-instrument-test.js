import { test, moduleForModel } from 'ember-qunit';

moduleForModel('funding-instrument', 'FundingInstrument', {
  // Specify the other units that are required for this test.
  needs: ['model:credit-card']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});

import { test, moduleForModel } from 'ember-qunit';

moduleForModel('transaction', 'Transaction', {
  // Specify the other units that are required for this test.
  needs: ['model:amount', 'model:description']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});

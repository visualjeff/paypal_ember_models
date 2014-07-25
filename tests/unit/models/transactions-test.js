import { test, moduleForModel } from 'ember-qunit';

moduleForModel('transactions', 'Transactions', {
  // Specify the other units that are required for this test.
  needs: ['model:transaction']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});

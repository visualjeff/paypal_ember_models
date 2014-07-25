import { test, moduleForModel } from 'ember-qunit';

moduleForModel('amount', 'Amount', {
  // Specify the other units that are required for this test.
  needs: ['model:detail']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});

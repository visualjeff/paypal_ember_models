import { test, moduleForModel } from 'ember-qunit';

moduleForModel('credit-card', 'CreditCard', {
  // Specify the other units that are required for this test.
  needs: ['model:billing-address']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});

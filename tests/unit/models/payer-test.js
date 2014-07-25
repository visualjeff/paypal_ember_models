import { test, moduleForModel } from 'ember-qunit';

moduleForModel('payer', 'Payer', {
  // Specify the other units that are required for this test.
  needs: ['model:funding-instrument']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});

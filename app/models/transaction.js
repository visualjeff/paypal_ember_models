import DS from 'ember-data';

export default DS.Model.extend({
  //payment: DS.belongsTo('payment'),

  amount: DS.belongsTo('amount'),
  description: DS.attr('string')
});

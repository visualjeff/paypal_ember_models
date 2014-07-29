import DS from 'ember-data';

export default DS.Model.extend({
  //transaction: DS.belongsTo('transaction'),

  total: DS.attr('string'),
  currency: DS.attr('string'),
  details: DS.belongsTo('detail')
});

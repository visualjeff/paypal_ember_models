import DS from 'ember-data';

export default DS.Model.extend({
  intent: DS.attr('string'),
  payer: DS.belongsTo('payer'),
  transactions: DS.hasMany('transaction')
});

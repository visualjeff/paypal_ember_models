import DS from 'ember-data';

export default DS.Model.extend({
  //payment: DS.belongsTo('payment'),

  paymentMethod: DS.attr('string'),
  fundingInstruments: DS.hasMany('fundingInstrument')
});

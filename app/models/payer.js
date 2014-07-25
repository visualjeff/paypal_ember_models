import DS from 'ember-data';

export default DS.Model.extend({
  paymentMethod: DS.attr('string'),
  fundingInstruments: DS.hasMany('creditCard')
});

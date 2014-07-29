import DS from 'ember-data';

export default DS.Model.extend({
  //creditCard: DS.belongsTo('creditCard'),

  line1: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  postalCode: DS.attr('string'),
  countryCode: DS.attr('string')
});

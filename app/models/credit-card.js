import DS from 'ember-data';

export default DS.Model.extend({
  //fundingInstrument: DS.belongsTo('fundingInstrument'),

  number: DS.attr('string'),
  type: DS.attr('string'),
  expireMonth: DS.attr('number'),
  expireYear: DS.attr('number'),
  cvv2: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  billingAddress: DS.belongsTo('billingAddress')
});

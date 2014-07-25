import DS from 'ember-data';

export default DS.Model.extend({
  subtotal: DS.attr('string'),
  tax: DS.attr('string'),
  shipping: DS.attr('string')
});

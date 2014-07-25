import DS from 'ember-data';

export default DS.Model.extend({
  total: DS.attr('string'),
  currency: DS.attr('string'),
  details: DS.belongsTo('detail')
});

import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.belongsTo('amount'),
  description: DS.attr('string')
});

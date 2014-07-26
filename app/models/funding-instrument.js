import DS from 'ember-data';

export default DS.Model.extend({
    creditCard: DS.belongsTo('creditCard')
});

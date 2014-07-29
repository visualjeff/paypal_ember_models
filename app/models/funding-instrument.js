import DS from 'ember-data';

export default DS.Model.extend({
    //payer: DS.belongsTo('payer'),

    creditCard: DS.belongsTo('creditCard')
});

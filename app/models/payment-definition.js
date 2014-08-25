import DS from 'ember-data';

export default DS.Model.extend({
    type: DS.attr('string'),
    cycles: DS.attr('string'),
    amount: DS.belongsTo('amount'),
    frequencyInterval: DS.attr('string'),
    name: DS.attr('string'),
    frequency: DS.attr('string'),
    chargeModels: DS.hasMany('chargeModel')
});

import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    type: DS.attr('string'),
    paymentDefinitions: DS.hasMany('paymentDefinition'),
    merchantPreferences: DS.belongsTo('merchantPreferences'),
    createTime: DS.attr('string'),
    updateTime: DS.attr('string'),
    links: DS.attr('raw')
});

import DS from 'ember-data';

export default DS.Model.extend({
    createTime: DS.attr('string'),
    updateTime: DS.attr('string'),
    status: DS.attr('string'),
    total: DS.attr('string'),
    currency: DS.attr('string'),
    parent_payment:  DS.attr('string')
});

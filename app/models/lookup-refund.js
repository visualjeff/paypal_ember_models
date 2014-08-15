import DS from 'ember-data';

export default DS.Model.extend({
    createTime: DS.attr('string'),
    updateTime: DS.attr('string'),
    state: DS.attr('string'),
    total: DS.attr('string'),
    currency: DS.attr('string'),
    captureId: DS.attr('string'),
    parentPayment:  DS.attr('string')
});

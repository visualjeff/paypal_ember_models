import DS from 'ember-data';

export default DS.Model.extend({
    authorizationId: DS.attr('string'),
    createTime: DS.attr('string'),
    updateTime: DS.attr('string'),
    status: DS.attr('string'),
    "total": DS.attr('string'),
    "currency": DS.attr('string'),
    "is_final_capture": DS.attr('boolean'),
    "parent_payment": DS.attr('string')
});

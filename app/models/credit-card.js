import DS from 'ember-data';

export default DS.Model.extend({
    "validUntil": DS.attr('string'),
    "state": DS.attr('string'),
    "payerId": DS.attr('string'),
    "type": DS.attr('string'),
    "number": DS.attr('string'),
    "expireMonth": DS.attr('string'),
    "expireYear": DS.attr('string'),
    "firstName": DS.attr('string'),
    "lastName": DS.attr('string')
});

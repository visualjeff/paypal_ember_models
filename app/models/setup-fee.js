import DS from 'ember-data';

export default DS.Model.extend({
    value: DS.attr('string'),
    currency: DS.attr('string')
});

import DS from 'ember-data';

export default DS.Model.extend({
    createTime: DS.attr('string'),
    updateTime: DS.attr('string'),
    status: DS.attr('string'),
    intent: DS.attr('string'),

    paymentMethod: DS.attr('string'),
    number: DS.attr('string'),
    type: DS.attr('string'),
    expireMonth: DS.attr('number'),
    expireYear: DS.attr('number'),
    cvv2: DS.attr('string'),

    firstName: DS.attr('string'),
    lastName: DS.attr('string'),

    address: DS.attr('string'),
    city: DS.attr('string'),
    state: DS.attr('string'),
    postalCode: DS.attr('string'),
    countryCode: DS.attr('string'),

    total: DS.attr('string'),
    currency: DS.attr('string'),
    subtotal: DS.attr('string'),
    tax: DS.attr('string'),
    shipping: DS.attr('string'),

    description: DS.attr('string'),
    authorizationId: DS.attr('string')
});

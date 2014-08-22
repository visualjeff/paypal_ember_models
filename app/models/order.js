import DS from 'ember-data';

export default DS.Model.extend({
    createTime: DS.attr('string'),
    updateTime: DS.attr('string'),
    status: DS.attr('string'),
    intent: DS.attr('string'),
    paymentMethod: DS.attr('string'),
    currency: DS.attr('string'),
    total: DS.attr('string'),
    shipping: DS.attr('string'),
    subtotal: DS.attr('string'),
    tax: DS.attr('string'),
    email: DS.attr('string'),
    description: DS.attr('string'),
    items: DS.attr('raw'), // Using a raw here because items don't have a relationship id
    recipientName: DS.attr('string'),
    line1: DS.attr('string'),
    city: DS.attr('string'),
    countryCode: DS.attr('string'),
    postalCode: DS.attr('string'),
    phone: DS.attr('string'),
    state: DS.attr('string'),
    approvalUrl: DS.attr('string')
});

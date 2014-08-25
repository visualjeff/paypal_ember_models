import DS from 'ember-data';

export default DS.Model.extend({
    setupFee: DS.attr('belongsTo'),
    returnUrl: DS.attr('string'),
    cancelUrl: DS.attr('string'),
    autoBillAmount: DS.attr('string'),
    initialFailAmountAction: DS.attr('string'),
    maxFailAttempts: DS.attr('string')
});

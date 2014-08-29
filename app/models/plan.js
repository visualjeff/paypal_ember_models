import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    type: DS.attr('string'),

    payeeMerchantId: DS.attr('string'),

    paymentDefinitionsId: DS.attr('string'),
    paymentDefinitionsType: DS.attr('string'),
    paymentDefinitionsCycles: DS.attr('string'),
    paymentDefinitionsAmount: DS.attr('raw'),
    paymentDefinitionsFrequencyInterval: DS.attr('string'),
    paymentDefinitionsName: DS.attr('string'),
    paymentDefinitionsFrequency: DS.attr('string'),

    paymentDefinitionsChargeModel: DS.attr('raw'),

    merchantPreferencesSetupFee: DS.attr('raw'),
    merchantPreferencesReturnUrl: DS.attr('string'),
    merchantPreferencesCancelUrl: DS.attr('string'),
    merchantPreferencesAutoBillAmount: DS.attr('string'),
    merchantPreferencesInitialFailAmountAction: DS.attr('string'),
    merchantPreferencesMaxFailAttempts: DS.attr('string'),

    createTime: DS.attr('string'),
    updateTime: DS.attr('string'),
    links: DS.attr('raw')
});

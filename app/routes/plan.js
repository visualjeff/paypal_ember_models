import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var plan = this.store.createRecord('plan', {
            "name": "T-Shirt of the Month Club Plan",
            "description": "Template creation.",
            "type": "fixed",
            "paymentDefinitionName": "Regular Payments",
            "paymentDefinitionType": "REGULAR",
            "paymentDefinitionFrequency": "MONTH",
            "paymentDefinitionFrequencyInterval": "2",
            "paymentDefinitionAmount": {
                "value": "100",
                "currency": "USD"
            },
            "paymentDefinitionCycles": "12",
            "paymentDefinitionsChargeModel": [
                {
                    "type": "SHIPPING",
                    "amount": {
                        "value": "10",
                        "currency": "USD"
                    }
                },
                {
                    "type": "TAX",
                    "amount": {
                        "value": "12",
                        "currency": "USD"
                    }
                }
            ],
            "merchantPreferencesSetupFee":{
                "value": "1",
                "currency": "USD"
            },
            "merchantPreferencesReturnUrl": "http://www.return.com",
            "merchantPreferencesCancelUrl": "http://www.cancel.com",
            "merchantPreferencesAutoBillAmount": "YES",
            "merchantPreferencesInitialFailAmountAction": "CONTINUE",
            "merchantPreferencesMaxFailAttempts": "0"
        });
        return plan;
    }
});

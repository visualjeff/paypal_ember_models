import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var amount1 = this.store.createRecord('amount', {
            "id": 1,
            "value": "12",
            "currency": "USD"
        });
        var amount2 = this.store.createRecord('amount', {
            "id": 2,
            "value": "100",
            "currency": "USD"
        });
        var chargeModel1 = this.store.createRecord('chargeModel', {
            id: 1,
            "type": "TAX",
            "amount": amount1
        });
        var chargeModel2 = this.store.createRecord('chargeModel', {
            id: 2,
            "type": "SHIPPING",
            "amount": amount1
        });
        var paymentDefinition1 = this.store.createRecord('paymentDefinition', {
            "id": 1,
            "name": "Regular Payments",
            "type": "REGULAR",
            "frequency": "MONTH",
            "frequencyInterval": "2",
            "amount": amount2,
            "cycles": "12",
        });
        paymentDefinition1.get('chargeModels').pushObject(chargeModel1);
        paymentDefinition1.get('chargeModels').pushObject(chargeModel2);
        var setupFee = this.store.createRecord('setupFee', {
            "id": 1,
            "value": "1",
            "currency": "USD"
        })
        var merchantPreferences = this.store.createRecord('merchantPreferences', {
            "id": 1,
            "setupFee": setupFee,
            "returnUrl": "http://www.return.com",
            "cancelUrl": "http://www.cancel.com",
            "autoBillAmount": "YES",
            "initialFailAmountAction": "CONTINUE",
            "maxFailAttempts": "0"
        });
        var plan = this.store.createRecord('plan', {
            "name": "T-Shirt of the Month Club Plan",
            "description": "Template creation.",
            "type": "fixed"
        });
        plan.get('paymentDefinitions').pushObject(paymentDefinition1);
        plan.set('merchantPreferences', merchantPreferences);
        return plan;
    }
});

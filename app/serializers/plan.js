import Ember from 'ember';
import ApplicationSerializer from 'paypal/serializers/application';

export default ApplicationSerializer.extend({
    serialize: function(record) {
        Ember.Logger.debug('plan serialize invoked!');
        var self = this;
        var serializedPayload = {
            "name": record.get('name'),
            "description": record.get('description'),
            "type": record.get('type'),
            "payment_definitions": [],
            "merchant_preferences": {
            }
        };
        record.get('paymentDefinitions').forEach(function(paymentDefinition) {

            var payment_definition = {
                "name": paymentDefinition.get('name'),
                "type": paymentDefinition.get('type'),
                "frequency": paymentDefinition.get('frequency'),
                "frequency_interval": paymentDefinition.get('frequencyInterval'),
                "amount": {
                    "value": "",
                    "currency": ""
                },
                "cycles": paymentDefinition.get('cycles'),
                "charge_models": []
            }
            //Get amount for payment_definitions
            var amount = self.store.getById('amount', paymentDefinition.get('amount').get('id'));
            payment_definition.amount.value = amount.get('value');
            payment_definition.amount.currency = amount.get('currency');

            //Get chargeModels for payment_defintions.  Iterate over each one
            paymentDefinition.get('chargeModels').forEach(function(chargeModel) {
                 var charge_model = {
                    "type": chargeModel.get('type'),
                     "amount": {
                         "value": "",
                         "currency": ""
                     }
                 }
                 //Get the amount for each charge level
                 var amount = self.store.getById('amount', chargeModel.get('amount').get('id'));
                 charge_model.amount.value = amount.get('value');
                 charge_model.amount.currency = amount.get('currency');
                 Ember.Logger.debug("  charge_model = " + JSON.stringify(charge_model));
                 payment_definition.charge_models.pushObject(charge_model);
            });

            serializedPayload.payment_definitions.pushObject(payment_definition);
        });

        var merchantPreferences = record.get('merchantPreferences');
        var merchant_preferences = {
            "setup_fee": {
                "value": "",
                "currency": ""
            },
            "return_url": merchantPreferences.get('returnUrl'),
            "cancel_url": merchantPreferences.get('cancelUrl'),
            "auto_bill_amount": merchantPreferences.get('autoBillAmount'),
            "initial_fail_amount_action": merchantPreferences.get('initialFailAmountAction'),
            "max_fail_attempts": merchantPreferences.get('maxFailAttempts')
        }
        var setupFee = self.store.getById('setupFee', merchantPreferences.get('setupFee').get('id'));
        merchant_preferences.setup_fee.value = setupFee.get('value');
        merchant_preferences.setup_fee.currency = setupFee.get('currency');
        serializedPayload.merchant_preferences = merchant_preferences;
        Ember.Logger.debug("  serializedPayload = " + JSON.stringify(serializedPayload));
        return serializedPayload;
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('plan normalizePayload invoked!');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        /*
        var normalizedPayload = {
            "plans": [{
                "id": payload.id,
                "name": "foo",
                "description": "foo",
                "type": "foo",
                "chargeModels": [0],
                "merchantPreferences": 0,
                "setupFee": "foo",
                "autoBill": "foo",
                "createTime": "foo",
                "updateTime": "foo",
                "links": [],
                "maxFailAttempts": "foo",
                "initialFailAmountAction": "foo",
                "paymentDefinitions": 0
            }],
            "chargeModels": [{
                "id": 1,
                "name": "foo",
                "type": "foo",
                "frequency": "foo",
                "amount": "foo",
                "currency": "foo",
                "value": "foo"
            }],
            "paymentDefinitions": [{
                "id": 1,
                "type": "foo",
                "amount": "foo",
                "currency": "foo",
                "value": "foo",
                "cycles": "foo",
                "frequencyInterval": "foo"
            }],
            "merchantPreferences": [{
                "id": 1,
                "setupFee": "foo",
                "currency": "foo",
                "value": "foo"
            }]
        };
        */
        return this._super(normalizedPayload);
    }
});

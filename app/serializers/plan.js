import Ember from 'ember';
import ApplicationSerializer from 'paypal/serializers/application';

export default ApplicationSerializer.extend({
    serialize: function(record) {
        Ember.Logger.debug('plan serialize invoked!');
        var serializedPayload = {
            "name": record.get('name'),
            "description": record.get('description'),
            "type": record.get('type'),
            payment_definitions: [
                {
                    "name": record.get('paymentDefinitionsName'),
                    "type": record.get('paymentDefinitionsType'),
                    "frequency": record.get('paymentDefinitionsFrequency'),
                    "frequency_interval": record.get('paymentDefinitionsFrequencyInterval'),
                    "amount": {
                        "value": record.get('paymentDefinitionsAmount').value,
                        "currency": record.get('paymentDefinitionsAmount').currency
                    },
                    "cycles": record.get('paymentDefinitionsCycles'),
                    "charge_models": []
                }
            ],
            "merchant_preferences": {
                "setup_fee": {
                    "value": record.get('merchantPreferencesSetupFee').value,
                    "currency": record.get('merchantPreferencesSetupFee').currency
                },
                "return_url": record.get('merchantPreferencesReturnUrl'),
                "cancel_url": record.get('merchantPreferencesCancelUrl'),
                "auto_bill_amount": record.get('merchantPreferencesAutoBillAmount'),
                "initial_fail_amount_action": record.get('merchantPreferencesInitialFailAmountAction'),
                "max_fail_attempts": record.get('merchantPreferencesMaxFailAttempts')
            }
        };
        record.get('paymentDefinitionsChargeModel').forEach(function(chargeModel){
            var cm = {
                "type": chargeModel.type,
                    "amount": {
                        "value": chargeModel.amount.value,
                        "currency": chargeModel.amount.currency
                    }
                };
            serializedPayload.payment_definitions[0].charge_models.pushObject(cm);
        });

        Ember.Logger.debug("  serializedPayload = " + JSON.stringify(serializedPayload));
        return serializedPayload;
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('plan normalizePayload invoked!');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        /*
        {"id":"P-9CV35152925613405D4DITQI",
         "state":"CREATED",
         "name":"T-Shirt of the Month Club Plan",
         "description":"Template creation.",
         "type":"FIXED",
         "payee":{
            "merchant_id":"1940465258243073044"
         },
         "payment_definitions":[
            {
                "id":"PD-00D82787NW4654341D4DITQI",
                "name":"Regular Payments",
                "type":"REGULAR",
                "frequency":"Month",
                "amount":{
                    "currency":"USD",
                    "value":"100"
                },
                "charge_models":[
                {
                    "id":"CHM-81R0534386725752FD4DITQI",
                    "type":"SHIPPING",
                    "amount":{
                        "currency":"USD",
                        "value":"10"
                    }
                },
                {
                    "id":"CHM-7NY18977BR1260921D4DITQI",
                    "type":"TAX",
                    "amount":{
                        "currency":"USD",
                        "value":"12"
                    }
                }
            ],
            "cycles":"12",
            "frequency_interval":"2"
            }
         ],
         "merchant_preferences":{
            "setup_fee":{
                "currency":"USD",
                "value":"1"
            },
            "max_fail_attempts":"0",
            "return_url":"http://www.return.com",
            "cancel_url":"http://www.cancel.com",
            "auto_bill_amount":"YES",
            "initial_fail_amount_action":"CONTINUE"
         },
         "create_time":"2014-08-28T23:49:55.265Z",
         "update_time":"2014-08-28T23:49:55.265Z",
         "links":[{
                "href":"https://api.sandbox.paypal.com/v1/payments/billing-plans/P-9CV35152925613405D4DITQI",
                "rel":"self",
                "method":"GET"
            }]
         }
        */

        var normalizedPayload = {
            plan: {
                id: payload.id,
                status: payload.state,
                name: payload.name,
                description: payload.description,
                type: payload.type,
                payeeMerchantId: payload.payee.merchant_id,
                paymentDefinitionsId: payload.payment_definitions[0].id,
                paymentDefinitionsName: payload.payment_definitions[0].name,
                paymentDefinitionsType: payload.payment_definitions[0].type,
                paymentDefinitionsFrequency: payload.payment_definitions[0].frequency,
                paymentDefinitionsAmount: payload.payment_definitions[0].amount,
                paymentDefinitionsChargeModel: payload.payment_definitions[0].charge_models,
                paymentDefinitionsCycles: payload.payment_definitions[0].cycles,
                paymentDefinitionsFrequencyInterval: payload.payment_definitions[0].frequency_interval,
                merchantPreferencesSetupFee: payload.merchant_preferences.setup_fee,
                merchantPreferencesReturnUrl: payload.merchant_preferences.return_url,
                merchantPreferencesCancelUrl: payload.merchant_preferences.cancel_url,
                merchantPreferencesAutoBillAmount: payload.merchant_preferences.auto_bill_amount,
                merchantPreferencesInitialFailAmountAction: payload.merchant_preferences.initial_fail_amount_action,
                merchantPreferencesMaxFailAttempts: payload.merchant_preferences.max_fail_attempts,
                createTime: payload.create_time,
                updateTime: payload.update_time,
                links: payload.links
            }
        };
        return this._super(normalizedPayload);
    }
});

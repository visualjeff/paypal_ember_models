import DS from 'ember-data';
import Ember from 'ember';
import ApplicationSerializer from 'paypal/serializers/application';

export default ApplicationSerializer.extend({
    /**
     * To tweak the data your sending to the paypal.
     * @param record
     * @param options
     * @returns {*}
     */
    serialize: function(record, options) {
        Ember.Logger.debug('payment serialize invoked!');
        var serializedPayload = {
            "intent": record.get('intent'),
            "payer":{
                "payment_method": record.get('paymentMethod'),
                "funding_instruments":[
                    {
                        "credit_card":{
                            "number": record.get('number'),
                            "type": record.get('type'),
                            "expire_month": record.get('expireMonth'),
                            "expire_year": record.get('expireYear'),
                            "cvv2": record.get('cvv2'),
                            "first_name": record.get('firstName'),
                            "last_name": record.get('lastName'),
                            "billing_address":{
                                "line1": record.get('address'),
                                "city": record.get('city'),
                                "state": record.get('state'),
                                "postal_code": record.get('postalCode'),
                                "country_code": record.get('countryCode')
                            }
                        }
                    }
                ]
            },
            "transactions":[
                {
                    "amount":{
                        "total": record.get('total'),
                        "currency": record.get('currency'),
                        "details":{
                            "subtotal": record.get('subtotal'),
                            "tax": record.get('tax'),
                            "shipping": record.get('shipping')
                        }
                    },
                    "description": record.get('description')
                }
            ]
        };
        return serializedPayload;
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('authorization normalizePayload invoked!');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        var normalizedPayload = {
            authorization: {
                id: payload.id,
                createTime: payload.create_time,
                updateTime: payload.update_time,
                status: payload.state,
                intent: payload.intent,
                paymentMethod: payload.payer.payment_method,
                number: payload.payer.funding_instruments[0].credit_card.number,
                type: payload.payer.funding_instruments[0].credit_card.type,
                expireMonth: payload.payer.funding_instruments[0].credit_card.expire_month,
                expireYear: payload.payer.funding_instruments[0].credit_card.expire_year,
                firstName: payload.payer.funding_instruments[0].credit_card.first_name,
                lastName: payload.payer.funding_instruments[0].credit_card.last_name,
                address: payload.payer.funding_instruments[0].credit_card.billing_address.line1,
                city: payload.payer.funding_instruments[0].credit_card.billing_address.city,
                state: payload.payer.funding_instruments[0].credit_card.billing_address.state,
                postalCode: payload.payer.funding_instruments[0].credit_card.billing_address.postal_code,
                countryCode: payload.payer.funding_instruments[0].credit_card.billing_address.country_code,

                total: payload.transactions[0].amount.total,
                currency: payload.transactions[0].amount.currency,
                subtotal: payload.transactions[0].amount.details.subtotal,
                tax: payload.transactions[0].amount.details.tax,
                shipping: payload.transactions[0].amount.details.shipping,
                description: payload.transactions[0].description,
                authorizationId: payload.transactions[0].related_resources[0].authorization.id
            }
        };
        //Ember.Logger.debug('  normalizedPayload = ' + JSON.stringify(normalizedPayload));
        return this._super(normalizedPayload);
    }
});

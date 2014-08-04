import DS from 'ember-data';
import Ember from 'ember';

/**
 * Top level serializer for paypal payment
 *
 * NOTE: .decamelize() was added to the keys.  Paypal doesn't accept camelized keys.
 */
export default DS.RESTSerializer.extend({
    primaryKey: 'id',

    /**
     * Remove any Meta if its necessary.
     * @param store
     * @param type
     * @param payload
     */
    extractMeta: function(store, type, payload) {
        Ember.Logger.debug('payment extractMeta invoked!');
    },

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
        }
        return serializedPayload;
    },

    /**
     * Override if you need a root
     * @param store
     * @param type
     * @param payload
     * @returns {*}
     */
    extractSingle: function(store, type, payload) {
        Ember.Logger.debug('payment extracSingle invoked!');
        var payload = { "payment": payload };
        return this._super(store, type, payload);
    },


    normalizePayload: function(payload) {
        Ember.Logger.debug('payment normalizePayload invoked!');
        var normalizedPayload = {
            payment: {
                id: payload.payment.id,
                createTime: payload.payment.create_time,
                updateTime: payload.payment.update_time,
                status: payload.payment.state,
                intent: payload.payment.intent,
                paymentMethod: payload.payment.payer.payment_method,
                number: payload.payment.payer.funding_instruments[0].credit_card.number,
                type: payload.payment.payer.funding_instruments[0].credit_card.type,
                expireMonth: payload.payment.payer.funding_instruments[0].credit_card.expire_month,
                expireYear: payload.payment.payer.funding_instruments[0].credit_card.expire_year,
                firstName: payload.payment.payer.funding_instruments[0].credit_card.first_name,
                lastName: payload.payment.payer.funding_instruments[0].credit_card.last_name,
                address: payload.payment.payer.funding_instruments[0].credit_card.billing_address.line1,
                city: payload.payment.payer.funding_instruments[0].credit_card.billing_address.city,
                state: payload.payment.payer.funding_instruments[0].credit_card.billing_address.state,
                postalCode: payload.payment.payer.funding_instruments[0].credit_card.billing_address.postal_code,
                countryCode: payload.payment.payer.funding_instruments[0].credit_card.billing_address.country_code,
                total: payload.payment.transactions[0].amount.total,
                currency: payload.payment.transactions[0].amount.currency,
                subtotal: payload.payment.transactions[0].amount.details.subtotal,
                tax: payload.payment.transactions[0].amount.details.tax,
                shipping: payload.payment.transactions[0].amount.details.shipping,
                description: payload.payment.transactions[0].description,
                transactionId: payload.payment.transactions[0].related_resources[0].sale.id
            }
        };
        return this._super(normalizedPayload);
    }
});

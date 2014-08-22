import Ember from 'ember';
import ApplicationSerializer from 'paypal/serializers/application';

export default ApplicationSerializer.extend({
    /**
     * To tweak the data your sending to the paypal.
     * @param record
     * @param options
     * @returns {*}
     */
    serialize: function(record) {
        Ember.Logger.debug('Order serialize invoked!');
        var serializedPayload = {
            "intent": record.get('intent'),
            "payer": {
                "payment_method": record.get('paymentMethod')
            },
            "transactions": [
            {
                "amount": {
                    "currency": record.get('currency'),
                    "total": record.get('total'),
                    "details": {
                        "shipping": record.get('shipping'),
                        "subtotal": record.get('subtotal'),
                        "tax": record.get('tax')
                    }
                },
                "payee": {
                    "email": record.get('email')
                },
                "description": record.get('description'),
                "item_list": {
                    "items": record.get('items'),
                    "shipping_address": {
                        "recipient_name": record.get('recipientName'),
                        "line1": record.get('line1'),
                        "city": record.get('city'),
                        "country_code": record.get('countryCode'),
                        "postal_code": record.get('postalCode'),
                        "phone": record.get('phone'),
                        "state": record.get('state')
                    }
                }
            }],
            "redirect_urls": {
                "return_url": "http://www.bestbuy.com",
                "cancel_url": "http://www.hawaii.com"
            }
        };
        return serializedPayload;
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('Order normalizePayload invoked!');
        //Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        var normalizedPayload = {
            order: {
                id: payload.id,
                createTime: payload.create_time,
                updateTime: payload.update_time,
                status: payload.state,
                intent: payload.intent,
                paymentMethod: payload.payer.payment_method,
                currency: payload.transactions[0].amount.currency,
                total: payload.transactions[0].amount.total,
                shipping: payload.transactions[0].amount.details.shipping,
                subtotal: payload.transactions[0].amount.details.subtotal,
                tax: payload.transactions[0].amount.details.tax,
                description: payload.transactions[0].description,
                items: payload.transactions[0].item_list.items,
                recipientName: payload.transactions[0].item_list.shipping_address.recipient_name,
                line1: payload.transactions[0].item_list.shipping_address.line1,
                city: payload.transactions[0].item_list.shipping_address.city,
                countryCode: payload.transactions[0].item_list.shipping_address.country_code,
                postalCode: payload.transactions[0].item_list.shipping_address.postal_code,
                phone: payload.transactions[0].item_list.shipping_address.phone,
                state: payload.transactions[0].item_list.shipping_address.state,
                approvalUrl: payload.links[1].href
            }
        };
        return normalizedPayload;
    }
});

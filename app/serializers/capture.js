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
        Ember.Logger.debug('capture serialize invoked!');
        var serializedPayload = {
            "amount": {
                "currency": record.get('currency'),
                "total": record.get('total')
            },
            "is_final_capture": record.get('is_final_capture')
        };
        return serializedPayload;
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('capture normalizePayload invoked!');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        var normalizedPayload = {
            capture: {
                id: payload.id,
                createTime: payload.create_time,
                updateTime: payload.update_time,
                status: payload.state,
                total: payload.amount.total,
                currency: payload.amount.currency,
                is_final_capture: payload.is_final_capture,
                parent_payment: payload.parent_payment
            }
        };
        //Ember.Logger.debug('  normalizedPayload = ' + JSON.stringify(normalizedPayload));
        return normalizedPayload;
    }
});

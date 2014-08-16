import Ember from 'ember';
import ApplicationSerializer from 'paypal/serializers/application';

export default ApplicationSerializer.extend({
    /**
     * To tweak the data your sending to the paypal.
     * @param record
     * @param options
     * @returns {*}
     */
    serialize: function() {
        Ember.Logger.debug('void serialize invoked!');
        var serializedPayload = {
        };
        return serializedPayload;
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('void normalizePayload invoked!');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        var normalizedPayload = {
            void: {
                id: payload.id,
                createTime: payload.create_time,
                updateTime: payload.update_time,
                status: payload.state,
                total: payload.amount.total,
                currency: payload.amount.currency,
                subtotal: payload.amount.details.subtotal,
                parentPayment: payload.parent_payment
            }
        };
        //Ember.Logger.debug('  normalizedPayload = ' + JSON.stringify(normalizedPayload));
        return normalizedPayload;
    }
});

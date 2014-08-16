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
        Ember.Logger.debug('lookupSale serialize invoked!');
        //Ember.Logger.debug('  record = ' + JSON.stringify(record));
        return record;
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('lookupRefund normalizePayload invoked!');
        //Ember.Logger.debug('  payload = ' + JSON.stringify(payload));

        var normalizedPayload = {
            lookupRefund: {
                id: payload.id,
                createTime: payload.create_time,
                updateTime: payload.update_time,
                status: payload.state,
                total: payload.amount.total,
                currency: payload.amount.currency,
                captureId: payload.capture_id,
                parentPayment: payload.parent_payment
            }
        };

        //Ember.Logger.debug('  normalizedPayload = ' + JSON.stringify(normalizedPayload));
        return this._super(normalizedPayload);
    }
});

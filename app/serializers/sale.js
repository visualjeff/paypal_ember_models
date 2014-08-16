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
        Ember.Logger.debug('sale serialize invoked!');
        //Ember.Logger.debug('  record = ' + JSON.stringify(record));
        return record;
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('sale normalizePayload invoked!');
        //Ember.Logger.debug('  payload = ' + JSON.stringify(payload));

        var normalizedPayload = {
            sale: {
                id: payload.id,
                createTime: payload.create_time,
                updateTime: payload.update_time,
                status: payload.state,
                total: payload.amount.total,
                currency: payload.amount.currency,
                parentPayment: payload.parent_payment
            }
        };
        return this._super(normalizedPayload);
    }
});

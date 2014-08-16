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
        Ember.Logger.debug('refund serialize invoked!');

        var serializedRecord = {
            amount: {
                transactionId: record.get('transactionId'),
                total: record.get('total'),
                currency: record.get('currency')
            }
        };

        Ember.Logger.debug('  serializedRecord = ' + JSON.stringify(serializedRecord));
        return serializedRecord;
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('refund normalizePayload invoked!');
        //Ember.Logger.debug('  payload = ' + JSON.stringify(payload));

        var normalizedPayload = {
            refund: {
                id: payload.id,
                createTime: payload.create_time,
                updateTime: payload.update_time,
                status: payload.state,
                total: payload.amount.total,
                currency: payload.amount.currency,
                saleId: payload.sale_id
            }
        };

        Ember.Logger.debug('  normalizedPayload = ' + JSON.stringify(normalizedPayload));
        return this._super(normalizedPayload);
    }
});

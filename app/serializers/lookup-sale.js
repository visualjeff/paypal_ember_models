import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
    primaryKey: 'id',

    /**
     * Remove any Meta if its necessary.
     * @param store
     * @param type
     * @param payload
     */
    extractMeta: function(store, type, payload) {
        Ember.Logger.debug('lookupSale extractMeta invoked!');
    },

    /**
     * To tweak the data your sending to the paypal.
     * @param record
     * @param options
     * @returns {*}
     */
    serialize: function(record, options) {
        Ember.Logger.debug('lookupSale serialize invoked!');
        Ember.Logger.debug('  record = ' + JSON.stringify(record));
        return record;
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('lookupSale normalizePayload invoked!');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));

        var normalizedPayload = {
            lookupSale: {
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

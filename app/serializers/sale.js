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
        Ember.Logger.debug('sale extractMeta invoked!');
    },

    /**
     * To tweak the data your sending to the paypal.
     * @param record
     * @param options
     * @returns {*}
     */
    serialize: function(record, options) {
        Ember.Logger.debug('sale serialize invoked!');
        Ember.Logger.debug('  record = ' + JSON.stringify(record));
        return record;
    },

    /**
     * Override if you need a root
     * @param store
     * @param type
     * @param payload
     * @returns {*}
     */
    extractSingle: function(store, type, payload) {
        Ember.Logger.debug('sale extracSingle invoked!');
        payload = { "sale": payload };
        return this._super(store, type, payload);
    },


    normalizePayload: function(payload) {
        Ember.Logger.debug('sale normalizePayload invoked!');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));

        var normalizedPayload = {
            sale: {
                id: payload.sale.id,
                createTime: payload.sale.create_time,
                updateTime: payload.sale.update_time,
                status: payload.sale.state,
                total: payload.sale.amount.total,
                currency: payload.sale.amount.currency
            }
        };
        return this._super(normalizedPayload);
    }
});

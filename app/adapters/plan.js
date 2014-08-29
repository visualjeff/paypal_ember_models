import Ember from 'ember';
import ApplicationAdapter from 'paypal/adapters/application';

export default ApplicationAdapter.extend({
    /**
     * Build the url.  Good place to log out what is using in url creation.
     * @param type
     * @param id
     * @returns {*}
     */
    buildURL: function(type, id) {
        Ember.Logger.debug('plan adapter information:');
        var url = this._super(type, id);
        Ember.Logger.debug('  plan adapter, url = ' + url);
        return url;
    },
    /**
     * Override createRecord.  Paypal doesn't want the payload wrapped in
     * the type key 'payment'.
     * @param store
     * @param type
     * @param record
     * @returns {*}
     */
    createRecord: function(store, type, record) {
        var data = {};
        var serializer = store.serializerFor(type.typeKey);
        serializer.serializeIntoHash(data, type, record, { includeId: true });
        data = data.plan; //Customization here.  Only send the sale data.  Not the wrapped sale.

        Ember.Logger.debug("==================================================");
        Ember.Logger.debug("  data = " + JSON.stringify(data));
        Ember.Logger.debug("==================================================");
        return this.ajax(this.buildURL('billing-plans'), "POST", { data: data });
    }
});

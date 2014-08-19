import Ember from 'ember';
import ApplicationAdapter from 'paypal/adapters/application';


export default ApplicationAdapter.extend({
    namespace: 'v1/vault',
    /**
     * Build the url.  Good place to log out what is using in url creation.
     * @param type
     * @param id
     * @returns {*}
     */
    buildURL: function() {
        Ember.Logger.debug('creditCard adapter information:');
        var url = this.host + "/" + this.namespace + "/credit-card";
        Ember.Logger.debug('  creditCard adapter, url = ' + url);
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
        data = data.creditCard; //Customization here.  Only send the sale data.  Not the wrapped sale.
        Ember.Logger.debug("  data = " + JSON.stringify(data));
        return this.ajax(this.buildURL(type.typeKey), "POST", { data: data });
    }
});

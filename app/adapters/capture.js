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
        Ember.Logger.debug('Capture adapter information:');
        var url = this.host + "/" + this.namespace + "/authorization/" + id + "/" + type;
        Ember.Logger.debug('  Capture adapter, url = ' + url);
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
        var authorizationId = record.get('authorizationId');
        var data = {};
        var serializer = store.serializerFor(type.typeKey);
        serializer.serializeIntoHash(data, type, record, { includeId: true });
        data = data.capture; //Customization here.  Only send the payment.  Not the wrapped payment.
        return this.ajax(this.buildURL(type.typeKey, authorizationId), "POST", { data: data });
    }
});

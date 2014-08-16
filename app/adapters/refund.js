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
        Ember.Logger.debug('refund adapter information:');
        //Ember.Logger.debug('  type: ' + type);
        //Ember.Logger.debug('  id: ' + id);
        var url = this.host + "/" + this.namespace + "/sale/" + id + "/refund";
        Ember.Logger.debug('  refund adapter, url = ' + url);
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
        Ember.Logger.debug('refund adapter createRecord information:');
        //Ember.Logger.debug('  type = ' + type);
        //Ember.Logger.debug('  record = ' + JSON.stringify(record));
        var data = {};
        var serializer = store.serializerFor(type.typeKey);
        serializer.serializeIntoHash(data, type, record, { includeId: true });
        data = data.refund; //Customization here.  Only send the sale data.  Not the wrapped sale.
        var transactionId = data.amount.transactionId;
        delete data.amount.transactionId;
        return this.ajax(this.buildURL(type.typeKey, transactionId), "POST", { data: data });
    }
});

import DS from 'ember-data';
import Ember from 'ember';
import ApplicationAdapter from 'paypal/adapters/application';

export default ApplicationAdapter.extend({
    host: 'https://api.sandbox.paypal.com',
    namespace: 'v1/payments',

    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer A015KCIN6J0SVwSDMgsypTB7dVXMg1pDI2eRBHBHbDwMcno"
    },

    /**
     * Build the url.  Good place to log out what is using in url creation.
     * @param type
     * @param id
     * @returns {*}
     */
    buildURL: function(type, id) {
        Ember.Logger.debug('refund adapter information:');
        Ember.Logger.debug('  type: ' + type);
        Ember.Logger.debug('  id: ' + id);

        var url = this.host + "/" + this.namespace + "/sale/" + id + "/refund";
        Ember.Logger.debug('  refund adapter, url = ' + url);

        return url;
    },
    /**
     * Override to customize the type for the url.  Ember pluralizes by default.  Paypal doesn't want the pluralization
     * here is where we change that.
     *
     * @param type
     * @returns {*}
     */
    pathForType: function(type) {
        //I've commented out the pluralization below.
        //var decamelized = Ember.String.decamelize(type);
        //return Ember.String.pluralize(decamelized);
        return type;
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
        Ember.Logger.debug('  type = ' + type);
        Ember.Logger.debug('  record = ' + JSON.stringify(record));
        var data = {};
        var serializer = store.serializerFor(type.typeKey);
        serializer.serializeIntoHash(data, type, record, { includeId: true });
        data = data.refund; //Customization here.  Only send the sale data.  Not the wrapped sale.
        var transactionId = data.amount.transactionId;
        delete data.amount.transactionId;
        return this.ajax(this.buildURL(type.typeKey, transactionId), "POST", { data: data });
    }
});
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
    buildURL: function(type, id) {
        //GET /v1/payments/refund/{transactionId}
        Ember.Logger.debug('creditCard adapter information:');
        var url = this._super(type, id);
        Ember.Logger.debug('  lookupRefund adapter, url = ' + url);
        return url;
    },

    /* old buildUrl
    buildURL: function() {
        Ember.Logger.debug('creditCard adapter information:');
        var url = this.host + "/" + this.namespace + "/credit-card";
        Ember.Logger.debug('  creditCard adapter, url = ' + url);
        return url;
    },
    */
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
        data = data.creditCard; //Customization here.  Only send the card data.  Not the wrapped card.
        //Ember.Logger.debug("  data = " + JSON.stringify(data));
        return this.ajax(this.buildURL('credit-card'), "POST", { data: data });
    },

    /**
     * I could never get paypal's update credit card to to work.  Somethings wrong with their api.
     *
     * @param store
     * @param type
     * @param record
     * @returns {*}
     */
    updateRecord: function(store, type, record) {
        Ember.Logger.debug("OVERRIDDEN updateRecord called!");

        var data = {};
        var id = record.get('id');
        delete record.id;
        var serializer = store.serializerFor(type.typeKey);
        serializer.serializeIntoHash(data, type, record);

        var value = data.creditCard; //Customization here.  Only send the card data.  Not the wrapped card.
        data = {};
        data.op = "replace";
        data.value = {};
        data.value.expire_month = value.expire_month;
        data.value.expire_year = value.expire_year;

        //Ember.Logger.debug("  data = " + JSON.stringify(data));
        //Ember.Logger.debug("  id = " + id);

        return this.ajax(this.buildURL('credit-cards', id), "PATCH", { data: data });
    }

});

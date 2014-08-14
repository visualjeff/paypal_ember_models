import DS from 'ember-data';
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
        Ember.Logger.debug('Payment adapter information:');
        var url = this._super(type, id);
        Ember.Logger.debug('  Payment adapter, url = ' + url);
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
        data = data.payment; //Customization here.  Only send the payment.  Not the wrapped payment.
        return this.ajax(this.buildURL(type.typeKey), "POST", { data: data });
    }

});

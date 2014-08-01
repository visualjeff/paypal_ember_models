import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
    host: 'https://api.sandbox.paypal.com',
    namespace: 'v1/payments',

    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer A015SLT7hVLQA20hm9ciyBPXxkQKliqQo2atxMCvmSZXwas"
    },

    /**
     * Build the url.  Good place to log out what is using in url creation.
     * @param type
     * @param id
     * @returns {*}
     */
    buildURL: function(type, id) {
        Ember.Logger.debug('Paypal adapter information:');
        Ember.Logger.debug('  Paypal adapter, type = ' + type);
        Ember.Logger.debug('  Paypal adapter, id = ' + id);
        var url = this._super(type, id);
        Ember.Logger.debug('  Paypal adapter, url = ' + url);
        return url;
    },
    /**
     * Customize type for the url.  Ember pluralizes.  Paypal doesn't want the pluralization
     * here is where we change that.
     *
     * @param type
     * @returns {*}
     */
    pathForType: function(type) {
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
        var data = {};
        var serializer = store.serializerFor(type.typeKey);

        serializer.serializeIntoHash(data, type, record, { includeId: true });

        data = data.payment; //Customization here

        return this.ajax(this.buildURL(type.typeKey), "POST", { data: data });
    }
});

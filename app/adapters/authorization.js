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
        Ember.Logger.debug('Authorization adapter information:');
        var url = this._super(type, id);
        Ember.Logger.debug('  Authorization adapter, url = ' + url);
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
        var data = {};
        var serializer = store.serializerFor(type.typeKey);
        serializer.serializeIntoHash(data, type, record, { includeId: true });
        data = data.authorization; //Customization here.  Only send the payment.  Not the wrapped payment.
        //return this.ajax(this.buildURL(type.typeKey), "POST", { data: data });
        return this.ajax(this.buildURL('payment'), "POST", { data: data });
    }
});

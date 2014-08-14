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
        //GET /v1/payments/sale/{transactionId}
        Ember.Logger.debug('lookupSale adapter information:');
        var url = this._super(type, id);
        Ember.Logger.debug('  lookupSale adapter, url = ' + url);
        return url;
    },
    find: function(store, type, id) {
        Ember.Logger.debug('lookupSale adapter find information:');
        return this.ajax(this.buildURL('sale', id), 'GET');
    }
});

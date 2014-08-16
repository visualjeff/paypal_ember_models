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
        //GET /v1/payments/refund/{transactionId}
        Ember.Logger.debug('lookupRefund adapter information:');
        var url = this._super(type, id);
        Ember.Logger.debug('  lookupRefund adapter, url = ' + url);
        return url;
    },
    find: function(store, type, id) {
        Ember.Logger.debug('lookupRefund adapter find information:');
        return this.ajax(this.buildURL('refund', id), 'GET');
    }
});

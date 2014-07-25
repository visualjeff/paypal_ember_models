import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
    host: 'https://api.sandbox.paypal.com',
    namespace: 'v1/payments',

    buildURL: function(type, id) {
        Ember.Logger.debug('Paypal adapter information:');
        Ember.Logger.debug('  Paypal adapter, type = ' + type);
        Ember.Logger.debug('  Paypal adapter, id = ' + id);
        var url = this._super(type, id);
        Ember.Logger.debug('  Paypal adapter, url = ' + url);
        return url;
    }
});

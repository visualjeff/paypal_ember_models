import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'https://api.sandbox.paypal.com',
    namespace: 'v1/payments',

    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer A015KFHGw-etj7DCuIU0RPfxkRlRCQWAfzSLqMVLQr0Gfqo"
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
});

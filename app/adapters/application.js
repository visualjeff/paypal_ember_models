import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'https://api.sandbox.paypal.com',
    namespace: 'v1/payments',

    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer A015mBjbi5EQiPvVIE1KjTelJHNI4P5Aelpvsf7qp.31O24"
    },

    /**
     * Override to customize the type for the url.  Ember pluralizes by default.  Paypal doesn't want the pluralization
     * here is where we change that.
     *
     * @param type
     * @returns {*}
     */
    pathForType: function(type) {
        return type;
    }
});

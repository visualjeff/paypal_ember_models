import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'https://api.sandbox.paypal.com',
    namespace: 'v1/payments',

    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer A015KCIN6J0SVwSDMgsypTB7dVXMg1pDI2eRBHBHbDwMcno"
    }
});

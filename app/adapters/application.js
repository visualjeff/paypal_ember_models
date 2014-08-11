import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'https://api.sandbox.paypal.com',
    namespace: 'v1/payments',

    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer A015iH7XWumL0PYisus4ULYTfXDsbmfL3LgfQ9pKYz9K2UU"
    }
});

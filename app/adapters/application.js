import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    headers: {
        //"API_KEY": "secret key",
        //"ANOTHER_HEADER": "Some header value"
    }
});

import Ember from 'ember';
import ApplicationSerializer from 'paypal/serializers/application';

export default ApplicationSerializer.extend({
    /**
     * To tweak the data your sending to the paypal.
     * @param record
     * @param options
     * @returns {*}
     */
    serialize: function(record) {
        Ember.Logger.debug('creditCard serialize invoked!');
        //Ember.Logger.debug('  record = ' + JSON.stringify(record));
        var serializedPayload = {
            "payer_id": record.get('payerId'),
            "type": record.get('type'),
            "number": record.get('number'),
            "expire_month": record.get('expireMonth'),
            "expire_year": record.get('expireYear'),
            "first_name": record.get('firstName'),
            "last_name": record.get('lastName')
        };
        return serializedPayload;
    },
    normalizePayload: function(payload) {
        Ember.Logger.debug('creditCard normalizePayload invoked!');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));

        var normalizedPayload = {
            creditCard: {
                id: payload.id,
                validUntil: payload.valid_until,
                status: payload.state,
                payerId: payload.payer_id,
                type: payload.type,
                number: payload.number,
                expireMonth: payload.expire_month,
                expireYear: payload.expire_year,
                "firstName": payload.first_name,
                "lastName": payload.last_name
            }
        };
        return this._super(normalizedPayload);
    }
});

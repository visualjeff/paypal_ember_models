import DS from 'ember-data';
import Ember from 'ember';

/**
 * Top level serializer for paypal payment
 *
 * NOTE: .decamelize() was added to the keys.  Paypal doesn't accept camelized keys.
 */
export default DS.RESTSerializer.extend({
    primaryKey: 'id',

    /**
     * Remove any Meta if its necessary.
     * @param store
     * @param type
     * @param payload
     */
    extractMeta: function(store, type, payload) {
        Ember.Logger.debug('payment extractMeta invoked!');
    },

    /**
     * To tweak the data your sending to the paypal.
     * @param record
     * @param options
     * @returns {*}
     */
    serialize: function(record, options) {
        Ember.Logger.debug('payment serialize invoked!');
        var json = this._super(record, options);

        //Remove my store's id for payment.  Don't want to send it to paypal.
        delete json.id;

        //Ember.Logger.debug('----------------------------------------');
        //Ember.Logger.debug('  payment json = ' + JSON.stringify(json));
        //Ember.Logger.debug('----------------------------------------');
        return json;
    },
    /*
     serializeAttribute: function(record, json, key, attributes) {
        json.attributes = json.attributes || {};
        this._super(record, json.attributes, key, attributes);
     },
     */
    /**
     * To resolve belongsTo relationships.
     * @param record
     * @param json
     * @param relationship
     */
    serializeBelongsTo: function(record, json, relationship) {
        //Ember.Logger.debug('payment serializeBelongsTo invoked!');
        var key = relationship.key,
            property = Ember.get(record, key),
            relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);
        //Ember.Logger.debug('  key = ' + key);
        //Ember.Logger.debug('  property = ' + property);
        //Ember.Logger.debug('  relationshipType = ' + relationshipType);
        if (property && relationshipType === 'belongsTo' || relationshipType === 'oneToNone') {
            json[key.decamelize()] = Ember.isNone(property) ? property : property.serialize();
        } else {
            json[key.decamelize()] = Ember.isNone(property) ? property : property.toJSON();
        }
    },

    /**
     * To resolve hasMany relationships
     * @param record
     * @param json
     * @param relationship
     */
    serializeHasMany: function(record, json, relationship) {
        //Ember.Logger.debug('payment serializeHasMany invoked!');
        var key = relationship.key,
            property = Ember.get(record, key),
            relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);
        //Ember.Logger.debug('  key = ' + key);
        //Ember.Logger.debug('  property = ' + property);
        //Ember.Logger.debug('  relationshipType = ' + relationshipType);
        if (property && relationshipType === 'manyToNone' || relationshipType === 'manyToMany' ||
            relationshipType === 'manyToOne') {
            // Add each serialized nested object
            json[key.decamelize()] = [];
            property.forEach(function(item, index){
                json[key.decamelize()].push(item.serialize());
            });
        }
    },
    /**
     * To augment attribute keys.
     * @param attr
     * @returns {String|*}
     */
    keyForAttribute: function(attr) {
        return attr.decamelize();
    },

    extract: function(store, type, payload, id, requestType) {
        Ember.Logger.debug('payment extract invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        Ember.Logger.debug('  id = ' + JSON.stringify(id));
        Ember.Logger.debug('  requestType = ' + JSON.stringify(requestType));

        this.extractMeta(store, type, payload);
        /*
        store.find("payment", id).then(function(payment) {
            payment.set("paypalId", record.id);
            payment.set("createTime", record.create_time);
            payment.set("updateTime", record.update_time);
            payment.set("state", record.state);
        });
        */

        var specificExtract = "extract" + requestType.charAt(0).toUpperCase() + requestType.substr(1);
        return this[specificExtract](store, type, payload, id, requestType);
    },


    normalizePayload: function(payload) {
        Ember.Logger.debug('payment normalizePayload invoked!');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        Ember.Logger.debug('======================================');

        var normalizedPayload = {
            "id": payload.id,
            "createTime": payload.create_time,
            "updateTime": payload.update_time,
            "state": payload.state,
            "intent": payload.intent,
            "payer":{
                "paymentMethod": payload.payer.payment_method,
                "fundingInstruments":[]
            },
            transactions: []
        };

        payload.payer.funding_instruments.forEach(function(instrument) {
            var normalizedInstrument = {
                creditCard: {
                    "credit_card": {
                        "type": instrument.credit_card.type,
                        "number": instrument.credit_card.number,
                        "expireMonth": instrument.credit_card.expire_month,
                        "expireYear": instrument.credit_card.expire_year,
                        "firstName": instrument.credit_card.first_name,
                        "lastName": instrument.credit_card.last_name,
                        "billing_address": {
                            "line1": instrument.credit_card.billing_address.line1,
                            "city": instrument.credit_card.billing_address.city,
                            "state": instrument.credit_card.billing_address.state,
                            "postalCode": instrument.credit_card.billing_address.postal_code,
                            "countryCode": instrument.credit_card.billing_address.country_code
                        }
                    }
                }
            }
            normalizedPayload.payer.fundingInstruments.push(normalizedInstrument);
        });

        payload.transactions.forEach(function(transaction) {
            var normalizedTransaction = {
                amount: {
                    total: transaction.amount.total,
                    currency: transaction.amount.currency,
                    details: {
                        subtotal: transaction.amount.details.subtotal,
                        tax: transaction.amount.details.tax,
                        shipping: transaction.amount.details.shipping
                    }
                },
                description: transaction.description
            }
            normalizedPayload.transactions.push(normalizedTransaction);
        });

        Ember.Logger.debug('======================================');
        Ember.Logger.debug('  normalizedPayload = ' + JSON.stringify(normalizedPayload));
        Ember.Logger.debug('======================================');
        return normalizedPayload;
    }
});

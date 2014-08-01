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
        Ember.Logger.debug('----------------------------------------');
        Ember.Logger.debug('  payment json = ' + JSON.stringify(json));
        Ember.Logger.debug('----------------------------------------');
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
        Ember.Logger.debug('payment serializeBelongsTo invoked!');
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
        Ember.Logger.debug('payment serializeHasMany invoked!');
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
        Ember.Logger.debug('payment keyForAttribute invoked!');
        Ember.Logger.debug('  attr = ' + JSON.stringify(attr));
        return Ember.String.decamelize(attr);
    },

    /**
     * Underscores relationship names and appends "_id" or "_ids" when serializing relationship keys.
     * @param key
     * @param kind
     * @returns {*}
     */
    keyForRelationship: function(key, kind) {
        Ember.Logger.debug('payment keyForAttribute invoked!');
        Ember.Logger.debug('  key = ' + JSON.stringify(key));
        Ember.Logger.debug('  kind = ' + JSON.stringify(kind));
        key = Ember.String.decamelize(key);
        if (kind === "belongsTo") {
            return key + "_id";
        } else if (kind === "hasMany") {
            return Ember.Inflector.inflector.singularize(key) + "_ids";
        } else {
            return key;
        }
    },

    extract: function(store, type, payload, id, requestType) {
        Ember.Logger.debug('payment extract invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        Ember.Logger.debug('  id = ' + JSON.stringify(id));
        Ember.Logger.debug('  requestType = ' + JSON.stringify(requestType));

        return this._super(store, type, payload, id, requestType);
    },

    extractSingle: function(store, type, payload) {
        Ember.Logger.debug('payment extracSingle invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));

        //Let's wrap our payload from Paypal
        var payload = { "payment": payload };

        return this._super(store, type, payload);
    },

    extractArray: function(store, type, arrayPayload) {
        Ember.Logger.debug('payment extracSingle invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  payload = ' + JSON.stringify(arrayPayload));
        return this._super(store, type, arrayPayload);
    },

    normalize: function(type, hash, prop) {
        Ember.Logger.debug('payment normalize invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  hash = ' + JSON.stringify(hash));
        Ember.Logger.debug('  prop = ' + JSON.stringify(prop));
        return this._super(type, hash, prop);
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('payment normalizePayload invoked!');
        Ember.Logger.debug('=================================');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        Ember.Logger.debug('=================================');

        var normalizedPayload = {
            "payment": {
                "id": payload.payment.id,
                //"createTime": payload.payment.create_time,
                //"updateTime": payload.payment.update_time,
                //"state": payload.payment.state,
                "intent": payload.payment.intent,
                "payer": {
                    "id": 1,
                    "paymentMethod": payload.payment.payer.payment_method,
                    "fundingInstruments": []
                },
                "transactions": []
            }
        };
        payload.payment.payer.funding_instruments.forEach(function(instrument) {
            var normalizedInstrument = {
                "fundingInstrument": {
                    "id": 1,
                    "creditCard": {
                        "id": 1,
                        "type": instrument.credit_card.type,
                        "number": instrument.credit_card.number,
                        "expireMonth": instrument.credit_card.expire_month,
                        "expireYear": instrument.credit_card.expire_year,
                        "firstName": instrument.credit_card.first_name,
                        "lastName": instrument.credit_card.last_name,
                        "billingAddress": {
                            "id": 1,
                            "line1": instrument.credit_card.billing_address.line1,
                            "city": instrument.credit_card.billing_address.city,
                            "state": instrument.credit_card.billing_address.state,
                            "postalCode": instrument.credit_card.billing_address.postal_code,
                            "countryCode": instrument.credit_card.billing_address.country_code
                        }
                    }
                }
            }
            normalizedPayload.payment.payer.fundingInstruments.push(normalizedInstrument);
        });

        payload.payment.transactions.forEach(function(transaction) {
            var normalizedTransaction = {
                "transaction": {
                    "id": 1,
                    "amount": {
                        id: 1,
                        "total": transaction.amount.total,
                        "currency": transaction.amount.currency,
                        "details": {
                            id: 1,
                            "subtotal": transaction.amount.details.subtotal,
                            "tax": transaction.amount.details.tax,
                            "shipping": transaction.amount.details.shipping
                        }
                    },
                    "description": transaction.description
                }
            }
            normalizedPayload.payment.transactions.push(normalizedTransaction);
        });

        Ember.Logger.debug('=================================');
        Ember.Logger.debug('  normalizedPayload = ' + JSON.stringify(normalizedPayload));
        Ember.Logger.debug('=================================');

        return this._super(normalizedPayload);
    },

    normalizeId: function(hash) {
        Ember.Logger.debug('payment normalizeId invoked!');
        return this._super(hash);
    },

    normalizeAttributes: function(type, hash) {
        Ember.Logger.debug('payment normalizeAttributes invoked!');
        return this._super(type, hash);
    },

    normalizeRelationships: function(type, hash) {
        Ember.Logger.debug('payment normalizeRelationships invoked!');
        return this._super(type, hash);
    },

    normalizeUsingDeclaredMapping: function(type, hash) {
        Ember.Logger.debug('payment normalizeUsingDeclaredMapping invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  hash = ' + JSON.stringify(hash))
        return this._super(type, hash);
    },

    applyTransforms: function(type, data) {
        Ember.Logger.debug('payment applyTransforms invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  data = ' + JSON.stringify(data))
        return this._super(type, data);
    }


    /*
    normalizePayload: function(payload) {
        Ember.Logger.debug('payment normalizePayload invoked!');
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        Ember.Logger.debug('======================================');
        var normalizedPayload = {
            "payment": {
                "id": payload.id,
                //"id": payload.id,
                //"createTime": payload.create_time,
                //"updateTime": payload.update_time,
                //"state": payload.state,
                "intent": payload.intent,
                //"payer": {
                    //"id": payload.id
                    //"paymentMethod": payload.payer.payment_method,
                    //"fundingInstruments": []
                //},
                "transactions": []
            }
        };
        /*
        payload.payer.funding_instruments.forEach(function(instrument) {
            var normalizedInstrument = {
                fundingInstrument: {
                    "creditCard": {
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
            normalizedPayload.payment.payer.fundingInstruments.push(normalizedInstrument);
        });


        payload.transactions.forEach(function(transaction) {
            var normalizedTransaction = {
                transaction: {
                    //"amount": {
                    //    "total": transaction.amount.total,
                    //    "currency": transaction.amount.currency,
                    //    "details": {
                    //        "subtotal": transaction.amount.details.subtotal,
                    //        "tax": transaction.amount.details.tax,
                    //        "shipping": transaction.amount.details.shipping
                    //    }
                    //},
                    //"description": transaction.description
                }
            }
            normalizedPayload.payment.transactions.push(normalizedTransaction);
        });

        Ember.Logger.debug('======================================');
        Ember.Logger.debug('  normalizedPayload = ' + JSON.stringify(normalizedPayload));
        Ember.Logger.debug('======================================');
        return normalizedPayload;
    }
    */

});

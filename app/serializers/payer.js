import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
    primaryKey: 'id',

    /**
     * Remove any Meta if its necessary.
     * @param store
     * @param type
     * @param payload
     */
    extractMeta: function(store, type, payload) {
        Ember.Logger.debug('payer extractMeta invoked!');
    },

    //To tweak what your sending to the server
    serialize: function(record, options) {
        Ember.Logger.debug('payer serialize invoked!');
        var json = this._super(record, options);
        //Ember.Logger.debug('  payer json = ' + JSON.stringify(json));
        return json;
    },
    /*
     serializeAttribute: function(record, json, key, attributes) {
        json.attributes = json.attributes || {};
        this._super(record, json.attributes, key, attributes);
     },
     */
    serializeBelongsTo: function(record, json, relationship) {
        Ember.Logger.debug('payer serializeBelongsTo invoked!');
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
    serializeHasMany: function(record, json, relationship) {
        Ember.Logger.debug('payer serializeHasMany invoked!');
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
        Ember.Logger.debug('payer keyForAttribute invoked!');
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
        Ember.Logger.debug('payer keyForAttribute invoked!');
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
        Ember.Logger.debug('payer extract invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        Ember.Logger.debug('  id = ' + JSON.stringify(id));
        Ember.Logger.debug('  requestType = ' + JSON.stringify(requestType));

        return this._super(store, type, payload, id, requestType);
    },

    extractSingle: function(store, type, payload) {
        Ember.Logger.debug('payer extracSingle invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        return this._super(store, type, payload);
    },

    extractArray: function(store, type, arrayPayload) {
        Ember.Logger.debug('payer extracSingle invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  payload = ' + JSON.stringify(arrayPayload));
        return this._super(store, type, arrayPayload);
    },

    normalize: function(type, hash, prop) {
        Ember.Logger.debug('payer normalize invoked!');
        Ember.Logger.debug('  type = ' + JSON.stringify(type));
        Ember.Logger.debug('  hash = ' + JSON.stringify(hash));
        Ember.Logger.debug('  prop = ' + JSON.stringify(prop));
        return this._super(type, hash, prop);
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('payment normalizePayload invoked!');
        return this._super(payload);
    },

    normalizeId: function(hash) {
        Ember.Logger.debug('payer normalizeId invoked!');
        return this._super(hash);
    },

    normalizeAttributes: function(type, hash) {
        Ember.Logger.debug('payer normalizeAttributes invoked!');
        return this._super(type, hash);
    },

    normalizeRelationships: function(type, hash) {
        Ember.Logger.debug('payer normalizeRelationships invoked!');
        return this._super(type, hash);
    },

    normalizeUsingDeclaredMapping: function(type, hash) {
        Ember.Logger.debug('payer normalizeUsingDeclaredMapping invoked!');
        return this._super(type, hash);
    },

    applyTransforms: function(type, data) {
    Ember.Logger.debug('payer applyTransforms invoked!');
    Ember.Logger.debug('  type = ' + JSON.stringify(type));
    Ember.Logger.debug('  data = ' + JSON.stringify(data))
    return this._super(type, data);
}

});

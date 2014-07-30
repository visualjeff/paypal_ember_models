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
        Ember.Logger.debug('fundingInstruments extractMeta invoked!');
    },

    //To tweak what your sending to the server
    serialize: function(record, options) {
        Ember.Logger.debug('fundingInstrument serialize invoked!');
        var json = this._super(record, options);
        //Ember.Logger.debug('  fundingInstrument json = ' + JSON.stringify(json));
        return json;
    },
    /*
     serializeAttribute: function(record, json, key, attributes) {
        json.attributes = json.attributes || {};
        this._super(record, json.attributes, key, attributes);
     },
     */
    serializeBelongsTo: function(record, json, relationship) {
        Ember.Logger.debug('fundingInstrument serializeBelongsTo invoked!');
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
        Ember.Logger.debug('fundingInstrument serializeHasMany invoked!');
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
    keyForAttribute: function(attr) {
        return attr.decamelize();
    },

    extract: function(store, type, payload, id, requestType) {
        Ember.Logger.debug('fundingInstrument extract invoked!');
        //Ember.Logger.debug('  type = ' + JSON.stringify(type));
        //Ember.Logger.debug('  payload = ' + JSON.stringify(payload));
        //Ember.Logger.debug('  id = ' + JSON.stringify(id));
        //Ember.Logger.debug('  requestType = ' + JSON.stringify(requestType));

        this.extractMeta(store, type, payload);

        var specificExtract = "extract" + requestType.charAt(0).toUpperCase() + requestType.substr(1);
        return this[specificExtract](store, type, payload, id, requestType);
    },

    normalizePayload: function(payload) {
        Ember.Logger.debug('fundingInstrument normalizePayload invoked!');
        //Ember.Logger.debug('  payload = ' + JSON.stringify(payload));

        var normalizedPayload = {};



        return normalizedPayload;
    }
});

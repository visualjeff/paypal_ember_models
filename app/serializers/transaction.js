import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
    //To tweak what your sending to the server
    serialize: function(record, options) {
        //Ember.Logger.debug('transaction serialize invoked!');
        var json = this._super(record, options);
        //Ember.Logger.debug('  transaction json = ' + JSON.stringify(json));
        return json;
    },
    /*
     serializeAttribute: function(record, json, key, attributes) {
        json.attributes = json.attributes || {};
        this._super(record, json.attributes, key, attributes);
     },
     */
    serializeBelongsTo: function(record, json, relationship) {
        //Ember.Logger.debug('transaction serializeBelongsTo invoked!');
        var key = relationship.key,
            property = Ember.get(record, key),
            relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);
        //Ember.Logger.debug('  key = ' + key);
        //Ember.Logger.debug('  property = ' + property);
        //Ember.Logger.debug('  relationshipType = ' + relationshipType);
        if (property && relationshipType === 'belongsTo' || relationshipType === 'oneToNone') {
            json[key] = Ember.isNone(property) ? property : property.serialize();
        } else {
            json[key] = Ember.isNone(property) ? property : property.toJSON();
        }
    },
    serializeHasMany: function(record, json, relationship) {
        //Ember.Logger.debug('transaction serializeHasMany invoked!');
        var key = relationship.key,
            property = Ember.get(record, key),
            relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);
        //Ember.Logger.debug('  key = ' + key);
        //Ember.Logger.debug('  property = ' + property);
        //Ember.Logger.debug('  relationshipType = ' + relationshipType);
        if (property && relationshipType === 'manyToNone' || relationshipType === 'manyToMany' ||
            relationshipType === 'manyToOne') {
            // Add each serialized nested object
            json[key] = [];
            property.forEach(function(item, index){
                json[key].push(item.serialize());
            });
        }
    },
    keyForAttribute: function(attr) {
        return attr.decamelize();
    },

    //To tweak what your receiving from the server to match your model
    normalizePayload: function(type, payload) {
        Ember.Logger.debug('transaction normalizePayload invoked!');
        //var normalizedPayload = {

        //};
        //return this._super(type, normalizedPayload);
        return this._super(type, payload);
    }
});

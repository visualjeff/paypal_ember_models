import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
    //To tweak what your sending to the server
    serialize: function(record, options) {
        Ember.Logger.debug('fundingInstrument serialize invoked!');
        var json = this._super(record, options);
        //Ember.Logger.debug('  fundingInstrument json = ' + JSON.stringify(json));
        return json;
    },
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

    //To tweak what your receiving from the server to match your model
    normalizePayload: function(type, payload) {
        Ember.Logger.debug('fundingInstrument normalizePayload invoked!');
        //var normalizedPayload = {
        //    "arrayOfRecords": []
        //};
        //payload.fundinginstruments.forEach(function(record) {
            //var newRecord = {

            //};
            //normalizedPayload.arrayOfRecords.push(newRecord);

        //});
        return this._super(type, payload);
    }
});

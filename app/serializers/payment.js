import DS from 'ember-data';
import Ember from 'ember';

/**
 * Top level serializer for paypal payment
 *
 * NOTE: .decamelize() was added to the keys.  Paypal doesn't accept camelized keys.
 */
export default DS.RESTSerializer.extend({

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

        Ember.Logger.debug('----------------------------------------');
        Ember.Logger.debug('  payment json = ' + JSON.stringify(json));
        Ember.Logger.debug('----------------------------------------');
        return json;
    },

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

    /**
     * To tweak what your receiving from the server to match your model
     * @param type
     * @param payload
     * @returns {*}
     */
    normalizePayload: function(type, payload) {
        Ember.Logger.debug('payment normalizePayload invoked!');
        //var normalizedPayload = {

        //};
        //return this._super(type, normalizedPayload);
        return this._super(type, payload);
    }
});

import DS from 'ember-data';

//Allows object to be normalized as is.   Raw from the payload.
export default DS.Transform.extend({
    deserialize: function(serialized) {
        return serialized;
    },
    serialize: function(deserialized) {
        return deserialized;
    }
});
import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        Ember.Logger.debug("THIS NEVER GETS CALLED?");
    }
});

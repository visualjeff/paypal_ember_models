import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.all('authorization');
    },
    setupController: function(controller, model) {
        controller.set('model', model);
    }
});

import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.all('order');
    },
    setupController: function(controller, model) {
        this._super(controller, model);
    }
});

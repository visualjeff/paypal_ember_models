import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('creditCard', params.id);
    },
    setupController: function(controller, model) {
        if (controller.get('results') !== '') { controller.set('results', ''); }
        this._super(controller, model);
    }
});

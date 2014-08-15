import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('payment', params.id);
    },
    /**
     * Added to reset results fields when the form is reloaded.
     * @param controller
     * @param model
     */
    setupController: function(controller, model) {
        controller.set('results', '');
        this._super(controller, model);
    }
});

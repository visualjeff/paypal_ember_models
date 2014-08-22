import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.Object.create({
            transactionId: ""
        });
    },
    /**
     * Added to reset results fields when the form is reloaded.
     * @param controller
     * @param model
     */
    setupController: function(controller, model) {
        if (controller.get('results') !== '') { controller.set('results', ''); }
        this._super(controller, model);
    }

});

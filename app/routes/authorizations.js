import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var values = this.store.all('authorization');
        values.filter(function(value) {
            if ((value.status !== "completed") && (value.status !== "voided")) {
                    return value;
                }
            });
        return values;
    },
    setupController: function(controller, model) {
        controller.set('model', model);
    }
});

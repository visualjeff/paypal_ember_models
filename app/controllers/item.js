import Ember from 'ember';

export default Ember.ObjectController.extend({
    displayButtons: function() {
        if (this.get('status') === 'approved') {
            return true;
        }
        return false;
    }.property('status'),

    displayButtonsForOrders: function() {
        if (this.get('status') === 'created') {
            return true;
        }
        return false;
    }.property('status')
});

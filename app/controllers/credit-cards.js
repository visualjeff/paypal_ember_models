import Ember from 'ember';

export default Ember.ArrayController.extend({
    itemController: 'card',
    isProcessing: false,
    actions: {
        deleteCard: function(model) {
            this.setProperties({
                isProcessing: true //Set isProcessing true to disable form button
            });

            var card = this.store.getById('creditCard', model.get('id'));
            this.store.deleteRecord(card);
            this.setProperties({
                isProcessing: false
            });
            this.transitionToRoute('paypal');
        }
    }
});

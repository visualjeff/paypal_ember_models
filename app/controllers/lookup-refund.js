import Ember from 'ember';

export default Ember.ObjectController.extend({
    results: "",
    isProcessing: false,
    actions: {
        lookupRefund: function(model){
            this.setProperties({
                isProcessing: true //Set isProcessing true to disable form button
            });

            var self = this;
            self.store.find('lookupRefund', model.get('transactionId')).then(function(refund) {
                self.set('results',  JSON.stringify(refund));
                self.setProperties({
                    isProcessing: false
                });
            });
        }
    }
});

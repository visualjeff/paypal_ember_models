import Ember from 'ember';

export default Ember.ObjectController.extend({
    results: "",
    actions: {
        lookupRefund: function(model){
            var self = this;
            self.store.find('lookupRefund', model.get('transactionId')).then(function(refund) {
                self.set('results',  JSON.stringify(refund));
            });
        }
    }
});

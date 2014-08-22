import Ember from 'ember';

export default Ember.ObjectController.extend({
    results: "",
    isProcessing: false,
    actions: {
        lookupSale: function (model) {
            this.setProperties({
                isProcessing: true //Set isProcessing true to disable form button
            });

            var self = this;
            self.store.find('lookupSale', model.get('transactionId')).then(function(sale) {
                self.set('results',  JSON.stringify(sale));
                self.setProperties({
                    isProcessing: false
                });
            });
        }
    }
});

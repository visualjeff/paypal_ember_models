import Ember from 'ember';

export default Ember.ObjectController.extend({
    results: "",
    actions: {
        lookupSale: function (model) {
            var self = this;
            self.store.find('lookupSale', model.get('transactionId')).then(function(sale) {
                self.set('results',  JSON.stringify(sale));
            });
        }
    }
});

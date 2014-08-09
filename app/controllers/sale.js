import Ember from 'ember';

export default Ember.ObjectController.extend({
    results: "",
    actions: {
        refund: function (model) {
            var self = this;
            var onSuccess = function (model) {
                Ember.Logger.debug("Success!");
                self.set('results', JSON.stringify(model));
                //after success force an update for the original sale.
                self.store.find('sale', model.get('saleId')).then(function(model){
                  model.reload();
                });
                //self.transitionToRoute('index');
            };
            var onFail = function (model) {
                retry(function () {
                    Ember.Logger.debug("Retry invoked!");
                    return model.save();
                }, 3); //NOTE: Retry could be bumped up to 3 or 5 times.
            };

            var retry = function (callback, nTimes) {
                try {
                    return callback();
                } catch (reason) {
                    if (nTimes-- > 0) {
                        return retry(callback, nTimes);
                    }
                    throw reason;
                }
            };

            var refund = this.store.createRecord('refund', {
                "transactionId": model.get('id'),
                "total": model.get('total'),
                "currency": model.get('currency')
            });
            refund.save().then(onSuccess, onFail);
        }
    }
});

import Ember from 'ember';

export default Ember.ObjectController.extend({
    results: "",
    isProcessing: false,
    actions: {
        createPlan: function (model) {
            this.setProperties({
                isProcessing: true //Set isProcessing true to disable form button
            });

            var self = this;
            var onSuccess = function (model) {
                Ember.Logger.debug("Success!");
                self.set('results', JSON.stringify(model));
                self.setProperties({
                    isProcessing: false
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
                    self.setProperties({
                        isProcessing: false
                    });
                    throw reason;
                }
            };
            model.save().then(onSuccess, onFail);
        }
    }
});

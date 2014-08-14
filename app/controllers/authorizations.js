import Ember from 'ember';

export default Ember.ArrayController.extend({
    //itemController: 'capture'
    actions: {
        capture: function (model) {
            var self = this;
            var aid = model.get('id');
            var onSuccess = function (model) {
                Ember.Logger.debug("Success!");
                //Ember.Logger.debug('  success results = ' + JSON.stringify(model));

                //after success update authorization status.
                var authorization = self.store.getById('authorization', aid);
                authorization.set('status', model.get('status'));
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

            var capture = this.store.createRecord('capture', {
                "authorizationId": model.get('authorizationId'),
                "total": model.get('total'),
                "currency": model.get('currency'),
                "is_final_capture": true
            });
            capture.save().then(onSuccess, onFail);
        }
    }
});

import Ember from 'ember';

export default Ember.ArrayController.extend({
    itemController: 'item',
    isProcessing: false,
    actions: {
        voidAuthorization: function(model) {
            this.setProperties({
                isProcessing: true //Set isProcessing true to disable form button
            });

            var self = this;
            var aid = model.get('id');
            var onSuccess = function (model) {
                Ember.Logger.debug("Success!");
                Ember.Logger.debug('  void success results = ' + JSON.stringify(model));

                //after success update authorization status.
                var authorization = self.store.getById('authorization', aid);
                authorization.set('status', model.get('status'));
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
            var voidAuthorization = this.store.createRecord('void', {
                authorizationId: model.get('authorizationId'),
                total: model.get('total'),
                currency: model.get('currency'),
                isFinalCapture: true
            });
            voidAuthorization.save().then(onSuccess, onFail);
        },
        capture: function (model) {
            this.setProperties({
                isProcessing: true //Set isProcessing true to disable form button
            });

            var self = this;
            var aid = model.get('id');
            var onSuccess = function (model) {
                Ember.Logger.debug("Success!");
                Ember.Logger.debug('  capture success results = ' + JSON.stringify(model));

                //after success update authorization status.
                var authorization = self.store.getById('authorization', aid);
                authorization.set('status', model.get('status'));
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
            var capture = this.store.createRecord('capture', {
                authorizationId: model.get('authorizationId'),
                total: model.get('total'),
                currency: model.get('currency'),
                isFinalCapture: true
            });
            capture.save().then(onSuccess, onFail);
        }
    }
});

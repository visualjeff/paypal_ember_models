import Ember from 'ember';
/* global moment */
// No import for moment, it's a global called `moment`

export default Ember.ObjectController.extend({
    results: "",
    isProcessing: false,
    formattedValidUntil: function() {
        return moment(this.get('validUntil')).format('MMMM Do YYYY');
    }.property('validUntil'),

    actions: {
        /* I could never get paypals update credit card api to work.  Something is wrong with it. */
        updateCard: function(model) {
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

            this.store.find('creditCard', model.get('id')).then(function(card) {
                if (card.get('expireMonth') !== model.get('expireMonth')) { card.set('expireMonth', model.get('expireMonth')); }
                if (card.get('expireYear') !== model.get('expireYear')) { card.set('expireYear', model.get('expireYear')); }
                card.save().then(onSuccess, onFail);
            });
        }
    }
});

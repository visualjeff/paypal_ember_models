import Ember from 'ember';

export default Ember.ObjectController.extend({
    actions: {
        payment: function () {
            var self = this;
            var onSuccess = function (model) {
                Ember.Logger.debug("Success!");
                self.transitionToRoute('index');
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

            var payment = this.store.createRecord('payment', {
                "intent": "sale",
                "paymentMethod": "credit_card",
                "number": "4417119669820331",
                "type": "visa",
                "expireMonth": 11,
                "expireYear": 2018,
                "cvv2": "874",
                "firstName": "Betsy",
                "lastName": "Buyer",
                "address": "111 First Street",
                "city": "Saratoga",
                "state": "CA",
                "postalCode": "95070",
                "countryCode": "US",
                "total": "7.47",
                "currency": "USD",
                "subtotal": "7.41",
                "tax": "0.03",
                "shipping": "0.03",
                "description": "This is the payment transaction description."
            });
            payment.save().then(onSuccess, onFail);
        }
    }
});

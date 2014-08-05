import Ember from 'ember';

export default Ember.ObjectController.extend({
    results: "",

    actions: {
        payment: function (model) {
            var self = this;
            var onSuccess = function (model) {
                Ember.Logger.debug("Success!");
                self.set('results', JSON.stringify(model));
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

            var payment = this.store.createRecord('payment', {
                "intent": model.get('intent'),
                "paymentMethod": model.get('paymentMethod'),
                "number": model.get('number'),
                "type": model.get('type'),
                "expireMonth": model.get('expireMonth'),
                "expireYear": model.get('expireYear'),
                "cvv2": model.get('cvv2'),
                "firstName": model.get('firstName'),
                "lastName": model.get('lastName'),
                "address": model.get('address'),
                "city": model.get('city'),
                "state": model.get('state'),
                "postalCode": model.get('postalCode'),
                "countryCode": model.get('countryCode'),
                "total": model.get('total'),
                "currency": model.get('currency'),
                "subtotal": model.get('subtotal'),
                "tax": model.get('tax'),
                "shipping": model.get('shipping'),
                "description": model.get('description')
            });
            payment.save().then(onSuccess, onFail);
        }
    }
});

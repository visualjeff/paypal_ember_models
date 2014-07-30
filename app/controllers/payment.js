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
                }, 0); //NOTE: Retry could be bumped up to 3 or 5 times.
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
                "intent": "sale"
            });

                payment.set('payer', self.store.createRecord('payer', {
                    "paymentMethod": "credit_card"
                }));
                payment.get('payer').get('fundingInstruments').addObject(self.store.createRecord('fundingInstrument',
                    {
                        "creditCard": self.store.createRecord('creditCard', {
                            "number": "4417119669820331",
                            "type": "visa",
                            "expireMonth": 11,
                            "expireYear": 2018,
                            "cvv2": "874",
                            "firstName": "Betsy",
                            "lastName": "Buyer",
                            "billingAddress": self.store.createRecord('billingAddress', {
                                "line1": "111 First Street",
                                "city": "Saratoga",
                                "state": "CA",
                                "postalCode": "95070",
                                "countryCode": "US"
                            })
                        })
                }
            ));
                payment.get('transactions').addObject(self.store.createRecord('transaction',
                    {
                        "amount": self.store.createRecord('amount', {
                            "total": "7.47",
                            "currency": "USD",
                            "details": self.store.createRecord('detail', {
                                "subtotal": "7.41",
                                "tax": "0.03",
                                "shipping": "0.03"
                            })
                        }),
                        "description": "This is the payment transaction description."
                    }
                ));
            payment.save().then(onSuccess);

        }
    }
});

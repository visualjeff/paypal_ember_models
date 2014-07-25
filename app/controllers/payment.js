import Ember from 'ember';

export default Ember.ObjectController.extend({
    actions: {
        payment: function () {
            var self = this;
            var onSuccess = function (model) {
                self.transitionToRoute('index');
            };
            var onFail = function (model) {
                retry(function () {
                    return model.save();
                }, 5);
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

            this.store.createRecord('payment', {
                "id": 1,
                "intent": "sale"
            });

            this.store.find('payment', 1).then(function(record){
                record.set('payer', self.store.createRecord('payer', {
                    "id": 1,
                    "paymentMethod":"credit_card"
                }));
                record.get('payer').get('fundingInstruments').addObject(self.store.createRecord('creditCard', {
                    "id": 1,
                    "number": "4417119669820331",
                    "type": "visa",
                    "expireMonth": 11,
                    "expireYear": 2018,
                    "cvv2": "874",
                    "firstName": "Betsy",
                    "lastName": "Buyer",
                    "billingAddress": self.store.createRecord('billingAddress', {
                        "id": 1,
                        "line1": "111 First Street",
                        "city": "Saratoga",
                        "state": "CA",
                        "postalCode": "95070",
                        "countryCode": "US"
                    })
                }));
                record.get('transactions').addObject(self.store.createRecord('transaction',
                    {   "id": 1,
                        "amount": self.store.createRecord('amount', {
                            id: 1,
                            "total": "7.47",
                            "currency": "USD",
                            "details": self.store.createRecord('detail', {
                                id: 1,
                                "subtotal": "7.41",
                                "tax": "0.03",
                                "shipping": "0.03"
                            })
                        }),
                        "description": "This is the payment transaction description."
                    }
                ));
            record.save();
            });
        }
    }
});

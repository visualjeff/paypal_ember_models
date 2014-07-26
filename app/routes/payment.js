import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.Object.create({
            "intent": "sale",
            "payer":{
                "payment_method":"credit_card",
                "funding_instruments":[
                    {
                        "credit_card":{
                            "number":"4417119669820331",
                            "type":"visa",
                            "expire_month":11,
                            "expire_year":2018,
                            "cvv2":"874",
                            "first_name":"Betsy",
                            "last_name":"Buyer",
                            "billing_address":{
                                "line1":"111 First Street",
                                "city":"Saratoga",
                                "state":"CA",
                                "postal_code":"95070",
                                "country_code":"US"
                            }
                        }
                    }
                ]
            },
            "transactions":[
                {
                    "amount":{
                        "total":"7.47",
                        "currency":"USD",
                        "details":{
                            "subtotal":"7.41",
                            "tax":"0.03",
                            "shipping":"0.03"
                        }
                    },
                    "description":"This is the payment transaction description."
                }
            ]
        });
    }
});

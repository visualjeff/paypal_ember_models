import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.createRecord('authorization', {
            intent: "authorize",
            paymentMethod: "credit_card",
            number: "4417119669820331",
            type: "visa",
            expireMonth: 11,
            expireYear: 2018,
            cvv2: "874",
            firstName: "Betsy",
            lastName: "Buyer",
            address: "111 First Street",
            city: "Saratoga",
            state: "CA",
            postalCode: "95070",
            countryCode: "US",
            total: "7.47",
            currency: "USD",
            subtotal: "7.41",
            tax: "0.03",
            shipping: "0.03",
            description: "This is the payment transaction description."
        });
    },
    /**
     * Added to reset results fields when the form is reloaded.
     * @param controller
     * @param model
     */
    setupController: function(controller, model) {
        if (controller.get('results') !== '') { controller.set('results', ''); }
        this._super(controller, model);
    }
});


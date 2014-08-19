import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var order = this.store.createRecord('order', {
            intent: "order",
            paymentMethod: "paypal",
            currency: "USD",
            total: "41.15",
            shipping: "11",
            subtotal: "30",
            tax: "0.15",
            email: "visualjeff-facilitator@icloud.com",
            description: "These t-shirts are not currently in stock, but will ship separately as they become available.",
            recipientName: "Betsy Buyer",
            line1: "111 First Street",
            city: "Saratoga",
            countryCode: "US",
            postalCode: "95070",
            phone: "011862212345678",
            state: "CA",
            items: [
                {
                    name: "Rock Band Shirt",
                    quantity: "5",
                    price: "3",
                    sku: "1",
                    currency: "USD"
                },
                {
                    name: "Sports Shirt",
                    quantity: "1",
                    price: "15",
                    sku: "product34",
                    currency: "USD"
                }
            ]
        });
        return order;
    }
});
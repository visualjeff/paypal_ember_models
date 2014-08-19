import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        var creditCard = this.store.createRecord('creditCard', {
            "payerId": "user12345",
            "type": "visa",
            "number": "4417119669820331",
            "expireMonth": "11",
            "expireYear": "2018",
            "firstName": "Betsy",
            "lastName": "Buyer"
        });
        return creditCard;
    }
});

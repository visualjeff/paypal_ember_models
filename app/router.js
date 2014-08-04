import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PaypalENV.locationType
});

Router.map(function() {
  this.route('paypal');
  this.route('payment');
  this.route('sale', { path: '/sale/:id' } );
});

export default Router;

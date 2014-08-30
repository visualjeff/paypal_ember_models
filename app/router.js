import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PaypalENV.locationType
});

Router.map(function() {
  this.route('paypal');
  this.route('payment');
  this.route('payments');
  this.route('sale', { path: '/sale/:id' });
  this.route('refund', { path: '/refund/:id' });

  //this.resource('sales', { path: '/sales' }, function() {
  //  this.route('sale', { path: '/sale/:id' });
  //  this.route('refund');
  //});

  //this.route('refunds');

  this.route('lookupSale');
  this.route('lookupRefund');
  this.route('authorization');
  this.route('authorizations');
  this.route('order');
  this.route('orders');
  this.route('creditCard');
  this.route('creditCards');
  this.route('card', { path: '/card/:id' });
  this.route('plan');
  this.route('plans');
});

export default Router;

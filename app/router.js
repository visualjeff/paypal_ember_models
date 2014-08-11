import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PaypalENV.locationType
});

Router.map(function() {
  this.route('paypal');
  this.route('payment');
  this.route('sales');
  this.route('sale', {path: '/sale/:id' });
  this.route('refund', {path: '/refund/:id'});

  //this.resource('sales', { path: '/sales' }, function() {
  //  this.route('sale', { path: '/sale/:id' });
  //  this.route('refund');
  //});

  //this.route('refunds');

  this.route('lookupSale');
  this.route('lookupRefund');
});

export default Router;

import DS from 'ember-data';

export default DS.Model.extend({
  //paypalId: DS.attr('string'),
  //createTime: DS.attr('string'),
  //updateTime: DS.attr('string'),
  //state: DS.attr('string'),
  intent: DS.attr('string'),
  payer: DS.belongsTo('payer'),
  transactions: DS.hasMany('transaction')
});

/**
 * Created by jeffg on 8/19/14.
 */
import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function( string ){
    return ( string || '' ).toUpperCase();
});

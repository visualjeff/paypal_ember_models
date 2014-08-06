/**
 * Created by jeffg on 8/5/14.
 */
import Ember from 'ember';

export default Ember.View.extend({
    didInsertElement: function(){
        this._super();
        Ember.run.scheduleOnce('afterRender', this, function(){
            $(document).foundation();
            $(document).foundation('interchange', 'reflow');
        });
    }
});
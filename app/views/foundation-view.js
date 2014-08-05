/**
 * Created by jeffg on 8/5/14.
 */
export default Ember.View.extend({
    didInsertElement: function(){
        this._super();
        Ember.run.scheduleOnce('afterRender', this, function(){
            $(document).foundation();
            $(document).foundation('interchange', 'reflow');
        });
    }
});
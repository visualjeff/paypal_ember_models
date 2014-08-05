import Ember from 'ember';

export default Ember.TextArea.extend({
    attributeBindings: ['accept', 'autocomplete', 'autofocus', 'name', 'required']
});

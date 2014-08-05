import Ember from 'ember';

export default Ember.TextField.extend({
    attributeBindings: ['autofocus','placeholder','required', 'pattern', 'type', 'data-equalto']
});

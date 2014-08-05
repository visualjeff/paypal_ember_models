/**
 * Created by jeffg on 7/1/14.
 */
import TextArea from "../views/textarea";

var FocusTextArea = TextArea.extend({
    didInsertElement: function() {
        this.$().focus();
    }
});

export default FocusTextArea;

/**
 * Created by jeffg on 7/1/14.
 */
import TextField from "../views/textfield";

var FocusTextField = TextField.extend({
    didInsertElement: function() {
        this.$().focus();
    }
});

export default FocusTextField;
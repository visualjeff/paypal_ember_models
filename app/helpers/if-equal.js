// Please note that Handlebars helpers will only be found automatically by the
// resolver if their name contains a dash (reverse-word, translate-text, etc.)
// For more details: http://stefanpenner.github.io/ember-app-kit/guides/using-modules.html

export default Ember.Handlebars.registerHelper('if_eq', function(val1, val2, options) {
    return (this.get(val1) === val2) ? options.fn(this) : '';
});

/*
Example uses:

 {{#if_eq confirmation_type 'create'}}
    Reservation created!
    </br></br>
    Reservation number:  {{#link-to 'reservationPage' reservation_id}}{{reservation_id}}{{/link-to}}
 {{/if_eq}}
 {{#if_eq confirmation_type 'update'}}
    Reservation updated!
    </br></br>
    Reservation number:  {{#link-to 'reservationPage' reservation_id}}{{reservation_id}}{{/link-to}}
 {{/if_eq}}
 {{#if_eq confirmation_type 'delete'}}
    Reservation deleted!
 {{/if_eq}}
*/
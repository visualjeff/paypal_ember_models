// Please note that Handlebars helpers will only be found automatically by the
// resolver if their name contains a dash (reverse-word, translate-text, etc.)
// For more details: http://stefanpenner.github.io/ember-app-kit/guides/using-modules.html

export default Ember.Handlebars.makeBoundHelper(function(string, start, end) {
    if (string === undefined) {
        return;
    }
    if (isNaN(start) || isNaN(end)) {
        Ember.Logger.debug("substring-trim: either start or end isNAN");
        return;
    }
    var retString = string.substring(start ,end);

    //Attach dot dot dot if string greater than suggested end point
    if (string.length > end) {
        retString += '...';
    }
    return new Ember.Handlebars.SafeString(retString);
});
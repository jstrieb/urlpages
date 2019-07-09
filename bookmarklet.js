// Comments need to have the following syntax: /* Comment */
// Reason: Bookmarklet code is in a single line
// There may be other weird syntax errors
//
// Caveat: Only works with small webpages due to the URL being too long

javascript:(
function() {
    /* URLPages URL */
    var urlpages_url = 'https://jstrieb.github.io/urlpages/';
    /* Encode HTML code */
    var page_data = window.btoa(JSON.stringify({
        "css" : null,
        "js" : null,
        "html" : document.documentElement.outerHTML}));
    /* If OK was clicked, open Editor with data in new tab and switch to it */
    if (confirm('Open in Editor?')) {
        open(`${urlpages_url}editor/#${page_data}`).focus();
    /* If Cancel was clicked, open URL without Editor */
    } else {
        open(`${urlpages_url}#${page_data}`).focus();
    }
}
)();

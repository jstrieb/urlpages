// Comments need to have the following syntax: /* Comment */
// Reason: Bookmarklet code is in a single line
// There may be other weird syntax errors
//
// Caveat: Only works with small webpages due to the URL being too long

javascript:(
function() {
    /* URLPages URL */
    var urlpages_url = 'https://benja-johnny.github.io/urlpages/';
    /* lz-string-1.4.4.js URL */
    var lz_string_url = urlpages_url + 'lz-string-1.4.4.js';
    /* Create element for lz-string-1.4.4.js */
    var lz_script = document.createElement('script');
    lz_script.setAttribute('type', 'text/javascript');
    lz_script.setAttribute('charset', 'UTF-8');
    lz_script.setAttribute('src', lz_string_url);
    document.documentElement.appendChild(lz_script);
    /* After loading lz-string-1.4.4.js */
    lz_script.onload = function() {
        /* Encode HTML code */
        var page_data = LZString144.compressToBase64(document.documentElement.outerHTML);
        /* If OK was clicked, open Editor with data in new tab and switch to it */
        if (confirm('Open in Editor?')) {
            open(`${urlpages_url}editor#${page_data}`).focus();
        /* If Cancel was clicked, open URL without Editor */
        } else {
            open(`${urlpages_url}#${page_data}`).focus();
        }
    };
}
)();

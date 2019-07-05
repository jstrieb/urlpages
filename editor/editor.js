/**
 * editor/editor.js: the main code that runs what is referred to as the "editor"
 * in the documentation
 */


/***
 * Helper functions
 ***/

/* Return the data from the textareas */
function getTextareaData() {
    return {
        "css" : document.getElementById("css").value,
        "js" : document.getElementById("javascript").value,
        "html" : document.getElementById("html").value
    };
}

/* Return the HTML string for the page */
function getHTML(data) {
    // Generate an HTML page from the contents of each <textarea>
    var pageData =
    `
    <!DOCTYPE html>
    <head>
    <style>
    ${data["css"]}
    </style>
    <script type="text/javascript">
    ${data["js"]}
    </scr` +
    // This has to be broken up because otherwise it is recognized as
    // the main document's end script tag
    `ipt>
    </head>
    <body>
    ${data["html"]}
    </body>
    `;
    return pageData;
}

/* Return a link to view the page */
function getViewLink(pageData) {
    return `http://jstrieb.github.io/urlpages/#${window.btoa(pageData)}`;
}


/***
 * Button press functions
 ***/

/* Set the TinyUrl form hidden 'url' field to the view URL */
function setViewUrl() {
    // Replace each instance of certain characters in the HTML page data
    // by one, two, three, or four escape sequences representing the UTF-8
    // encoding of the character
    var encoded_html = encodeURIComponent(getHTML(getTextareaData()));
	// Update the URL for the "Short Link" button
    document.getElementById("url").value = getViewLink(encoded_html);
}

/* Set the TinyUrl form hidden 'url' field to the code URL (current URL) */
function setCodeUrl() {
    document.getElementById("url").value = window.location.href;
}

/* Show a prompt with the HTML page data so the user can copy the code */
function showCopyCodePrompt() {
    window.prompt("Copy to clipboard: ", getHTML(getTextareaData()));
}

/* Show a prompt for pasting encoded URL data */
function showPasteEncodedPrompt() {
    var data = window.prompt("Paste encoded data: ", window.location.hash);
    if(data) window.location.hash = data; // If OK was clicked, set URL
    location.reload(false); // Reload page from cache
}


/***
 * Main procedure functions
 ***/

/* Run once when the page is loaded */
function initialize() {
    if (window.location.hash) { // If there's something after # in the URL
        // Get page data from the URL
        var b64  = window.location.hash.slice(1); // Get the part after the #
        var json = window.atob(b64); // Decode (base-64) string
        var data = JSON.parse(json); // Construct JS values from string; WARNING: Older browsers might not support this

        // Load URL data into the textareas
        document.getElementById("css").value = data["css"];
        document.getElementById("javascript").value = data["js"];
        document.getElementById("html").value = data["html"];
    }
    update();
}


/* Run each time a key is pressed on a text box */
function update() {
    // Get data from textareas
    var data = getTextareaData();
    // Encode HTML data from textareas into a linkable string
    var encoded_html = encodeURIComponent(getHTML(data));
    // Save encoded page data to the URL
    window.location.hash = "#" + window.btoa(JSON.stringify(data));
    // Update the URL for the "Long Link to Publish" button
    document.getElementById("getLinkLink").href = getViewLink(encoded_html);
    // Update the download link
    document.getElementById("downloadLink").href = `data:text/html,${encoded_html}`
    // Update the <iframe> to display the generated page
    window.frames[0].location.replace(`data:text/html,${encoded_html}`);
}

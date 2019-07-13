/**
 * editor/editor.js: the main code that runs what is referred to as the "editor"
 * in the documentation
 */


/***
 * Helper functions
 ***/

/* Put data (object) into textareas */
function loadTextareaData(data) {
    document.getElementById("css").value = data["css"];
    document.getElementById("javascript").value = data["js"];
    document.getElementById("html").value = data["html"];
}

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
`<!DOCTYPE html>
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
</body>`;
    return pageData;
}

/* Return a link to view the page */
function getViewLink(pageData) {
    return `https://benja-johnny.github.io/urlpages/${pageData}`;
}

/* Convert HTML code into an object for the Editor
   (Only works with URLs generated with the Editor) */
function parseHTML(string_data) {
    return {
        "css" : string_data.slice(string_data.indexOf('<style>') + 8,
                                  string_data.lastIndexOf('</style>') - 1),
        "js" : string_data.slice(string_data.indexOf('<script type="text/javascript">') + 32,
                                 string_data.lastIndexOf('</script>') - 1),
        "html" : string_data.slice(string_data.indexOf('<body>') + 7,
                                   string_data.lastIndexOf('</body>') - 1)
    };
}


/***
 * Button press functions
 ***/

/* Set the TinyUrl form hidden 'url' field to the view URL */
function setViewUrl() {
    document.getElementById("url").value = getViewLink(window.location.hash);
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
    if(data) { // If OK was clicked
        window.location.hash = data; // Set URL
        location.reload(false); // Reload page from cache
    }
}

/* Clear Editor */
function clearEditor() {
    window.location.hash = "#"; // Set URL
    location.reload(false); // Reload page from cache
}

/* Reload page */
function refreshPage() {
    location.reload(false); // Reload page from cache
}


/***
 * Main procedure functions
 ***/

/* Run once when the page is loaded */
function initialize() {
    var loc_hash = window.location.hash;
    // If there's something after # in the URL
    if (loc_hash) {
        loadTextareaData( // Load URL data into the textareas
        parseHTML( // Convert HTML string into an object
        LZString144.decompressFromBase64( // Decode (base-64) string
        loc_hash.slice(1) // Get part of the URL after the #
        )));
    }
    update();
}

/* Run each time a key is pressed on a text box */
function update() {
    // Get textarea contents
    var textarea = getTextareaData();
    // Generate HTML code from data in textareas
    var html_code = getHTML(textarea);
    // Encode HTML data from textareas into a linkable string
    var encoded_html = LZString144.compressToBase64(html_code);
    // Save encoded page data to the URL
    window.location.hash = "#" + encoded_html;
    // Update the URL for the "Long Link to Publish" button
    document.getElementById("getLinkLink").href = getViewLink("#" + encoded_html);
    // Update the download link
    document.getElementById("downloadLink").href = `data:text/html,${html_code}`
    // Update the <iframe> to display the generated page
    window.frames[0].location.replace(`data:text/html,${html_code}`);
}

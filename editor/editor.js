/**
 * editor/editor.js: the main code that runs what is referred to as the "editor"
 * in the documentation
 */



/***
 * Helper functions
 ***/

/* Encoding UTF8 ⇢ base64: https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings */
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode(parseInt(p1, 16))
  }))
}

/* Decoding base64 ⇢ UTF8: https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings */
function b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
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
// This has to be broken up because otherwise it is recognized as the main
// document's end script tag
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
  return `http://jstrieb.github.io/urlpages/#${b64EncodeUnicode(pageData)}`;
}



/***
 * Button press functions
 ***/


/* Set the TinyUrl form hidden 'url' field to the view URL */
function setViewUrl() {
  var data = {
    "css" : document.getElementById("css").value,
    "js" : document.getElementById("javascript").value,
    "html" : document.getElementById("html").value
  };

  var html = encodeURIComponent(getHTML(data));

	// Update the URL for the "Short Link" button
  document.getElementById("url").value = getViewLink(html);
}


/* Set the TinyUrl form hidden 'url' field to the code URL */
function setCodeUrl() {
  document.getElementById("url").value = window.location.href;
}


/* Show a prompt with the HTML page data so the user can copy the code */
function showCopyCodePrompt() {
  var data = {
    "css" : document.getElementById("css").value,
    "js" : document.getElementById("javascript").value,
    "html" : document.getElementById("html").value
  };

  var html = getHTML(data);

  window.prompt("Copy to clipboard: ", html)
}



/***
 * Main procedure functions
 ***/

/* Run once when the page is loaded */
function initialize() {
  // Get page data from the URL and load it into the boxes
  if (window.location.hash) {
    var b64  = window.location.hash.slice(1);
    var json = b64DecodeUnicode(b64);
    var data = JSON.parse(json);

    document.getElementById("css").value = data["css"];
    document.getElementById("javascript").value = data["js"];
    document.getElementById("html").value = data["html"];
  }

  update();
}


/* Run each time a key is pressed on a text box */
function update() {
  var data = {
    "css" : document.getElementById("css").value,
    "js" : document.getElementById("javascript").value,
    "html" : document.getElementById("html").value
  };

  var html = encodeURIComponent(getHTML(data));

  // Save encoded page data to the URL
  window.location.hash = "#" + b64EncodeUnicode(JSON.stringify(data));

  // Update the URL for the "Get Link" button
  document.getElementById("getLinkLink").href = getViewLink(html);

  // Update the download link
  document.getElementById("downloadLink").href = `data:text/html,${html}`

  // Update the <iframe> to display the generated page
  // Todo: Update with a > 8-bit safe solution for updates 
  window.frames[0].location.replace(`data:text/html,${html}`);
}

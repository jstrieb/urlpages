//html
var editorhtml = ace.edit("html");
editorhtml.setTheme("ace/theme/monokai");
editorhtml.session.setMode("ace/mode/html");
//css
var editorcss = ace.edit("css");
editorcss.setTheme("ace/theme/monokai");
editorcss.session.setMode("ace/mode/css");
//js
var editorjs = ace.edit("js");
editorjs.setTheme("ace/theme/monokai");
editorjs.session.setMode("ace/mode/javascript");

/**
 * editor/editor.js: the main code that runs what is referred to as the "editor"
 * in the documentation
 */

api = apiVersions[LATEST_API_VERSION]



/***
 * Helper functions
 ***/

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


/***
 * Button press functions
 ***/


/* Set the TinyUrl form hidden 'url' field to the view URL */
function setViewUrl() {
  var data = {
    "css" : editorcss.getValue(),
    "js" : editorjs.getValue(),
    "html" : editorhtml.getValue()
  };

  var html = getHTML(data);

	// Update the URL for the "Short Link" button
  document.getElementById("url").value = api.getViewLink(html);
}


/* Set the TinyUrl form hidden 'url' field to the code URL */
function setCodeUrl() {
  document.getElementById("url").value = window.location.href;
}


/* Show a prompt with the HTML page data so the user can copy the code */
function showCopyCodePrompt() {
  var data = {
    "css" : editorcss.getValue(),
    "js" : editorjs.getValue(),
    "html" : editorhtml.getValue()
  };

  var html = getHTML(data);

  window.prompt("Copy to clipboard: ", html)
}


/* Hide and show buttons based on checkbox state */
function hideButtons(box) {
  let buttons = document.querySelectorAll("button");
  if (box.checked) {
    buttons.forEach((button) => button.style.display = "none");
  } else {
    buttons.forEach((button) => button.style.display = "block");
  }
}



/***
 * Main procedure functions
 ***/

/* Run once when the page is loaded */
function initialize() {
  // Get page data from the URL and load it into the boxes
  if (window.location.hash) {
    var encoded = window.location.hash.slice(1);
    var json = b64.decode(encoded);
    var data = JSON.parse(json);

    editorcss.setValue(data["css"]);
    editorjs.setValue(data["js"]);
    editorhtml.setValue(data["html"]);
  }

  update();
}


/* Run each time a key is pressed on a text box */
function update() {
  var data = {
    "css" : editorcss.getValue(),
    "js" : editorjs.getValue(),
    "html" : editorhtml.getValue()
  };

  var html = getHTML(data);

  // Save encoded page data to the URL
  window.location.hash = "#" + b64.encode(JSON.stringify(data));

  // Update the URL for the "Get Link" button
  document.getElementById("getLinkLink").href = api.getViewLink(html);

  // Update the download link
  document.getElementById("downloadLink").href = `data:text/html,${html}`

  // Update the <iframe> to display the generated page
  window.frames[0].location.replace(`data:text/html;charset=utf-8;base64,${b64.encode(html)}`);
}

//document.getElementById("body").addEventListener("load", setTimeout(initialize(), 1000));
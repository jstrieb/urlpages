JSPen creates permanent web pages
=================================

That you can share anywhere.
----------------------------

  

It doesn't aim to be much, but you might find a couple of features interesting:

1.  Your entire pen is stored in the URL you share. Nothing is hosted anywhere.
2.  We pull front page posts from Twitter (tweet to [@HTMLPins](https://twitter.com/intent/tweet?text=I%20made%20this!%20%E2%80%93%20(%20paste%20a%20link%20to%20your%20pen%20here%20)&hashtags=jspen)), and use url shortners for share links.
3.  There's no backend at all.

  

That means your pens can't be taken down, cost nothing, and once shared, anyone who obtains the URL can modify it (forever).

If this website is taken down, another can take it's place. The code is open-source ([GitHub](https://github.com/kidGodzilla/urlpages)).

Based on a project by [@jstrieb](https://github.com/jstrieb), called [URL Pages](https://jstrieb.github.io/urlpages) ([Source code](https://github.com/jstrieb/urlpages))

We curate homepage posts by retweeting posts shared on Twitter with the tag [#jspen](https://twitter.com/search?q=%23jspen).

Show us what you've made. [Tweet to us](https://twitter.com/intent/tweet?text=I%20made%20this!%20%E2%80%93%20(%20paste%20a%20link%20to%20your%20pen%20here%20)&hashtags=jspen)

Have fun!



Original Readme
=================================

## About

- Create web pages in the simple, fast editor
- Share code that others can edit and modify
- Clone web pages with the bookmarklet (under active development)
- "Publish" web pages instantaneously
- Published links never stop working and cannot be taken down
- No dependencies
- No signups
- No tracking
- No hosting
- No cost
- No commitment
- Less than 200 total lines of clear, well-documented HTML, CSS, and JavaScript


## How it works

As hinted by its name, URL Pages works by storing the entire contents of a web page in the URL. 

Thus, as long as the URL exists, so does the page it points to. The rest of the URL Pages program is responsible for translating between web page code (HTML/CSS/JavaScript) and an "encoded" URL.

- The **main page** takes encoded data from the URL, decodes it into regular web page format, and displays it to the user
- The **editor** encodes user-created web page data as a link that can be shared
- The **bookmarklet** takes a page that already exists and encodes it as a link that can be shared

When the main page is visited, the data is encoded in the URL using base 64 encoding via JavaScript's `atob` and `btoa` functions in conjunction with its `encodeURIComponent` and `decodeURIComponent` functions. The encoded data is stored in the [hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash#Examples) portion of the URL.

In the editor, data is similarly encoded, except that the HTML, CSS, and JavaScript portions are stored separately in one object that is converted to a JSON string before being base 64 encoded.

The obvious downside of URL Pages is that the links get very long very quickly. Luckily, some URL shorteners are able to accommodate fairly long URLs (shoutout to [TinyUrl](http://tinyurl.com)). In a strange way, this effectively means the link shortener is acting as the web host since it is responsible for storing the record of the web page's data. For simple web pages (and even simple page hierarchies), URL Pages have proven reasonably easy and effective to use, however it quickly becomes infeasible to use for large sites or large embedded images.


## Disclaimer

Web pages in URLs are definitely not how things on the web were meant to be done, so don't be surprised if trying to use URL Pages causes unexpected issues. For example, sharing these links may cause chat programs, email clients, and unsuspecting individuals to get confused, raise exceptions, or complain. Likewise, copy-pasting these links may take a long time, if it works at all. I've also noticed my browser running a little hotter while I've got 5MB links in the URL bar.

Furthermore, URL Pages is very much a proof of concept, and should not be relied upon for anything consequential.


## Examples

- My personal website
    - Mess around and edit it [here](http://tinyurl.com/yxsrcuz6)
    - See the "published" version [here](http://tinyurl.com/yykrk975)
- Bookmarklet links
    - Code editor [here](http://tinyurl.com/y6rrrlnm)
    - Published version below


## Bookmarklet

Currently, the bookmarklet is very much in-development (read: mostly doesn't work). Feel free to try it anyway by visiting the link below and following the instructions, or pasting the code below into a bookmark:
- [Bookmarklet instruction page](http://tinyurl.com/y5khpxpt)
- `javascript:window.open("http://jstrieb.github.io/urlpages/#" + btoa(encodeURIComponent(document.documentElement.outerHTML)), "_blank")`

The bookmarklet enables some of the most interesting and promising opportunities for URL Pages. Namely: cloning pages for archival purposes, sharing restricted information to bypass censorship, bypassing paywalls, storing entire pages in bookmarks, etc.


## TODO

- Improve the bookmarklet -- it's mostly unusable as of right now
    - Fix relative vs absolute linking
    - Maybe try embedding images
    - Import all `src`ed scripts directly
- Test to make sure that everything actually works for other browsers, operating systems, and devices
- Improve editors beyond simple `textarea` (perhaps integrate Ace or CodeMirror)
- Make the buttons better/more efficient (don't update `href` on every key press)
- Figure out and publish max URL sizes for various URL shorteners
- Add features

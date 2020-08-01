javascript:(() => {
  /* Generate the b64 API functions */
  var b64 = (() => {
    /* Generate a dictionary with {key: val} as {character: index in input string} */
    function generateIndexDict(a) {
      let result = {};
      for (let i = 0; i < a.length; i++) {
        result[a[i]] = i;
      }
      return result;
    }

    /* Decode URL safe even though it is not the primary encoding mechanism */
    const _a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const _aRev = generateIndexDict(_a);
    _aRev["-"] = _aRev["+"];
    _aRev["_"] = _aRev["/"];

    const _enc = new TextEncoder("utf-8");
    const _dec = new TextDecoder("utf-8");

    return {
      /* Decode base64 to a string */
      encode: function(s) {
        return this.binaryToBase64(this.asciiToBinary(s));
      },

      /* Convert a string to a Uint8Array */
      asciiToBinary: function(text) {
        return _enc.encode(text);
      },

      /* Return a base64-encoded string from a Uint8Array input */
      binaryToBase64: function(originalBytes) {
        /* Pad the output array to a multiple of 3 bytes */
        let length = originalBytes.length;
        let added = (length % 3 == 0) ? 0 : (3 - length % 3);
        let bytes = new Uint8Array(length + added);
        bytes.set(originalBytes);

        let output = "";
        for (let i = 0; i < bytes.length; i += 3) {
          /*
          Convert 3 8-bit bytes into 4 6-bit indices and get a character from
          the master list based on each 6-bit index
             3 x 8-bit:  |------ --|---- ----|-- ------|
          => 4 x 6-bit:  |------|-- ----|---- --|------|
          */
          output += _a[ bytes[i] >>> 2 ];
          output += _a[ ((bytes[i] & 0x3) << 4) | (bytes[i + 1] >>> 4) ];
          output += _a[ ((bytes[i + 1] & 0xF) << 2) | (bytes[i + 2] >>> 6) ];
          output += _a[ bytes[i + 2] & 0x3F ];
        }

        /* Turn the final "A" characters into "=" depending on necessary padding */
        if (added > 0) {
          output = output.slice(0, -added) + ("=".repeat(added));
        }

        return output;
      },
    }
  })();

  /* Generate the page -> base64 API functions */
  var api = {
    VERSION: "0.2.0",

    /* Return a link to view the page */
    getViewLink: function(pageData) {
      var urlData = {
        version: this.VERSION,
        compressed: false,
        body: pageData,
      };

      const hashObject = b64.encode(JSON.stringify(urlData));
      return `http://jstrieb.github.io/urlpages/#${hashObject}`;
    },
  };

  /* Replace all relative URLs with absolute ones */
	Array.from(document.querySelectorAll("[src],[href]")).map(l => {
		if ("src" in l) {
			l.src = (new URL(l.src, document.baseURI)).href;
		} else if ("href" in l) {
			l.href = (new URL(l.href, document.baseURI)).href;
		}
		return l;
	});

  /* Redirect to the URL Page in a new tab */
  window.open(api.getViewLink(document.documentElement.outerHTML), "_blank");
})();

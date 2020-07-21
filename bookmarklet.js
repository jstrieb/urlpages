javascript:(() => {
  /* Generate the b64 API functions */
  var b64 = (() => {
    function generateIndexDict(a) {
      let result = {};
      for (let i = 0; i < a.length; i++) {
        result[a[i]] = i;
      }
      return result;
    }
    const _a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const _aRev = generateIndexDict(_a);
    _aRev["-"] = _aRev["+"];
    _aRev["_"] = _aRev["/"];

    const _enc = new TextEncoder("utf-8");
    const _dec = new TextDecoder("utf-8");

    return {
      encode: function(s) {
        return this.binaryToBase64(this.asciiToBinary(s));
      },

      asciiToBinary: function(text) {
        return _enc.encode(text);
      },

      binaryToBase64: function(originalBytes) {
        let length = originalBytes.length;
        let added = (length % 3 == 0) ? 0 : (3 - length % 3);
        let bytes = new Uint8Array(length + added);
        bytes.set(originalBytes);

        let output = "";
        for (let i = 0; i < bytes.length; i += 3) {
          output += _a[ bytes[i] >>> 2 ];
          output += _a[ ((bytes[i] & 0x3) << 4) | (bytes[i + 1] >>> 4) ];
          output += _a[ ((bytes[i + 1] & 0xF) << 2) | (bytes[i + 2] >>> 6) ];
          output += _a[ bytes[i + 2] & 0x3F ];
        }

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

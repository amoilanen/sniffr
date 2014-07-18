if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var mapped = [];

    for (var i = 0; i < this.length; i++) {
      mapped.push(callback.call(thisArg, this[i], i, this));
    }
    return mapped;
  };
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

(function(host) {

  var UNKNOWN_PROPERTY = {
    name: "Unknown",
    version: [],
    versionString: "Unknown"
  };

  var matchers = {
    browser: [
      [/msie ([\.\_\d]+)/, "ie"],
      [/trident\/.*?rv:([\.\_\d]+)/, "ie"],
      [/firefox\/([\.\_\d]+)/, "firefox"]
    ],
    os: [
      [/windows nt ([\.\_\d]+)/, "windows"],
      [/linux ()([a-z\.\_\d]+)/, "linux"],
      [/mac os.*?([\.\_\d]+)/, "macos"],
      [/openbsd ()([a-z\.\_\d]+)/, "openbsd"]
    ]
  };

  function Sniffr() {
    this.browser = UNKNOWN_PROPERTY;
    this.os = UNKNOWN_PROPERTY;
  }

  function determineProperty(self, propertyName, userAgent) {
    matchers[propertyName].forEach(function(propertyMatcher) {
      var propertyRegex = propertyMatcher[0];
      var propertyValue = propertyMatcher[1];

      var match = userAgent.match(propertyRegex);

      if (match) {
        self[propertyName] = {
          name: propertyValue,
          versionString: match[2] || match[1],
          version: match[2] ? [] : parseVersion(match[1])
        };
      }
    });
  }

  function parseVersion(versionString) {
    return versionString.split(/[\._]/).map(function(versionPart) {
      return parseInt(versionPart);
    });
  }

  Sniffr.prototype.sniff = function(userAgentString) {
    var self = this;
    var userAgent = (userAgentString || navigator.userAgent || "").toLowerCase();

    ["os", "browser"].forEach(function(propertyName) {
      determineProperty(self, propertyName, userAgent);
    });
  };

  Sniffr.prototype.getBrowser = function() {
    return this.browser;
  };

  Sniffr.prototype.getOS = function() {
    return this.os;
  };

  host.Sniffr = Sniffr;
})(this);
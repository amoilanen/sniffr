(function(host) {

  var UNKNOWN_PROPERTY = {
    name: "Unknown",
    version: [],
    versionString: "Unknown"
  };

  var matchers = {
    browser: [
      [/msie ([\.\_\d]+)/, "ie"],
      [/trident\/.*?rv:([\.\_\d]+)/, "ie"]
    ],
    os: [
      [/windows nt ([\.\_\d]+)/, "windows"]
    ]
  };

  function Sniffr() {
    this.browser = UNKNOWN_PROPERTY;
    this.os = UNKNOWN_PROPERTY;
  }

  function determineProperty(self, propertyName, userAgent) {
    var propertyMatchers = matchers[propertyName];

    for (var i = 0; i < propertyMatchers.length; i++) {
      var propertyRegex = propertyMatchers[i][0];
      var propertyValue = propertyMatchers[i][1];

      var match = userAgent.match(propertyRegex);

      if (match) {
        self[propertyName] = {
          name: propertyValue,
          versionString: match[1],
          version: parseVersion(match[1])
        };
      }
    }
  };

  function parseVersion(versionString) {
    var versionParts = versionString.split(/[\._]/);
    var version = [];

    for (var i = 0; i < versionParts.length; i++) {
      version.push(parseInt(versionParts[i]));
    }
    return version;
  }

  Sniffr.prototype.sniff = function(userAgentString) {
    var userAgentString = userAgentString || navigator.userAgent;

    if (!userAgentString) {
      return;
    }
    userAgentString = userAgentString.toLowerCase();

    determineProperty(this, "os", userAgentString);
    determineProperty(this, "browser", userAgentString);
  };

  Sniffr.prototype.getBrowser = function() {
    return this.browser;
  };

  Sniffr.prototype.getOS = function() {
    return this.os;
  };

  host.Sniffr = Sniffr;
})(this);
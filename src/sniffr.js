(function(host) {

  var UNKNOWN_PROPERTY = {
    name: "Unknown",
    version: [],
    versionString: "Unknown"
  };

  function Sniffr() {
    this.browser = UNKNOWN_PROPERTY;
    this.os = UNKNOWN_PROPERTY;
  }

  Sniffr.prototype.sniff = function() {
    //TODO: Implement
  };

  Sniffr.prototype.getBrowser = function() {
    return this.browser;
  };

  Sniffr.prototype.getOS = function() {
    return this.os;
  };

  host.Sniffr = Sniffr;
})(this);
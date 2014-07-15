describe("sniffr", function() {

  var sniffer;

  beforeEach(function() {
    sniffer = new Sniffr();
  });

  function property(name, versionString) {
    return {
      name: name,
      version: versionString.split(".").map(function(versionPart) {
        return parseInt(versionPart);
      }),
      versionString: versionString
    };
  }

  function os(name, versionString) {
    return property(name, versionString);
  }

  function browser(name, versionString) {
    return property(name, versionString);
  }

  function shouldDetect(os, browser, agentString) {
    var specName = "os " + os.name + " " + os.versionString + 
      ", browser" + browser.name + " " + browser.versionString;

    describe(specName, function() {
      it("it should recognize", function() {
        sniffer.sniff();
        expect(sniffer.getOS()).toEqual(os);
        expect(sniffer.getBrowser()).toEqual(browser);
      });
    });
  };

  describe("InternetExplorer", function() {
    shouldDetect(os("Windows", "6.3"), browser("InternetExplorer", "11.0"),
      "Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko");
    shouldDetect(os("Windows", "6.1"), browser("InternetExplorer", "10.0"),
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)");
    shouldDetect(os("Windows", "6.1"), browser("InternetExplorer", "9.0"),
      "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0) chromeframe/10.0.648.205");
    shouldDetect(os("Windows", "5.1"), browser("InternetExplorer", "8.0"),
      "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727)");
  });

  //TODO: Firefox
  //TODO: Chrome
  //TODO: Safari

  //TODO: No user agent string available
  //TODO: Unknown agent string
  //TODO: No analysis has been run before getting the properties
});
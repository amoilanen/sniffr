describe("sniffr", function() {

  var sniffer;

  beforeEach(function() {
    sniffer = new Sniffr();
  });

  function property(name, versionString) {
    var version = versionString.split(".").map(function(versionPart) {
      return parseInt(versionPart);
    });
    var nonParsableVersion = version.some(function(versionPart) {
      return isNaN(versionPart);
    });
    if (nonParsableVersion) {
      version = [];
    }

    return {
      name: name,
      version: version,
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
      ", browser " + browser.name + " " + browser.versionString;

    describe(specName, function() {
      it("it should recognize", function() {
        sniffer.sniff(agentString);
        expect(sniffer.getOS()).toEqual(os);
        expect(sniffer.getBrowser()).toEqual(browser);
      });
    });
  };

  describe("Internet Explorer", function() {
    shouldDetect(os("windows", "6.3"), browser("ie", "11.0"),
      "Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko");
    shouldDetect(os("windows", "6.1"), browser("ie", "10.0"),
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)");
    shouldDetect(os("windows", "6.1"), browser("ie", "9.0"),
      "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0) chromeframe/10.0.648.205");
    shouldDetect(os("windows", "5.1"), browser("ie", "8.0"),
      "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727)");
  });

  describe("Firefox", function() {
    shouldDetect(os("linux", "x86_64"), browser("firefox", "29.0"),
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0");
    shouldDetect(os("openbsd", "amd64"), browser("firefox", "28.0"),
      "Mozilla/5.0 (X11; OpenBSD amd64; rv:28.0) Gecko/20100101 Firefox/28.0");
    shouldDetect(os("windows", "6.1"), browser("firefox", "29.0"),
      "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/29.0");
    shouldDetect(os("macos", "10.6"), browser("firefox", "25.0"),
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0");
    shouldDetect(os("windows", "6.2"), browser("firefox", "12.0"),
      "Mozilla/5.0 (compatible; Windows; U; Windows NT 6.2; WOW64; en-US; rv:12.0) Gecko/20120403211507 Firefox/12.0");
    shouldDetect(os("macos", "10.6"), browser("firefox", "4.0"),
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0b8) Gecko/20100101 Firefox/4.0b8");
    shouldDetect(os("linux", "x86_64"), browser("firefox", "3.0.7"),
      "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.0.7) Gecko/2009031120 Mandriva Firefox/3.0.7");
  });

  //TODO: Chrome
  //"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.66 Safari/537.36"

  //TODO: Safari

  //TODO: No user agent string available
  //TODO: Unknown agent string
  //TODO: No analysis has been run before getting the properties
  //TODO: Recognition of whether the device is mobile or not
  //TODO: Recognize iOS/Android
  //TODO: Recognize device orientation: portrait and landscape
});
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

  function shouldDetect(options, agentString) {
    var specName = "recognition";

    if (options.os) {
      specName += ", os " + options.os.name + " " + options.os.versionString;
    }
    if (options.browser) {
      specName += ", browser " + options.browser.name + " " + options.browser.versionString;
    }

    describe(specName, function() {
      it("it should recognize", function() {
        sniffer.sniff(agentString);
        if (options.os) {
          expect(sniffer.getOS()).toEqual(options.os);
        }
        if (options.browser) {
          expect(sniffer.getBrowser()).toEqual(options.browser);
        }
      });
    });
  };

  describe("Internet Explorer", function() {
    shouldDetect({os: os("windows", "6.3"), browser: browser("ie", "11.0")},
      "Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko");
    shouldDetect({os: os("windows", "6.1"), browser: browser("ie", "10.0")},
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)");
    shouldDetect({os: os("windows", "6.1"), browser: browser("ie", "9.0")},
      "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0) chromeframe/10.0.648.205");
    shouldDetect({os: os("windows", "5.1"), browser: browser("ie", "8.0")},
      "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727)");
  });

  describe("Firefox", function() {
    shouldDetect({os: os("linux", "x86_64"), browser: browser("firefox", "29.0")},
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0");
    shouldDetect({os: os("openbsd", "amd64"), browser: browser("firefox", "28.0")},
      "Mozilla/5.0 (X11; OpenBSD amd64; rv:28.0) Gecko/20100101 Firefox/28.0");
    shouldDetect({os: os("windows", "6.1"), browser: browser("firefox", "29.0")},
      "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/29.0");
    shouldDetect({os: os("macos", "10.6"), browser: browser("firefox", "25.0")},
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0");
    shouldDetect({os: os("windows", "6.2"), browser: browser("firefox", "12.0")},
      "Mozilla/5.0 (compatible; Windows; U; Windows NT 6.2; WOW64; en-US; rv:12.0) Gecko/20120403211507 Firefox/12.0");
    shouldDetect({os: os("macos", "10.6"), browser: browser("firefox", "4.0")},
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0b8) Gecko/20100101 Firefox/4.0b8");
    shouldDetect({os: os("linux", "x86_64"), browser: browser("firefox", "3.0.7")},
      "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.0.7) Gecko/2009031120 Mandriva Firefox/3.0.7");
  });

  describe("Chrome", function() {
    shouldDetect({os: os("windows", "6.2"), browser: browser("chrome", "32.0.1667.0")},
      "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36");
    shouldDetect({os: os("macos", "10.8.3"), browser: browser("chrome", "27.0.1453.93")},
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36");
    shouldDetect({os: os("linux", "x86_64"), browser: browser("chrome", "30.0.1599.66")},
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.66 Safari/537.36");
    shouldDetect({os: os("windows", "5.1"), browser: browser("chrome", "3.0.191.0")},
      "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/531.0 (KHTML, like Gecko) Chrome/3.0.191.0 Safari/531.0");
  });

  describe("Safari", function() {
    shouldDetect({os: os("windows", "6.1"), browser: browser("safari", "4.0.5")},
      "Mozilla/5.0 (Windows; U; Windows NT 6.1; es-ES) AppleWebKit/531.22.7 (KHTML, like Gecko) Version/4.0.5 Safari/531.22.7");
    shouldDetect({os: os("linux", "i686"), browser: browser("safari", "1.1.3")},
      "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092816 Mobile Safari 1.1.3");
    shouldDetect({os: os("ios", "6.0"), browser: browser("safari", "6.0")},
      "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25");
    shouldDetect({os: os("windows", "5.1"), browser: browser("safari", "5.0.3")},
      "Mozilla/5.0 (Windows; U; Windows NT 5.1; it-IT) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4");
    shouldDetect({os: os("ios", "3.2"), browser: browser("safari", "4.0.4")},
      "Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10");
  });

  //TODO: No user agent string available
  //TODO: Unknown agent string
  //TODO: No analysis has been run before getting the properties
  //TODO: Recognition of whether the device is mobile or not
  //TODO: Recognize iOS/Android/Galaxy Tab
  //TODO: Recognize device orientation: portrait and landscape
});
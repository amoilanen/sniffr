describe("sniffr", function() {

  var sniffer;

  beforeEach(function() {
    sniffer = new Sniffr.constructor();
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

  function device(name) {
    return property(name, "Unknown");
  }

  function shouldDetect(options, agentString) {
    var specName = "recognition";

    if (options.os) {
      specName += ", os " + options.os.name + " " + options.os.versionString;
    }
    if (options.browser) {
      specName += ", browser " + options.browser.name + " " + options.browser.versionString;
    }
    if (options.device) {
      specName += ", device " + options.device.name;
    }

    describe(specName, function() {

      beforeEach(function() {
        sniffer._sniff(agentString);
      });

      ["os", "browser", "device"].forEach(function(propertyName) {
        if (options[propertyName]) {
          it("it should recognize " + propertyName, function() {
            expect(sniffer[propertyName]).toEqual(options[propertyName]);
          });
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
    shouldDetect({os: os("windows", "6.2"), browser: browser("ie", "10.0")},
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; ARM; Trident/6.0)");
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
    shouldDetect({os: os("ios", "6.0"), browser: browser("safari", "6.0"), device: device("ipad")},
      "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25");
    shouldDetect({os: os("windows", "5.1"), browser: browser("safari", "5.0.3")},
      "Mozilla/5.0 (Windows; U; Windows NT 5.1; it-IT) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4");
    shouldDetect({os: os("ios", "3.2"), browser: browser("safari", "4.0.4"), device: device("iphone")},
      "Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10");
  });

  describe("Android", function() {
    shouldDetect(
      {
        os: os("android", "2.2"), 
        browser: browser("com.android.browser", "4.0"), 
        device: device("htc")
      },
      "Mozilla/5.0 (Linux; U; Android 2.2; fr-lu; HTC Legend Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1");
    shouldDetect(
      {
        os: os("android", "armv7l"),
        browser: browser("firefox", "9.0")
      },
      "Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0");
    shouldDetect(
      {
        os: os("android", "armv7l"),
        browser: browser("firefox", "5.0")
      },
      "Mozilla/5.0 (Android; Linux armv7l; rv:5.0) Gecko/20110614 Firefox/5.0 Fennec/5.0");
    shouldDetect(
      {
        os: os("android", "Unknown"),
        browser: browser("opera.mini", "11.10")
      },
      "Opera/9.80 (Android; Opera Mini/7.0.29952/28.2075; U; es) Presto/2.8.119 Version/11.10");
    shouldDetect(
      {
        os: os("android", "4.0.4"),
        browser: browser("chrome", "18.0.1025.133"),
        device: device("galaxy.nexus")
      },
      "Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19");
    shouldDetect(
      {
        os: os("android", "4.1.1"),
        browser: browser("com.android.browser", "4.0")
      },
      "Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30");
    shouldDetect(
      {
        os: os("android", "4.4"),
        browser: browser("com.android.browser", "4.0"),
        device: device("nexus")
      },
      "Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36");
    shouldDetect(
      {
        os: os("android", "4.4.2"),
        browser: browser("com.android.browser", "4.0"),
        device: device("galaxy")
      },
      "Mozilla/5.0 (Linux; Android 4.4.2; SM-T311 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Safari/537.36");
    shouldDetect(
      {
        os: os("android", "4.2.2"),
        browser: browser("com.android.browser", "4.0"),
        device: device("galaxy")
      },
      "Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; GT-P5210 Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30");
  });

  describe("iOS", function() {
    shouldDetect(
      {
        os: os("ios", "5.1.1"),
        browser: browser("chrome", "19.0.1084.60"),
        device: device("iphone")
      },
      "Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3");
    shouldDetect(
      {
        os: os("ios", "6.0"),
        browser: browser("safari", "6.0"),
        device: device("ipad")
      },
      "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25");
    shouldDetect(
      {
        os: os("ios", "3.2"),
        browser: browser("safari", "4.0.4"),
        device: device("iphone")
      },
      "Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10");
  });

  describe("Firefox OS", function() {
    shouldDetect(
      {
        os: os("firefoxos", "Unknown"),
        browser: browser("firefox", "14.0")
      },
      "Mozilla/5.0 (Mobile; rv:14.0) Gecko/14.0 Firefox/14.0");
    shouldDetect(
      {
        os: os("firefoxos", "Unknown"),
        browser: browser("firefox", "26.0")
      },
      "Mozilla/5.0 (Tablet; rv:26.0) Gecko/26.0 Firefox/26.0");
  });

  describe("Windows Phone/Windows Mobile", function() {
    shouldDetect(
      {
        os: os("windows.phone", "7.5"),
        browser: browser("ie", "9.0")
      },
      "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)");
    shouldDetect(
      {
        os: os("windows.phone", "8.0"),
        browser: browser("ie", "10.0"),
        device: device("nokia")
      },
      "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 810)");
    shouldDetect(
      {
        os: os("windows.mobile", "Unknown"),
        browser: browser("opera.mini", "10.54")
      },
      "Opera/9.80 (Windows Mobile; Opera Mini/5.1.21594/22.387; U; ru) Presto/2.5.25 Version/10.54");
  });

  describe("user agent string none or unknown", function() {

    var defaultEnvironment = {
      os: os("Unknown", "Unknown"),
      browser: browser("Unknown", "Unknown"),
      device: device("Unknown")
    };

    it("should recognize default values for unknown user agent", function() {
      shouldDetect(defaultEnvironment, "Unknown user agent string");
    });

    it("should recognize default values for undefined user agent", function() {
      shouldDetect(defaultEnvironment, undefined);
    });
  });
});
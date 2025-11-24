import Sniffr, {OS, Browser, Device} from '../src/sniffr'

/*
 * Some user agent strings are taken from http://www.useragentstring.com
 * some are updated from https://www.useragents.me/
 */
describe('sniffr', function() {

  interface ExpectedProperty {
    name: string
    version: number[]
    versionString: string
  }

  interface TestCaseExpectations {
    os?: ExpectedProperty,
    browser?: ExpectedProperty,
    device?: ExpectedProperty
  }

  let sniffer: Sniffr;

  beforeEach(function() {
    sniffer = new Sniffr();
  });

  function property(name: string, versionString: string): ExpectedProperty {
    let version = versionString.split('.').map(function(versionPart) {
      return parseInt(versionPart, 10);
    }).filter(versionPart =>
      !isNaN(versionPart)
    );
    const nonParsableVersion = version.some(function(versionPart) {
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

  function os(name: string, versionString: string): ExpectedProperty {
    return property(name, versionString)
  }

  function browser(name: string, versionString: string): ExpectedProperty {
    return property(name, versionString);
  }

  function device(name: string): ExpectedProperty {
    return property(name, 'Unknown');
  }

  function shouldDetect(expectations: TestCaseExpectations, agentString: string) {
    let specName = 'recognition';

    if (expectations.os) {
      specName += ', os ' + expectations.os.name + ' ' + expectations.os.versionString;
    }
    if (expectations.browser) {
      specName += ', browser ' + expectations.browser.name + ' ' + expectations.browser.versionString;
    }
    if (expectations.device) {
      specName += ', device ' + expectations.device.name;
    }

    describe(specName, function() {

      beforeEach(function() {
        sniffer.sniff(agentString);
      });

      if (expectations.os) {
        it('it should recognize os', () => {
          expect(sniffer.os.name).toEqual(expectations.os?.name)
          expect(sniffer.os.version).toEqual(expectations.os?.version)
          expect(sniffer.os.versionString).toEqual(expectations.os?.versionString)
        })
      }

      if (expectations.browser) {
        it('it should recognize browser', () => {
          expect(sniffer.browser.name).toEqual(expectations.browser?.name)
          expect(sniffer.browser.version).toEqual(expectations.browser?.version)
          expect(sniffer.browser.versionString).toEqual(expectations.browser?.versionString)
        })
      }

      if (expectations.device) {
        it('it should recognize device', () => {
          expect(sniffer.device.name).toEqual(expectations.device?.name)
          expect(sniffer.device.version).toEqual(expectations.device?.version)
          expect(sniffer.device.versionString).toEqual(expectations.device?.versionString)
        })
      }
    });
  }

  describe('Edge', function() {
    shouldDetect({os: os('macos', '10.15.7'), browser: browser('edge', '118.0.2088.69')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69');
    shouldDetect({os: os('windows', '10.0'), browser: browser('edge', '12.10240')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240');
    shouldDetect({os: os('windows', '10.0'), browser: browser('edge', '118.0.2088.69')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.69');
    shouldDetect({os: os('windows', '10.0'), browser: browser('edge', '134.0.0.')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.');
    shouldDetect({os: os('windows', '10.0'), browser: browser('edge', '131.0.0.')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.');
    shouldDetect({os: os('windows', '10.0'), browser: browser('edge', '132.0.0.')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.');
  });

  describe('Internet Explorer', function() {
    shouldDetect({os: os('windows', '6.1'), browser: browser('ie', '11.0')},
      'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko');
    shouldDetect({os: os('windows', '6.3'), browser: browser('ie', '11.0')},
      'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko');
    shouldDetect({os: os('windows', '6.1'), browser: browser('ie', '10.0')},
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)');
    shouldDetect({os: os('windows', '6.1'), browser: browser('ie', '9.0')},
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0) chromeframe/10.0.648.205');
    shouldDetect({os: os('windows', '5.1'), browser: browser('ie', '8.0')},
      'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727)');
    shouldDetect({os: os('windows', '6.2'), browser: browser('ie', '10.0')},
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; ARM; Trident/6.0)');
    shouldDetect({os: os('windows', '6.2'), browser: browser('ie', '10.0'), device: device('xbox')},
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; Xbox; Xbox One)');
  });

  describe('Firefox', function() {
    shouldDetect({os: os('linux', 'x86_64'), browser: browser('firefox', '119.0')},
      'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0');
    shouldDetect({os: os('windows', '10.0'), browser: browser('firefox', '118.0')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0');
    shouldDetect({os: os('macos', '10.15'), browser: browser('firefox', '119.')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.');
    shouldDetect({os: os('windows', '10.0'), browser: browser('firefox', '119.0')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0');
    shouldDetect({os: os('linux', 'x86_64'), browser: browser('firefox', '29.0')},
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0');
    shouldDetect({os: os('linux', 'x86_64'), browser: browser('firefox', '29.0')},
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0');
    shouldDetect({os: os('openbsd', 'amd64'), browser: browser('firefox', '28.0')},
      'Mozilla/5.0 (X11; OpenBSD amd64; rv:28.0) Gecko/20100101 Firefox/28.0');
    shouldDetect({os: os('windows', '6.1'), browser: browser('firefox', '29.0')},
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/29.0');
    shouldDetect({os: os('macos', '10.6'), browser: browser('firefox', '25.0')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0');
    shouldDetect({os: os('windows', '6.2'), browser: browser('firefox', '12.0')},
      'Mozilla/5.0 (compatible; Windows; U; Windows NT 6.2; WOW64; en-US; rv:12.0) Gecko/20120403211507 Firefox/12.0');
    shouldDetect({os: os('macos', '10.6'), browser: browser('firefox', '4.0')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0b8) Gecko/20100101 Firefox/4.0b8');
    shouldDetect({os: os('linux', 'x86_64'), browser: browser('firefox', '3.0.7')},
      'Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.0.7) Gecko/2009031120 Mandriva Firefox/3.0.7');
    shouldDetect({os: os('linux', 'x86_64'), browser: browser('firefox', '34.0')},
      'Mozilla/5.0 (X11; Linux x86_64; rv:34.0) Gecko/20100101 Firefox/34.0');
    shouldDetect({os: os('linux', 'x86_64'), browser: browser('iceweasel', '24.4.0')},
      'Mozilla/5.0 (X11; Linux x86_64; rv:24.0) Gecko/20140319 Firefox/24.0 Iceweasel/24.4.0');
    shouldDetect({os: os('windows', '10.0'), browser: browser('firefox', '42.0')},
      'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0');
    shouldDetect({os: os('ios', '13.3.1'), browser: browser("firefox", "25.1") },
      'Mozilla/5.0 (iPhone; CPU OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/25.1  Mobile/15E148 Safari/605.1.15');
    shouldDetect({os: os('windows', '10.0'), browser: browser('firefox', '136.')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.');
    shouldDetect({os: os('android', '15'), browser: browser('firefox', '136.0')},
      'Mozilla/5.0 (Android 15; Mobile; rv:136.0) Gecko/136.0 Firefox/136.0');
  });

  describe('Chrome', function() {
    shouldDetect({os: os('windows', '10.0'), browser: browser('chrome', '118.0.0.0')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 GLS/90.10.1589.90');
    shouldDetect({os: os('chromeos', '13597.84.0'), browser: browser('chrome', '116.0.5845.102')},
      'Mozilla/5.0 (X11; CrOS aarch64 13597.84.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.102 Safari/537.36');
    shouldDetect({os: os('linux', 'x86_64'), browser: browser('chrome', '118.0.0.0')},
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.3');
    shouldDetect({os: os('macos', '10.15.7'), browser: browser('chrome', '117.0.0.0')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.3');
    shouldDetect({os: os('windows', '10.0'), browser: browser('chrome', '118.0.0.0')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.3');
    shouldDetect({os: os('macos', '10.15.7'), browser: browser('chrome', '118.0.0.0')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36')
    shouldDetect({os: os('windows', '10.0'), browser: browser('chrome', '118.0.0.0')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36')
    shouldDetect({os: os('windows', '6.2'), browser: browser('chrome', '32.0.1667.0')},
      'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36');
    shouldDetect({os: os('macos', '10.8.3'), browser: browser('chrome', '27.0.1453.93')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36');
    shouldDetect({os: os('linux', 'x86_64'), browser: browser('chrome', '30.0.1599.66')},
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.66 Safari/537.36');
    shouldDetect({os: os('windows', '5.1'), browser: browser('chrome', '3.0.191.0')},
      'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/531.0 (KHTML, like Gecko) Chrome/3.0.191.0 Safari/531.0');
    shouldDetect({os: os('windows', '10.0'), browser: browser('chrome', '46.0.2490.80')},
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36');
    shouldDetect({os: os('windows', '10.0'), browser: browser('chrome', '134.0.0.0')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.3');
    shouldDetect({os: os('linux', 'x86_64'), browser: browser('chrome', '134.0.0.0')},
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.3');
  });

  describe('Safari', function() {
    shouldDetect({os: os('macos', '10.15.7'), browser: browser('safari', '16.3')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.1');
    //Applebot user agent
    shouldDetect({os: os('macos', '10.15.5'), browser: browser('safari', '13.1.1')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot');
    shouldDetect({os: os('macos', '10.15.7'), browser: browser('safari', '16.6')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.1');
    shouldDetect({os: os('windows', '6.1'), browser: browser('safari', '4.0.5')},
      'Mozilla/5.0 (Windows; U; Windows NT 6.1; es-ES) AppleWebKit/531.22.7 (KHTML, like Gecko) Version/4.0.5 Safari/531.22.7');
    shouldDetect({os: os('linux', 'i686'), browser: browser('safari', '1.1.3')},
      'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092816 Mobile Safari 1.1.3');
    shouldDetect({os: os('ios', '6.0'), browser: browser('safari', '6.0'), device: device('ipad')},
      'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25');
    shouldDetect({os: os('windows', '5.1'), browser: browser('safari', '5.0.3')},
      'Mozilla/5.0 (Windows; U; Windows NT 5.1; it-IT) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4');
    shouldDetect({os: os('ios', '3.2'), browser: browser('safari', '4.0.4'), device: device('iphone')},
      'Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10');
    shouldDetect({os: os('macos', '10.15.7'), browser: browser('safari', '17.10')},
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.10 Safari/605.1.1');
    shouldDetect({os: os('ios', '17.7.2'), browser: browser('safari', '18.3'), device: device('ipad')},
      'Mozilla/5.0 (iPad; CPU OS 17_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1');
  });

  describe('Opera', function() {
    shouldDetect({os: os('windows', '6.2'), browser: browser('opera', '9.80')},
      'Opera/9.80 (Windows NT 6.2; Win64; x64) Presto/2.12.388 Version/12.18');
    shouldDetect({os: os('windows', '10.0'), browser: browser('opera', '103.0.0.')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 OPR/103.0.0.');
    shouldDetect({os: os('windows', '6.0'), browser: browser('opera', '9.80')},
      'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14');
    shouldDetect({os: os('linux', 'i686'), browser: browser('opera', '9.80')},
      'Opera/9.80 (X11; Linux i686; U; hu) Presto/2.9.168 Version/11.50');
    shouldDetect({os: os('windows', '5.1'), browser: browser('opera', '11.11')},
      'Mozilla/5.0 (Windows NT 5.1; U; en; rv:1.8.1) Gecko/20061208 Firefox/5.0 Opera 11.11');
    shouldDetect({os: os('windows', '6.1'), browser: browser('opera', '9.80')},
      'Opera/9.80 (Windows NT 6.1; Opera Tablet/15165; U; en) Presto/2.8.149 Version/11.1');
    shouldDetect({os: os('macos', 'Unknown'), browser: browser('opera', '9.52')},
      'Opera/9.52 (Macintosh; PPC Mac OS X; U; ja)');
    shouldDetect({os: os('macos', '10.6.8'), browser: browser('opera', '9.80')},
      'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52');
    shouldDetect({os: os('windows', '98'), browser: browser('opera', '5.12')},
      'Mozilla/4.0 (compatible; MSIE 5.0; Windows 98) Opera 5.12 [de]');
    shouldDetect({os: os('windows', '5.1'), browser: browser('opera', 'Unknown')},
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera');
    shouldDetect({os: os('windows', '98'), browser: browser('opera', '4.02')},
      'Opera/4.02 (Windows 98; U) [en]');
    shouldDetect({os: os('ios', '9.2.1'), browser: browser('opera', '12.1.1.98980'), device: device('iphone')},
      'Mozilla/5.0 (iPhone; CPU iPhone OS 9_2_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) OPiOS/12.1.1.98980 Mobile/13D15 Safari/9537.53');
    shouldDetect({os: os('windows', '10.0'), browser: browser('opera', '117.0.0.')},
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.');
    shouldDetect({os: os('android', '10'), browser: browser('opera', '76.2.4027.73374')},
      'Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.6998.135 Mobile Safari/537.36 OPR/76.2.4027.73374');
  });

  describe('misc', function() {
    shouldDetect({os: os('linux', 'x86_64'), browser: browser('seamonkey', '2.53.10.2')},
      'Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0 SeaMonkey/2.53.10.2');
    shouldDetect({os: os('windows', '10.0'), browser: browser('yandex', '23.9.3.936')},
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.936 YaBrowser/23.9.3.936 Yowser/2.5 Safari/537.36');
  });

  describe('Blackberry', function() {
    shouldDetect(
      {
        os: os('blackberryos', 'Unknown'),
        browser: browser('blackberry', '7.0.0.254'),
        device: device('blackberry')
      },
      'Mozilla/5.0 (BlackBerry; U; BlackBerry 9860; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.254 Mobile Safari/534.11+');
    shouldDetect(
      {
        os: os('blackberryos', 'Unknown'),
        browser: browser('blackberry', '10.0.9.1675'),
        device: device('blackberry')
      },
      'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.1675 Mobile Safari/537.10+');
    shouldDetect(
      {
        os: os('blackberryos', '2.0.0'),
        browser: browser('blackberry', '7.2.0.0'),
        device: device('blackberry')
      },
      'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.0.0; en-US) AppleWebKit/535.8+ (KHTML, like Gecko) Version/7.2.0.0 Safari/535.8+');
    shouldDetect(
      {
        os: os('blackberryos', 'Unknown'),
        browser: browser('blackberry', '6.0.0.141'),
        device: device('blackberry')
      },
      'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/6.0.0.141 Mobile Safari/534.11+');
    shouldDetect(
      {
        os: os('blackberryos', 'Unknown'),
        browser: browser('blackberry', 'Unknown'),
        device: device('blackberry')
      },
      'BlackBerry9000/5.0.0.93 Profile/MIDP-2.0 Configuration/CLDC-1.1 VendorID/179');
  });

  describe('Android', function() {
    shouldDetect(
      {
        os: os('android', '2.2'), 
        browser: browser('com.android.browser', '4.0'), 
        device: device('htc')
      },
      'Mozilla/5.0 (Linux; U; Android 2.2; fr-lu; HTC Legend Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1');
    shouldDetect(
      {
        os: os('android', 'Unknown'),
        browser: browser('firefox', '9.0')
      },
      'Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0');
    shouldDetect(
      {
        os: os('android', 'Unknown'),
        browser: browser('firefox', '5.0')
      },
      'Mozilla/5.0 (Android; Linux armv7l; rv:5.0) Gecko/20110614 Firefox/5.0 Fennec/5.0');
    shouldDetect(
      {
        os: os('android', 'Unknown'),
        browser: browser('opera.mini', '11.10')
      },
      'Opera/9.80 (Android; Opera Mini/7.0.29952/28.2075; U; es) Presto/2.8.119 Version/11.10');
    shouldDetect(
      {
        os: os('android', '4.0.4'),
        browser: browser('chrome', '18.0.1025.133'),
        device: device('galaxy.nexus')
      },
      'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19');
    shouldDetect(
      {
        os: os('android', '4.1.1'),
        browser: browser('com.android.browser', '4.0')
      },
      'Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30');
    shouldDetect(
      {
        os: os('android', '4.4'),
        browser: browser('com.android.browser', '4.0'),
        device: device('nexus')
      },
      'Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36');
    shouldDetect(
      {
        os: os('android', '4.4.2'),
        browser: browser('com.android.browser', '4.0'),
        device: device('galaxy')
      },
      'Mozilla/5.0 (Linux; Android 4.4.2; SM-T311 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Safari/537.36');
    shouldDetect(
      {
        os: os('android', '4.2.2'),
        browser: browser('com.android.browser', '4.0'),
        device: device('galaxy')
      },
      'Mozilla/5.0 (Linux; U; Android 4.2.2; en-us; GT-P5210 Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30');
    shouldDetect(
      {
        os: os('android', '10'),
        browser: browser('chrome', '134.0.6998.135'),
        device: device('galaxy')
      },
      'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.6998.135 Mobile Safari/537.36');
    shouldDetect(
      {
        os: os('android', '10'),
        browser: browser('firefox', '136.0')
      },
      'Mozilla/5.0 (Android 10; Mobile; LG-M255; rv:136.0) Gecko/136.0 Firefox/136.0');
  });

  describe('iOS', function() {
    shouldDetect(
      {
        os: os('ios', '5.1.1'),
        browser: browser('chrome', '19.0.1084.60'),
        device: device('iphone')
      },
      'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3');
    shouldDetect(
      {
        os: os('ios', '6.0'),
        browser: browser('safari', '6.0'),
        device: device('ipad')
      },
      'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25');
    shouldDetect(
      {
        os: os('ios', '3.2'),
        browser: browser('safari', '4.0.4'),
        device: device('iphone')
      },
      'Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10');
  });

  describe('Firefox OS', function() {
    shouldDetect(
      {
        os: os('firefoxos', 'Unknown'),
        browser: browser('firefox', '14.0')
      },
      'Mozilla/5.0 (Mobile; rv:14.0) Gecko/14.0 Firefox/14.0');
    shouldDetect(
      {
        os: os('firefoxos', 'Unknown'),
        browser: browser('firefox', '26.0')
      },
      'Mozilla/5.0 (Tablet; rv:26.0) Gecko/26.0 Firefox/26.0');
  });

  describe('Windows Phone/Windows Mobile', function() {
    shouldDetect(
      {
        os: os('windows.phone', '7.5'),
        browser: browser('ie', '9.0')
      },
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)');
    shouldDetect(
      {
        os: os('windows.phone', '8.0'),
        browser: browser('ie', '10.0'),
        device: device('nokia')
      },
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 810)');
    shouldDetect(
      {
        os: os('windows.mobile', 'Unknown'),
        browser: browser('opera.mini', '10.54')
      },
      'Opera/9.80 (Windows Mobile; Opera Mini/5.1.21594/22.387; U; ru) Presto/2.5.25 Version/10.54');
    shouldDetect(
      {
        os: os('windows.phone', '8.1'),
        browser: browser('ie', '11.0'),
        device: device('lumia')
      },
      'Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; Microsoft; Lumia 640 LTE) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537'
    );
  });

  describe('user agent string none or unknown', function() {

    const defaultEnvironment = {
      os: os('Unknown', 'Unknown'),
      browser: browser('Unknown', 'Unknown'),
      device: device('Unknown')
    };

    describe('should recognize default values for unknown user agent', function() {
      shouldDetect(defaultEnvironment, 'Unknown user agent string');
    });
  });
});

/*
 * Making sure that the generate code can be loaded as standalone script in an older browser without module bundler
 */
if (typeof window !== 'undefined') {
  window.exports = window.exports || {}
}"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecognizedBrowser = exports.Device = exports.OS = exports.Browser = void 0;
var Browser;
(function (Browser) {
    Browser["Firefox"] = "firefox";
    Browser["Chrome"] = "chrome";
    Browser["InternetExplorer"] = "ie";
    Browser["Safari"] = "safari";
    Browser["Edge"] = "edge";
    Browser["Android"] = "com.android.browser";
    Browser["Opera"] = "opera";
    Browser["OperaMini"] = "opera.mini";
    Browser["Blackberry"] = "blackberry";
    Browser["Iceweasel"] = "iceweasel";
    Browser["Yandex"] = "yandex";
    Browser["SeaMonkey"] = "seamonkey";
})(Browser || (exports.Browser = Browser = {}));
var OS;
(function (OS) {
    OS["Linux"] = "linux";
    OS["MacOS"] = "macos";
    OS["Windows"] = "windows";
    OS["iOS"] = "ios";
    OS["OpenBSD"] = "openbsd";
    OS["ChromeOS"] = "chromeos";
    OS["Android"] = "android";
    OS["FirefoxOS"] = "firefoxos";
    OS["WindowsPhone"] = "windows.phone";
    OS["WindowsMobile"] = "windows.mobile";
    OS["BlackberryOS"] = "blackberryos";
})(OS || (exports.OS = OS = {}));
var Device;
(function (Device) {
    Device["iPad"] = "ipad";
    Device["iPhone"] = "iphone";
    Device["Lumia"] = "lumia";
    Device["HTC"] = "htc";
    Device["Nexus"] = "nexus";
    Device["GalaxyNexus"] = "galaxy.nexus";
    Device["Nokia"] = "nokia";
    Device["Galaxy"] = "galaxy";
    Device["XBox"] = "xbox";
    Device["Blackberry"] = "blackberry";
})(Device || (exports.Device = Device = {}));
var browserMatchers = [
    [/msie ([\.\_\d]+)/, Browser.InternetExplorer],
    [/trident\/.*?rv:([\.\_\d]+)/, Browser.InternetExplorer],
    [/firefox\/([\.\_\d]+)/, Browser.Firefox],
    [/fxios\/([\.\_\d]+)/, Browser.Firefox],
    [/chrome\/([\.\_\d]+)/, Browser.Chrome],
    [/version\/([\.\_\d]+).*?safari/, Browser.Safari],
    [/mobile safari ([\.\_\d]+)/, Browser.Safari],
    [/android.*?version\/([\.\_\d]+).*?safari/, Browser.Android],
    [/crios\/([\.\_\d]+).*?safari/, Browser.Chrome],
    [/opera/, Browser.Opera],
    [/opera\/([\.\_\d]+)/, Browser.Opera],
    [/opera ([\.\_\d]+)/, Browser.Opera],
    [/opera mini.*?version\/([\.\_\d]+)/, Browser.OperaMini],
    [/opr\/([\.\_\d]+)/, Browser.Opera],
    [/opios\/([a-z\.\_\d]+)/, Browser.Opera],
    [/blackberry/, Browser.Blackberry],
    [/blackberry.*?version\/([\.\_\d]+)/, Browser.Blackberry],
    [/bb\d+.*?version\/([\.\_\d]+)/, Browser.Blackberry],
    [/rim.*?version\/([\.\_\d]+)/, Browser.Blackberry],
    [/iceweasel\/([\.\_\d]+)/, Browser.Iceweasel],
    [/edge\/([\.\d]+)/, Browser.Edge],
    [/edg\/([\.\d]+)/, Browser.Edge],
    [/yabrowser\/([\.\d]+)/, Browser.Yandex],
    [/seamonkey\/([\.\d]+)/, Browser.SeaMonkey],
];
var osMatchers = [
    [/cros\s*\S+\s*([\.\_\d]+)/, OS.ChromeOS],
    [/linux ()([a-z\.\_\d]+)/, OS.Linux],
    [/mac os x/, OS.MacOS],
    [/mac os x.*?([\.\_\d]+)/, OS.MacOS],
    [/os ([\.\_\d]+) like mac os/, OS.iOS],
    [/openbsd ()([a-z\.\_\d]+)/, OS.OpenBSD],
    [/android/, OS.Android],
    [/android ([a-z\.\_\d]+);/, OS.Android],
    [/mozilla\/[a-z\.\_\d]+ \((?:mobile)|(?:tablet)/, OS.FirefoxOS],
    [/windows\s*(?:nt)?\s*([\.\_\d]+)/, OS.Windows],
    [/windows phone.*?([\.\_\d]+)/, OS.WindowsPhone],
    [/windows mobile/, OS.WindowsMobile],
    [/blackberry/, OS.BlackberryOS],
    [/bb\d+/, OS.BlackberryOS],
    [/rim.*?os\s*([\.\_\d]+)/, OS.BlackberryOS]
];
var deviceMatchers = [
    [/ipad/, Device.iPad],
    [/iphone/, Device.iPhone],
    [/lumia/, Device.Lumia],
    [/htc/, Device.HTC],
    [/nexus/, Device.Nexus],
    [/galaxy nexus/, Device.GalaxyNexus],
    [/nokia/, Device.Nokia],
    [/ gt\-/, Device.Galaxy],
    [/ sm\-/, Device.Galaxy],
    [/xbox/, Device.XBox],
    [/(?:bb\d+)|(?:blackberry)|(?: rim )/, Device.Blackberry]
];
var Unknown = 'Unknown';
var UnknownProperty = {
    name: Unknown,
    version: [],
    versionString: Unknown
};
function parseVersion(versionString) {
    return versionString.split(/[\._]/).map(function (versionPart) {
        return parseInt(versionPart);
    }).filter(function (versionPart) {
        return !isNaN(versionPart);
    });
}
function determineProperty(matchers, userAgent) {
    var recognizedProperty = __assign({}, UnknownProperty);
    matchers.forEach(function (matcher) {
        var regex = matcher[0];
        var matchedValue = matcher[1];
        var match = userAgent.match(regex);
        if (match) {
            recognizedProperty.name = matchedValue;
            if (match[2]) {
                recognizedProperty.versionString = match[2];
                recognizedProperty.version = [];
            }
            else if (match[1]) {
                recognizedProperty.versionString = match[1].replace(/_/g, '.');
                recognizedProperty.version = parseVersion(match[1]);
            }
            else {
                recognizedProperty.versionString = Unknown;
                recognizedProperty.version = [];
            }
        }
    });
    return recognizedProperty;
}
var isBrowser = typeof window !== 'undefined';
var Sniffr = /** @class */ (function () {
    function Sniffr() {
        this.os = UnknownProperty;
        this.device = UnknownProperty;
        this.browser = UnknownProperty;
    }
    Sniffr.prototype.sniff = function (userAgentString) {
        var fallbackUserAgent = isBrowser ? navigator.userAgent : '';
        var userAgent = (userAgentString || fallbackUserAgent).toLowerCase();
        this.os = determineProperty(osMatchers, userAgent);
        this.device = determineProperty(deviceMatchers, userAgent);
        this.browser = determineProperty(browserMatchers, userAgent);
        return this;
    };
    return Sniffr;
}());
exports.default = Sniffr;
exports.RecognizedBrowser = {
    os: UnknownProperty,
    browser: UnknownProperty,
    device: UnknownProperty
};
if (isBrowser) {
    var result = new Sniffr().sniff(navigator.userAgent);
    exports.RecognizedBrowser.os = result.os;
    exports.RecognizedBrowser.device = result.device;
    exports.RecognizedBrowser.browser = result.browser;
}
if (isBrowser && typeof module == 'undefined') {
    window.Sniffr = new Sniffr();
    window.Sniffr.sniff(navigator.userAgent);
}

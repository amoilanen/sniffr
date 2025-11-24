"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
function getUAHintsData() {
    return __awaiter(this, void 0, void 0, function () {
        var uaData, hints, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!navigator || !navigator.userAgentData) {
                        return [2 /*return*/, null];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    uaData = navigator.userAgentData;
                    return [4 /*yield*/, uaData.getHighEntropyValues([
                            'platform',
                            'platformVersion',
                            'architecture',
                            'model',
                            'fullVersionList',
                            'formFactors'
                        ])];
                case 2:
                    hints = _a.sent();
                    return [2 /*return*/, {
                            platform: hints.platform,
                            platformVersion: hints.platformVersion,
                            mobile: uaData.mobile,
                            architecture: hints.architecture,
                            model: hints.model,
                            brands: uaData.brands,
                            fullVersionList: hints.fullVersionList,
                            formFactors: hints.formFactors
                        }];
                case 3:
                    error_1 = _a.sent();
                    // If high entropy values are rejected or not available, return null
                    // This preserves privacy and provides a graceful fallback
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function detectBrowserFromHints(hints) {
    if (!hints.fullVersionList || hints.fullVersionList.length === 0) {
        return null;
    }
    for (var _i = 0, _a = hints.fullVersionList; _i < _a.length; _i++) {
        var brandInfo = _a[_i];
        var brand = brandInfo.brand.toLowerCase();
        var version = brandInfo.version;
        if (brand.includes('microsoft edge') || brand === 'edg') {
            return {
                name: Browser.Edge,
                versionString: version,
                version: parseVersion(version)
            };
        }
        else if (brand.includes('chrome') && !brand.includes('chromium')) {
            return {
                name: Browser.Chrome,
                versionString: version,
                version: parseVersion(version)
            };
        }
        else if (brand === 'chromium') {
            // Continue to next as chromium is not a specific browser
            continue;
        }
        else if (brand.includes('safari') && !brand.includes('chrome')) {
            return {
                name: Browser.Safari,
                versionString: version,
                version: parseVersion(version)
            };
        }
        else if (brand.includes('firefox')) {
            return {
                name: Browser.Firefox,
                versionString: version,
                version: parseVersion(version)
            };
        }
        else if (brand.includes('opera')) {
            return {
                name: Browser.Opera,
                versionString: version,
                version: parseVersion(version)
            };
        }
    }
    return null;
}
function detectOSFromHints(hints) {
    if (!hints.platform) {
        return null;
    }
    var platform = hints.platform.toLowerCase();
    var platformVersion = hints.platformVersion || '';
    if (platform === 'windows') {
        return {
            name: OS.Windows,
            versionString: platformVersion || 'Unknown',
            version: platformVersion ? parseVersion(platformVersion) : []
        };
    }
    else if (platform === 'macos') {
        return {
            name: OS.MacOS,
            versionString: platformVersion || 'Unknown',
            version: platformVersion ? parseVersion(platformVersion) : []
        };
    }
    else if (platform === 'linux') {
        return {
            name: OS.Linux,
            versionString: platformVersion || 'Unknown',
            version: platformVersion ? parseVersion(platformVersion) : []
        };
    }
    else if (platform === 'android') {
        return {
            name: OS.Android,
            versionString: platformVersion || 'Unknown',
            version: platformVersion ? parseVersion(platformVersion) : []
        };
    }
    else if (platform === 'ios') {
        return {
            name: OS.iOS,
            versionString: platformVersion || 'Unknown',
            version: platformVersion ? parseVersion(platformVersion) : []
        };
    }
    else if (platform === 'chromeos') {
        return {
            name: OS.ChromeOS,
            versionString: platformVersion || 'Unknown',
            version: platformVersion ? parseVersion(platformVersion) : []
        };
    }
    return null;
}
function detectDeviceFromHints(hints) {
    var _a, _b;
    if (hints.formFactors && hints.formFactors.length > 0) {
        var formFactor = hints.formFactors[0].toLowerCase();
        if (formFactor === 'tablet') {
            if (((_a = hints.platform) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'ios') {
                return {
                    name: Device.iPad,
                    versionString: 'Unknown',
                    version: []
                };
            }
        }
        else if (formFactor === 'mobile') {
            if (((_b = hints.platform) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'ios') {
                return {
                    name: Device.iPhone,
                    versionString: 'Unknown',
                    version: []
                };
            }
        }
    }
    if (hints.model) {
        var model = hints.model.toLowerCase();
        if (model.includes('iphone')) {
            return {
                name: Device.iPhone,
                versionString: 'Unknown',
                version: []
            };
        }
        else if (model.includes('ipad')) {
            return {
                name: Device.iPad,
                versionString: 'Unknown',
                version: []
            };
        }
        else if (model.includes('nexus')) {
            return {
                name: Device.Nexus,
                versionString: 'Unknown',
                version: []
            };
        }
        else if (model.includes('galaxy')) {
            if (model.includes('nexus')) {
                return {
                    name: Device.GalaxyNexus,
                    versionString: 'Unknown',
                    version: []
                };
            }
            return {
                name: Device.Galaxy,
                versionString: 'Unknown',
                version: []
            };
        }
    }
    return null;
}
var isBrowser = typeof window !== 'undefined';
var Sniffr = /** @class */ (function () {
    function Sniffr() {
        this.os = UnknownProperty;
        this.device = UnknownProperty;
        this.browser = UnknownProperty;
    }
    /**
     * Synchronous sniffing using user agent string only.
     * Useful for backward compatibility and server-side usage.
     * For more accurate detection, use sniffHints() if in a browser.
     */
    Sniffr.prototype.sniff = function (userAgentString) {
        var fallbackUserAgent = isBrowser ? navigator.userAgent : '';
        var userAgent = (userAgentString || fallbackUserAgent).toLowerCase();
        this.os = determineProperty(osMatchers, userAgent);
        this.device = determineProperty(deviceMatchers, userAgent);
        this.browser = determineProperty(browserMatchers, userAgent);
        return this;
    };
    /**
     * Sniffs browser, OS, and device using User-Agent Client Hints API if available,
     * with fallback to user agent string.
     * Requires User-Agent Client Hints API support in the browser.
     * If hints are not available (e.g., Firefox, privacy settings), falls back to user agent string.
     */
    Sniffr.prototype.sniffHints = function (userAgentString) {
        return __awaiter(this, void 0, void 0, function () {
            var fallbackUserAgent, userAgent, hintsData, browserFromHints, osFromHints, deviceFromHints;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fallbackUserAgent = isBrowser ? navigator.userAgent : '';
                        userAgent = (userAgentString || fallbackUserAgent).toLowerCase();
                        hintsData = null;
                        if (!(!userAgentString && (isBrowser || (navigator === null || navigator === void 0 ? void 0 : navigator.userAgentData)))) return [3 /*break*/, 2];
                        return [4 /*yield*/, getUAHintsData()];
                    case 1:
                        hintsData = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (hintsData) {
                            browserFromHints = detectBrowserFromHints(hintsData);
                            osFromHints = detectOSFromHints(hintsData);
                            deviceFromHints = detectDeviceFromHints(hintsData);
                            this.browser = browserFromHints || determineProperty(browserMatchers, userAgent);
                            this.os = osFromHints || determineProperty(osMatchers, userAgent);
                            this.device = deviceFromHints || determineProperty(deviceMatchers, userAgent);
                        }
                        else {
                            this.os = determineProperty(osMatchers, userAgent);
                            this.device = determineProperty(deviceMatchers, userAgent);
                            this.browser = determineProperty(browserMatchers, userAgent);
                        }
                        return [2 /*return*/, this];
                }
            });
        });
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
    var sniffer_1 = new Sniffr();
    sniffer_1.sniffHints().then(function () {
        exports.RecognizedBrowser.os = sniffer_1.os;
        exports.RecognizedBrowser.device = sniffer_1.device;
        exports.RecognizedBrowser.browser = sniffer_1.browser;
    }).catch(function () {
        var fallbackSniffer = new Sniffr().sniff(navigator.userAgent);
        exports.RecognizedBrowser.os = fallbackSniffer.os;
        exports.RecognizedBrowser.device = fallbackSniffer.device;
        exports.RecognizedBrowser.browser = fallbackSniffer.browser;
    });
}
if (isBrowser && typeof module == 'undefined') {
    window.Sniffr = new Sniffr();
    window.Sniffr.sniffHints().catch(function () {
        window.Sniffr.sniff(navigator.userAgent);
    });
}

export declare enum Browser {
    Firefox = "firefox",
    Chrome = "chrome",
    InternetExplorer = "ie",
    Safari = "safari",
    Edge = "edge",
    Android = "com.android.browser",
    Opera = "opera",
    OperaMini = "opera.mini",
    Blackberry = "blackberry",
    Iceweasel = "iceweasel",
    Yandex = "yandex",
    SeaMonkey = "seamonkey"
}
interface UADataValues {
    architecture?: string;
    bitness?: string;
    brands?: Array<{
        brand: string;
        version: string;
    }>;
    formFactors?: string[];
    fullVersionList?: Array<{
        brand: string;
        version: string;
    }>;
    mobile?: boolean;
    model?: string;
    platform?: string;
    platformVersion?: string;
    wow64?: boolean;
    [key: string]: any;
}
interface NavigatorUAData {
    brands: Array<{
        brand: string;
        version: string;
    }>;
    mobile: boolean;
    platform: string;
    getHighEntropyValues(hints: string[]): Promise<UADataValues>;
}
export declare enum OS {
    Linux = "linux",
    MacOS = "macos",
    Windows = "windows",
    iOS = "ios",
    OpenBSD = "openbsd",
    ChromeOS = "chromeos",
    Android = "android",
    FirefoxOS = "firefoxos",
    WindowsPhone = "windows.phone",
    WindowsMobile = "windows.mobile",
    BlackberryOS = "blackberryos"
}
export declare enum Device {
    iPad = "ipad",
    iPhone = "iphone",
    Lumia = "lumia",
    HTC = "htc",
    Nexus = "nexus",
    GalaxyNexus = "galaxy.nexus",
    Nokia = "nokia",
    Galaxy = "galaxy",
    XBox = "xbox",
    Blackberry = "blackberry"
}
export interface RecognizedBrowserProperty<T> {
    name: T | 'Unknown';
    version: number[];
    versionString: string | 'Unknown';
}
export interface RecognizedBrowser {
    os: RecognizedBrowserProperty<OS>;
    browser: RecognizedBrowserProperty<Browser>;
    device: RecognizedBrowserProperty<Device>;
}
declare global {
    interface Navigator {
        userAgentData?: NavigatorUAData;
    }
}
export default class Sniffr {
    os: RecognizedBrowserProperty<OS>;
    device: RecognizedBrowserProperty<Device>;
    browser: RecognizedBrowserProperty<Browser>;
    constructor();
    /**
     * Synchronous sniffing using user agent string only.
     * Useful for backward compatibility and server-side usage.
     * For more accurate detection, use sniffHints() if in a browser.
     */
    sniff(userAgentString?: string): this;
    /**
     * Sniffs browser, OS, and device using User-Agent Client Hints API if available,
     * with fallback to user agent string.
     * Requires User-Agent Client Hints API support in the browser.
     * If hints are not available (e.g., Firefox, privacy settings), falls back to user agent string.
     */
    sniffHints(userAgentString?: string): Promise<this>;
}
export declare const RecognizedBrowser: RecognizedBrowser;
declare global {
    interface Window {
        Sniffr: Sniffr;
    }
}
export {};

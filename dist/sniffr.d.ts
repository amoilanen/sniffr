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
export default class Sniffr {
    os: RecognizedBrowserProperty<OS>;
    device: RecognizedBrowserProperty<Device>;
    browser: RecognizedBrowserProperty<Browser>;
    constructor();
    sniff(userAgentString?: string): this;
}
export declare const RecognizedBrowser: RecognizedBrowser;
declare global {
    interface Window {
        Sniffr: Sniffr;
    }
}

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
export interface RecognizedProperty<T> {
    name: T | 'Unknown';
    version: number[];
    versionString: string | 'Unknown';
}
export default class Sniffr {
    os: RecognizedProperty<OS>;
    device: RecognizedProperty<Device>;
    browser: RecognizedProperty<Browser>;
    constructor();
    sniff(userAgentString?: string): this;
}
declare global {
    interface Window {
        Sniffr: Sniffr;
    }
}

export enum Browser {
  Firefox = 'firefox',
  Chrome = 'chrome',
  InternetExplorer = 'ie',
  Safari = 'safari',
  Edge = 'edge',
  Android = 'com.android.browser',
  Opera = 'opera',
  OperaMini = 'opera.mini',
  Blackberry = 'blackberry',
  Iceweasel = 'iceweasel',
  Yandex = 'yandex',
  SeaMonkey = 'seamonkey'
}

export enum OS {
  Linux = 'linux',
  MacOS = 'macos',
  Windows = 'windows',
  iOS = 'ios',
  OpenBSD = 'openbsd',
  ChromeOS = 'chromeos',
  Android = 'android',
  FirefoxOS = 'firefoxos',
  WindowsPhone = 'windows.phone',
  WindowsMobile = 'windows.mobile',
  BlackberryOS = 'blackberryos',
}

export enum Device {
  iPad = 'ipad',
  iPhone = 'iphone',
  Lumia = 'lumia',
  HTC = 'htc',
  Nexus = 'nexus',
  GalaxyNexus = 'galaxy.nexus',
  Nokia = 'nokia',
  Galaxy = 'galaxy',
  XBox = 'xbox',
  Blackberry = 'blackberry',
}

const browserMatchers: [RegExp, Browser][] = [
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
]

const osMatchers: [RegExp, OS][] = [
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
]

const deviceMatchers: [RegExp, Device][] = [
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
]

const Unknown = 'Unknown'
const UnknownProperty: RecognizedBrowserProperty<any> = {
  name: Unknown,
  version: [],
  versionString: Unknown
}

export interface RecognizedBrowserProperty<T> {
  name: T | 'Unknown'
  version: number[]
  versionString: string | 'Unknown'
}

export interface RecognizedBrowser {
  os: RecognizedBrowserProperty<OS>,
  browser: RecognizedBrowserProperty<Browser>,
  device: RecognizedBrowserProperty<Device>
}

function parseVersion(versionString: string) {
  return versionString.split(/[\._]/).map(function(versionPart) {
    return parseInt(versionPart);
  }).filter(versionPart =>
    !isNaN(versionPart)
  )
}

function determineProperty<T>(matchers: [RegExp, T][], userAgent: string): RecognizedBrowserProperty<T> {
  const recognizedProperty: RecognizedBrowserProperty<T> = {...UnknownProperty}
  matchers.forEach(function(matcher) {
    const regex = matcher[0]
    const matchedValue = matcher[1]
    const match = userAgent.match(regex)

    if (match) {
      recognizedProperty.name = matchedValue;

      if (match[2]) {
        recognizedProperty.versionString = match[2]
        recognizedProperty.version = []
      } else if (match[1]) {
        recognizedProperty.versionString = match[1].replace(/_/g, '.')
        recognizedProperty.version = parseVersion(match[1])
      } else {
        recognizedProperty.versionString = Unknown
        recognizedProperty.version = []
      }
    }
  });
  return recognizedProperty
}

const isBrowser = typeof window !== 'undefined'

export default class Sniffr {
  os: RecognizedBrowserProperty<OS>
  device: RecognizedBrowserProperty<Device>
  browser: RecognizedBrowserProperty<Browser>
  constructor() {
    this.os = UnknownProperty
    this.device = UnknownProperty
    this.browser = UnknownProperty
  }
  sniff(userAgentString?: string): this {
    const fallbackUserAgent = isBrowser ? navigator.userAgent : ''
    const userAgent = (userAgentString || fallbackUserAgent).toLowerCase()

    this.os = determineProperty(osMatchers, userAgent)
    this.device = determineProperty(deviceMatchers, userAgent)
    this.browser = determineProperty(browserMatchers, userAgent)
    return this;
  }
}

export const RecognizedBrowser: RecognizedBrowser = {
  os: UnknownProperty,
  browser: UnknownProperty,
  device: UnknownProperty
}

if (isBrowser) {
  const result = new Sniffr().sniff(navigator.userAgent)
  RecognizedBrowser.os = result.os
  RecognizedBrowser.device = result.device
  RecognizedBrowser.browser = result.browser
}

/*
 * Keeping compatibility with the scenarios where Sniffr is used as a standalone script on a page
 */
declare global {
  interface Window {Sniffr: Sniffr}
}

if (typeof window !== 'undefined') {
  window.Sniffr = new Sniffr()
  window.Sniffr.sniff(navigator.userAgent);
}
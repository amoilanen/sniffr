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

// Type definitions for the User-Agent Client Hints API
interface UADataValues {
  architecture?: string
  bitness?: string
  brands?: Array<{ brand: string; version: string }>
  formFactors?: string[]
  fullVersionList?: Array<{ brand: string; version: string }>
  mobile?: boolean
  model?: string
  platform?: string
  platformVersion?: string
  wow64?: boolean
  [key: string]: any
}

interface NavigatorUAData {
  brands: Array<{ brand: string; version: string }>
  mobile: boolean
  platform: string
  getHighEntropyValues(hints: string[]): Promise<UADataValues>
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

interface UAHintsData {
  platform?: string
  platformVersion?: string
  mobile?: boolean
  architecture?: string
  model?: string
  brands?: Array<{ brand: string; version: string }>
  fullVersionList?: Array<{ brand: string; version: string }>
  formFactors?: string[]
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

declare global {
  interface Navigator {
    userAgentData?: NavigatorUAData
  }
}

async function getUAHintsData(): Promise<UAHintsData | null> {
  if (!navigator || !navigator.userAgentData) {
    return null
  }

  try {
    const uaData = navigator.userAgentData
    const hints = await uaData.getHighEntropyValues([
      'platform',
      'platformVersion',
      'architecture',
      'model',
      'fullVersionList',
      'formFactors'
    ])
    
    return {
      platform: hints.platform,
      platformVersion: hints.platformVersion,
      mobile: uaData.mobile,
      architecture: hints.architecture,
      model: hints.model,
      brands: uaData.brands,
      fullVersionList: hints.fullVersionList,
      formFactors: hints.formFactors
    }
  } catch (error) {
    // If high entropy values are rejected or not available, return null
    // This preserves privacy and provides a graceful fallback
    return null
  }
}

function detectBrowserFromHints(hints: UAHintsData): RecognizedBrowserProperty<Browser> | null {
  if (!hints.fullVersionList || hints.fullVersionList.length === 0) {
    return null
  }

  for (const brandInfo of hints.fullVersionList) {
    const brand = brandInfo.brand.toLowerCase()
    const version = brandInfo.version

    if (brand.includes('microsoft edge') || brand === 'edg') {
      return {
        name: Browser.Edge,
        versionString: version,
        version: parseVersion(version)
      }
    } else if (brand.includes('chrome') && !brand.includes('chromium')) {
      return {
        name: Browser.Chrome,
        versionString: version,
        version: parseVersion(version)
      }
    } else if (brand === 'chromium') {
      // Continue to next as chromium is not a specific browser
      continue
    } else if (brand.includes('safari') && !brand.includes('chrome')) {
      return {
        name: Browser.Safari,
        versionString: version,
        version: parseVersion(version)
      }
    } else if (brand.includes('firefox')) {
      return {
        name: Browser.Firefox,
        versionString: version,
        version: parseVersion(version)
      }
    } else if (brand.includes('opera')) {
      return {
        name: Browser.Opera,
        versionString: version,
        version: parseVersion(version)
      }
    }
  }

  return null
}

function detectOSFromHints(hints: UAHintsData): RecognizedBrowserProperty<OS> | null {
  if (!hints.platform) {
    return null
  }

  const platform = hints.platform.toLowerCase()
  const platformVersion = hints.platformVersion || ''

  if (platform === 'windows') {
    return {
      name: OS.Windows,
      versionString: platformVersion || 'Unknown',
      version: platformVersion ? parseVersion(platformVersion) : []
    }
  } else if (platform === 'macos') {
    return {
      name: OS.MacOS,
      versionString: platformVersion || 'Unknown',
      version: platformVersion ? parseVersion(platformVersion) : []
    }
  } else if (platform === 'linux') {
    return {
      name: OS.Linux,
      versionString: platformVersion || 'Unknown',
      version: platformVersion ? parseVersion(platformVersion) : []
    }
  } else if (platform === 'android') {
    return {
      name: OS.Android,
      versionString: platformVersion || 'Unknown',
      version: platformVersion ? parseVersion(platformVersion) : []
    }
  } else if (platform === 'ios') {
    return {
      name: OS.iOS,
      versionString: platformVersion || 'Unknown',
      version: platformVersion ? parseVersion(platformVersion) : []
    }
  } else if (platform === 'chromeos') {
    return {
      name: OS.ChromeOS,
      versionString: platformVersion || 'Unknown',
      version: platformVersion ? parseVersion(platformVersion) : []
    }
  }

  return null
}

function detectDeviceFromHints(hints: UAHintsData): RecognizedBrowserProperty<Device> | null {
  if (hints.formFactors && hints.formFactors.length > 0) {
    const formFactor = hints.formFactors[0].toLowerCase()
    
    if (formFactor === 'tablet') {
      if (hints.platform?.toLowerCase() === 'ios') {
        return {
          name: Device.iPad,
          versionString: 'Unknown',
          version: []
        }
      }
    } else if (formFactor === 'mobile') {
      if (hints.platform?.toLowerCase() === 'ios') {
        return {
          name: Device.iPhone,
          versionString: 'Unknown',
          version: []
        }
      }
    }
  }

  if (hints.model) {
    const model = hints.model.toLowerCase()
    
    if (model.includes('iphone')) {
      return {
        name: Device.iPhone,
        versionString: 'Unknown',
        version: []
      }
    } else if (model.includes('ipad')) {
      return {
        name: Device.iPad,
        versionString: 'Unknown',
        version: []
      }
    } else if (model.includes('nexus')) {
      return {
        name: Device.Nexus,
        versionString: 'Unknown',
        version: []
      }
    } else if (model.includes('galaxy')) {
      if (model.includes('nexus')) {
        return {
          name: Device.GalaxyNexus,
          versionString: 'Unknown',
          version: []
        }
      }
      return {
        name: Device.Galaxy,
        versionString: 'Unknown',
        version: []
      }
    }
  }

  return null
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
  
  /**
   * Synchronous sniffing using user agent string only.
   * Useful for backward compatibility and server-side usage.
   * For more accurate detection, use sniffHints() if in a browser.
   */
  sniff(userAgentString?: string): this {
    const fallbackUserAgent = isBrowser ? navigator.userAgent : ''
    const userAgent = (userAgentString || fallbackUserAgent).toLowerCase()

    this.os = determineProperty(osMatchers, userAgent)
    this.device = determineProperty(deviceMatchers, userAgent)
    this.browser = determineProperty(browserMatchers, userAgent)
    return this;
  }

  /**
   * Sniffs browser, OS, and device using User-Agent Client Hints API if available,
   * with fallback to user agent string.
   * Requires User-Agent Client Hints API support in the browser.
   * If hints are not available (e.g., Firefox, privacy settings), falls back to user agent string.
   */
  async sniffHints(userAgentString?: string): Promise<this> {
    const fallbackUserAgent = isBrowser ? navigator.userAgent : ''
    const userAgent = (userAgentString || fallbackUserAgent).toLowerCase()

    let hintsData: UAHintsData | null = null
    if (!userAgentString && (isBrowser || navigator?.userAgentData)) {
      hintsData = await getUAHintsData()
    }
    if (hintsData) {
      const browserFromHints = detectBrowserFromHints(hintsData)
      const osFromHints = detectOSFromHints(hintsData)
      const deviceFromHints = detectDeviceFromHints(hintsData)
      this.browser = browserFromHints || determineProperty(browserMatchers, userAgent)
      this.os = osFromHints || determineProperty(osMatchers, userAgent)
      this.device = deviceFromHints || determineProperty(deviceMatchers, userAgent)
    } else {
      this.os = determineProperty(osMatchers, userAgent)
      this.device = determineProperty(deviceMatchers, userAgent)
      this.browser = determineProperty(browserMatchers, userAgent)
    }
    return this;
  }
}

export const RecognizedBrowser: RecognizedBrowser = {
  os: UnknownProperty,
  browser: UnknownProperty,
  device: UnknownProperty
}

if (isBrowser) {
  const sniffer = new Sniffr()
  sniffer.sniffHints().then(() => {
    RecognizedBrowser.os = sniffer.os
    RecognizedBrowser.device = sniffer.device
    RecognizedBrowser.browser = sniffer.browser
  }).catch(() => {
    const fallbackSniffer = new Sniffr().sniff(navigator.userAgent)
    RecognizedBrowser.os = fallbackSniffer.os
    RecognizedBrowser.device = fallbackSniffer.device
    RecognizedBrowser.browser = fallbackSniffer.browser
  })
}

declare global {
  interface Window {Sniffr: Sniffr}
}

if (isBrowser && typeof module == 'undefined') {
  window.Sniffr = new Sniffr()
  window.Sniffr.sniffHints().catch(() => {
    window.Sniffr.sniff(navigator.userAgent)
  })
}
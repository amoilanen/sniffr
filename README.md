<img src="http://publicdomainvectors.org/photos/bastiyxc_schn_ffelhund.png" alt="sniff-sniff..." width="150px" height="100px"/>

Browser, OS and device detection based on the available user agent string. Can be used both in a browser (also as a standalone script) or in a server environment.

>it's very rarely a good idea to use user agent sniffing. You can almost always find a better, more broadly compatible way to solve your problem! [MDN: Browser detection using the user agent](https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent)

## Why use it

In case some browser-specific issue cannot be fixed uniformly across browsers we may need to perform some browser detection. For example, browser X crashes when function Y from library Z is used, so we have to detect when we are dealing with browser X and disable library Z.

## What is recognized

### Browsers

* Firefox
* Internet Explorer
* Edge
* Chrome
* Opera
* Opera mini
* Safari
* Android Browser
* BlackBerry Browser
* Yandex Browser
* SeaMonkey

### Operating Systems

* Windows
* Linux
* Mac OS
* ChromeOS
* iOS
* Blackberry OS
* OpenBSD
* Android
* Firefox OS
* Windows Phone
* Windows Mobile

### Devices

* iPad
* iPhone
* Galaxy
* HTC
* Nexus
* Nokia
* Lumia
* Blackberry
* XBox

## Installation

### NPM

To install the library use npm:

```bash
npm install sniffr
```

### As a standalone script in a browser

Hosted version (by jsDelivr) can be found here (replace the version number) https://cdn.jsdelivr.net/gh/amoilanen/sniffr@1.2.2/dist/sniffr.min.js

https://github.com/amoilanen/sniffr/blob/master/dist/sniffr.min.js is a downloadable minified version of the library to be used as a standalone script
in a browser.

## How to use in a browser

### NPM

The library is can be directly used in a browser, no server-side code is run. Sniffr is written in Typescript and includes all the necessary typings.

```javascript
import { RecognizedBrowser } from "sniffr"

//If Windows and Firefox 28 or later
if (RecognizedBrowser.os.name === "windows"
  && RecognizedBrowser.browser.name === "firefox" && RecognizedBrowser.browser.version[0] >= 28) {
  //Apply some workaround
}
```

For backward compatibility purposes the following more wordy legacy usage pattern is also supported:

```javascript
import Sniffr from "sniffr"

const sniffr = new Sniffr()
sniffr.sniff()

//If Windows and Firefox 28 or later
if (sniffr.os.name === "windows"
  && sniffr.browser.name === "firefox" && sniffr.browser.version[0] >= 28) {
  //Apply some workaround
}
```

### As a standalone script

When the script is loaded `Sniffr` object will be initialized and put to the global namespace, it can be accessed directly:

```javascript
//If Windows and Firefox 28 or later
if (Sniffr.os.name === "windows"
  && Sniffr.browser.name === "firefox" && Sniffr.browser.version[0] >= 28) {
  //Apply some workaround
}
```

## API

`RecognizedBrowser.os`: operating system
`RecognizedBrowser.browser`: browser
`RecognizedBrowser.device`: device

`Sniffr.sniff` : function that expects a user agent string as an argument, it is called automatically in a browser

## How to use on the server side

Sniffr can also be used in a Node.js environment in case you need to do some server-side user agent analysis as well.

First install it

`npm install sniffr`

Then load the module, provide it the agent string and query the results just like in a browser environment:

```javascript
var Sniffr = require("sniffr");
var s = new Sniffr();

s.sniff("Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25");

console.log("Operating System:");
console.log(s.os);
console.log("Browser:");
console.log(s.browser);
console.log("Device:");
console.log(s.device);
```

## Other libraries

Some libraries like _jQuery_ provide only browser information and not the OS information. Some like _Detectizr_ are plugins for other libraries that you may not use. And some require server-side code. A few libraries are usable only on the server or only in a browser.

_Sniffr_ provides simple and symmetric API, does not depend on other libraries, does not require the server part, is tiny, fast and easily extensible. In addition, it can be used both in browser and server environments.

## Credits

The original sniffing dog image location is http://publicdomainvectors.org/en/free-clipart/Dog-sniffing-vector-image/11807.html

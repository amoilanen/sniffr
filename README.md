<img src="http://publicdomainvectors.org/photos/bastiyxc_schn_ffelhund.png" alt="sniff-sniff..." width="150px" height="100px"/>

# Sniffr [![Build Status](https://travis-ci.org/antivanov/sniffr.svg?branch=master)](https://travis-ci.org/antivanov/sniffr)

Browser, OS and device detection based on the available user agent string.

>it's very rarely a good idea to use user agent sniffing. You can almost always find a better, more broadly compatible way to solve your problem! [MDN: Browser detection using the user agent](https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent)

## Why use it

In case some browser-specific issue cannot be fixed by applying the same code uniformly across the browsers we may need to do (sad gasp) some browser detection. For example, browser X crashes when function Y from library Z is used, so we have to detect when we are dealing with browser X and disable library Z.

Another legitimate case is when you need to know which browsers, os and devices are most frequently used by users of your site. Then you may want to send the data obtained via Sniffer to the server for further processing.

## What is recognized

### Browsers

* Firefox
* Internet Explorer
* Chrome
* Opera
* Safari
* Android Browser
* BlackBerry Browser
* Opera mini

### Operating Systems

* Windows
* Linux
* Mac OS
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
* Blackberry

## Installation
To install the library just use bower:

``` javascript
bower install sniffr
```

Ready to use library is available in the _dist_ folder.

## How to use

The library is meant to be used only in a browser, no server-side code is run. Include the library:

```html
<script src="bower_components/dist/sniffr.min.js" />
```

after the page has loaded the object ```Sniffr``` is available and can be used in the client code.

Example:

```javascript
//If Windows and Firefox 28 or later
if (Sniffr.os.name === "windows"
  && Sniffr.browser.name === "firefox" && Sniffr.browser.version[0] >= 28) {
  //Apply some workaround
}
```

Example:

```javascript
//Sending user browser and os information to the server for further analysis
Stats.send(Sniffr.os, Sniffr.browser);
```

## API

`Sniffr.os`: operating system

`Sniffr.browser`: browser

`Sniffr.device`: device

`Sniffr.sniff` : function that expects a user agent string as an argument, it is called automatically in a browser

## Using it on the server side

Sniffr can also be used as a Node module in case you need to do some server-side user agent recognition as well.

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

Some libraries like _jQuery_ provide only browser information and not the OS information. Others like _Detectizr_ are plugins for yet another libraries that you may not use. Yet others require some server-side code. Many libraries are usable only on the server side or only in a browser.

_Sniffr_ provides simple and symmetric API, does not depend on other libraries, does not require the server part, is tiny, fast and easily extensible. In addition, it can be used both in a browser and on the server side.

## Credits

The original sniffing dog image location is http://publicdomainvectors.org/en/free-clipart/Dog-sniffing-vector-image/11807.html
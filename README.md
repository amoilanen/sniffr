<img src="http://publicdomainvectors.org/photos/bastiyxc_schn_ffelhund.png" alt="sniff-sniff..." width="150px" height="100px"/>

# Sniffr [![Build Status](https://travis-ci.org/antivanov/sniffr.svg?branch=master)](https://travis-ci.org/antivanov/sniffr)

Browser, OS and device detection based on the available user agent string.

>it's very rarely a good idea to use user agent sniffing. You can almost always find a better, more broadly compatible way to solve your problem! [MDN: Browser detection using the user agent](https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent)

## Why use it

In case some browser-specific issue cannot be fixed uniformly across the browsers we may need to perform (sad gasp) some browser detection. For example, browser X crashes when function Y from library Z is used, so we have to detect when we are dealing with browser X and disable library Z.

Another legitimate case is when we want to know what browsers, os and devices are most frequently used when our site is accessed. Then we can just analyze the user agent string sent in HTTP request headers on a server side. As a minor variation, alternatively, we can perform the user agent string analysis on the client side and send to the server only the results.

## What is recognized

### Browsers

* Firefox
* Internet Explorer
* Edge
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
* Lumia
* Blackberry
* XBox

## Installation
To install the library use Bower:

``` javascript
bower install sniffr
```

Ready to use library is available in the _dist_ folder.

## How to use

The library is meant to be used only in a browser, no server-side code is run. Include the library:

```html
<script src="bower_components/dist/sniffr.min.js" />
```

after the script has loaded the object ```Sniffr``` is available and can be used in the client code.

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
Stats.send(Sniffr.os, Sniffr.browser, Sniffr.device);
```

## API

`Sniffr.os`: operating system

`Sniffr.browser`: browser

`Sniffr.device`: device

`Sniffr.sniff` : function that expects a user agent string as an argument, it is called automatically in a browser

## Server side

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

Some libraries like _jQuery_ provide only browser information and not the OS information. Some like _Detectizr_ are plugins for other libraries that you may not use. And some require server-side code. A few libraries are usable only on the server side or only in a browser.

_Sniffr_ provides simple and symmetric API, does not depend on other libraries, does not require the server part, is tiny, fast and easily extensible. In addition, it can be used either in a browser environment and on the server side.

## Credits

The original sniffing dog image location is http://publicdomainvectors.org/en/free-clipart/Dog-sniffing-vector-image/11807.html

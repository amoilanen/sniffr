Sniffr [![Build Status](https://travis-ci.org/antivanov/jsAspect.svg?branch=master)](https://travis-ci.org/antivanov/jsAspect)
========

Browser, OS and device detection in browser based on the available user agent string.

>it's very rarely a good idea to use user agent sniffing. You can almost always find a better, more broadly compatible way to solve your problem! [MDN: Browser detection using the user agent](https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent)

## Why use it

In case some browser-specific issue cannot be fixed by applying the same code uniformly across the browsers we may need to do (sad gasp) some browser detection. For example, browser X crashes when function Y from library Z is used, so we have to detect when we are dealing with browser X and disable library Z.

Another legitimate case is when you need to know which browsers, os and devices are most frequently used by users of your site. Then you may want to send the data obtained via Sniffer to the server for further processing.

## What is recognized

### Browsers

* Internet Explorer
* Firefox
* Chrome
* Safari
* Android stock browser
* Opera mini

### Operating Systems

* Windows
* Linux
* Mac OS
* iOS
* OpenBSD
* Android
* Firefox OS
* Windows Phone
* Windows Mobile

### Devices

* iPad
* iPhone
* HTC
* Nexus
* Nokia
* Galaxy

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
//If Windows and Firefox
if (Sniffr.os.name === "windows" && Sniffr.browser.name === "firefox") {
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

## Other libraries

Some libraries provide only browser information and not the OS information like _jQuery_ are plugins for other libraries that you may not use like _Detectizr_ or require some server-side code.

_Sniffr_ provides simple and symmetric API, does not require the server part, is tiny, fast and easily extensible.
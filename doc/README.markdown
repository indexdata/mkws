% The MasterKey Widget Set
% Mike Taylor; Wolfram Schneider
% 28 July 2014


Introduction
------------

This is the MasterKey Widget Set. It provides a way to insert
searching and other information-related functionality into existing
web pages as small snippets of HTML.

As much of the searching functionality as possible is hosted on
	<http://mkws.indexdata.com/>
so that very simple applications such as
	<http://example.indexdata.com/simple.html>
can have MasterKey searching with minimal effort.

The following files are hosted on `mkws.indexdata.com`:

* `mkws.js` (and its compressed version `mkws.min.js`)
* `/pazpar2/js/pz2.js`
* `mkws-complete.js` (and its compressed version `mkws-complete.min.js`)
  -- a single file consisting of `mkws.js` together with the files it
  uses: `pz2.js` jQuery, jQuery-JSON and Handlebars.
* Local copy of `jquery-1.10.0.min.js`
* Local copy of `jquery.json-2.4.js`
* Local copy of `handlebars-v1.1.2.js`
* `mkws.css`


Supported Browsers
------------------

Any modern browser will work fine. JavaScript must be enabled.

* IE8 or later
* Firefox 17 or later
* Google Chrome 27 or later
* Safari 6 or later
* Opera  12 or later
* iOS 6.x (iPhone, iPad)
* Android 4.x

Not supported: IE6, IE7


Configuring a client (short version)
------------------------------------

The application's HTML must contains the following elements as well as
whatever makes up the application itself:

Prerequisites:

~~~
	<link rel="stylesheet" href="http://mkws.indexdata.com/mkws.css" />
	<script type="text/javascript" src="http://mkws.indexdata.com/mkws-complete.js"></script>
~~~

Then the following special `<div>`s can be added (with no content), and
will be filled in by MKWS:

* `<div id="mkwsSwitch"></div>` -- switch between record and target views
* `<div id="mkwsLang"></div>  ` -- switch between English, Danish and German
* `<div id="mkwsSearch"></div>` -- search box and button
* `<div id="mkwsResults"></div>` -- result list, including pager/sorting
* `<div id="mkwsTargets"></div>` -- target list, including status
* `<div id="mkwsStat"></div>` -- summary statistics

You can configure and control the client by creating an `mkws_config`
object before loading the widget-set. Here is an example showing how
to use options to offer a choice between English and German UI
languages, and to default to sorting by title ascending:

~~~
    <script type="text/javascript">
      var mkws_config = {
        lang_options: ["en", "de" ],
        sort_default: "title:1"
      };
    </script>
~~~

For much more detail, see:

* [Embedded metasearching with the MasterKey Widget Set](mkws-manual.html)
* [MKWS Target Selection](library-configuration.html)


- - -

Copyright 2014 IndexData ApS. <http://indexdata.com>

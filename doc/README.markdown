% The MasterKey Widget Set
% Mike Taylor; Wolfram Schneider
% 28 July 2014


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
[Embedded metasearching with the MasterKey Widget Set](mkws-manual.html)


- - -

Copyright 2014 Index Data ApS. <http://indexdata.com>

% An embryonic MasterKey Widget Set
% Mike Taylor; Wolfram Schneider
% 10 July 2013


This directory contains an embryonic MasterKey Widget Set. The initial
version was based on the "jsdemo" application distributed with
pazpar2, but it is now far removed from those beginnnings.


How this works
--------------

The goal is to make it that as much of the searching functionality as
possible is hosted on
	<http://mkws.indexdata.com/>
so that very simple websites such as
	<http://example.indexdata.com/>
can have MasterKey searching with minimal effort.

The following files are hosted on mkws.indexdata.com:

* `mkws.js`
* `mkwsStyle.css`
* `/libjs-pz2/pz2api.1.js`

The following files make up an application:

* `index.html`
* `favicon.ico` [_optional_]
* `robots.txt` [_optional_]


Configuring a client
--------------------

The application's HTML must contains the following elements as well as
whatever makes up the application itself:

Prerequisites:

~~~
	<link rel="stylesheet" href="http://mkws.indexdata.com/mkwsStyle.css" />
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

At present, MKWS may not work correctly if some of these are
missing. One of the TODOs is to fix it so that it doesn't try to use
whatever is not there, and just uses what is.

You can configure and control the client by creating an `mkws_config`
object _before_ loading the widget-set.  Here is an example of all
possible options:

~~~
	<script type="text/javascript">
	    var mkws_config = {
		use_service_proxy: true,    /* true, flase: use service proxy instead pazpar2 */
		switch_menu: true, 	    /* true, false: show/hide Records|Targets menu */
		lang_menu: true, 	    /* true, false: show/hide language menu */
		sort_menu: true, 	    /* true, false: show/hide sort menu */
		perpage_menu: true, 	    /* true, false: show/hide perpage menu */
		lang_display: ["en", "de", "da"], /* display languages links for given
						     languages, [] for all */
		facets: ["sources", "subjects", "authors"], /* display facets, in this order, [] for none */
		sort_default: "relevance",  /* "relevance", "title:1", "date:0", "date:1" */
		query_width: 50,	    /* 5..50 */
		perpage_default: 20,	    /* 10, 20, 30, 50 */
		lang: "en",                 /* "en", "de", "da" */
		debug: 0,     		    /* debug level for development: 0..2 */

		responsive_design: false    /* true, false: resize for smaller mobile devices */
		pazpar2_url: "/pazpar2/search.pz2",   	   /* URL */
		service_proxy_url: "/service-proxy/", 	   /* URL */
		service_proxy_auth: "/service-proxy-auth", /* URL */
	    };
	</script>
~~~

jQuery plugin
------------------

The jQuery plugin version can be used by a single line of JavaScript code:

~~~
	<script>jQuery.pazpar2();</script>
~~~

put the code in your page at the position where the metasearch should occur.

Here is an example of all possible options

~~~
	jQuery.pazpar2({
	    "layout": "popup",               /* "table" [default], "div", "popup" */
	    "id_button": "input#mkwsButton", /* submit button id in search field */
	    "id_popup": "#mkwsPopup",        /* internal id of popup window */
	    "width": 880,                    /* popup width, should be at least 800 */ 
	    "height": 760                    /* popup height, should be at least 600 */
	});
~~~


Supported Browsers
------------------

Any modern HTML5 browser will work fine. JavaScript must be enabled.

* IE8 or later
* Firefox 17 or later
* Google Chrome 27 or later
* Safari 6 or later
* Opera  12 or later
* iOS 6.x (iPhone, iPad)
* Android 4.x

Not supported: IE6, IE7


New Features since jsdemo
--------------------------

- Multilinguality: English (default), Danish, German
- Depends on the new pazpar2 JS library libjs-pz2/pz2api.1.js
  which will make the development of pazpar2 plugins faster and
  easier to share code between projects
- Supports basic pazpar2 and service-proxy requests
- Simplified HTML
- The search page is fully configurable by a JSON object


What next?
----------

Main areas of work:

* Make MKWS robust to missing widgets
* Clean up the code

- - -
\(c) 2013 by IndexData ApS, <http://www.indexdata.com>


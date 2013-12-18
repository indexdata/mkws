% The MasterKey Widget Set
% Mike Taylor; Wolfram Schneider
% 10 July 2013


Introduction
------------

This is the MasterKey Widget Set. The initial version was based on the
"jsdemo" application distributed with pazpar2, but it is now far
removed from those beginnnings.

As much of the searching functionality as possible is hosted on
	<http://mkws.indexdata.com/>
so that very simple websites such as
	<http://example.indexdata.com/>
can have MasterKey searching with minimal effort.

The following files are hosted on `mkws.indexdata.com`:

* `mkws.js`
* `/pazpar2/js/pz2.js`
* `mkws-complete.js` -- a single file consisting of `mkws.js`,
  jQuery (which it uses), Handlebars (ditto) and `pz2.js`
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


Configuring a client
--------------------

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
object _before_ loading the widget-set.  Here is an example of all
possible options:

~~~
    <script type="text/javascript">
      var mkws_config = {
        use_service_proxy: true,    /* true, flase: use service proxy instead pazpar2 */
        show_lang: true,            /* true, false: show/hide language menu */
        show_sort: true,            /* true, false: show/hide sort menu */
        show_perpage: true,         /* true, false: show/hide perpage menu */
        lang_options: ["en", "de", "da"],
                                    /* display languages links for given languages, [] for all */
        facets: ["sources", "subjects", "authors"],
                                    /* display facets, in this order, [] for none */
        sort_default: "relevance",  /* "relevance", "title:1", "date:0", "date:1" */
        query_width: 50,            /* 5..50 */
        perpage_default: 20,        /* 10, 20, 30, 50 */
        lang: "en",                 /* "en", "de", "da" */
        debug_level: 0,             /* debug level for development: 0..2 */

        responsive_design_wodth: 600,    /* page reflows for devices < 600 pixels wide */
        pazpar2_url: "/service-proxy/",            /* URL */
        service_proxy_auth: "/service-proxy-auth", /* URL */
        // TODO: language_*, perpage_options, sort_options
      };
    </script>
~~~

For much more detail, see
[the MKWS whitepaper](whitepaper.html).


- - -

Copyright 2013 IndexData ApS. <http://indexdata.com>

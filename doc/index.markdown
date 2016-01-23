% MKWS: the MasterKey Widget Set
% Mike Taylor
% November 2014


Add metasearching to your web-site painlessly
---------------------------------------------

The MasterKey Widget Set provides the easiest possible way to enhance
an existing web-site with customised searching across multiple
sources, ranking and merging the results.

As much of the searching functionality as possible is hosted on
`http://mkws.indexdata.com/` so that very simple applications such as
<http://example.indexdata.com/simple.html> can have MasterKey
searching with minimal effort.  All you need to do is pull in our
JavaScript and optional stylesheet, then add `<div>`s to your page
that have special `class` attributes. We do the rest.

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

A minimal example
-----------------

Here is a completely functional (though ugly) MKWS-based
searching application [[link]](http://example.indexdata.com/minimal.html)

	<script type="text/javascript" src="http://mkws.indexdata.com/mkws-complete.js"></script>
	<div class="mkwsSearch"></div>
	<div class="mkwsResults"></div>

That's it. A complete metasearching application. Everything
else is refinement.

Configuring a client (short version)
------------------------------------

The application's HTML must contain the following elements, as well as
whatever makes up the application itself:

	<script type="text/javascript" src="http://mkws.indexdata.com/mkws-complete.js"></script>
	<link rel="stylesheet" href="http://mkws.indexdata.com/mkws.css" />

These lines pull in JavaScript code and the default styles. (The
latter may be omitted or replaced with application-specific styles for
the widgets.)

Then the following special `<div>`s can be added (with no content), and
will be filled in by MKWS:

* `<div class="mkwsSearch"></div>` -- search box and button
* `<div class="mkwsResults"></div>` -- result list, including pager/sorting
* `<div class="mkwsStat"></div>` -- summary statistics
* `<div class="mkwsSwitch"></div>` -- switch between record and target views
* `<div class="mkwsTargets"></div>` -- target list, including status
* `<div class="mkwsLang"></div>  ` -- switch between languages, e.g. English, Danish and German

You can configure and control the client by creating an `mkws_config`
object. Here is an example showing how to use options to offer a
choice between English and German UI languages, and to default to
sorting by title ascending:

	<script type="text/javascript">
	  var mkws_config = {
	    lang_options: [ "en", "de" ],
	    sort_default: "title:1"
	  };
	</script>

Detailed documentation
----------------------

Apart from [this file](index.html) and its [PDF version](index.pdf):

* The [MKWS manual, including a reference section](mkws-manual.html)
  [[PDF version]](mkws-manual.pdf)
* The [MKWS developers' guide](mkws-developer.html)
  [[PDF version]](mkws-developer.pdf)

Widget files
------------

Here are the files that this web-site provides:

* [mkws.js](mkws.js) --
  JavaScript code that powers the MasterKey Widget Set
* [pazpar2/js/pz2.js](pazpar2/js/pz2.js) --
  Low-level JavaScript library for access to the MasterKey web
  service.
* [handlebars-v2.0.0.js](handlebars-v2.0.0.js) --
  A local copy of
  [the Handlebars templating library](//handlebarsjs.com/),
  since it doesn't like to be hotlinked.
* Local copy of [jquery-1.10.0.min.js](jquery-1.10.0.min.js)
* Local copy of [jquery.json-2.4.js](jquery.json-2.4.js)
* Local copy of [jsnlog.min.js](jsnlog.min.js)
* [mkws-complete.js](mkws-complete.js) --
  A single large JavaScript file containing everything needed for
  MKWS to work: the widget-set itself, the API library, and
  the prerequisites jQuery and Handlebars.
* [mkws.css](mkws.css) --
  A stylesheet which styles only MasterKey widgets, and does not
  otherwise interfere with application-site's styles.

Minified versions of the MKWS JavaScript files are also available:

* [mkws.min.js](mkws.min.js)
* [mkws-complete.min.js](mkws-complete.min.js)

### Specific versions

The links above to the various forms of the widget-set JavaScript
([mkws.js](mkws.js),
[mkws-complete.js](mkws-complete.js),
[mkws.min.js](mkws.min.js)
and
[mkws-complete.min.js](mkws-complete.min.js))
together with the CSS file
([mkws.css](mkws.css))
are always to the current versions of those
files. Applications that rely on a particular version can
instead use the specific numbered versions in
[the releases area](releases/),
for example
[releases/mkws-0.9.1.js](releases/mkws-0.9.1.js).
and
[releases/mkws-0.9.1.css](releases/mkws-0.9.1.css).

The current version number is always in
[the VERSION file](VERSION).

Version history is in
[the NEWS file](NEWS).

Examples using the widget-set
-----------------------------

It's worth viewing the source of these to see how small they
are and how various things are done.

### Simple examples

* A very simple application at <http://example.indexdata.com/simple.html>
* [The absolutely minimal application](//example.indexdata.com/minimal.html)
  listed above.
* [A more detailed version](//example.indexdata.com/language.html)
  that contains a configuration structure instead of accepting the
  defaults. Includes a custom translation option to present the
  application in Arabic.
* [A version suitable for mobile devices](//example.indexdata.com/mobile.html)
  with a responsive design that moves components around depending on
  the screen size.

### Advanced examples

* An application that
  [uses lower-level MKWS components](//example.indexdata.com/lowlevel.html)
  rather than the all-in-one `#mkwsResults` division,
  allowing it to use a rather different layout.
* An application that specifies how to display brief and full records
  [using Handlebar templates](//example.indexdata.com/templates.html).
  (Read about
  [the templating language](//handlebarsjs.com/).)
* An application that
  [displays thumbnail images](//example.indexdata.com/images.html?q=portrait).
* An application that
  [uses a local authentication regime](//example.indexdata.com/localauth.html)
  and the corresponding
  [Apache2 configuration stanza](//example.indexdata.com/apache-config.txt).
* [A version that uses a jQuery popup](//example.indexdata.com/popup.html?q=sushi).

### Non-standard interfaces

* An application that uses MKWS to
  [find dictionary definitions of words](//example.indexdata.com/dict.html)
  when you highlight them.
* An application that
  [runs an automatic search on load](//example.indexdata.com/auto.html).  
* Another existing web-site,
  [The Zthes specifications](//zthes.z3950.org/),
  which has been fitted with a popup MKWS search-box.

Target selection
----------------

MKWS comes pre-configured to search in a set of a dozen or so
open-access targets, as a proof of concept. But you'll want
to use it to
[search your own selection of targets](mkws-manual.html#mkws-target-selection)
-- some open access, some subscription.

We can set that up for you: email us on <info@indexdata.com>.

- - -

Copyright (C) 2013-2014 Index Data ApS. <http://indexdata.com>

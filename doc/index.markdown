% MKWS: the MasterKey Widget Set
<!---% Mike Taylor
% June 2014-->


Add metasearching to your web-site painlessly
---------------------------------------------

The MasterKey Widget Set provides the easiest possible way to enhance
an existing web-site with customised searching across multiple
sources, ranking and merging the results.

All you need to do is pull in our JavaScript and optional stylesheet,
then add `<div>`s to your page that have special `class` attributes. We
do the rest.

A minimal example
-----------------

Here is a completely functional (though ugly) MKWS-based
searching application:

	<script type="text/javascript"
	  src="http://mkws.indexdata.com/mkws-complete.js"></script>
	<div class="mkwsSearch"></div>
	<div class="mkwsResults"></div>

That's it. A complete metasearching application. Everything
else is refinement.

Documentation
-------------

* The <a href="README.html">README</a> -- mostly technical details.
* The <a href="mkws-manual.html">MKWS manual, including a reference section.</a>
  This is a much better introduction.

Tools
-----

Here are the files that this web-site provides:

* <a href="mkws.js">mkws.js</a> --
  JavaScript code that powers the MasterKey Widget Set
* <a href="pazpar2/js/pz2.js">pazpar2/js/pz2.js</a> --
  Low-level JavaScript library for access to the MasterKey web
  service.
* <a href="handlebars-v2.0.0.js">handlebars-v2.0.0.js</a> --
  A local copy of
  <a href="http://handlebarsjs.com/">the Handlebars templating library</a>,
  since it doesn't like to be hotlinked.
* Local copy of <a href="jquery-1.10.0.min.js">jquery-1.10.0.min.js</a>
* Local copy of <a href="jquery.json-2.4.js">jquery.json-2.4.js</a>
* <a href="mkws-complete.js">mkws-complete.js</a> --
  A single large JavaScript file containing everything needed for
  MKWS to work: the widget-set itself, the API library, and
  the prerequisites jQuery and Handlebars.
* <a href="mkws.css">mkws.css</a> --
  A stylesheet which styles only MasterKey widgets, and does not
  otherwise interfere with application-site's styles.


Minified versions of the MKWS JavaScript files are also available:

* <a href="mkws.min.js">mkws.min.js</a>
* <a href="mkws-complete.min.js">mkws-complete.min.js</a>

Versions
--------

The links above to the various forms of the widget-set JavaScript
(<a href="mkws.js">mkws.js</a>,
<a href="mkws-complete.js">mkws-complete.js</a>,
<a href="mkws.min.js">mkws.min.js</a>
and
<a href="mkws-complete.min.js">mkws-complete.min.js</a>)
are always to the current versions of those
files. Applications that rely on a particular version can
instead use the specific numbered versions in
<a href="releases/">the releases area</a>,
for example
<a href="releases/mkws-0.9.1.js">releases/mkws-0.9.1.js</a>.

The current version number is always in
<a href="VERSION">the VERSION file</a>.

Version history is in
<a href="NEWS">the NEWS file</a>.

Examples using the widget-set
-----------------------------

It's worth viewing the source of these to see how small they
are and how various things are done.

### Simple examples

* A very simple application at
  <a href="//example.indexdata.com/simple.html"
       >//example.indexdata.com/simple.html</a>.
* <a href="//example.indexdata.com/minimal.html"
       >The absolutely minimal application</a>
  listed above.
* <a href="//example.indexdata.com/language.html"
       >A more detailed version</a>
  that contains a configuration structure instead of accepting the
  defaults. Includes a custom translation option to present the
  application in Arabic.
* <a href="//example.indexdata.com/mobile.html"
       >A version suitable for mobile devices</a>,
  with a responsive design that moves components around depending on
  the screen size.

### Advanced examples

* An application that
  <a href="//example.indexdata.com/lowlevel.html"
       >uses lower-level MKWS components</a>
  rather than the all-in-one `#mkwsResults` division,
  allowing it to use a rather different layout.
* An application that specifies how to display brief and full records
  <a href="//example.indexdata.com/templates.html"
       >using Handlebar templates</a>.
  (Read about
  <a href="http://handlebarsjs.com/"
       >the templating language</a>.)
* An application that
  <a href="http://example.indexdata.com/images.html?q=portrait"
       >displays thumbnail images</a>.
* <a href="//example.indexdata.com/localauth.html"
       >An application that uses a local authentication regime</a>,
  and the corresponding
  <a href="//example.indexdata.com/apache-config.txt"
       >Apache2 configuration stanza</a>.
* <a href="//example.indexdata.com/popup.html"
       >A version that uses a jQuery popup</a>.

### Non-standard interfaces

* <a href="//example.indexdata.com/dict.html"
       >An application that uses MKWS to find dictionary
  definitions of words when you highlight them</a>.
* <a href="//example.indexdata.com/auto.html"
       >An application that runs an automatic search on load</a>.
* An existing web-site,
  <a href="http://sagp.miketaylor.org.uk/"
       >The Self-Appointed Grammar Police</a>,
  which has been fitted with an MKWS searching widget.
  (See also the MKWS-widget customisations in
  <a href="http://sagp.miketaylor.org.uk/style.css"
       >that site's stylesheet</a>.)
<!---
* Another existing web-site,
  <a href="http://zthes.z3950.org/"
       >The Zthes specifications</a>,
  which has been fitted with a popup MKWS search-box.
-->

Target selection
----------------

MKWS comes pre-configured to search in a set of a dozen or so
open-access targets, as a proof of concept. But you'll want
to use it to search your own selection of targets -- some open
access, some subscription.

We can set that up for you: email us on
<a href="mailto:info@indexdata.com"
               >info@indexdata.com</a>.

- - -

Copyright (&copy;) 2013-2014 Index Data ApS.
<a href="http://indexdata.com">`http://indexdata.com`</a>

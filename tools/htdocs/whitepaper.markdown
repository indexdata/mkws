% Embedded metasearching with the MasterKey Widget Set
% Mike Taylor
% July-September 2013


Introduction
------------

There are lots of practical problems in building resource discovery
solutions. One of the biggest, and most ubiquitous is incorporating
metasearching functionality into existing web-sites -- for example,
content-management systems, library catalogues or intranets. In
general, even when access to core metasearching functionality is
provided by simple web-services such as
[Pazpar2](http://www.indexdata.com/pazpar2), integration work is seen
as a major part of most projects.

Index Data provides several different toolkits for communicating with
its metasearching middleware, trading off varying degrees of
flexibility against convenience:

* libpz2.js -- a low-level JavaScript library for interrogating the
  Service Proxy and Pazpar2. It allows the HTML/JavaScript programmer
  to create JavaScript applications display facets, records, etc. that
  are fetched from the metasearching middleware.

* masterkey-ui-core -- a higher-level, complex JavaScript library that
  uses libpz2.js to provide the pieces needed for building a
  full-featured JavaScript application.

* MasterKey Demo UI -- an example of a searching application built on
  top of masterkey-ui-core. Available as a public demo at
  http://mk2.indexdata.com/

* MKDru -- a toolkit for embedding MasterKey-like searching into
  Drupal sites.

All of these approaches require programming to a greater or lesser
extent. Against this backdrop, we introduced MKWS (the MasterKey
Widget Set) -- a set of simple, very high-level HTML+CSS+JavaScript
components that can be incorporated into any web-site to provide
MasterKey searching facilities. By placing `<div>`s with well-known
identifiers in any HTML page, the various components of an application
can be embedded: search-boxes, results areas, target information, etc.


Simple Example
--------------

The following is a complete MKWS-based searching application:

    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>MKWS demo client</title>
        <script type="text/javascript" src="http://mkws.indexdata.com/mkws-complete.js"></script>
        <link rel="stylesheet" href="http://mkws.indexdata.com/mkwsStyle.css" />
      </head>
      <body>
        <div id="mkwsSearch"></div>
        <div id="mkwsResults"></div>
      </body>
    </html>

Go ahead, try it! You don't even need a web-server. Just copy and
paste this HTML into a file on your computer -- `/tmp/magic.html`,
say -- and point your web-browser at it:
`file:///tmp/magic.html`. Just like that, you have working
metasearching.


How the example works
---------------------

If you know any HTML, the structure of the file will be familar to
you: the `<html>` element at the top level contains a `<head>` and a
`<body>`. In addition to whatever else you might want to put on your
page, you can add MKWS elements.

These fall into two categories. First, the prerequisites in the HTML
header, which are loaded from the tool site mkws.indexdata.com:

* `mkws-complete.js`
  contains all the JavaScript needed by the widget-set.

* `mkwsStyle.css`
  provides the default CSS styling 

Second, within the HTML body, `<div>` elements with special IDs that
begin `mkws` can be provided. These are filled in by the MKWS code,
and provide the components of the searching UI. The very simple
application above has only two such components: a search box and a
results area. But more are supported. The main `<div>`s are:

* `mkwsSearch` -- provides the search box and button.

* `mkwsResults` -- provides the results area, including a list of
   brief records (which open out into full versions when clicked),
   paging for large results sets, facets for refining a search,
   sorting facilities, etc.

* `mkwsLang` -- provides links to switch between one of several
   different UI languages. By default, English, Danish and German are
   provided.

* `mkwsSwitch` -- provides links to switch between a view of the
   result records and of the targets that provide them. Only
   meaningful when `mkwsTargets` is also provided.

* `mkwsTargets` -- the area where per-target information will appear
   when selected by the link in the `mkwsSwitch` area. Of interest
   mostly for fault diagnosis rather than for end-users.

* `mkwsStat` --provides a status line summarising the statistics of
   the various targets.

To see all of these working together, just put them all into the HTML
`<body>` like so:

        <div id="mkwsSwitch"></div>
        <div id="mkwsLang"></div>
        <div id="mkwsSearch"></div>
        <div id="mkwsResults"></div>
        <div id="mkwsTargets"></div>
        <div id="mkwsStat"></div>

Configuration
-------------

Many aspects of the behaviour of MKWS can be modified by setting
parameters into the `mkws_config` hash. **This must be done *before*
including the MKWS JavaScript** so that when that code is executed it
can refer to the configuration values. So the HTML header looks like
this:

        <script type="text/javascript">
          var mkws_config = {
            lang: "da",
            sort_default: "title",
            query_width: 60,
          };
        </script>
        <script type="text/javascript" src="http://mkws.indexdata.com/mkws-complete.js"></script>

This configuration sets the UI language to Danish (rather than the
default of English), initially sorts search results by title rather
than relevance (though as always this can be changed in the UI) and
makes the search box a bit wider than the default.

The full set of supported configuration items is described in the
reference guide below.


Control over HTML and CSS
-------------------------

More sophisticated applications will not simply place the `<div>`s
together, but position them carefully within an existing page
framework -- such as a Drupal template, an OPAC or a SharePoint page.

While it's convenient for simple applications to use a monolithic
`mkwsResults` area which contains record, facets, sorting options,
etc., customised layouts may wish to treat each of these components
separately. In this case, `mkwsResults` can be omitted, and the
following lower-level components provided instead:

* `mkwsTermlists` -- provides the facets

* `mkwsRanking` -- provides the options for how records are sorted and
   how many are included on each page of results.

* `mkwsPager` -- provides the links for navigating back and forth
   through the pages of records.

* `mkwsNavi` -- when a search result has been narrowed by one or more
   facets, this area shows the names of those facets, and allows the
   selected values to be clicked in order to remove them.

* `mkwsRecords` -- lists the actual result records.

Customisation of MKWS searching widgets can also be achieved by
overriding the styles set in the toolkit's CSS stylesheet. The default
styles can be inspected in `mkwsStyle.css` and overridden in any
styles that appears later in the HTML than that file. At the simplest
level, this might just mean changing fonts, sizes and colours, but
more fundamental changes are also possible.

To properly apply styles, it's necessary to understand how the HTML is
structured, e.g. which elements are nested within which
containers. The structures used by the widget-set are described in the
reference guide below.


Refinements
-----------


### Message of the day

Some applications might like to open with content in the area that
will subsequently be filled with result-records -- a message of the
day, a welcome message or a help page. This can be done by placing an
`mkwsMOTDContainer` division on the page next to `mkwsResults` or
`mkwsRecords`. The contents of this element are initially displayed,
but will be hidden when a search is made.


### Responsive design

Metasearching applications may need to appear differently on
small-screened mobile devices, or change their appearance when
screen-width changes (as when a small device is rotated). To achieve
this, MKWS supports responsive design which will move the termlists to
the bottom on narrow screens and to the sidebar on wide screens.

To turn on this behaviour, set the `responsive_design` configuration
element to `true`, and `responsive_design_width` to the desired
threshhold width in pixels.

If individual result-related components are in use in place of the
all-in-one mkwsResults, then the redesigned application needs to
specify the locations where the termlists should appear in both
cases. In this case, wrap the wide-screen `mkwsTermlists` element in a
`mkwsTermlistContainer1` element; and provide an
`mkwsTermlistContainer2` element in the place where the narrow-screen
termlists should appear.


### Popup results with jQuery UI

TODO


### Authentication and target configuration

TODO


Reference Guide
---------------

### Configuration object

TODO

### jQuery plugin invocation

TODO

### The structure of the HTML generated by the MKWS widgets

TODO

- - -

Copyright (C) 2013 by IndexData ApS, <http://www.indexdata.com>

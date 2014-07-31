% Embedded metasearching with the MasterKey Widget Set
% Mike Taylor
% 30 July 2014

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

* pz2.js -- a low-level JavaScript library for interrogating the
  Service Proxy and Pazpar2. It allows the HTML/JavaScript programmer
  to create JavaScript applications display facets, records, etc. that
  are fetched from the metasearching middleware.

* masterkey-ui-core -- a higher-level, complex JavaScript library that
  uses pz2.js to provide the pieces needed for building a
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
        <link rel="stylesheet" href="http://mkws.indexdata.com/mkws.css" />
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

* `mkws.css`
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
parameters into the `mkws_config` object. **This must be done *before*
including the MKWS JavaScript** so that when that code is executed it
can refer to the configuration values. So the HTML header looks like
this:

        <script type="text/javascript">
          var mkws_config = {
            lang: "da",
            sort_default: "title",
            query_width: 60
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
styles can be inspected in `mkws.css` and overridden in any
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
`mkwsMOTD` division anywhere on the page. It will be moved into the
`mkwsResults` area and initially displayed, but will be hidden when a
search is made.


### Customised display using Handlebars templates

Certain aspects of the widget-set's display can be customised by
providing Handlebars templates with well-known classes that begin with
the string `mkwsTemplate_`. At present, the supported templates are:

* `mkwsTemplate_Summary` -- used for each summary record in a list of
  results.

* `mkwsTemplate_Record` -- used when displaying a full record.

For both of these the metadata record is passed in, and its fields can
be referenced in the template. As well as the metadata fields
(`md-*`), two special fields are provided to the `mkwsTemplate_Summary`
template, for creating popup links for full records. These are `_id`,
which must be provided as the `id` attribute of a link tag, and
`_onclick`, which must be provided as the `onclick` attribute.

For example, an application can install a simple author+title summary
record in place of the usual one providing the following template:

        <script class="mkwsTemplate_Summary" type="text/x-handlebars-template">
          {{#if md-author}}
            <span>{{md-author}}</span>
          {{/if}}
          <a href="#" id="{{_id}}" onclick="{{_onclick}}">
            <b>{{md-title}}</b>
          </a>
        </script>

For details of Handlebars template syntax, see
[the online documentation](http://handlebarsjs.com/).


### Responsive design

Metasearching applications may need to appear differently on
small-screened mobile devices, or change their appearance when
screen-width changes (as when a small device is rotated). To achieve
this, MKWS supports responsive design which will move the termlists to
the bottom on narrow screens and to the sidebar on wide screens.

To turn on this behaviour, set the `responsive_design_width` to the desired
threshhold width in pixels. For example:

        <script type="text/javascript">
            var mkws_config = {
                responsive_design_width: 990
            };
        </script>

If individual result-related components are in use in place of the
all-in-one mkwsResults, then the redesigned application needs to
specify the locations where the termlists should appear in both
cases. In this case, wrap the wide-screen `mkwsTermlists` element in a
`mkwsTermlists-Container-wide` element; and provide an
`mkwsTermlists-Container-narrow` element in the place where the narrow-screen
termlists should appear.


### Popup results with jQuery UI

The [jQuery UI library](http://en.wikipedia.org/wiki/JQuery_UI)
can be used to construct MKWS applications in which the only component
generally visible on the page is a search box, and the results appear
in a popup. The key part of such an application is this invocation of
the MKWS jQuery plugin:

        <div class="mkwsSearch"></div>
        <div class="mkwsPopup" popup_width="1024" popup_height="650" popup_modal="0" popup_autoOpen="0" popup_button="input.mkwsButton">
          <div class="mkwsSwitch"></div>
          <div class="mkwsLang"></div>
          <div class="mkwsResults"></div>
          <div class="mkwsTargets"></div>
          <div class="mkwsStat"></div>
        </div>

The necessary scaffolding can be seen in an example application,
http://example.indexdata.com/index-popup.html


### Authentication and target configuration

By default, MKWS configures itself to use a demonstration account on a
service hosted by mkws.indexdata.com. This account (username `demo`,
password `demo`) provides access to about a dozen free data
sources. Authentication onto this service is via an authentication URL
on the same MKWS server, so no explicit configuration is needed.

In order to search in a customised set of targets, including
subscription resources, it's necessary to create an account with
Index Data's hosted service proxy, and protect that account with
authentication tokens (to prevent unauthorised use of subscription
resources). For information on how to do this, see
[MKWS Target Selection](library-configuration.html)


Reference Guide
---------------

### Configuration object

The configuration object `mkws_config` may be created before including
the MKWS JavaScript code to modify default behaviour. This structure
is a key-value lookup table, whose entries are described in the table
below. All entries are optional, but if specified must be given values
of the specified type. If ommitted, each setting takes the indicated
default value; long default values are in footnotes to keep the table
reasonably narrow.

----
Element                   Type    Default   Description
--------                  -----   --------- ------------
debug_level               int     1         Level of debugging output to emit. 0 = none, 1 = messages, 2 = messages with
                                            datestamps, 3 = messages with datestamps and stack-traces.

facets                    array   *Note 1*  Ordered list of names of facets to display. Supported facet names are
                                            `xtargets`, `subject` and `author`.

lang                      string  en        Code of the default language to display the UI in. Supported language codes are `en` =
                                            English, `de` = German, `da` = Danish, and whatever additional languages are configured
                                            using `language_*` entries (see below).

lang_options              array   []        A list of the languages to offer as options. If empty (the default), then all
                                            configured languages are listed.

language_*                hash              Support for any number of languages can be added by providing entries whose name is
                                            `language_` followed by the code of the language. See the separate section below for
                                            details.

pazpar2_url               string  *Note 2*  The URL used to access the metasearch middleware. This service must be configured to
                                            provide search results, facets, etc. It may be either unmediated or Pazpar2 the
                                            MasterKey Service Proxy, which mediates access to an underlying Pazpar2 instance. In
                                            the latter case, `service_proxy_auth` must be provided.

perpage_default           string  20        The initial value for the number of records to show on each page.

perpage_options           array   *Note 3*  A list of candidate page sizes. Users can choose between these to determine how many
                                            records are displayed on each page of results.

query_width               int     50        The width of the query box, in characters.

responsive_design_width   int               If defined, then the facets display moves between two locations as the screen-width
                                            varies, as described above. The specified number is the threshhold width, in pixels,
                                            at which the facets move between their two locations.

service_proxy_auth        url     *Note 4*  A URL which, when `use_service_proxy` is true, is fetched once at the beginning of each
                                            session to authenticate the user and establish a session that encompasses a defined set
                                            of targets to search in.

service_proxy_auth_domain domain            Can be set to the domain for which `service_proxy_auth` proxies authentication, so
                                            that cookies are rewritten to appear to be from this domain. In general, this is not
                                            necessary, as this setting defaults to the domain of `pazpar2_url`.

show_lang                 bool    true      Indicates whether or not to display the language menu.

show_perpage              bool    true      Indicates whether or not to display the perpage menu.

show_sort                 bool    true      Indicates whether or not to display the sort menu.

show_switch               bool    true      Indicates whether or not to display the switch menu, for switching between showing
                                            retrieved records and target information.

sort_default              string  relevance The label of the default sort criterion to use. Must be one of those in the `sort`
                                            array.

sort_options              array   *Note 6*  List of supported sort criteria. Each element of the list is itself a two-element list:
                                            the first element of each sublist is a pazpar2 sort-expression such as `data:0` and
                                            the second is a human-readable label such as `newest`.

use_service_proxy         bool    true      If true, then a Service Proxy is used to deliver searching services rather than raw
                                            Pazpar2.
----

Perhaps we should get rid of the `show_lang`, `show_perpage`,
`show_sort` and `show_switch` configuration items, and simply display the relevant menus
only when their containers are provided -- e.g. an `mkwsLang` element
for the language menu. But for now we retain these, as an easier route
to lightly customise the display than my changing providing a full HTML
structure.

#### Notes

1. ["sources", "subjects", "authors"]

2. /pazpar2/search.pz2

3. [10, 20, 30, 50]

4. http://mkws.indexdata.com/service-proxy-auth

5. http://mkws.indexdata.com/service-proxy/

6. [["relevance"], ["title:1", "title"], ["date:0", "newest"], ["date:1", "oldest"]]


### Language specification

Support for another UI language can be added by providing an entry in
the `mkws_config` object whose name is `language_` followed by the
name of the language: for example, `language_French` to support
French. Then value of this entry must be a key-value lookup table,
mapping the English-language strings of the UI into their equivalents
in the specified language. For example:

            var mkws_config = {
              language_French: {
                "Authors": "Auteurs",
                "Subjects": "Sujets",
                // ... and others ...
              }
            }

The following strings occurring in the UI can be translated:
`Displaying`,
`Next`,
`Prev`,
`Records`,
`Search`,
`Sort by`,
`Targets`,
`Termlists`,
`and show`,
`found`,
`of`,
`per page`
and
`to`.

In addition, facet names can be translated:
`Authors`,
`Sources`
and
`Subjects`.

Finally, the names of fields in the full-record display can be
translated. These include, but may not be limited to:
`Author`,
`Date`,
`Location`,
`Subject`
and
`Title`.



### jQuery UI popup invocation

The MasterKey Widget Set can be invoked in a popup window on top of the page.

Note that when using the `popup` layout, facilities from the jQuery UI
toolkit are used, so it's necessary to include both CSS and JavaScript
from that toolkit. The relevant lines are:

    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>
    <link rel="stylesheet" type="text/css"
          href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />

    <div class="mkwsSearch"></div>
    <div class="mkwsPopup" popup_width="1024" popup_height="650" popup_modal="0" popup_autoOpen="0" popup_button="input.mkwsButton">
      <div class="mkwsSwitch"></div>
      <div class="mkwsLang"></div>
      <div class="mkwsResults"></div>
      <div class="mkwsTargets"></div>
      <div class="mkwsStat"></div>
    </div>

----
Element    Type    Default           Description
--------   -----   ---------         ------------
popup_width     string     880       Width of the popup window (if used), in
                                     pixels.

popup_height    string     760       Height of the popup window (if used), in
                                     pixels.

popup_button    string      input.mkwsButton  (Never change this.)

popup_modal     string      0       Modal confirmation mode. Valid values are 0 or 1

popup_autoOpen  string      1       Open popup window on load. Valid values are 0 or 1

----


### The structure of the HTML generated by the MKWS widgets

In order to override the default CSS styles provided by the MasterKey Widget
Set, it's necessary to understand that structure of the HTML elements that are
generated within the components. This knowledge make it possible, for example,
to style each `<div>` with class `term` but only when it occurs inside an
element with ID `#mkwsTermlists`, so as to avoid inadvertently styling other
elements using the same class in the non-MKWS parts of the page.

The HTML structure is as follows. As in CSS, #ID indicates a unique identifier
and .CLASS indicates an instance of a class.

    #mkwsSwitch
      a*

    #mkwsLang
      ( a | span )*

    #mkwsSearch
      form
        input#mkwsQuery type=text
        input#mkwsButton type=submit

    #mkwsBlanket
      (no contents -- used only for masking)

    #mkwsResults
      table
        tbody
          tr
            td
              #mkwsTermlists
                div.title
                div.facet*
                  div.termtitle
                  ( a span br )*
            td
              div#mkwsRanking
                form#mkwsSelect
                  select#mkwsSort
                  select#mkwsPerpage
              #mkwsPager
              #mkwsNavi
              #mkwsRecords
                div.record*
                  span (for sequence number)
                  a (for title)
                  span (for other information such as author)
                  div.details (sometimes)
                    table
                      tbody
                        tr*
                          th
                          td
    #mkwsTargets
      #mkwsBytarget
        table
          thead
            tr*
              td*
          tbody
            tr*
              td*

    #mkwsStat
      span.head
      span.clients
      span.records

- - -

Copyright (C) 2013-2014 by IndexData ApS, <http://www.indexdata.com>

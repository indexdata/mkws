% The MKWS manual: embedded metasearching with the MasterKey Widget Set
% Mike Taylor
% October 2014


Introduction
============

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

* [pz2.js](http://www.indexdata.com/pazpar2/doc/ajaxdev.html) --
  a low-level JavaScript library for interrogating the
  [Service Proxy](http://www.indexdata.com/service-proxy/)
  and
  [Pazpar2](http://www.indexdata.com/pazpar2/).
  It allows the HTML/JavaScript programmer
  to create JavaScript applications to display facets, records,
  etc. that are fetched from the metasearching middleware.

* masterkey-ui-core -- a higher-level, complex JavaScript library that
  uses pz2.js to provide the pieces needed for building a
  full-featured JavaScript application.

* MasterKey Demo UI -- an example of a searching application built on
  top of masterkey-ui-core. Available as a public demo at
  <http://mk2.indexdata.com/>

* [MKDru](http://www.indexdata.com/masterkey-drupal) --
  a toolkit for embedding MasterKey-like searching into
  [Drupal](https://www.drupal.org/)
  sites.

All of these approaches require programming to a greater or lesser
extent. Against this backdrop, we introduced
[MKWS (the MasterKey Widget Set)](http://mkws.indexdata.com/)
-- a set of simple, very high-level HTML+CSS+JavaScript
components that can be incorporated into any web-site to provide
MasterKey searching facilities. By placing `<div>`s with well-known
MKWS classes in any HTML page, the various components of an application
can be embedded: search-boxes, results areas, target information, etc.


Simple example
==============

The following is
[a complete MKWS-based searching application](//example.indexdata.com/simple.html):

    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>MKWS demo client</title>
        <script type="text/javascript" src="//mkws.indexdata.com/mkws-complete.js"></script>
        <link rel="stylesheet" href="//mkws.indexdata.com/mkws.css" />
      </head>
      <body>
        <div class="mkws-search"></div>
        <div class="mkws-results"></div>
      </body>
    </html>

Go ahead, try it! Simply put the above in a file (e.g index.html),
drop it into a folder accessible with an ordinary web-server (e.g
Apache) and load it in your web browser. Just like that, you have
working metasearching.

How the example works
---------------------

If you know any HTML, the structure of the file will be familar to
you: the `<html>` element at the top level contains a `<head>` and a
`<body>`. In addition to whatever else you might want to put on your
page, you can add MKWS elements.

These fall into two categories. First, the prerequisites in the HTML
header, which are loaded from the tool site `mkws.indexdata.com`:

* `mkws-complete.js`
  contains all the JavaScript needed by the widget-set, including a
  copy of the jQuery library.

* `mkws.css`
  provides the default CSS styling

Second, within the HTML body, `<div>` elements with special IDs that
begin `mkws-` can be provided. These are filled in by the MKWS code,
and provide the components of the searching UI. The very simple
application above has only two such widgets: a search box and a
results area. But more are supported.

Defining widget elements
========================

Widget type
-----------

An HTML element is made an MKWS widget by including an MKWS
class-name. These names begin `mkws-`: what follows that prefix
specifies the type of the widget. The type can be any sequence of
alphanumeric characters and hyphens _except_ something beginning
`team` -- see below.

The main widgets are:

* `mkws-search` -- provides the search box and button.

* `mkws-results` -- provides the results area, including a list of
   brief records (which open out into full versions when clicked),
   paging for large results sets, facets for refining a search,
   sorting facilities, etc.

* `mkws-progress` -- shows a progress bar indicating how many of the
   targets have responded to the search request.

* `mkws-stat` -- provides a status line summarising the statistics of
   the various targets.

* `mkws-switch` -- provides links to switch between a view of the
   result records and of the targets that provide them. Only
   meaningful when `mkws-targets` is also provided.

* `mkws-targets` -- the area where per-target information will appear
   when selected by the link in the `mkws-switch` area. Of interest
   mostly for fault diagnosis rather than for end-users.

* `mkws-lang` -- provides links to switch between one of several
   different UI languages. By default, English, Danish and German are
   provided.

To see all of these working together, just put them all into the HTML
`<body>` like so:

        <div class="mkws-switch"></div>
        <div class="mkws-lang"></div>
        <div class="mkws-progress"></div>
        <div class="mkws-search"></div>
        <div class="mkws-results"></div>
        <div class="mkws-targets"></div>
        <div class="mkws-stat"></div>

The full set of supported widgets is described in the
reference guide below.

Widget team
-----------

In general a set of widgets work together in a team: in the example
above, the search-term that the user enters in the `mkws-search`
widget is used to generate the set of records that are displayed in
the `mkws-results` widget.

Sometimes, it's desirable to have multiple teams in a single page. A
widget can be placed in a named team by giving it (in addition to its
main class) a class that begins with `mkws-team-`: what follows that
prefix specifies the team that the widget is part of. For example,
`<div class="mkws-search mkws-team-aux">` creates a search widget that
is part of the `aux` team.

Widgets that do not have a team specified (as in the examples above)
are placed in the team called `AUTO`.

Old and new-style class-names
-----------------------------

**NOTE.** Versions of MKWS before v1.0 used camel-case class-names:
without hyphens and with second and subsequent words capitalised. So
instead of `mkws-search`, it used to be `mkwsSearch`. And the classes
used to specify team names used an `mkwsTeam_` prefix (with an
underscore). So instead of `mkws-team-foo`, it used to be
`mkwsTeam_foo`.

The 1.x series of MKWS releases recognise these old-style class-names
as well as the canonical ones, as a facility for backwards
compatibility. However, **these old class-names are deprecated, and
support will be removed in v2.0**. Existing applications that use them
should be upgraded to the new-style class names as soon as convenient.

Configuring widgets
===================

Global configuration
--------------------

Many aspects of the behaviour of MKWS can be modified by setting
parameters into the `mkws_config` object. So the HTML header looks
like this:

        <script type="text/javascript">
          var mkws_config = {
            lang_options: [ "en", "da" ]
            lang: "da",
            sort_default: "title",
            query_width: 60
          };
        </script>
        <script type="text/javascript" src="http://mkws.indexdata.com/mkws-complete.js"></script>

This configuration restricts the set of available UI languages English
and Danish (omitting German), sets the default to Danish (rather than
the English), initially sorts search results by title rather than
relevance (though as always this can be changed in the UI) and makes
the search box a bit wider than the default.

The full set of supported configuration items is described in the
reference guide below.

Per-widget configuration
------------------------

In addition to the global configuration provided by the `mkws_config`
object, individual widgets' behaviour can be configured by providing
configuration items as attributed on their HTML elements. For example,
a `records` widget might be restricted to displaying no more than
three records by setting the `numrecs` parameter as follows:

	<div class="mkws-records" maxrecs="3">

Although this works well, HTML validators will consider this element
acceptable, since the `maxrecs` attribute is not part of the HTML
schema. However, attributes beginning `data-` are always accepted as
HTML extensions, much like email headers beginning with
`X-`. Therefore, the widget set also recognises configuration
attributes prefixed with `data-mkws-`, so:

	<div class="mkws-records" data-mkws-maxrecs="3">

For first form is more convenient; the second is more correct.

Because some configuration items take structured values rather than
simple strings, they cannot be directly provided by inline
attributes. To allow for this, the special attribute
`data-mkws-config`, if provided, is parsed as JSON and its key-value
pairs set as configuration items for the widget in question. For
example, the value of `lang_options` is an array of strings specifying
which of the supported UI languages should be made available. The
following invocation will limit this list to only English and Danish
(omitting German):

	<div class="mkws-lang" data-mkws-config='{ "lang_options": [ "en", "da" ] }'></div>

(Note that, as JSON requires double quotes around all strings, single
quotes must be used to contain the entire attribute value.)


Control over HTML and CSS
=========================

More sophisticated applications will not simply place the widgets
together, but position them carefully within an existing page
framework -- such as a Drupal template, an OPAC or a SharePoint page.

While it's convenient for simple applications to use a monolithic
`mkws-results` area which contains record, facets, sorting options,
etc., customised layouts may wish to treat each of these components
separately. In this case, `mkws-results` can be omitted, and the
following lower-level widgets provided instead:

* `mkws-termlists` -- provides the facets

* `mkws-ranking` -- provides the options for how records are sorted and
   how many are included on each page of results.

* `mkws-pager` -- provides the links for navigating back and forth
   through the pages of records.

* `mkws-navi` -- when a search result has been narrowed by one or more
   facets, this area shows the names of those facets, and allows the
   selected values to be clicked in order to remove them.

* `mkws-records` -- lists the actual result records.

Customisation of MKWS searching widgets can also be achieved by
overriding the styles set in the toolkit's CSS stylesheet. The default
styles can be inspected in [mkws.css](mkws.css)
and overridden in any
styles that appears later in the HTML than that file. At the simplest
level, this might just mean changing fonts, sizes and colours, but
more fundamental changes are also possible.

To properly apply styles, it's necessary to understand how the HTML is
structured, e.g. which elements are nested within which
containers. The structures used by the widget-set are described in the
reference guide below.


Customised display using Handlebars templates
=============================================

A lot can be done by styling widgets in CSS and changing basic MKWS config
options. For further customisation, MKWS allows you to change the markup it
outputs for any widget. This is done by overriding the
[Handlebars](http://handlebarsjs.com/) template used to generate it. In general
these consist of `{{things in double braces}}` that are replaced by values from
the system. For details of Handlebars template syntax, see [the online
documentation](http://handlebarsjs.com/).

The templates used by the core widgets can be viewed in [our git
repository](http://git.indexdata.com/?p=mkws.git;a=tree;f=src/templates;).
Parameters are documented in a comment at the top of each template so
you can see what's going where. If all you want to do is add a CSS class to
something or change a `span` to a `div` it's easy to just copy the existing
template and make your edits.

Overriding templates
--------------------

To override the template for a widget, include it inline in the document
as a `<script>` tag marked with a class of `mkws-template-foo` where foo is the
name of the template you want to override (typically the name of the widget).
Inline Handlebars templates are distinguished from Javascript via a
`type="text/x-handlebars-template"` attribute. For example, to override the
pager template you would include this in your document:

    <script class="mkws-template-pager" type="text/x-handlebars-template">
      ...new Pager template
    </script>

The Facet template has a special feature where you can override it on
a per-facet basis by adding a dash and the facet name as a suffix eg.
`facet-subjects`. (So `class="mkws-template-facet-subjects"`.) When
rendering a facet for which no specific template is defined, the code
falls back to using the generic facet template, just called `facet`.

You can also explicitly specify a different template for a particular
instance of a widget by providing the name of your alternative
(eg. `special-pager`) as the value of the `template` key in the MKWS
config object for that widget: for example, `<div class="mkws-pager"
template="special-pager"/>`.

Templates for MKWS can also be
[precompiled](http://handlebarsjs.com/precompilation.html). If a precompiled
template of the same name is found in the `Handlebars.templates` object, it
will be used instead of the default.

Inspecting metadata for templating
----------------------------------

MKWS makes requests to the Service Proxy or Pazpar2 that perform the
actual searching. Depending on how these are configured and what is
available from the targets you are searching there may be more data
available than what is presented by the default templates.

Handlebars offers a convenient log helper that will output the contents of a
variable for you to inspect. This lets you look at exactly what is being
returned by the back end without needing to use a Javascript debugger. For
example, you might prepend `{{log hits}}` to the Records template in order to
see what is being returned with each search result in the list. In order for
this to work you'll need to enable verbose output from Handlebars which is done
by including this line or similar:

    <script>Handlebars.logger.level = 1;</script>

Internationalisation
--------------------

If you would like your template to use the built in translation functionality,
output locale specific text via the mkws-translate helper like so:
`{{{mkws-translate "a few words"}}}`.

Example
-------

Rather than use the toolkit's included AJAX helpers to render record
details inline, here's a summary template that will link directly to
the source via the address provided in the metadata as the first
element of `md-electronic-url`:

    <script class="mkws-template-summary" type="text/x-handlebars-template">
      <a href="{{md-electronic-url.[0]}}">
        <b>{{md-title}}</b>
      </a>
      {{#if md-title-remainder}}
        <span>{{md-title-remainder}}</span>
      {{/if}}
      {{#if md-title-responsibility}}
        <span><i>{{md-title-responsibility}}</i></span>
      {{/if}}
    </script>

For a more involved example where markup for multiple widgets is decorated with
[Bootstrap](http://getbootstrap.com/) classes and a custom Handlebars helper is
employed, take a look at the source of
[topic.html](http://example.indexdata.com/topic.html?q=water).


Some Refinements
================


Message of the day
------------------

Some applications might like to open with content in the area that
will subsequently be filled with result-records -- a message of the
day, a welcome message or a help page. This can be done by placing an
`mkws-motd` division anywhere on the page. It will initially be moved
into the `mkws-results` area and displayed, but will be hidden as soon
as the first search is made.


Popup results with jQuery UI
----------------------------

The [jQuery UI library](http://en.wikipedia.org/wiki/JQuery_UI)
can be used to construct MKWS applications in which the only widget
generally visible on the page is a search box, and the results appear
in a popup. The key part of such an application is this invocation of
the MKWS jQuery plugin:

        <div class="mkws-search"></div>
        <div class="mkws-popup" popup_width="1024" popup_height="650" popup_modal="0" popup_autoOpen="0">
          <div class="mkws-results"></div>
        </div>

The necessary scaffolding can be seen in an example application,
[popup.html](http://example.indexdata.com/popup.html).

The relevant properties (`popup_width`, etc.) are documented
[below](#jquery-ui-popup-invocation)
in the reference section.


Authentication and target configuration
---------------------------------------

By default, MKWS configures itself to use a demonstration account on a
service hosted by mkws.indexdata.com. This account (username `demo`,
password `demo`) provides access to about a dozen free data
sources. Authentication onto this service is via an authentication URL
on the same MKWS server, so no explicit configuration is needed.

In order to search in a customised set of targets, including
subscription resources, it's necessary to create an account with
Index Data's hosted Service Proxy, and protect that account with
authentication tokens (to prevent unauthorised use of subscription
resources). For information on how to do this, see the next section.


MKWS target selection
=====================

MKWS accesses targets using the Pazpar2 metasearching engine. Although
Pazpar2 can be used directly, using a statically configured set of
targets, this usage is unusual. More often, Pazpar2 is fronted by the
Service Proxy (SP), which manages authentication, sessions, target
selection, etc.

This document assumes the SP is used, and explains how to go about
making a set of targets (a "library") available, how to connect your
MKWS application to that library, and how to choose which of the
available targets to use.


Maintaining the library
-----------------------

The Service Proxy accesses sets of targets that are known as
"libraries". In general, each customer will have their own library,
though some standard libraries may be shared between many customers --
for example, a library containing all open-access academic journals.
A library can also contain other configuration information, including
the set of categories by which targets are classified for the library.

Libraries are maintained using MKAdmin (MasterKey
Admin). Specifically, those used by MKWS are generally maintained on
the "MKX Admin" installation at
<http://mkx-admin.indexdata.com/console/>

In general, Index Data will create a library for each customer, then
give the customer a username/password pair that they can use to enter
MKAdmin and administrate that library.

Once logged in, customers can select which targets to include (from
the list of several thousand that MKAdmin knows about), and make
customer-specific modifications -- e.g. overriding the titles of the
targets.

Most importantly, customers' administrators can add authentication
credentials that the Service Proxy will used on their behalf when
accessing subscription resources -- username/password pairs or proxies
to use for IP-based authentication. Note that **it is then crucial to
secure the library from use by unauthorised clients**, otherwise the
customer's paid subscriptions will be exploited.

Access to libraries is managed by creating one or more "User Access"
records in MKAdmin, under the tab of that name. Each of these records
provides a combination of credentials and other data that allow an
incoming MKWS client to be identified as having legitimate access to
the library. The authentication process, described below, works by
searching for a matching User Access record.


Authenticating your MWKS application onto the library
-----------------------------------------------------

Some MKWS applications will be content to use the default library with
its selection of targets. Most, though, will want to define their own
library providing a different range of available targets. An important
case is that of applications that authenticate onto subscription
resources by means of back-end site credentials stored in MKAdmin:
precautions must be taken so that such library accounts do not allow
unauthorised access.

Setting up such a library is a process of several stages.

### Create the User Access account

Log in to MKAdmin to add a User Access account for your library:

* Go to <http://mkx-admin.indexdata.com/console/>
* Enter the adminstrative username/password
* Go to the User Access tab
* Create an end-user account
* Depending on what authentication method it be used, set the
  User Access account's username and password, or referring URL, or
  Service Proxy hostname, or IP-address range.

If your MWKS application runs at a well-known, permanent address --
<http://yourname.com/app.html>, say -- you can set the User Access
record so that this originating URL is recognised by setting it into
the "Referring URL" field.

If your application accesses the Service Proxy by a unique virtual
hostname -- yourname.sp-mkws.indexdata.com, say -- you can tie the use
of this hostname to your library by setting the User Access record's
"Host Name" field to name of the host where the SP is accessed. **Note
that this is not secure, as other applications can use this virtual
hostname to gain access to your library.**

Or if your application's users are coming from a well-known range of
IP-address space, you can enter the range in the "IP Ranges"
field. The format of this field is as follows: it can contain any
number of ranges, separated by commas; each range is either a single
IP address or two addresses separated by a hyphen; each IP address is
four small integers separated by periods. For example,
`80.229.143.255-80.229.143.255, 5.57.0.0-5.57.255.255, 127.0.0.1`.

Alternatively, your application can authenticate by username and
password credentials. This is a useful approach in several situations,
including when you need to specify the use of a different library from
usual one. To arrange for this, set the username and password as a
single string separated by a slash -- e.g. "mike/swordfish" -- into
the User Access record's Authentication field.

You can set multiple fields into a single User Access record; or
create multiple User Access records. For example, a single User Access
record can specify both a Referring URL a username/password pair that
can be used when running an application from a different URL. But if
multiple Referring URLs are needed, then each must be specified in its
own User Access record.

### Tell the application to use the library

In the HTML of the application, tell MKWS to authenticate on to the
Service Proxy. When referer-based or IP-based authentication is used,
this is very simple:

	<script type="text/javascript">
	  var mkws_config = { service_proxy_auth:
	  "//sp-mkws.indexdata.com/service-proxy/?command=auth&action=perconfig" };
	</script>

> TODO This should be the default setting: see **MKWS-251**.

And ensure that access to the MWKS application is from the correct
Referrer URL or IP-range.

### (Optional): access by a different virtual hostname

When hostname-based authentication is in use, it's necessary to access
the Service Proxy as the correctly named virtual host. This can be
done by setting the `service_proxy_auth` configuration item to a
URL containing that hostname, such as
`//yourname.sp-mkws.indexdata.com/service-proxy/?command=auth&action=perconfig`

> TODO It should be possible to change just the hostname without
> needing to repeat the rest of the URL (protocol, path, query): see
> **MKWS-252**.

> TODO When changing the SP authentication URL, the Pazpar2 URL should
> in general change along with it: see **MKWS-253**.

### (Optional): embed credentials for access to the library

When credential-based authentication is in use (username and
password), it's necessary to pass these credentials into the Service
Proxy when establishing the session. This can most simply be done just
by setting the `service_proxy_auth` configuration item to a URL such as
`//sp-mkws.indexdata.com/service-proxy/?command=auth&action=perconfig&username=mike&password=swordfish`

> TODO It should be possible to add the username and password to the
> configuration without needing to repeat the rest of the URL: see
> **MKWS-254**.

### (Optional): conceal credentials from HTML source

Using a credential-based Service-Proxy authentication URL such as the
one above reveals the the credentials to public view -- to anyone who
does View Source on the MKWS application. This may be acceptable for
some libraries, but is intolerable for those which provide
authenticated access to subscription resources.

In these circumstances, a more elaborate approach is necessary. The
idea is to make a URL local to the customer that is used for
authentication onto the Service Proxy, hiding the credentials in a
local rewrite rule. Then local mechanisms can be used to limit access
to that local authentication URL. Here is one way to do it when
Apache2 is the application's web-server, which we will call
yourname.com:

Step 1: add a rewriting authentication alias to the configuration:

	RewriteEngine on
	RewriteRule /spauth/ http://sp-mkws.indexdata.com/service-proxy/?command=auth&action=check,login&username=U&password=PW [P]

Step 2: set the MKWS configuration item `service_proxy_auth` to
<http://yourname.com/spauth/>

Step 3: protect access to the local path <http://yourname.com/spauth/>
(e.g. using a `.htaccess` file).


Choosing targets from the library
---------------------------------

MKWS applications can choose what subset of the library's targets to
use, by means of several alternative settings on individual widgets or
in the `mkws_config` structure:

* `targets` -- contains a Pazpar2 targets string, typically of the form
  "pz:id=" or "pz:id~" followed by a pipe-separated list of low-level
  target IDs.
  At present, these IDs can take one of two forms, depending on the
  configuration of the Service Proxy being used: they may be based on
  ZURLs (so a typical value would be something like
  `pz:id=josiah.brown.edu:210/innopac|lui.indexdata.com:8080/solr4/select?fq=database:4902`)
  or they may be UDBs (so a typical value would be something like
  `pz:id=brown|artstor`)

* `targetfilter` -- contains a CQL query which is used to find relevant
  targets from the relvant library. For example,
  `udb==Google_Images`
  or
  `categories=news`

* `target` -- contains a single UDB, that of the sole target to be
  used. For example,
  `Google_Images`.
  This is merely syntactic sugar for "targetfilter" with the query
  `udb==NAME`

For example, a `Records` widget can be limited to searching only in
targets that have been categorised as news sources by providing an
attribute as follows:

	<div class="mkws-records" targetfilter='categories=news'/>


Reference guide
===============

Configuration object
--------------------

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
log_level                 int     1         Level of debugging output to emit. 0 = none, 1 = messages, 2 = messages with
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
only when their containers are provided -- e.g. an `mkws-lang` element
for the language menu. But for now we retain these, as an easier route
to lightly customise the display than my changing providing a full HTML
structure.

### Notes

1. ["sources", "subjects", "authors"]

2. /pazpar2/search.pz2

3. [10, 20, 30, 50]

4. http://sp-mkws.indexdata.com/service-proxy-auth

5. http://sp-mkws.indexdata.com/service-proxy/

6. [["relevance"], ["title:1", "title"], ["date:0", "newest"], ["date:1", "oldest"]]


Language specification
----------------------

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



jQuery UI popup invocation
--------------------------

The MasterKey Widget Set can be invoked in a popup window on top of the page.

Note that when using the `popup` layout, facilities from the jQuery UI
toolkit are used, so it's necessary to include both CSS and JavaScript
from that toolkit. The relevant lines are:

    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>
    <link rel="stylesheet" type="text/css"
          href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />

    <div class="mkws-search"></div>
    <div class="mkws-popup" popup_width="1024" popup_height="650" popup_modal="0" popup_autoOpen="0" popup_button="input.mkwsButton">
      <div class="mkws-switch"></div>
      <div class="mkws-lang"></div>
      <div class="mkws-results"></div>
      <div class="mkws-targets"></div>
      <div class="mkws-stat"></div>
    </div>

----
Element         Type    Default             Description
--------        -----   -------             ------------
popup_width     string  880                 Width of the popup window (if used), in
                                            pixels.

popup_height    string  760                 Height of the popup window (if used), in
                                            pixels.

popup_button    string  `input.mkwsButton`  (Never change this.)

popup_modal     string  0                   Modal confirmation mode. Valid values are 0 or 1

popup_autoOpen  string  1                   Open popup window on load. Valid values are 0 or 1

----


The structure of the HTML generated by the MKWS widgets
-------------------------------------------------------

In order to override the default CSS styles provided by the MasterKey Widget
Set, it's necessary to understand that structure of the HTML elements that are
generated within the widgets. This knowledge make it possible, for example,
to style each `<div>` with class `term` but only when it occurs inside an
element with class `mkws-termlists`, so as to avoid inadvertently styling other
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

Copyright (C) 2013-2014 Index Data ApS. <http://indexdata.com>

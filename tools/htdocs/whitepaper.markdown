% Using the MasterKey Widget Set to embed metasearching functionality in any web-site
% Mike Taylor
% 26 July 2013

Introduction
------------

There are lots of practical problems in building resource discovery
solutions. One of the biggest, and most ubiquitous is incorporating
metasearching functionality into existing web-sites -- for example,
content-management systems, library catalogues or intranets. In
general, even when access to metasearching is provided by simple
web-services such as [Pazpar2](http://www.indexdata.com/pazpar2),
integration work is seen as a major part of most projects.

Index Data provides several different toolkits for communicating with
its metasearching middleware, trading off varying degrees of
flexibility against convenience:

* libpz2.js -- a low-level JavaScript library for interrogating the
  Service Proxy and Pazpar2. It allows the HTML/JavaScript programmer
  to implement simple JavaScript functions to display facets, records,
  etc.

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
        <link rel="stylesheet" href="http://mkws.indexdata.com/mkwsStyle.css" />
        <script type="text/javascript" src="http://mkws.indexdata.com/mkws-complete.js"></script>
      </head>
      <body>
        <div id="mkwsSwitch"></div>
        <div id="mkwsLang"></div>
        <div id="mkwsSearch"></div>
        <div id="mkwsResults"></div>
        <div id="mkwsTargets"></div>
        <div id="mkwsStat"></div>
      </body>
    </html>

More sophisticated applications will not simply place the `<div>`s
together, but position them carefully within an existing page
framework -- such as a Drupal template, an OPAC or a SharePoint page.

- - -

Copyright (C) 2013 by IndexData ApS, <http://www.indexdata.com>

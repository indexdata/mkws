# Version history for the MasterKey Widget Set (MKWS)

## 1.1.0 (IN PROGRESS)

* Freeze results update when cursor is over results. Fixes MKWS-58.
* Use protocol-relative URLs. Fixes MKWS-98.
* When changing SP authentication path, do not allow old sessions from the old path live on. Fixes MKWS-221.
* Support and use different log-levels (INFO, WARN, ERROR, etc.). Fixes MKWS-239.
* Reference widget: make the credit configurable. Fixes MKWS-344.
* Move the Reference Universe widget into the MKWS core. Fixes MKWS-348.
* Rename the `reference` widget to the more honest `wikipedia`. Fixes MKWS-349.
* Patch up downloaded copy of jQuery to properly close `<input>` tag, fixing an error on Firefox. Fixes MKWS-351.
* The targets table now shows the displayNames of the targets instead of their IDs. Fixes MKWS-352.
* Arguments to autosearch can now be optional. Fixes MKWS-362.
* Autosearch terms, when provided, fill query boxes. Fixes MKWS-363.
* Facets titles are correctly translated. Fixes MKWS-364.
* Add an explicit "No hits" message. Fixes MKWS-374.
* Add a new `waiting` widget to display an image (e.g. spinning wheel) while a search is in progress. Fixes MKWS-375.
* Grey out records and facets when submitting a new search, before the new records arrive. Fixes MKWS-376.
* Fix race-condition that would sometimes make either facets or records invisible. Fixes MKWS-383.
* Auto-search configuration entries such as `maxrecs` and `targetfilter` now also work on regular searches. Fixes MKWS-413.
* Fix Test-suite failure: 'undefined' is not an object (evaluating 'widget.config.sort'). Fixes MKWS-414.
* Fix "insecure contents" warning on MKWS home-page by loading Google font using HTTPS. Fixes MKWS-423.
* Add a new Handlebars helper, `mkws-if-either`, which evaluates two conditions and runs the bracketed template if either is true. Astonishingly, there is no way to make such a check using stock Handlebars.
* Add another Handlebars helper, `compare`. This code is by Mike Griffin, taken from a blog comment (see source code for details).
* The `records` widget tries harder to find URLs in records, looking inside `location` if they are not at the top level.
* Add `query-field` widget: if used, it must presently be contained within `search-form` and must use the name `field` for its field-selection radio-buttons.
* XXX Document `query-field`
* Add `mkws.limitMultipleTargets` function (and corresponding `team.limitMultipleTargets` method); handling of filters modified to support this.
* XXX Document `limitMultipleTargets`
* Team name is passed into the `facet` template as the `team` argument.
* Add very clumsy support for certain accessibility functions needed for the CNIB application. Not documented, as this will certainly change.
* Updates to documentation.
* Update test-suite for changed set of testing targets. Fixes MKWS-439.
* `NEWS` file is now in Markdown, and renamed `NEWS.markdown`.
* Add top-level NEWS.markdown with a link to src/NEWS.markdown.
* Convert top-level README file to Markdown.
* Add a proper [release-procudure document](../doc/release-process.markdown).


## [1.0.0](https://github.com/indexdata/mkws/tree/1.0.0) (Tue Nov 11 13:34:28 GMT 2014)

First major stable public release. Fixes _many_ bugs and adds
many new features, including but not limited to the following:

* MKWS-84:	Translate fieldnames in full-record popup
* MKWS-168:	Standardise templating
* MKWS-206:	CSS Styles for the Credo Widget need work
* MKWS-211:	Refinements to the Overview widget
* MKWS-227:	Bring MKWS documentation up to date
* MKWS-234:	Improve SP configuration/proxying for better authentication
* MKWS-258:	(part of MKWS-257) Move termlist hiding to CSS
* MKWS-270:	Open-source the Widget Set v1.0
* MKWS-272:	Do not make unnecessary SP/PP2 requests
* MKWS-279:	Incorporate templates into documentation
* MKWS-280:	We should not define globals named "widget" and "team"
* MKWS-281:	Consolidate MKWS's index.html and README.html into a single file
* MKWS-286:	cd doc; make clean + make (does not rebuild)
* MKWS-287:	no translation of 'per page'
* MKWS-293:	Build failed in Jenkins: mkws #1086
* MKWS-294:	Change names of MKWS classes to be case-insensitive
* MKWS-295:	Fix styles when built with old pandoc
* MKWS-296:	PDF versions of documents do not build on Debian 6.0
* MKWS-297:	Fix many broken MKWS demos
* MKWS-298:	Facet-specific template name unwisely involves "caption"
* MKWS-300:	make PDF documentation optional
* MKWS-302:	(part of MKWS-297) Fix Mike's MKWS demos
* MKWS-303:	(part of MKWS-297) we should setup a test case for our MKWS demos.
* MKWS-304:	(part of MKWS-297) dict.html example broken
* MKWS-305:	(part of MKWS-297) Fix the images.html demo
* MKWS-306:	Upgrade demos to use new-style class-names
* MKWS-308:	double search box in jasmine regression tests
* MKWS-309:	IE8: some MKWS demos does not work anymore
* MKWS-310:	make clean leaves files
* MKWS-311:	check if koha mkws widgets runs with new class names
* MKWS-312:	Reinstate the Summary template
* MKWS-313:	Rename templates to lower case
* MKWS-314:	Rename templates directory from "mkws.templates" to "templates"
* MKWS-315:	Get rid of the mkws-widget-reference.templates directory
* MKWS-317:	http://example.indexdata.com/ points to wrong URL
* MKWS-318:	more stable regressions search query
* MKWS-319:	Show diagnostic message as well as code
* MKWS-320:	Style the tables in the MKWS documentation
* MKWS-321:	Style the auth-name widget
* MKWS-322:	Use "facets" widget in place of "termlists"
* MKWS-325:	Top-level "make check" fails on caliban
* MKWS-329:	Include the CSS file in archived releases
* MKWS-330:	Remove query_width config option
* MKWS-333:	make sure that MKWS works fine with the Internet Explorer


## [0.9.1](https://github.com/indexdata/mkws/tree/0.9.1) (Thu Dec 19 15:33:13 GMT 2013)

* First public release.


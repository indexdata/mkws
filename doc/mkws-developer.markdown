% The MasterKey Widget Set developer's guide
% Mike Taylor
% 11 August 2014


Overview
========

Core concepts
-------------

Development with MKWS consists primarily of defining new types of
widgets. These can interact with the core functionality is several
defined ways.

You create a new widget type by calling the `mkws.registerWidgetType`
function, passing in the widget name and a function. The name is used
to recognise HTML elements as being widgets of this type -- for
example, if you register a `Foo` widget, elements like
`<div class="mkwsFoo">` will be widgets of this type.

The function promotes a bare widget object (passed as `this`) into a
widget of the appropriate type. MKWS doesn't use classes or explicit
prototypes: it just makes objects that have the necessary
behaviours. There are _no_ behaviours that Widgets are obliged to
provide: you can make a doesn't-do-anything-at-all widget if you like:

	mkws.registerWidgetType('Sluggard', function() {});

More commonly, widgets will subscribe to one or more events, so that
they're notified when something interesting happens. For example, the
`Log` widget asks to be notified when a `log` event happens, and
appends the logged message to its node, as follows:

	mkws.registerWidgetType('Log', function() {
	  var that = this;

	  this.team.queue("log").subscribe(function(teamName, timestamp, message) {
	    $(that.node).append(teamName + ": " + timestamp + message + "<br/>");
	  });
	});

This simple widget illustrates several important points:

* The base widget object (`this`) has several baked-in properties and
  methods that are available to individual widgets. These include
  `this.team` (the team that this widget is a part of) and `this.node`
  (the DOM element of the widget). See below for a full list.

* The team object (`this.team`) also has baked-in properties and
  methods. These include the `queue` function, which takes an event-name
  as its argument. See below for a full list.

* You can add functionality to a widget by subscribing it to an
  event's queue using `this.team.queue("EVENT").subscribe`. The
  argument is a function which is called whenever the event is
  published. The arguments to the function are different for different
  events.

* As with so much JavaScript programming, the value of the special
  variable `this` is lost inside the `subscribez` callback function,
  so it must be saved if it's to be used inside that callback
  (typically as a local variable named `that`).


Widget specialisation (inheritance)
-----------------------------------

Many widgets are simple specialisations of existing widgets. For
example, the `Record` widget is the same as the `Records` widget
except that it defaults to displaying a single record. It's defined as
follows:

	mkws.registerWidgetType('Record', function() {
	  mkws.promotionFunction('Records').call(this);
	  if (!this.config.maxrecs) this.config.maxrecs = 1;
	});

Remember that when a promotion function is called, it's passed a base
widget object that's not specialised for any particular task. To make
a specialised widget, you first promote that base widget into the type
that you want to specialise from -- in this case, `Records` -- using
the promotion function that's been registered for that type.

Once this has been done, the specialisations can be introduced. In
this case, it's a very simple matter of changing the `maxrecs`
configuration setting to 1 unless it's already been given an explicit
value. (That would occur if the HTML used an element like `<div
class="mkwsRecord" maxrecs="2">`, though it's not obvious why anyone
would do that.)


Reference Guide
===============


Widget properties and methods
-----------------------------

The following properties and methods exist in the bare widget object
that is passed into `registerWidgetType`'s callback function, and can
be used by the derived widget.

* `String this.type` --
	A string containing the type of the widget.

* `Team this.team` --
	The team object to which this widget belongs. The team has
	several additional important properties and methods, described
	below.

* `DOMElement this.node` --
	The DOM element of the widget

* `Hash this.config` --
	A table of configuration values for the widget. This table
	inherits missing values from the team's configuration, which
	in turn inherits from the top-level MKWS configuration, which
	inherits from the default configuration. Instances of widgets
	in HTML can set configuration items as HTML attributes: for
	example, the HTML element
	`<div class="mkwsRecords" maxrecs="10">`.
	creates a widget for which `this.config.maxrecs` is set to 10.

* `String this.toString()` --
	A function returning a string that briefly names this
	widget. Can be useful in logging.

* `Void this.log(string)` --
	A function to log a string for debugging purposes. The string
	is written on the browser console, and also published to any
	subcribers to the `log` event.

* `String this.value()` --
	A function returning the value of the widget's HTML element.

* `VOID autosearch()` --
	Registers that this kind of widget is one that requires an
	automatic search to be run for it if an `autosearch` attribute
	is provided on the HTML element. This is appropriate for
	widgets such as `Records` and `Facet` that display some part
	of a search result.

* `VOID hideWhenNarrow()` --
	Registers that this widget should hide itself when the page
	becomes "narrow" -- that is, fewer pixels in width that the
	threshhold value specified by the top-level configuration item
	`responsive_design_width`. Should be used for "unimportant"
	widgets that can be omitted from the mobile version of a site.

* `expandValue()` --
	TODO: either document this or remove it from the API.

* `subwidget(type, overrides, defaults)` --
	Returns the HTML of a subwidget of the specified type, which
	can then be inserted into the widget using the
	`this.node.html` function. The subwidget is given the same
	attributes at the parent widget that invokes this function,
	except where overrides are passed in. If defaults are also
	provided, then these are used when the parent widget provides
	no values. Both the `overrides` and `defaults` arguments are
	hashes: the latter is optional.
  
	See for example the `Credo` widget defined in the example
	area's `mkws-widget-credo.js` file. This uses several
	invocations of `subwidget` to create a complex compound widget
	with numerous text, facet and image panes. TODO: rename this
	widget and everything related to it.

In addition to these properties and methods of the bare widget object,
some kinds of specific widget add other properties of their own. For
example, the `Builder` widget uses a `callback` property as the
function that it use to publish the widget definition that it
constructs. This defaults to the builtin function `alert`, but can be
overridden by derived widgets such as `ConsoleBuilder`.


Team methods
------------

Since the team object is supposed to be opaque to widgets, all access
is via the following API methods rather than direct access to
properties.

* `String team.name()`
* `Bool team.submitted()`
* `Num team.perpage()`
* `Num team.totalRecordCount()`
* `Num team.currentPage();`
* `String team.currentRecordId()`
* `String team.currentRecordData()`

These are all simple accessor functions that provide the ability to
read properties of the team.

* `Array team.filters()` --
	Another accessor function, providing access to the array of
	prevailing filters (which narrow the search results by means
	of Pazpar2 filters and limits). This is really too complicated
	an object for the widgets to be given access to, but it's
	convenient to do it this way. If you must insist on using
	this, see the `Navi` widget, which is the only place it's used.

* `Bool team.targetFiltered(targetId)` --
	Indicates whether the specified target has been filtered by
	selection as a facet. This is used only by the `Facet` widget,
	and there is probably no reason for you to use it.

* `Hash team.config()` --
	Access to the team's configuration settings. There is almost
	certainly no reason to use this: the settings that haven't
	been overridden are accessible via `this.config`.

* `Void team.set_sortOrder(string)`, `Void team.set_perpage(number)` --
	"Setter" functions for the team's sortOrder and perpage
	functions. Unlikely to be needed outside of the `Sort` and
	`Perpage` widgets.

* `Queue team.queue(eventName)` --
	Returns the queue associated with the named event: this can be
	used to subscribe to the event (or more rarely to publish it).

* `Void team.newSearch(query, sortOrder, maxrecs, perpage, limit, targets, targetfilter)` --
	Starts a new search with the specified parameters. All but the
	query may be omitted, in which case the prevailing defaults
	are used.

* `Void team.reShow()` --
	Using the existing search, re-shows the result records after a
	change in sort-order, per-page count, etc.

* `String team.recordElementId(recordId)` --
	Utility function for converting a record identifer (returned
	from Pazpar2) into a version suitable for use as an HTML
	element ID.

* `String team.renderDetails(recordData)` --
	Utility function returns an HTML rendering of the record
	represented by the specified data.

* `Template team.loadTemplate(templateName)` --
	Loads (or retrieves from cache) the named Handlebars template,
	and returns it in a form that can be invoked as a function,
	passed a data-set.

Some of these methods either (A) are really too low-level and should
not be exposed, or (B) should be widget-level methods. The present
infelicities reflect the fact that some code that rightly belongs in
widgets is still in the team. When we finish migrating it, the widget
API should get simpler.


Events
------

TODO: list of events that can be usefully subscribed to.


- - -

Copyright (C) 2013-2014 by Index Data ApS, <http://www.indexdata.com>

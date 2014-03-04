/*! MKWS, the MasterKey Widget Set.
 *  Copyright (C) 2013-2014 Index Data
 *  See the file LICENSE for details
 */

"use strict"; // HTML5: disable for debug_level >= 2


// Handlebars helpers
Handlebars.registerHelper('json', function(obj) {
    return $.toJSON(obj);
});


Handlebars.registerHelper('translate', function(s) {
    return mkws.M(s);
});


// We need {{attr '@name'}} because Handlebars can't parse {{@name}}
Handlebars.registerHelper('attr', function(attrName) {
    return this[attrName];
});


/*
 * Use as follows: {{#if-any NAME1 having="NAME2"}}
 * Applicable when NAME1 is the name of an array
 * The guarded code runs only if at least one element of the NAME1
 * array has a subelement called NAME2.
 */
Handlebars.registerHelper('if-any', function(items, options) {
    var having = options.hash.having;
    for (var i in items) {
	var item = items[i]
	if (!having || item[having]) {
	    return options.fn(this);
	}
    }
    return "";
});


Handlebars.registerHelper('first', function(items, options) {
    var having = options.hash.having;
    for (var i in items) {
	var item = items[i]
	if (!having || item[having]) {
	    return options.fn(item);
	}
    }
    return "";
});


Handlebars.registerHelper('commaList', function(items, options) {
    var out = "";

    for (var i in items) {
	if (i > 0) out += ", ";
	out += options.fn(items[i])
    }

    return out;
});


Handlebars.registerHelper('index1', function(obj) {
    return obj.data.index + 1;
});



// Set up global mkws object. Contains truly global state such as SP
// authentication, and a hash of team objects, indexed by team-name.
//
var mkws = {
    authenticated: false,
    debug_level: 1, // Will be overridden from mkws_config, but
		    // initial value allows jQuery popup to use logging.
    paz: undefined, // will be set up during initialisation
    teams: {},
    locale_lang: {
	"de": {
	    "Authors": "Autoren",
	    "Subjects": "Schlagw&ouml;rter",
	    "Sources": "Daten und Quellen",
	    "source": "datenquelle",
	    "Termlists": "Termlisten",
	    "Next": "Weiter",
	    "Prev": "Zur&uuml;ck",
	    "Search": "Suche",
	    "Sort by": "Sortieren nach",
	    "and show": "und zeige",
	    "per page": "pro Seite",
	    "Displaying": "Zeige",
	    "to": "von",
	    "of": "aus",
	    "found": "gefunden",
	    "Title": "Titel",
	    "Author": "Autor",
	    "author": "autor",
	    "Date": "Datum",
	    "Subject": "Schlagwort",
	    "subject": "schlagwort",
	    "Location": "Ort",
	    "Records": "Datens&auml;tze",
	    "Targets": "Datenbanken",

	    "dummy": "dummy"
	},

	"da": {
	    "Authors": "Forfattere",
	    "Subjects": "Emner",
	    "Sources": "Kilder",
	    "source": "kilder",
	    "Termlists": "Termlists",
	    "Next": "N&aelig;ste",
	    "Prev": "Forrige",
	    "Search": "S&oslash;g",
	    "Sort by": "Sorter efter",
	    "and show": "og vis",
	    "per page": "per side",
	    "Displaying": "Viser",
	    "to": "til",
	    "of": "ud af",
	    "found": "fandt",
	    "Title": "Title",
	    "Author": "Forfatter",
	    "author": "forfatter",
	    "Date": "Dato",
	    "Subject": "Emneord",
	    "subject": "emneord",
	    "Location": "Lokation",
	    "Records": "Poster",
	    "Targets": "Baser",

	    "dummy": "dummy"
	}
    }
};


// The following PubSub code is modified from the jQuery manual:
// https://api.jquery.com/jQuery.Callbacks/
//
// Use as:
//	mkws.queue("eventName").subscribe(function(param1, param2 ...) { ... });
//	mkws.queue("eventName").publish(arg1, arg2, ...);

(function() {
  var queues = {};
  mkws.queue = function(id) {
    if (!queues[id]) {
      var callbacks = $.Callbacks();
      queues[id] = {
	publish: callbacks.fire,
	subscribe: callbacks.add,
	unsubscribe: callbacks.remove
      };
    }
    return queues[id];
  }
}());


// Define empty mkws_config for simple applications that don't define it.
if (mkws_config == null || typeof mkws_config != 'object') {
    var mkws_config = {};
}


// Factory function for widget objects.
function widget($, team, type, node) {
    var that = {
	team: team,
	type: type,
	node: node
    };

    var M = mkws.M;

    if (type === 'Targets') {
	promoteTargets();
    }

    // ### More to do here, surely: e.g. wiring into the team
    mkws.debug("made widget(team=" + team + ", type=" + type + ", node=" + node);

    function promoteTargets() {
	mkws.debug("promoting widget to type Targets");
	mkws.queue("targets").subscribe(function(data) {
	    mkws.debug("notified that there are targets");

	    if (node.length === 0) alert("huh?!");

	    var table ='<table><thead><tr>' +
		'<td>' + M('Target ID') + '</td>' +
		'<td>' + M('Hits') + '</td>' +
		'<td>' + M('Diags') + '</td>' +
		'<td>' + M('Records') + '</td>' +
		'<td>' + M('State') + '</td>' +
		'</tr></thead><tbody>';

	    for (var i = 0; i < data.length; i++) {
		table += "<tr><td>" + data[i].id +
		    "</td><td>" + data[i].hits +
		    "</td><td>" + data[i].diagnostic +
		    "</td><td>" + data[i].records +
		    "</td><td>" + data[i].state + "</td></tr>";
	    }
	    
	    table += '</tbody></table>';
	    $(node).html(table);
	});
    }

    return that;
}


// Factory function for team objects. As much as possible, this uses
// only member variables (prefixed "m_") and inner functions with
// private scope. Some functions are visibl as member-functions to be
// called from outside code -- specifically, from generated
// HTML. These functions are that.switchView(), showDetails(),
// limitTarget(), limitQuery(), delimitTarget(), delimitQuery(),
// pagerPrev(), pagerNext(), showPage().
//
function team($, teamName) {
    var that = {};
    var m_teamName = teamName;
    var m_submitted = false;
    var m_query; // initially undefined
    var m_sort; // will be set below
    var m_perpage; // will be set below
    var m_filters = [];
    var m_totalRec = 0;
    var m_curPage = 1;
    var m_curDetRecId = '';
    var m_curDetRecData = null;
    var m_debug_time = {
	// Timestamps for logging
	"start": $.now(),
	"last": $.now()
    };
    var m_paz; // will be initialised below
    var m_template = {};


    var debug = function (s) {
	var now = $.now();
	var timestamp = ((now - m_debug_time.start)/1000).toFixed(3) + " (+" + ((now - m_debug_time.last)/1000).toFixed(3) + ") "
	m_debug_time.last = now;

	mkws.debug(m_teamName + ": " + timestamp + s);
    }

    debug("start running MKWS");

    m_sort = mkws_config.sort_default;
    m_perpage = mkws_config.perpage_default;

    debug("Create main pz2 object");
    // create a parameters array and pass it to the pz2's constructor
    // then register the form submit event with the pz2.search function
    // autoInit is set to true on default
    m_paz = new pz2({ "windowid": teamName,
		      "pazpar2path": mkws_config.pazpar2_url,
		      "usesessions" : mkws_config.use_service_proxy ? false : true,
		      "oninit": onInit,
		      "onbytarget": onBytarget,
		      "onstat": onStat,
		      "onterm": (mkws_config.facets.length ? onTerm : undefined),
		      "onshow": onShow,
		      "onrecord": onRecord,
		      "showtime": 500,            //each timer (show, stat, term, bytarget) can be specified this way
		      "termlist": mkws_config.facets.join(',')
		    });


    //
    // pz2.js event handlers:
    //
    function onInit(teamName) {
	debug("init");
	m_paz.stat();
	m_paz.bytarget();
    }


    function onBytarget(data, teamName) {
	debug("target");
	mkws.queue("targets").publish(data);
    }


    function onStat(data, teamName) {
	debug("stat");
	var node = findnode('.mkwsStat');
	if (node.length === 0) return;

	node.html('<span class="head">' + M('Status info') + '</span>' +
	    ' -- ' +
	    '<span class="clients">' + M('Active clients') + ': ' + data.activeclients + '/' + data.clients + '</span>' +
	    ' -- ' +
	    '<span class="records">' + M('Retrieved records') + ': ' + data.records + '/' + data.hits + '</span>');
    }


    function onTerm(data, teamName) {
	debug("term");
	var node = findnode(".mkwsTermlists");
	if (node.length == 0) return;

	// no facets: this should never happen
	if (!mkws_config.facets || mkws_config.facets.length == 0) {
	    alert("onTerm called even though we have no facets: " + $.toJSON(data));
	    node.hide();
	    return;
	}

	// display if we first got results
	node.show();

	var acc = [];
	acc.push('<div class="title">' + M('Termlists') + '</div>');
	var facets = mkws_config.facets;

	for(var i = 0; i < facets.length; i++) {
	    if (facets[i] == "xtargets") {
		addSingleFacet(acc, "Sources",  data.xtargets, 16, null);
	    } else if (facets[i] == "subject") {
		addSingleFacet(acc, "Subjects", data.subject,  10, "subject");
	    } else if (facets[i] == "author") {
		addSingleFacet(acc, "Authors",  data.author,   10, "author");
	    } else {
		alert("bad facet configuration: '" + facets[i] + "'");
	    }
	}

	node.html(acc.join(''));
    }


    function onShow(data, teamName) {
	debug("show");
	m_totalRec = data.merged;

	var pager = findnode(".mkwsPager");
	if (pager.length) {
	    pager.html(drawPager(data))
	}

	var results = findnode(".mkwsRecords");
	if (!results.length)
	    return;

	var html = [];
	for (var i = 0; i < data.hits.length; i++) {
            var hit = data.hits[i];
	    html.push('<div class="record" id="mkwsRecdiv_' + teamName + '_' + hit.recid + '" >',
		      renderSummary(hit),
      		      '</div>');
	    if (hit.recid == m_curDetRecId) {
		if (m_curDetRecData)
		    html.push(renderDetails(m_curDetRecData));
	    }
	}
	results.html(html.join(''));
    }


    function onRecord(data, args, teamName) {
	debug("record");
	// FIXME: record is async!!
	clearTimeout(m_paz.recordTimer);
	// in case on_show was faster to redraw element
	var detRecordDiv = document.getElementById('mkwsDet_' + teamName + '_' + data.recid);
	if (detRecordDiv) return;
	m_curDetRecData = data;
	var recordDiv = document.getElementById('mkwsRecdiv_' + teamName + '_' + m_curDetRecData.recid);
	var html = renderDetails(m_curDetRecData);
	recordDiv.innerHTML += html;
    }


    function addSingleFacet(acc, caption, data, max, pzIndex) {
	acc.push('<div class="facet mkwsFacet' + caption + ' mkwsTeam_' + m_teamName + '">');
	acc.push('<div class="termtitle">' + M(caption) + '</div>');
	for (var i = 0; i < data.length && i < max; i++) {
	    acc.push('<div class="term">');
            acc.push('<a href="#" ');
	    var action = '';
	    if (!pzIndex) {
		// Special case: target selection
		acc.push('target_id='+data[i].id+' ');
		if (!targetFiltered(data[i].id)) {
		    action = 'mkws.limitTarget(\'' + m_teamName + '\', this.getAttribute(\'target_id\'),this.firstChild.nodeValue)';
		}
	    } else {
		action = 'mkws.limitQuery(\'' + m_teamName + '\', \'' + pzIndex + '\', this.firstChild.nodeValue)';
	    }
	    acc.push('onclick="' + action + ';return false;">' + data[i].name + '</a>'
		     + ' <span>' + data[i].freq + '</span>');
	    acc.push('</div>');
	}
	acc.push('</div>');
    }


    function targetFiltered(id) {
	for (var i = 0; i < m_filters.length; i++) {
	    if (m_filters[i].id === id ||
		m_filters[i].id === 'pz:id=' + id) {
		return true;
	    }
	}
	return false;
    }


    function drawPager (data)
    {
	var s = '<div style="float: right">' + M('Displaying') + ': '
	    + (data.start + 1) + ' ' + M('to') + ' ' + (data.start + data.num) +
	    ' ' + M('of') + ' ' + data.merged + ' (' + M('found') + ': '
	    + data.total + ')</div>';

	//client indexes pages from 1 but pz2 from 0
	var onsides = 6;
	var pages = Math.ceil(m_totalRec / m_perpage);

	var firstClkbl = (m_curPage - onsides > 0)
            ? m_curPage - onsides
            : 1;

	var lastClkbl = firstClkbl + 2*onsides < pages
            ? firstClkbl + 2*onsides
            : pages;

	var prev = '<span class="mkwsPrev">&#60;&#60; ' + M('Prev') + '</span><b> | </b>';
	if (m_curPage > 1)
            prev = '<a href="#" class="mkwsPrev" onclick="mkws.pagerPrev(\'' + m_teamName + '\');">'
            +'&#60;&#60; ' + M('Prev') + '</a><b> | </b>';

	var middle = '';
	for(var i = firstClkbl; i <= lastClkbl; i++) {
            var numLabel = i;
            if(i == m_curPage)
		numLabel = '<b>' + i + '</b>';

            middle += '<a href="#" onclick="mkws.showPage(\'' + m_teamName + '\', ' + i + ')"> '
		+ numLabel + ' </a>';
	}

	var next = '<b> | </b><span class="mkwsNext">' + M('Next') + ' &#62;&#62;</span>';
	if (pages - m_curPage > 0)
            next = '<b> | </b><a href="#" class="mkwsNext" onclick="mkws.pagerNext(\'' + m_teamName + '\')">'
            + M('Next') + ' &#62;&#62;</a>';

	var predots = '';
	if (firstClkbl > 1)
            predots = '...';

	var postdots = '';
	if (lastClkbl < pages)
            postdots = '...';

	s += '<div style="float: clear">'
            + prev + predots + middle + postdots + next + '</div>';

	return s;
    }


    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////


    // when search button pressed
    function onFormSubmitEventHandler()
    {
	var val = findnode('.mkwsQuery').val();
	newSearch(val);
	return false;
    }


    function newSearch(query, sort, targets)
    {
	debug("newSearch: " + query);

	if (mkws_config.use_service_proxy && !mkws.authenticated) {
	    alert("searching before authentication");
	    return;
	}

	m_filters = []
	redrawNavi();
	resetPage();
	loadSelect();
	triggerSearch(query, sort, targets);
	switchView('records'); // In case it's configured to start off as hidden
	m_submitted = true;
    }


    function onSelectDdChange()
    {
	if (!m_submitted) return false;
	resetPage();
	loadSelect();
	m_paz.show(0, m_perpage, m_sort);
	return false;
    }


    function redrawNavi ()
    {
	var navi = findnode('.mkwsNavi');
	if (!navi) return;

	var text = "";
	for (var i in m_filters) {
	    if (text) {
		text += " | ";
	    }
	    var filter = m_filters[i];
	    if (filter.id) {
		text += M('source') + ': <a class="crossout" href="#" onclick="mkws.delimitTarget(\'' + m_teamName +
		    "', '" + filter.id + "'" + ');return false;">' + filter.name + '</a>';
	    } else {
		text += M(filter.field) + ': <a class="crossout" href="#" onclick="mkws.delimitQuery(\'' + m_teamName +
		    "', '" + filter.field + "', '" + filter.value + "'" +
		    ');return false;">' + filter.value + '</a>';
	    }
	}

	navi.html(text);
    }


    function resetPage()
    {
	m_curPage = 1;
	m_totalRec = 0;
    }


    function loadSelect ()
    {
	var node = findnode('.mkwsSort');
	if (node.length && node.val() != m_sort) {
	    debug("changing m_sort from " + m_sort + " to " + node.val());
	    m_sort = node.val();
	}
	node = findnode('.mkwsPerpage');
	if (node.length && node.val() != m_perpage) {
	    debug("changing m_perpage from " + m_perpage + " to " + node.val());
	    m_perpage = node.val();
	}
    }


    function triggerSearch (query, sort, targets)
    {
	var pp2filter = "";
	var pp2limit = "";

	// Re-use previous query/sort if new ones are not specified
	if (query) {
	    m_query = query;
	}
	if (sort) {
	    m_sort = sort;
	}
	if (targets) {
	    m_filters.push({ id: targets, name: targets });
	}

	for (var i in m_filters) {
	    var filter = m_filters[i];
	    if (filter.id) {
		if (pp2filter)
		    pp2filter += ",";
		if (filter.id.match(/^[a-z:]+[=~]/)) {
		    debug("filter '" + filter.id + "' already begins with SETTING OP");
		} else {
		    filter.id = 'pz:id=' + filter.id;
		}
		pp2filter += filter.id;
	    } else {
		if (pp2limit)
		    pp2limit += ",";
		pp2limit += filter.field + "=" + filter.value.replace(/[\\|,]/g, '\\$&');
	    }
	}

	var params = {};
	if (pp2limit) {
	    params.limit = pp2limit;
	}

	debug("triggerSearch(" + m_query + "): filters = " + $.toJSON(m_filters) + ", pp2filter = " + pp2filter + ", params = " + $.toJSON(params));

	// We can use: params.torusquery = "udb=NAME"
	// Note: that won't work when running against raw pazpar2
	m_paz.search(m_query, m_perpage, m_sort, pp2filter, undefined, params);
    }


    // limit by target functions
    that.limitTarget  = function (id, name)
    {
	debug("limitTarget(id=" + id + ", name=" + name + ")");
	m_filters.push({ id: id, name: name });
	redrawNavi();
	resetPage();
	loadSelect();
	triggerSearch();
	return false;
    }


    // limit the query after clicking the facet
    that.limitQuery = function (field, value)
    {
	debug("limitQuery(field=" + field + ", value=" + value + ")");
	m_filters.push({ field: field, value: value });
	redrawNavi();
	resetPage();
	loadSelect();
	triggerSearch();
	return false;
    }


    that.delimitTarget = function (id)
    {
	debug("delimitTarget(id=" + id + ")");
	var newFilters = [];
	for (var i in m_filters) {
	    var filter = m_filters[i];
	    if (filter.id) {
		debug("delimitTarget() removing filter " + $.toJSON(filter));
	    } else {
		debug("delimitTarget() keeping filter " + $.toJSON(filter));
		newFilters.push(filter);
	    }
	}
	m_filters = newFilters;

	redrawNavi();
	resetPage();
	loadSelect();
	triggerSearch();
	return false;
    }


    that.delimitQuery = function (field, value)
    {
	debug("delimitQuery(field=" + field + ", value=" + value + ")");
	var newFilters = [];
	for (var i in m_filters) {
	    var filter = m_filters[i];
	    if (filter.field &&
		field == filter.field &&
		value == filter.value) {
		debug("delimitQuery() removing filter " + $.toJSON(filter));
	    } else {
		debug("delimitQuery() keeping filter " + $.toJSON(filter));
		newFilters.push(filter);
	    }
	}
	m_filters = newFilters;

	redrawNavi();
	resetPage();
	loadSelect();
	triggerSearch();
	return false;
    }


    that.showPage = function (pageNum)
    {
	m_curPage = pageNum;
	m_paz.showPage(m_curPage - 1);
    }


    // simple paging functions
    that.pagerNext = function () {
	if (m_totalRec - m_perpage*m_curPage > 0) {
            m_paz.showNext();
            m_curPage++;
	}
    }


    that.pagerPrev = function () {
	if (m_paz.showPrev() != false)
            m_curPage--;
    }


    // switching view between targets and records
    function switchView(view) {
	var targets = findnode('.mkwsTargets');
	var results = findnode('.mkwsResults,.mkwsRecords');
	var blanket = findnode('.mkwsBlanket');
	var motd    = findnode('.mkwsMOTD');

	switch(view) {
        case 'targets':
            if (targets) targets.css('display', 'block');
            if (results) results.css('display', 'none');
            if (blanket) blanket.css('display', 'none');
            if (motd) motd.css('display', 'none');
            break;
        case 'records':
            if (targets) targets.css('display', 'none');
            if (results) results.css('display', 'block');
            if (blanket) blanket.css('display', 'block');
            if (motd) motd.css('display', 'none');
            break;
	case 'none':
	    alert("mkws.switchView(" + m_teamName + ", 'none') shouldn't happen");
            if (targets) targets.css('display', 'none');
            if (results) results.css('display', 'none');
            if (blanket) blanket.css('display', 'none');
            if (motd) motd.css('display', 'none');
            break;
        default:
            alert("Unknown view '" + view + "'");
	}
    }


    that.switchView = switchView;


    // detailed record drawing
    that.showDetails = function (prefixRecId) {
	var recId = prefixRecId.replace('mkwsRec_', '');
	var oldRecId = m_curDetRecId;
	m_curDetRecId = recId;

	// remove current detailed view if any
	var detRecordDiv = document.getElementById('mkwsDet_' + m_teamName + '_' + oldRecId);
	// lovin DOM!
	if (detRecordDiv)
	    detRecordDiv.parentNode.removeChild(detRecordDiv);

	// if the same clicked, just hide
	if (recId == oldRecId) {
            m_curDetRecId = '';
            m_curDetRecData = null;
            return;
	}
	// request the record
	debug("showDetails() requesting record '" + recId + "'");
	m_paz.record(recId);
    }


    /*
     * All the HTML stuff to render the search forms and
     * result pages.
     */
    function mkwsHtmlAll() {
	mkwsSetLang();
	if (mkws_config.show_lang)
	    mkwsHtmlLang();

	debug("HTML search form");
	mkws.handleNodeWithTeam(findnode('.mkwsSearch'), function(tname) {
	    this.html('\
<form name="mkwsSearchForm" class="mkwsSearchForm mkwsTeam_' + tname + '" action="" >\
  <input class="mkwsQuery mkwsTeam_' + tname + '" type="text" size="' + mkws_config.query_width + '" />\
  <input class="mkwsButton mkwsTeam_' + tname + '" type="submit" value="' + M('Search') + '" />\
</form>');
	});

	debug("HTML records");
	// If the team has a .mkwsResults, populate it in the usual
	// way. If not, assume that it's a smarter application that
	// defines its own subcomponents, some or all of the
	// following:
	//	.mkwsTermlists
	//	.mkwsRanking
	//	.mkwsPager
	//	.mkwsNavi
	//	.mkwsRecords
	if (findnode(".mkwsResults").length) {
	    findnode(".mkwsResults").html('\
<table width="100%" border="0" cellpadding="6" cellspacing="0">\
  <tr>\
    <td class="mkwsTermlistContainer1 mkwsTeam_' + m_teamName + '" width="250" valign="top">\
      <div class="mkwsTermlists mkwsTeam_' + m_teamName + '"></div>\
    </td>\
    <td class="mkwsMOTDContainer mkwsTeam_' + m_teamName + '" valign="top">\
      <div class="mkwsRanking mkwsTeam_' + m_teamName + '"></div>\
      <div class="mkwsPager mkwsTeam_' + m_teamName + '"></div>\
      <div class="mkwsNavi mkwsTeam_' + m_teamName + '"></div>\
      <div class="mkwsRecords mkwsTeam_' + m_teamName + '"></div>\
    </td>\
  </tr>\
  <tr>\
    <td colspan="2">\
      <div class="mkwsTermlistContainer2 mkwsTeam_' + m_teamName + '"></div>\
    </td>\
  </tr>\
</table>');
	}

	var node = findnode(".mkwsRanking");
	if (node.length) {
	    var ranking_data = '';
	    ranking_data += '<form name="mkwsSelect" class="mkwsSelect mkwsTeam_' + m_teamName + '" action="" >';
	    if (mkws_config.show_sort) {
		ranking_data +=  M('Sort by') + ' ' + mkwsHtmlSort() + ' ';
	    }
	    if (mkws_config.show_perpage) {
		ranking_data += M('and show') + ' ' + mkwsHtmlPerpage() + ' ' + M('per page') + '.';
	    }
            ranking_data += '</form>';

	    node.html(ranking_data);
	}

	mkwsHtmlSwitch();

	var node;
	node = findnode('.mkwsSearchForm');
	if (node.length)
	    node.submit(onFormSubmitEventHandler);
	node = findnode('.mkwsSort');
	if (node.length)
	    node.change(onSelectDdChange);
	node = findnode('.mkwsPerpage');
	if (node.length)
	    node.change(onSelectDdChange);

	// on first page, hide the termlist
	$(document).ready(function() { findnode(".mkwsTermlists").hide(); });
	var motd = findnode(".mkwsMOTD");
        var container = findnode(".mkwsMOTDContainer");
	if (motd.length && container.length) {
	    // Move the MOTD from the provided element down into the container
	    motd.appendTo(container);
	}
    }


    function mkwsSetLang()  {
	var lang = parseQuerystring().lang || mkws_config.lang;
	if (!lang || !mkws.locale_lang[lang]) {
	    mkws_config.lang = ""
	} else {
	    mkws_config.lang = lang;
	}

	debug("Locale language: " + (mkws_config.lang ? mkws_config.lang : "none"));
	return mkws_config.lang;
    }


    /* create locale language menu */
    function mkwsHtmlLang() {
	var lang_default = "en";
	var lang = mkws_config.lang || lang_default;
	var list = [];

	/* display a list of configured languages, or all */
	var lang_options = mkws_config.lang_options || [];
	var toBeIncluded = {};
	for (var i = 0; i < lang_options.length; i++) {
	    toBeIncluded[lang_options[i]] = true;
	}

	for (var k in mkws.locale_lang) {
	    if (toBeIncluded[k] || lang_options.length == 0)
		list.push(k);
	}

	// add english link
	if (lang_options.length == 0 || toBeIncluded[lang_default])
            list.push(lang_default);

	debug("Language menu for: " + list.join(", "));

	/* the HTML part */
	var data = "";
	for(var i = 0; i < list.length; i++) {
	    var l = list[i];

	    if (data)
		data += ' | ';

	    if (lang == l) {
		data += ' <span>' + l + '</span> ';
	    } else {
		data += ' <a href="?lang=' + l + '">' + l + '</a> '
	    }
	}

	findnode(".mkwsLang").html(data);
    }


    function mkwsHtmlSort() {
	debug("HTML sort, m_sort = '" + m_sort + "'");
	var sort_html = '<select class="mkwsSort mkwsTeam_' + m_teamName + '">';

	for(var i = 0; i < mkws_config.sort_options.length; i++) {
	    var opt = mkws_config.sort_options[i];
	    var key = opt[0];
	    var val = opt.length == 1 ? opt[0] : opt[1];

	    sort_html += '<option value="' + key + '"';
	    if (m_sort == key || m_sort == val) {
		sort_html += ' selected="selected"';
	    }
	    sort_html += '>' + M(val) + '</option>';
	}
	sort_html += '</select>';

	return sort_html;
    }


    function mkwsHtmlPerpage() {
	debug("HTML perpage, m_perpage = " + m_perpage);
	var perpage_html = '<select class="mkwsPerpage mkwsTeam_' + m_teamName + '">';

	for(var i = 0; i < mkws_config.perpage_options.length; i++) {
	    var key = mkws_config.perpage_options[i];

	    perpage_html += '<option value="' + key + '"';
	    if (key == m_perpage) {
		perpage_html += ' selected="selected"';
	    }
	    perpage_html += '>' + key + '</option>';
	}
	perpage_html += '</select>';

	return perpage_html;
    }


    function mkwsHtmlSwitch() {
	debug("HTML switch for team " + m_teamName);

	var node = findnode(".mkwsSwitch");
	node.append($('<a href="#" onclick="mkws.switchView(\'' + m_teamName + '\', \'records\')">' + M('Records') + '</a>'));
	node.append($("<span/>", { text: " | " }));
	node.append($('<a href="#" onclick="mkws.switchView(\'' + m_teamName + '\', \'targets\')">' + M('Targets') + '</a>'));

	debug("HTML targets");
	var node = findnode(".mkwsTargets");
	node.html('\
<div class="mkwsBytarget mkwsTeam_' + m_teamName + '">\
  No information available yet.\
</div>');
	node.css("display", "none");
    }


    that.runAutoSearch = function() {
	// ### should check mkwsTermlist as well, for facet-only teams
	var node = findnode('.mkwsRecords');
	var query = node.attr('autosearch');
	if (!query)
	    return;

	if (query.match(/^!param!/)) {
	    var param = query.replace(/^!param!/, '');
	    query = getParameterByName(param);
	    debug("obtained query '" + query + "' from param '" + param + "'");
	    if (!query) {
		alert("This page has a MasterKey widget that needs a query specified by the '" + param + "' parameter");
	    }
	} else if (query.match(/^!path!/)) {
	    var index = query.replace(/^!path!/, '');
	    var path = window.location.pathname.split('/');
	    query = path[path.length - index];
	    debug("obtained query '" + query + "' from path-component '" + index + "'");
	    if (!query) {
		alert("This page has a MasterKey widget that needs a query specified by the path-component " + index);
	    }
	}

	debug("node=" + node + ", class='" + node.className + "', query=" + query);

	var sort = node.attr('sort');
	var targets = node.attr('targets');
	var s = "running auto search: '" + query + "'";
	if (sort) s += " sorted by '" + sort + "'";
	if (targets) s += " in targets '" + targets + "'";
	debug(s);

	newSearch(query, sort, targets);
    }


    // implement $.parseQuerystring() for parsing URL parameters
    function parseQuerystring() {
	var nvpair = {};
	var qs = window.location.search.replace('?', '');
	var pairs = qs.split('&');
	$.each(pairs, function(i, v){
	    var pair = v.split('=');
	    nvpair[pair[0]] = pair[1];
	});
	return nvpair;
    }


    // This function is taken from a StackOverflow answer
    // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/901144#901144
    // ### should we unify this and parseQuerystring()?
    function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


    /* locale */
    function M(word) {
	var lang = mkws_config.lang;

	if (!lang || !mkws.locale_lang[lang])
	    return word;

	return mkws.locale_lang[lang][word] || word;
    }
    mkws.M = M; // so the Handlebars helper can use it


    // Finds the node of the specified class within the current team
    // Multiple OR-clauses separated by commas are handled
    // More complex cases may not work
    //
    function findnode(selector, teamName) {
	teamName = teamName || m_teamName;

	selector = selector.split(',').map(function(s) {
	    return s + '.mkwsTeam_' + teamName;
	}).join(',');

	return $(selector);
    }


    function renderSummary(hit)
    {
	var template = loadTemplate("Summary");
	hit._id = "mkwsRec_" + hit.recid;
	hit._onclick = "mkws.showDetails('" + m_teamName + "', this.id);return false;"
	return template(hit);
    }


    function renderDetails(data, marker)
    {
	var template = loadTemplate("Record");
	var details = template(data);
	return '<div class="details" id="mkwsDet_' + m_teamName + '_' + data.recid + '">' + details + '</div>';
    }


    function loadTemplate(name)
    {
	var template = m_template[name];

	if (template === undefined) {
	    // Fall back to generic template if there is no team-specific one
	    var node = findnode(".mkwsTemplate_" + name);
	    if (!node.length) {
		node = findnode(".mkwsTemplate_" + name, "ALL");
	    }

	    var source = node.html();
	    if (!source) {
		source = defaultTemplate(name);
	    }

	    template = Handlebars.compile(source);
	    debug("compiled template '" + name + "'");
	    m_template[name] = template;
	}

	return template;
    }


    function defaultTemplate(name)
    {
	if (name === 'Record') {
	    return '\
<table>\
  <tr>\
    <th>{{translate "Title"}}</th>\
    <td>\
      {{md-title}}\
      {{#if md-title-remainder}}\
	({{md-title-remainder}})\
      {{/if}}\
      {{#if md-title-responsibility}}\
	<i>{{md-title-responsibility}}</i>\
      {{/if}}\
    </td>\
  </tr>\
  {{#if md-date}}\
  <tr>\
    <th>{{translate "Date"}}</th>\
    <td>{{md-date}}</td>\
  </tr>\
  {{/if}}\
  {{#if md-author}}\
  <tr>\
    <th>{{translate "Author"}}</th>\
    <td>{{md-author}}</td>\
  </tr>\
  {{/if}}\
  {{#if md-electronic-url}}\
  <tr>\
    <th>{{translate "Links"}}</th>\
    <td>\
      {{#each md-electronic-url}}\
	<a href="{{this}}">Link{{index1}}</a>\
      {{/each}}\
    </td>\
  </tr>\
  {{/if}}\
  {{#if-any location having="md-subject"}}\
  <tr>\
    <th>{{translate "Subject"}}</th>\
    <td>\
      {{#first location having="md-subject"}}\
	{{#if md-subject}}\
	  {{#commaList md-subject}}\
	    {{this}}{{/commaList}}\
	{{/if}}\
      {{/first}}\
    </td>\
  </tr>\
  {{/if-any}}\
  <tr>\
    <th>{{translate "Locations"}}</th>\
    <td>\
      {{#commaList location}}\
	{{attr "@name"}}{{/commaList}}\
    </td>\
  </tr>\
</table>\
';
	} else if (name === "Summary") {
	    return '\
<a href="#" id="{{_id}}" onclick="{{_onclick}}">\
  <b>{{md-title}}</b>\
</a>\
{{#if md-title-remainder}}\
  <span>{{md-title-remainder}}</span>\
{{/if}}\
{{#if md-title-responsibility}}\
  <span><i>{{md-title-responsibility}}</i></span>\
{{/if}}\
';
	}

	var s = "There is no default '" + name +"' template!";
	alert(s);
	return s;
    }


    // main
    (function() {
	try {
	    mkwsHtmlAll()
	}

	catch (e) {
	    mkws_config.error = e.message;
	    // alert(e.message);
	}
    })();

    // Bizarrely, 'that' is just an empty hash. All its state is in
    // the closure variables defined earlier in this function.
    return that;
};


// wrapper to call team() after page load
(function (j) {
    mkws.debug = function (string) {
	if (!mkws.debug_level)
	    return;

	if (typeof console === "undefined" || typeof console.log === "undefined") { /* ARGH!!! old IE */
	    return;
	}

	// you need to disable use strict at the top of the file!!!
	if (mkws.debug_level >= 3) {
	    console.log(arguments.callee.caller);
	} else if (mkws.debug_level >= 2) {
	    console.log(">>> called from function " + arguments.callee.caller.name + ' <<<');
	}
	console.log(string);
    }
    var debug = mkws.debug;


    mkws.handleNodeWithTeam = function(node, callback) {
	// First branch for DOM objects; second branch for jQuery objects
	var classes = node.className || node.attr('class');
	if (!classes) {
	    // For some reason, if we try to proceed when classes is
	    // undefined, we don't get an error message, but this
	    // function and its callers, up several stack level,
	    // silently return. What a crock.
	    mkws.debug("handleNodeWithTeam() called on node with no classes");
	    return;
	}
 	var list = classes.split(/\s+/)
	var teamName, type;

	for (var i = 0; i < list.length; i++) {
	    var cname = list[i];
	    if (cname.match(/^mkwsTeam_/)) {
		teamName = cname.replace(/^mkwsTeam_/, '');
	    } else if (cname.match(/^mkws/)) {
		type = cname.replace(/^mkws/, '');
	    }
	}
	callback.call(node, teamName, type);
    }


    mkws.resizePage = function () {
	var list = ["mkwsSwitch", "mkwsLang"];

	var width = mkws_config.responsive_design_width;
	var parent = $(".mkwsTermlists").parent();

	if ($(window).width() <= width &&
	    parent.hasClass("mkwsTermlistContainer1")) {
	    debug("changing from wide to narrow: " + $(window).width());
	    $(".mkwsTermlistContainer1").hide();
	    $(".mkwsTermlistContainer2").show();
	    for (var tname in mkws.teams) {
		$(".mkwsTermlists.mkwsTeam_" + tname).appendTo($(".mkwsTermlistContainer2.mkwsTeam_" + tname));
		for(var i = 0; i < list.length; i++) {
		    $("." + list[i] + ".mkwsTeam_" + tname).hide();
		}
	    }
	} else if ($(window).width() > width &&
		   parent.hasClass("mkwsTermlistContainer2")) {
	    debug("changing from narrow to wide: " + $(window).width());
	    $(".mkwsTermlistContainer1").show();
	    $(".mkwsTermlistContainer2").hide();
	    for (var tname in mkws.teams) {
		$(".mkwsTermlists.mkwsTeam_" + tname).appendTo($(".mkwsTermlistContainer1.mkwsTeam_" + tname));
		for(var i = 0; i < list.length; i++) {
		    $("." + list[i] + ".mkwsTeam_" + tname).show();
		}
	    }
	}
    };


    mkws.switchView = function(tname, view) {
	mkws.teams[tname].switchView(view);
    }

    mkws.showDetails = function (tname, prefixRecId) {
	mkws.teams[tname].showDetails(prefixRecId);
    }

    mkws.limitTarget  = function (tname, id, name) {
	mkws.teams[tname].limitTarget(id, name);
    }

    mkws.limitQuery  = function (tname, field, value) {
	mkws.teams[tname].limitQuery(field, value);
    }

    mkws.delimitTarget = function (tname, id) {
	mkws.teams[tname].delimitTarget(id);
    }

    mkws.delimitQuery = function (tname, field, value) {
	mkws.teams[tname].delimitQuery(field, value);
    }

    mkws.showPage = function (tname, pageNum) {
	mkws.teams[tname].showPage(pageNum);
    }

    mkws.pagerPrev = function (tname) {
	mkws.teams[tname].pagerPrev();
    }

    mkws.pagerNext = function (tname) {
	mkws.teams[tname].pagerNext();
    }


    function defaultMkwsConfig() {
	/* default mkws config */
	var config_default = {
	    use_service_proxy: true,
	    pazpar2_url: "//mkws.indexdata.com/service-proxy/",
	    service_proxy_auth: "//mkws.indexdata.com/service-proxy-auth",
	    lang: "",
	    sort_options: [["relevance"], ["title:1", "title"], ["date:0", "newest"], ["date:1", "oldest"]],
	    perpage_options: [10, 20, 30, 50],
	    sort_default: "relevance",
	    perpage_default: 20,
	    query_width: 50,
	    show_lang: true, 	/* show/hide language menu */
	    show_sort: true, 	/* show/hide sort menu */
	    show_perpage: true, 	/* show/hide perpage menu */
	    lang_options: [], 	/* display languages links for given languages, [] for all */
	    facets: ["xtargets", "subject", "author"], /* display facets, in this order, [] for none */
	    responsive_design_width: undefined, /* a page with less pixel width considered as narrow */
	    debug_level: 1,     /* debug level for development: 0..2 */

	    dummy: "dummy"
	};

	/* Set global debug_level flag early so that debug() works */
	if (typeof mkws_config.debug_level !== 'undefined') {
	    mkws.debug_level = mkws_config.debug_level;
	} else if (typeof config_default.debug_level !== 'undefined') {
	    mkws.debug_level = config_default.debug_level;
	}

	// make sure the mkws_config is a valid hash
	if (!$.isPlainObject(mkws_config)) {
	    debug("ERROR: mkws_config is not an JS object, ignore it....");
	    mkws_config = {};
	}

	/* override standard config values by function parameters */
	for (var k in config_default) {
	    if (typeof mkws_config[k] === 'undefined')
		mkws_config[k] = config_default[k];
	    //debug("Set config: " + k + ' => ' + mkws_config[k]);
	}
    }


    /*
     * Run service-proxy authentication in background (after page load).
     * The username/password is configured in the apache config file
     * for the site.
     */
    function authenticateSession(auth_url, auth_domain, pp2_url) {
	debug("Run service proxy auth URL: " + auth_url);

	if (!auth_domain) {
	    auth_domain = pp2_url.replace(/^(https?:)?\/\/(.*?)\/.*/, '$2');
	    debug("guessed auth_domain '" + auth_domain + "' from pp2_url '" + pp2_url + "'");
	}

	var request = new pzHttpRequest(auth_url, function(err) {
	    alert("HTTP call for authentication failed: " + err)
	    return;
	}, auth_domain);

	request.get(null, function(data) {
	    if (!$.isXMLDoc(data)) {
		alert("service proxy auth response document is not valid XML document, give up!");
		return;
	    }
	    var status = $(data).find("status");
	    if (status.text() != "OK") {
		alert("service proxy auth repsonse status: " + status.text() + ", give up!");
		return;
	    }

	    debug("Service proxy auth successfully done");
	    mkws.authenticated = true;
	    runAutoSearches();
	});
    }


    function runAutoSearches() {
	debug("running auto searches");

	for (var teamName in mkws.teams) {
	    mkws.teams[teamName].runAutoSearch();
	}
    }


    $(document).ready(function() {
	debug("on load ready");
	defaultMkwsConfig();

	if (mkws_config.query_width < 5 || mkws_config.query_width > 150) {
	    debug("Reset query width: " + mkws_config.query_width);
	    mkws_config.query_width = 50;
	}

	for (var key in mkws_config) {
	    if (mkws_config.hasOwnProperty(key)) {
		if (key.match(/^language_/)) {
		    var lang = key.replace(/^language_/, "");
		    // Copy custom languages into list
		    mkws.locale_lang[lang] = mkws_config[key];
		    debug("Added locally configured language '" + lang + "'");
		}
	    }
	}

	if (mkws_config.responsive_design_width) {
	    // Responsive web design - change layout on the fly based on
	    // current screen width. Required for mobile devices.
	    $(window).resize(function(e) { mkws.resizePage() });
	    // initial check after page load
	    $(document).ready(function() { mkws.resizePage() });
	}

	// protocol independent link for pazpar2: "//mkws/sp" -> "https://mkws/sp"
	if (mkws_config.pazpar2_url.match(/^\/\//)) {
	    mkws_config.pazpar2_url = document.location.protocol + mkws_config.pazpar2_url;
	    debug("adjust protocol independent links: " + mkws_config.pazpar2_url);
	}

	// Backwards compatibility: set new magic class names on any
	// elements that have the old magic IDs.
	var ids = [ "Switch", "Lang", "Search", "Pager", "Navi",
		    "Results", "Records", "Targets", "Ranking",
		    "Termlists", "Stat", "MOTD" ];
	for (var i = 0; i < ids.length; i++) {
	    var id = 'mkws' + ids[i];
	    var node = $('#' + id);
	    if (node.attr('id')) {
		node.addClass(id);
		debug("added magic class to '" + node.attr('id') + "'");
	    }
	}

	// For all MKWS-classed nodes that don't have a team
	// specified, set the team to AUTO.
	$('[class^="mkws"],[class*=" mkws"]').each(function () {
	    if (!this.className.match(/mkwsTeam_/)) {
		debug("adding AUTO team to node with class '" + this.className + "'");
		$(this).addClass('mkwsTeam_AUTO');
	    }
	});

	// Find all nodes with an class, and determine their team from
	// the mkwsTeam_* class. Make all team objects.
	var then = $.now();
	$('[class^="mkws"],[class*=" mkws"]').each(function () {
	    mkws.handleNodeWithTeam(this, function(tname, type) {
		if (!mkws.teams[tname]) {
		    mkws.teams[tname] = team(j, tname);
		    debug("Made MKWS team '" + tname + "'");
		}
		var myTeam = mkws.teams[tname];
		var myWidget = widget(j, myTeam, type, this);
	    });
	});
	var now = $.now();
	debug("Walking MKWS nodes took " + (now-then) + " ms");

	if (mkws_config.use_service_proxy) {
	    authenticateSession(mkws_config.service_proxy_auth,
				mkws_config.service_proxy_auth_domain,
				mkws_config.pazpar2_url);
	} else {
	    // raw pp2
	    runAutoSearches();
	}
    });
})(jQuery);

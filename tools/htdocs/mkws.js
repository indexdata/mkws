/*! MKWS, the MasterKey Widget Set. Copyright (C) 2013-2014, Index Data */

"use strict"; // HTML5: disable for debug_level >= 2

// Some functions are visible to be called from outside code, namely
// generated HTML: mkws.switchView(), showDetails(), limitTarget(),
// limitQuery(), delimitTarget(), delimitQuery(), pagerPrev(),
// pagerNext(), showPage()

// Set up global mkws object. Contains a hash of session objects,
// indexed by windowid.
var mkws = {
    authenticated: false,
    sessions: {}
};

mkws.locale_lang = {
    "de": {
	"Authors": "Autoren",
	"Subjects": "Schlagw&ouml;rter",
	"Sources": "Daten und Quellen",
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
	"Date": "Datum",
	"Subject": "Schlagwort",
	"Location": "Ort",
	"Records": "Datens&auml;tze",
	"Targets": "Datenbanken",

	"dummy": "dummy"
    },

    "da": {
	"Authors": "Forfattere",
	"Subjects": "Emner",
	"Sources": "Kilder",
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
	"Date": "Dato",
	"Subject": "Emneord",
	"Location": "Lokation",
	"Records": "Poster",
	"Targets": "Baser",

	"dummy": "dummy"
    }
};

// Define empty mkws_config for simple applications that don't define it.
if (mkws_config == null || typeof mkws_config != 'object') {
    var mkws_config = {};
}

// wrapper for jQuery lib
function _make_mkws_team($, teamName) {
    if (console && console.log)
	console.log("run _make_mkws_team(" + (teamName ? teamName : "") + ")");

    // call this function only once
    if (mkws.init) {
	alert("_make_mkws_team() called twice: how did that happen?!");
	return;
    }

    var m_sort = 'relevance';
    var m_filters = [];

    // keep time state for debugging
    var m_debug_time = {
	"start": $.now(),
	"last": $.now()
    };

    mkws.debug_function = function (string) {
	if (!mkws.debug_level)
	    return;

	if (typeof console === "undefined" || typeof console.log === "undefined") { /* ARGH!!! old IE */
	    return;
	}

	var now = $.now();
	var timestamp = ((now - m_debug_time.start)/1000).toFixed(3) + " (+" + ((now - m_debug_time.last)/1000).toFixed(3) + ") "
	m_debug_time.last = now;

	// you need to disable use strict at the top of the file!!!
	if (mkws.debug_level >= 3) {
	    console.log(timestamp + arguments.callee.caller);
	} else if (mkws.debug_level >= 2) {
	    console.log(timestamp + ">>> called from function " + arguments.callee.caller.name + ' <<<');
	}
	console.log(timestamp + string);
    }
    var debug = mkws.debug_function; // local alias
    debug("start running MKWS");


    Handlebars.registerHelper('json', function(obj) {
	return $.toJSON(obj);
    });


    Handlebars.registerHelper('translate', function(s) {
	debug("translating '" + s + "'");
	return M(s);
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


    {

	/* default mkws config */
	var config_default = {
	    use_service_proxy: true,
	    pazpar2_url: "http://mkws.indexdata.com/service-proxy/",
	    service_proxy_auth: "http://mkws.indexdata.com/service-proxy-auth",
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
	    facets: ["sources", "subjects", "authors"], /* display facets, in this order, [] for none */
	    responsive_design_width: undefined, /* a page with less pixel width considered as narrow */
	    debug_level: 1,     /* debug level for development: 0..2 */

	    dummy: "dummy"
	};

	/* set global debug_level flag early */
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
	    debug("Set config: " + k + ' => ' + mkws_config[k]);
	}
    }


    m_sort = mkws_config.sort_default;
    debug("copied mkws_config.sort_default '" + mkws_config.sort_default + "' to m_sort");

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

    // protocol independend link for pazpar2: "//mkws/sp" -> "https://mkws/sp"
    if (mkws_config.pazpar2_url.match(/^\/\//)) {
	mkws_config.pazpar2_url = document.location.protocol + mkws_config.pazpar2_url;
	debug("adjust protocol independend links: " + mkws_config.pazpar2_url);
    }

    debug("Create main pz2 object");
    // create a parameters array and pass it to the pz2's constructor
    // then register the form submit event with the pz2.search function
    // autoInit is set to true on default
    var m_paz = new pz2( { "onshow": my_onshow,
			   "showtime": 500,            //each timer (show, stat, term, bytarget) can be specified this way
			   "pazpar2path": mkws_config.pazpar2_url,
			   "oninit": my_oninit,
			   "onstat": my_onstat,
			   "onterm": my_onterm,
			   "termlist": "xtargets,subject,author",
			   "onbytarget": my_onbytarget,
			   "usesessions" : mkws_config.use_service_proxy ? false : true,
			   "showResponseType": '', // or "json" (for debugging?)
			   "onrecord": my_onrecord } );

    // some state vars
    var curPage = 1;
    var recPerPage = 20;
    var totalRec = 0;
    var curDetRecId = '';
    var curDetRecData = null;
    var submitted = false;
    var SourceMax = 16;
    var SubjectMax = 10;
    var AuthorMax = 10;
    var m_query; // initially undefined

    if (!isNaN(parseInt(mkws_config.perpage_default))) {
	recPerPage = parseInt(mkws_config.perpage_default);
    }

    //
    // pz2.js event handlers:
    //
    function my_oninit() {
	m_paz.stat();
	m_paz.bytarget();
    }

    function my_onshow(data) {
	totalRec = data.merged;
	// move it out
	var pager = document.getElementById("mkwsPager");
	if (pager) {
	    pager.innerHTML = "";
	    pager.innerHTML +='<div style="float: right">' + M('Displaying') + ': '
		+ (data.start + 1) + ' ' + M('to') + ' ' + (data.start + data.num) +
		' ' + M('of') + ' ' + data.merged + ' (' + M('found') + ': '
		+ data.total + ')</div>';
	    drawPager(pager);
	}

	// navi
	var results = document.getElementById("mkwsRecords");

	var html = [];
	for (var i = 0; i < data.hits.length; i++) {
            var hit = data.hits[i];
	    html.push('<div class="record" id="mkwsRecdiv_' + hit.recid + '" >',
		      renderSummary(hit),
      		      '</div>');
	    if (hit.recid == curDetRecId) {
		html.push(renderDetails(curDetRecData));
	    }
	}
	replaceHtml(results, html.join(''));
    }


    function renderSummary(hit)
    {
	var template = loadTemplate("Summary");
	hit._id = "mkwsRec_" + hit.recid;
	hit._onclick = "mkws.showDetails(this.id);return false;"
	return template(hit);
    }


    function my_onstat(data) {
	var stat = document.getElementById("mkwsStat");
	if (stat == null)
	    return;

	stat.innerHTML = '<span class="head">' + M('Status info') + '</span>' +
	    ' -- ' +
	    '<span class="clients">' + M('Active clients') + ': ' + data.activeclients + '/' + data.clients + '</span>' +
	    ' -- ' +
            '<span class="records">' + M('Retrieved records') + ': ' + data.records + '/' + data.hits + '</span>';
    }

    function my_onterm(data) {
	// no facets
	if (!mkws_config.facets || mkws_config.facets.length == 0) {
	    $("#mkwsTermlists").hide();
	    return;
	}

	// display if we first got results
	$("#mkwsTermlists").show();

	var acc = [];
	acc.push('<div class="title">' + M('Termlists') + '</div>');
	var facets = mkws_config.facets;

	for(var i = 0; i < facets.length; i++) {
	    if (facets[i] == "sources") {
		add_single_facet(acc, "Sources",  data.xtargets, SourceMax, null);
	    } else if (facets[i] == "subjects") {
		add_single_facet(acc, "Subjects", data.subject,  SubjectMax, "subject");
	    } else if (facets[i] == "authors") {
		add_single_facet(acc, "Authors",  data.author,   AuthorMax, "author");
	    } else {
		alert("bad facet configuration: '" + facets[i] + "'");
	    }
	}

	var termlist = document.getElementById("mkwsTermlists");
	if (termlist)
	    replaceHtml(termlist, acc.join(''));
    }

    function add_single_facet(acc, caption, data, max, pzIndex) {
	acc.push('<div class="facet" id="mkwsFacet' + caption + '">');
	acc.push('<div class="termtitle">' + M(caption) + '</div>');
	for (var i = 0; i < data.length && i < max; i++ ) {
	    acc.push('<div class="term">');
            acc.push('<a href="#" ');
	    var action;
	    if (!pzIndex) {
		// Special case: target selection
		acc.push('target_id='+data[i].id+' ');
		action = 'mkws.limitTarget(this.getAttribute(\'target_id\'),this.firstChild.nodeValue)';
	    } else {
		action = 'mkws.limitQuery(\'' + pzIndex + '\', this.firstChild.nodeValue)';
	    }
	    acc.push('onclick="' + action + ';return false;">' + data[i].name + '</a>'
		     + ' <span>' + data[i].freq + '</span>');
	    acc.push('</div>');
	}
	acc.push('</div>');
    }

    function my_onrecord(data) {
	// FIXME: record is async!!
	clearTimeout(m_paz.recordTimer);
	// in case on_show was faster to redraw element
	var detRecordDiv = document.getElementById('mkwsDet_'+data.recid);
	if (detRecordDiv) return;
	curDetRecData = data;
	var recordDiv = document.getElementById('mkwsRecdiv_'+curDetRecData.recid);
	var html = renderDetails(curDetRecData);
	recordDiv.innerHTML += html;
    }

    function my_onbytarget(data) {
	var targetDiv = document.getElementById("mkwsBytarget");
	if (!targetDiv) {
	    // No mkwsTargets div.
	    return;
	}

	var table ='<table><thead><tr>' +
	    '<td>' + M('Target ID') + '</td>' +
	    '<td>' + M('Hits') + '</td>' +
	    '<td>' + M('Diags') + '</td>' +
	    '<td>' + M('Records') + '</td>' +
	    '<td>' + M('State') + '</td>' +
	    '</tr></thead><tbody>';

	for (var i = 0; i < data.length; i++ ) {
            table += "<tr><td>" + data[i].id +
		"</td><td>" + data[i].hits +
		"</td><td>" + data[i].diagnostic +
		"</td><td>" + data[i].records +
		"</td><td>" + data[i].state + "</td></tr>";
	}

	table += '</tbody></table>';
	targetDiv.innerHTML = table;
    }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    // wait until the DOM is ready
    function domReady ()
    {
	document.mkwsSearchForm.onsubmit = onFormSubmitEventHandler;
	document.mkwsSearchForm.mkwsQuery.value = '';
	if (document.mkwsSelect) {
	    if (document.mkwsSelect.mkwsSort)
		document.mkwsSelect.mkwsSort.onchange = onSelectDdChange;
	    if (document.mkwsSelect.mkwsPerpage)
		document.mkwsSelect.mkwsPerpage.onchange = onSelectDdChange;
	}
    }

    // when search button pressed
    function onFormSubmitEventHandler()
    {
	newSearch(document.mkwsSearchForm.mkwsQuery.value);
	return false;
    }

    function newSearch(query, sort, targets, windowid)
    {
	debug("newSearch: " + query);

	if (mkws_config.use_service_proxy && !mkws.authenticated) {
	    alert("searching before authentication");
	    return;
	}

	m_filters = []
	redraw_navi(); // ### should use windowid
	resetPage(); // ### the globals it resents should be indexed by windowid
	loadSelect(); // ### should use windowid
	triggerSearch(query, sort, targets, windowid);
	mkws.switchView('records'); // In case it's configured to start off as hidden
	submitted = true;
    }

    function onSelectDdChange()
    {
	if (!submitted) return false;
	resetPage();
	loadSelect();
	m_paz.show(0, recPerPage, m_sort);
	return false;
    }

    function resetPage()
    {
	curPage = 1;
	totalRec = 0;
    }

    function triggerSearch (query, sort, targets, windowid)
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
	    // ### should support multiple |-separated targets
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
	if (windowid) {
	    params.windowid = windowid;
	}
	debug("triggerSearch(" + m_query + "): filters = " + $.toJSON(m_filters) + ", pp2filter = " + pp2filter + ", params = " + $.toJSON(params));

	m_paz.search(m_query, recPerPage, m_sort, pp2filter, undefined, params);
    }

    function loadSelect ()
    {
	if (document.mkwsSelect) {
	    if (document.mkwsSelect.mkwsSort)
		m_sort = document.mkwsSelect.mkwsSort.value;
	    if (document.mkwsSelect.mkwsPerpage)
		recPerPage = document.mkwsSelect.mkwsPerpage.value;
	}
    }

    // limit the query after clicking the facet
    mkws.limitQuery = function (field, value)
    {
	debug("limitQuery(field=" + field + ", value=" + value + ")");
	m_filters.push({ field: field, value: value });
	redraw_navi();
	resetPage();
	loadSelect();
	triggerSearch();
	return false;
    }

    // limit by target functions
    mkws.limitTarget  = function (id, name)
    {
	debug("limitTarget(id=" + id + ", name=" + name + ")");
	m_filters.push({ id: id, name: name });
	redraw_navi();
	resetPage();
	loadSelect();
	triggerSearch();
	return false;
    }

    mkws.delimitQuery = function (field, value)
    {
	debug("delimitQuery(field=" + field + ", value=" + value + ")");
	var newFilters = [];
	for (var i in m_filters) {
	    var filter = m_filters[i];
	    if (filter.field &&
		field == filter.field &&
		value == filter.value) {
		debug("delimitTarget() removing filter " + $.toJSON(filter));
	    } else {
		debug("delimitTarget() keeping filter " + $.toJSON(filter));
		newFilters.push(filter);
	    }
	}
	m_filters = newFilters;

	redraw_navi();
	resetPage();
	loadSelect();
	triggerSearch();
	return false;
    }


    mkws.delimitTarget = function (id)
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

	redraw_navi();
	resetPage();
	loadSelect();
	triggerSearch();
	return false;
    }


    function redraw_navi ()
    {
	var navi = document.getElementById('mkwsNavi');
	if (!navi) return;

	var text = "";
	for (var i in m_filters) {
	    if (text) {
		text += " | ";
	    }
	    var filter = m_filters[i];
	    if (filter.id) {
		text += 'Source: <a class="crossout" href="#" onclick="mkws.delimitTarget(' +
		    "'" + filter.id + "'" + ');return false;">' + filter.name + '</a>';
	    } else {
		text += filter.field + ': <a class="crossout" href="#" onclick="mkws.delimitQuery(' +
		    "'" + filter.field + "', '" + filter.value + "'" +
		    ');return false;">' + filter.value + '</a>';
	    }
	}

	navi.innerHTML = text;
    }


    function drawPager (pagerDiv)
    {
	//client indexes pages from 1 but pz2 from 0
	var onsides = 6;
	var pages = Math.ceil(totalRec / recPerPage);

	var firstClkbl = ( curPage - onsides > 0 )
            ? curPage - onsides
            : 1;

	var lastClkbl = firstClkbl + 2*onsides < pages
            ? firstClkbl + 2*onsides
            : pages;

	var prev = '<span id="mkwsPrev">&#60;&#60; ' + M('Prev') + '</span><b> | </b>';
	if (curPage > 1)
            prev = '<a href="#" id="mkwsPrev" onclick="mkws.pagerPrev();">'
            +'&#60;&#60; ' + M('Prev') + '</a><b> | </b>';

	var middle = '';
	for(var i = firstClkbl; i <= lastClkbl; i++) {
            var numLabel = i;
            if(i == curPage)
		numLabel = '<b>' + i + '</b>';

            middle += '<a href="#" onclick="mkws.showPage(' + i + ')"> '
		+ numLabel + ' </a>';
	}

	var next = '<b> | </b><span id="mkwsNext">' + M('Next') + ' &#62;&#62;</span>';
	if (pages - curPage > 0)
            next = '<b> | </b><a href="#" id="mkwsNext" onclick="mkws.pagerNext()">'
            + M('Next') + ' &#62;&#62;</a>';

	var predots = '';
	if (firstClkbl > 1)
            predots = '...';

	var postdots = '';
	if (lastClkbl < pages)
            postdots = '...';

	pagerDiv.innerHTML += '<div style="float: clear">'
            + prev + predots + middle + postdots + next + '</div>';
    }

    mkws.showPage = function (pageNum)
    {
	curPage = pageNum;
	m_paz.showPage( curPage - 1 );
    }

    // simple paging functions

    mkws.pagerNext = function () {
	if ( totalRec - recPerPage*curPage > 0) {
            m_paz.showNext();
            curPage++;
	}
    }

    mkws.pagerPrev = function () {
	if ( m_paz.showPrev() != false )
            curPage--;
    }

    // switching view between targets and records

    mkws.switchView = function(view) {
	debug("switchView: " + view);

	var targets = document.getElementById('mkwsTargets');
	var results = document.getElementById('mkwsResults') ||
	    document.getElementById('mkwsRecords');
	var blanket = document.getElementById('mkwsBlanket');
	var motd    = document.getElementById('mkwsMOTD');

	switch(view) {
        case 'targets':
            if (targets) targets.style.display = "block";
            if (results) results.style.display = "none";
            if (blanket) blanket.style.display = "none";
            if (motd) motd.style.display = "none";
            break;
        case 'records':
            if (targets) targets.style.display = "none";
            if (results) results.style.display = "block";
            if (blanket) blanket.style.display = "block";
            if (motd) motd.style.display = "none";
            break;
	case 'none':
            if (targets) targets.style.display = "none";
            if (results) results.style.display = "none";
            if (blanket) blanket.style.display = "none";
            if (motd) motd.style.display = "none";
            break;
        default:
            alert("Unknown view '" + view + "'");
	}
    }

    // detailed record drawing
    mkws.showDetails = function (prefixRecId) {
	var recId = prefixRecId.replace('mkwsRec_', '');
	var oldRecId = curDetRecId;
	curDetRecId = recId;

	// remove current detailed view if any
	var detRecordDiv = document.getElementById('mkwsDet_'+oldRecId);
	// lovin DOM!
	if (detRecordDiv)
	    detRecordDiv.parentNode.removeChild(detRecordDiv);

	// if the same clicked, just hide
	if (recId == oldRecId) {
            curDetRecId = '';
            curDetRecData = null;
            return;
	}
	// request the record
	m_paz.record(recId);
    }

    function replaceHtml(el, html) {
	var oldEl = typeof el === "string" ? document.getElementById(el) : el;
	/*@cc_on // Pure innerHTML is slightly faster in IE
	  oldEl.innerHTML = html;
	  return oldEl;
	  @*/
	var newEl = oldEl.cloneNode(false);
	newEl.innerHTML = html;
	oldEl.parentNode.replaceChild(newEl, oldEl);
	/* Since we just removed the old element from the DOM, return a reference
	   to the new element, which can be used to restore variable references. */
	return newEl;
    };

    function renderDetails(data, marker)
    {
	var template = loadTemplate("Record");
	var details = template(data);
	return '<div class="details" id="mkwsDet_' + data.recid + '">' + details + '</div>';
    }


    function loadTemplate(name)
    {
	var template = mkws['template' + name];

	if (template === undefined) {
	    var source = $("#mkwsTemplate" + name).html();
	    if (!source) {
		source = defaultTemplate(name);
	    }

	    template = Handlebars.compile(source);
	    debug("compiled template '" + name + "'");
	    mkws['template' + name] = template;
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
    <th>{{translate "URL"}}</th>\
    <td>\
      {{#each md-electronic-url}}\
	<a href="{{this}}">{{this}}</a><br/>\
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
	  {{md-subject}}\
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


    /*
     * All the HTML stuff to render the search forms and
     * result pages.
     */
    function mkws_html_all() {
	mkws_set_lang();
	if (mkws_config.show_lang)
	    mkws_html_lang();

	// For some reason, doing this programmatically results in
	// document.mkwsSearchForm.mkwsQuery being undefined, hence the raw HTML.
	debug("HTML search form");
	$("#mkwsSearch").html('\
<form name="mkwsSearchForm" action="" >\
  <input id="mkwsQuery" type="text" size="' + mkws_config.query_width + '" />\
  <input id="mkwsButton" type="submit" value="' + M('Search') + '" />\
</form>');

	debug("HTML records");
	// If the application has an #mkwsResults, populate it in the
	// usual way. If not, assume that it's a smarter application that
	// defines its own subcomponents:
	//	#mkwsTermlists
	//	#mkwsRanking
	//	#mkwsPager
	//	#mkwsNavi
	//	#mkwsRecords
	if ($("#mkwsResults").length) {
	    $("#mkwsResults").html('\
<table width="100%" border="0" cellpadding="6" cellspacing="0">\
  <tr>\
    <td id="mkwsTermlistContainer1" width="250" valign="top">\
      <div id="mkwsTermlists"></div>\
    </td>\
    <td id="mkwsMOTDContainer" valign="top">\
      <div id="mkwsRanking"></div>\
      <div id="mkwsPager"></div>\
      <div id="mkwsNavi"></div>\
      <div id="mkwsRecords"></div>\
    </td>\
  </tr>\
  <tr>\
    <td colspan="2">\
      <div id="mkwsTermlistContainer2"></div>\
    </td>\
  </tr>\
</table>');
	}

	if ($("#mkwsRanking").length) {
	    var ranking_data = '';
	    ranking_data += '<form name="mkwsSelect" id="mkwsSelect" action="" >';
	    if (mkws_config.show_sort) {
		ranking_data +=  M('Sort by') + ' ' + mkws_html_sort() + ' ';
	    }
	    if (mkws_config.show_perpage) {
		ranking_data += M('and show') + ' ' + mkws_html_perpage() + ' ' + M('per page') + '.';
	    }
            ranking_data += '</form>';

	    $("#mkwsRanking").html(ranking_data);
	}

	mkws_html_switch();

	if (mkws_config.use_service_proxy) {
	    mkws_service_proxy_auth(mkws_config.service_proxy_auth,
				    mkws_config.service_proxy_auth_domain,
				    mkws_config.pazpar2_url);
	} else {
	    // raw pp2
	    run_auto_searches();
	}

	if (mkws_config.responsive_design_width) {
	    // Responsive web design - change layout on the fly based on
	    // current screen width. Required for mobile devices.
	    $(window).resize( function(e) { mkws_resize_page() });
	    // initial check after page load
	    $(document).ready(function() { mkws_resize_page() });
	}

	domReady();

	// on first page, hide the termlist
	$(document).ready(function() { $("#mkwsTermlists").hide(); } );
	var motd = document.getElementById("mkwsMOTD");
	var container = document.getElementById("mkwsMOTDContainer");
	if (motd && container) {
	    // Move the MOTD from the provided element down into the container
            motd.parentNode.removeChild(motd);
	    container.appendChild(motd);
	}
    }


    function run_auto_searches() {
	debug("running auto searches");

	$('[id^="mkwsRecords"]').each(function () {
	    var node = $(this);
	    var query = node.attr('autosearch');

	    if (query) {
		var windowid = undefined;
		var id = node.attr('id');
		if (id.match(/^mkwsRecords_/, '')) {
		    windowid = id.replace(/^mkwsRecords_/, '');
		}

		var sort = node.attr('sort');
		var targets = node.attr('targets');
		var s = "running auto search: '" + query + "'";
		if (windowid) s += " [windowid '" + windowid + "']";
		if (sort) s += " sorted by '" + sort + "'";
		if (targets) s += " in targets '" + targets + "'";
		debug(s);
		newSearch(query, sort, targets, windowid);
	    }
	});
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

    function mkws_set_lang()  {
	var lang = parseQuerystring().lang || mkws_config.lang;
	if (!lang || !mkws.locale_lang[lang]) {
	    mkws_config.lang = ""
	} else {
	    mkws_config.lang = lang;
	}

	debug("Locale language: " + (mkws_config.lang ? mkws_config.lang : "none"));
	return mkws_config.lang;
    }

    function mkws_html_switch() {
	debug("HTML switch");

	$("#mkwsSwitch").append($('<a href="#" id="mkwsSwitch_records" onclick="mkws.switchView(\'records\')">' + M('Records') + '</a>'));
	$("#mkwsSwitch").append($("<span/>", { text: " | " }));
	$("#mkwsSwitch").append($('<a href="#" id="mkwsSwitch_targets" onclick="mkws.switchView(\'targets\')">' + M('Targets') + '</a>'));

	debug("HTML targets");
	$("#mkwsTargets").html('\
<div id="mkwsBytarget">\
  No information available yet.\
</div>');
	$("#mkwsTargets").css("display", "none");
    }

    function mkws_html_sort() {
	debug("HTML sort, m_sort = '" + m_sort + "'");
	var sort_html = '<select name="mkwsSort" id="mkwsSort">';

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

    function mkws_html_perpage() {
	debug("HTML perpage");
	var perpage_html = '<select name="mkwsPerpage" id="mkwsPerpage">';

	for(var i = 0; i < mkws_config.perpage_options.length; i++) {
	    var key = mkws_config.perpage_options[i];

	    perpage_html += '<option value="' + key + '"';
	    if (key == mkws_config.perpage_default) {
		perpage_html += ' selected="selected"';
	    }
	    perpage_html += '>' + key + '</option>';
	}
	perpage_html += '</select>';

	return perpage_html;
    }

    /*
     * Run service-proxy authentication in background (after page load).
     * The username/password is configured in the apache config file
     * for the site.
     */
    function mkws_service_proxy_auth(auth_url, auth_domain, pp2_url) {
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
	    run_auto_searches();
	});
    }

    /* create locale language menu */
    function mkws_html_lang() {
	var lang_default = "en";
	var lang = mkws_config.lang || lang_default;
	var list = [];

	/* display a list of configured languages, or all */
	var lang_options = mkws_config.lang_options || [];
	var hash = {};
	for (var i = 0; i < lang_options.length; i++) {
	    hash[lang_options[i]] = 1;
	}

	for (var k in mkws.locale_lang) {
	    if (hash[k] == 1 || lang_options.length == 0)
		list.push(k);
	}

	// add english link
	if (lang_options.length == 0 || hash[lang_default] == 1)
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

	$("#mkwsLang").html(data);
    }

    function mkws_resize_page () {
	var list = ["mkwsSwitch"];

	var width = mkws_config.responsive_design_width;
	var parentId = $("#mkwsTermlists").parent().attr('id');

	if ($(window).width() <= width &&
	    parentId === "mkwsTermlistContainer1") {
	    debug("changing from wide to narrow: " + $(window).width());
	    $("#mkwsTermlists").appendTo($("#mkwsTermlistContainer2"));
	    $("#mkwsTermlistContainer1").hide();
	    $("#mkwsTermlistContainer2").show();
	    for(var i = 0; i < list.length; i++) {
		$("#" + list[i]).hide();
	    }
	} else if ($(window).width() > width &&
		   parentId === "mkwsTermlistContainer2") {
	    debug("changing from narrow to wide: " + $(window).width());
	    $("#mkwsTermlists").appendTo($("#mkwsTermlistContainer1"));
	    $("#mkwsTermlistContainer1").show();
	    $("#mkwsTermlistContainer2").hide();
	    for(var i = 0; i < list.length; i++) {
		$("#" + list[i]).show();
	    }
	}
    };

    /* locale */
    function M(word) {
	var lang = mkws_config.lang;

	if (!lang || !mkws.locale_lang[lang])
	    return word;

	return mkws.locale_lang[lang][word] || word;
    }

    // main
    (function() {
	try {
	    mkws_html_all()
	}

	catch (e) {
	    mkws_config.error = e.message;
	    // alert(e.message);
	}
    })();

    // done
    mkws.init = true;
};


/*
 * implement jQuery plugin $.pazpar2({})
 */
function _mkws_jquery_plugin ($) {
    var debug_level = 1;

    function debug (string) {
	if (!debug_level)
	    return;

	if (typeof console === "undefined" || typeof console.log === "undefined")
	    return;

	console.log("jquery.pazpar2: " + string);
    }

    function init_popup(obj) {
	var config = obj ? obj : {};

	var height = config.height || 760;
	var width = config.width || 880;
	var id_button = config.id_button || "input#mkwsButton";
	var id_popup = config.id_popup || "#mkwsPopup";

	debug("popup height: " + height + ", width: " + width);

	// make sure that jquery-ui was loaded afte jQuery core lib, e.g.:
	// <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>
	if (!$.ui) {
	    debug("Error: jquery-ui.js is missing, did you include it after jQuery core in the HTML file?");
	    return;
	}

	$(id_popup).dialog({
	    closeOnEscape: true,
	    autoOpen: false,
	    height: height,
	    width: width,
	    modal: true,
	    resizable: true,
	    buttons: {
		Cancel: function() {
		    $(this).dialog("close");
		}
	    },
	    close: function() { }
	});

	$(id_button)
	    .button()
	    .click(function() {
		$(id_popup).dialog("open");
	    });
    };

    $.extend({

	// service-proxy or pazpar2
	pazpar2: function(config) {
	    var id_popup = config.id_popup || "#mkwsPopup";
	    id_popup = id_popup.replace(/^#/, "");

	    // simple layout
	    var div = '\
<div id="mkwsSwitch"></div>\
<div id="mkwsLang"></div>\
<div id="mkwsSearch"></div>\
<div id="mkwsResults"></div>\
<div id="mkwsTargets"></div>\
<div id="mkwsStat"></div>';

	    // new table layout
	    var table = '\
<style type="text/css">\
  #mkwsTermlists div.facet {\
  float:left;\
  width: 30%;\
  margin: 0.3em;\
  }\
  #mkwsStat {\
  text-align: right;\
  }\
</style>\
    \
<table width="100%" border="0">\
  <tr>\
    <td>\
      <div id="mkwsSwitch"></div>\
      <div id="mkwsLang"></div>\
      <div id="mkwsSearch"></div>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      <div style="height:500px; overflow: auto">\
	<div id="mkwsPager"></div>\
	<div id="mkwsNavi"></div>\
	<div id="mkwsRecords"></div>\
	<div id="mkwsTargets"></div>\
	<div id="mkwsRanking"></div>\
      </div>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      <div style="height:300px; overflow: hidden">\
	<div id="mkwsTermlists"></div>\
      </div>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      <div id="mkwsStat"></div>\
    </td>\
  </tr>\
</table>';

	    var popup = '\
<div id="mkwsSearch"></div>\
<div id="' + id_popup + '">\
  <div id="mkwsSwitch"></div>\
  <div id="mkwsLang"></div>\
  <div id="mkwsResults"></div>\
  <div id="mkwsTargets"></div>\
  <div id="mkwsStat"></div>\
</div>'

	    if (config && config.layout == 'div') {
		debug("jquery plugin layout: div");
		document.write(div);
	    } else if (config && config.layout == 'popup') {
		debug("jquery plugin layout: popup with id: " + id_popup);
		document.write(popup);
		$(document).ready( function() { init_popup(config); } );
	    } else {
		debug("jquery plugin layout: table");
		document.write(table);
	    }
	}
    });
};


// wrapper to call _make_mkws_team() after page load
(function (j) {
    // enable before page load, so we could call it before mkws() runs
    _mkws_jquery_plugin(j);

    $(document).ready(function() {
	// if (console && console.log) console.log("on load ready");
	_make_mkws_team(j, null);
    });
})(jQuery);

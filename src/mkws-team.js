// Factory function for team objects. As much as possible, this uses
// only member variables (prefixed "m_") and inner functions with
// private scope.
//
// Some functions are visible as member-functions to be called from
// outside code -- specifically, from generated HTML. These functions
// are that.switchView(), showDetails(), limitTarget(), limitQuery(),
// delimitTarget(), delimitQuery(), showPage(), pagerPrev(),
// pagerNext().
//
function team($, teamName) {
    var that = {};
    var m_teamName = teamName;
    var m_submitted = false;
    var m_query; // initially undefined
    var m_sortOrder; // will be set below
    var m_perpage; // will be set below
    var m_filters = [];
    var m_totalRecordCount = 0;
    var m_currentPage = 1;
    var m_currentRecordId = '';
    var m_currentRecordData = null;
    var m_logTime = {
	// Timestamps for logging
	"start": $.now(),
	"last": $.now()
    };
    var m_paz; // will be initialised below
    var m_template = {};


    // Accessor methods for individual widgets: readers
    that.name = function() { return m_teamName; }
    that.submitted = function() { return m_submitted; }
    that.perpage = function() { return m_perpage; }
    that.totalRecordCount = function() { return m_totalRecordCount; }
    that.currentPage = function() { return m_currentPage; }
    that.currentRecordId = function() { return m_currentRecordId; }
    that.currentRecordData = function() { return m_currentRecordData; }
    that.filters = function() { return m_filters; }

    // Accessor methods for individual widgets: writers
    that.set_sortOrder = function(val) { m_sortOrder = val };
    that.set_perpage = function(val) { m_perpage = val };


    function log(s) {
	var now = $.now();
	var timestamp = ((now - m_logTime.start)/1000).toFixed(3) + " (+" + ((now - m_logTime.last)/1000).toFixed(3) + ") "
	m_logTime.last = now;

	mkws.log(m_teamName + ": " + timestamp + s);
    }
    that.log = log;

    log("start running MKWS");

    m_sortOrder = mkws_config.sort_default;
    m_perpage = mkws_config.perpage_default;

    log("Create main pz2 object");
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
    function onInit() {
	log("init");
	m_paz.stat();
	m_paz.bytarget();
    }


    function onBytarget(data) {
	log("target");
	queue("targets").publish(data);
    }


    function onStat(data) {
	log("stat");
	queue("stat").publish(data);
    }


    function onTerm(data) {
	log("term");
	queue("termlists").publish(data);
    }


    function onShow(data, teamName) {
	log("show");
	m_totalRecordCount = data.merged;
	queue("pager").publish(data);
	queue("records").publish(data);
    }


    function onRecord(data, args, teamName) {
	log("record");
	// FIXME: record is async!!
	clearTimeout(m_paz.recordTimer);
	// ##### restrict to current team
	var detRecordDiv = document.getElementById(recordDetailsId(data.recid[0]));
	if (detRecordDiv) {
	    // in case on_show was faster to redraw element
	    return;
	}
	m_currentRecordData = data;
	var recordDiv = findnode('.' + recordElementId(m_currentRecordData.recid[0]));
	var html = renderDetails(m_currentRecordData);
	$(recordDiv).append(html);
    }


    // Used by promoteRecords() and onRecord()
    function recordElementId(s) {
	return 'mkwsRec_' + s.replace(/[^a-z0-9]/ig, '_');
    }
    that.recordElementId = recordElementId;

    // Used by onRecord(), showDetails() and renderDetails()
    function recordDetailsId(s) {
	return 'mkwsDet_' + s.replace(/[^a-z0-9]/ig, '_');
    }
    that.recordElementId = recordElementId;


    that.targetFiltered = function(id) {
	for (var i = 0; i < m_filters.length; i++) {
	    if (m_filters[i].id === id ||
		m_filters[i].id === 'pz:id=' + id) {
		return true;
	    }
	}
	return false;
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


    function newSearch(query, sortOrder, targets)
    {
	log("newSearch: " + query);

	if (mkws_config.use_service_proxy && !mkws.authenticated) {
	    alert("searching before authentication");
	    return;
	}

	m_filters = []
	triggerSearch(query, sortOrder, targets);
	switchView('records'); // In case it's configured to start off as hidden
	m_submitted = true;
    }


    // limit by target functions
    that.limitTarget  = function (id, name)
    {
	log("limitTarget(id=" + id + ", name=" + name + ")");
	m_filters.push({ id: id, name: name });
	triggerSearch();
	return false;
    }


    // limit the query after clicking the facet
    that.limitQuery = function (field, value)
    {
	log("limitQuery(field=" + field + ", value=" + value + ")");
	m_filters.push({ field: field, value: value });
	triggerSearch();
	return false;
    }


    that.delimitTarget = function (id)
    {
	log("delimitTarget(id=" + id + ")");
	var newFilters = [];
	for (var i in m_filters) {
	    var filter = m_filters[i];
	    if (filter.id) {
		log("delimitTarget() removing filter " + $.toJSON(filter));
	    } else {
		log("delimitTarget() keeping filter " + $.toJSON(filter));
		newFilters.push(filter);
	    }
	}
	m_filters = newFilters;

	triggerSearch();
	return false;
    }


    that.delimitQuery = function (field, value)
    {
	log("delimitQuery(field=" + field + ", value=" + value + ")");
	var newFilters = [];
	for (var i in m_filters) {
	    var filter = m_filters[i];
	    if (filter.field &&
		field == filter.field &&
		value == filter.value) {
		log("delimitQuery() removing filter " + $.toJSON(filter));
	    } else {
		log("delimitQuery() keeping filter " + $.toJSON(filter));
		newFilters.push(filter);
	    }
	}
	m_filters = newFilters;

	triggerSearch();
	return false;
    }


    function resetPage()
    {
	m_currentPage = 1;
	m_totalRecordCount = 0;
    }
    that.resetPage = resetPage;


    function triggerSearch (query, sortOrder, targets)
    {
	resetPage();
	queue("navi").publish();

	var pp2filter = "";
	var pp2limit = "";

	// Continue to use previous query/sort-order unless new ones are specified
	if (query) {
	    m_query = query;
	}
	if (sortOrder) {
	    m_sortOrder = sortOrder;
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
		    log("filter '" + filter.id + "' already begins with SETTING OP");
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

	log("triggerSearch(" + m_query + "): filters = " + $.toJSON(m_filters) + ", pp2filter = " + pp2filter + ", params = " + $.toJSON(params));

	// We can use: params.torusquery = "udb=NAME"
	// Note: that won't work when running against raw pazpar2
	m_paz.search(m_query, m_perpage, m_sortOrder, pp2filter, undefined, params);
    }


    that.reShow = function() {
	m_paz.show(0, m_perpage, m_sortOrder);
    }



    that.showPage = function (pageNum)
    {
	m_currentPage = pageNum;
	m_paz.showPage(m_currentPage - 1);
    }


    // simple paging functions
    that.pagerNext = function () {
	if (m_totalRecordCount - m_perpage*m_currentPage > 0) {
            m_paz.showNext();
            m_currentPage++;
	}
    }


    that.pagerPrev = function () {
	if (m_paz.showPrev() != false)
            m_currentPage--;
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
    that.showDetails = function (recId) {
	var oldRecordId = m_currentRecordId;
	m_currentRecordId = recId;

	// remove current detailed view if any
	// ##### restrict to current team
	var detRecordDiv = document.getElementById(recordDetailsId(oldRecordId));
	// lovin DOM!
	if (detRecordDiv)
	    detRecordDiv.parentNode.removeChild(detRecordDiv);

	// if the same clicked, just hide
	if (recId == oldRecordId) {
            m_currentRecordId = '';
            m_currentRecordData = null;
            return;
	}
	// request the record
	log("showDetails() requesting record '" + recId + "'");
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

	log("HTML search form");
	findnode('.mkwsSearch').html('\
<form name="mkwsSearchForm" class="mkwsSearchForm mkwsTeam_' + m_teamName + '" action="" >\
  <input class="mkwsQuery mkwsTeam_' + m_teamName + '" type="text" size="' + mkws_config.query_width + '" />\
  <input class="mkwsButton mkwsTeam_' + m_teamName + '" type="submit" value="' + M('Search') + '" />\
</form>');

	log("HTML records");
	// If the team has a .mkwsResults, populate it in the usual
	// way. If not, assume that it's a smarter application that
	// defines its own subcomponents, some or all of the
	// following:
	//	.mkwsTermlists
	//	.mkwsRanking
	//	.mkwsPager
	//	.mkwsNavi
	//	.mkwsRecords
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

	var ranking_data = '<form name="mkwsSelect" class="mkwsSelect mkwsTeam_' + m_teamName + '" action="" >';
	if (mkws_config.show_sort) {
	    ranking_data +=  M('Sort by') + ' ' + mkwsHtmlSort() + ' ';
	}
	if (mkws_config.show_perpage) {
	    ranking_data += M('and show') + ' ' + mkwsHtmlPerpage() + ' ' + M('per page') + '.';
	}
        ranking_data += '</form>';
	findnode(".mkwsRanking").html(ranking_data);

	mkwsHtmlSwitch();

	findnode('.mkwsSearchForm').submit(onFormSubmitEventHandler);

	// on first page, hide the termlist
	$(document).ready(function() { findnode(".mkwsTermlists").hide(); });
        var container = findnode(".mkwsMOTDContainer");
	if (container.length) {
	    // Move the MOTD from the provided element down into the container
	    findnode(".mkwsMOTD").appendTo(container);
	}
    }


    function mkwsSetLang()  {
	var lang = getParameterByName("lang") || mkws_config.lang;
	if (!lang || !mkws.locale_lang[lang]) {
	    mkws_config.lang = ""
	} else {
	    mkws_config.lang = lang;
	}

	log("Locale language: " + (mkws_config.lang ? mkws_config.lang : "none"));
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

	log("Language menu for: " + list.join(", "));

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
	log("HTML sort, m_sortOrder = '" + m_sortOrder + "'");
	var sort_html = '<select class="mkwsSort mkwsTeam_' + m_teamName + '">';

	for(var i = 0; i < mkws_config.sort_options.length; i++) {
	    var opt = mkws_config.sort_options[i];
	    var key = opt[0];
	    var val = opt.length == 1 ? opt[0] : opt[1];

	    sort_html += '<option value="' + key + '"';
	    if (m_sortOrder == key || m_sortOrder == val) {
		sort_html += ' selected="selected"';
	    }
	    sort_html += '>' + M(val) + '</option>';
	}
	sort_html += '</select>';

	return sort_html;
    }


    function mkwsHtmlPerpage() {
	log("HTML perpage, m_perpage = " + m_perpage);
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
	log("HTML switch for team " + m_teamName);

	var node = findnode(".mkwsSwitch");
	node.append($('<a href="#" onclick="mkws.switchView(\'' + m_teamName + '\', \'records\')">' + M('Records') + '</a>'));
	node.append($("<span/>", { text: " | " }));
	node.append($('<a href="#" onclick="mkws.switchView(\'' + m_teamName + '\', \'targets\')">' + M('Targets') + '</a>'));

	log("HTML targets");
	var node = findnode(".mkwsTargets");
	node.html('\
<div class="mkwsBytarget mkwsTeam_' + m_teamName + '">\
  No information available yet.\
</div>');
	node.css("display", "none");
    }


    that.runAutoSearch = function() {
	var node = findnode('.mkwsRecords,.mkwsTermlists');
	var query = node.attr('autosearch');
	if (!query)
	    return;

	if (query.match(/^!param!/)) {
	    var param = query.replace(/^!param!/, '');
	    query = getParameterByName(param);
	    log("obtained query '" + query + "' from param '" + param + "'");
	    if (!query) {
		alert("This page has a MasterKey widget that needs a query specified by the '" + param + "' parameter");
	    }
	} else if (query.match(/^!path!/)) {
	    var index = query.replace(/^!path!/, '');
	    var path = window.location.pathname.split('/');
	    query = path[path.length - index];
	    log("obtained query '" + query + "' from path-component '" + index + "'");
	    if (!query) {
		alert("This page has a MasterKey widget that needs a query specified by the path-component " + index);
	    }
	}

	log("node=" + node + ", class='" + node.className + "', query=" + query);

	var sortOrder = node.attr('sort');
	var targets = node.attr('targets');
	var s = "running auto search: '" + query + "'";
	if (sortOrder) s += " sorted by '" + sortOrder + "'";
	if (targets) s += " in targets '" + targets + "'";
	log(s);

	newSearch(query, sortOrder, targets);
    }


    // This function is taken from a StackOverflow answer
    // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/901144#901144
    function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


    // Translation function. At present, this is properly a
    // global-level function (hence the assignment to mkws.M) but we
    // want to make it per-team so different teams can operate in
    // different languages.
    //
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

	selector = $.map(selector.split(','), function(s, i) {
	    return s + '.mkwsTeam_' + teamName;
	}).join(',');

	return $(selector);
    }


    function renderDetails(data, marker)
    {
	var template = loadTemplate("Record");
	var details = template(data);
	return '<div class="details mkwsTeam_' + m_teamName + '" id="' + recordDetailsId(data.recid[0]) + '">' + details + '</div>';
    }
    that.renderDetails = renderDetails;


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
	    log("compiled template '" + name + "'");
	    m_template[name] = template;
	}

	return template;
    }
    that.loadTemplate = loadTemplate;


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


    // The following PubSub code is modified from the jQuery manual:
    // https://api.jquery.com/jQuery.Callbacks/
    //
    // Use as:
    //	team.queue("eventName").subscribe(function(param1, param2 ...) { ... });
    //	team.queue("eventName").publish(arg1, arg2, ...);

    var queues = {};
    var queue = function(id) {
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
    that.queue = queue;


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

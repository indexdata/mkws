// Factory function for team objects. As much as possible, this uses
// only member variables (prefixed "m_") and inner functions with
// private scope.
//
// Some functions are visible as member-functions to be called from
// outside code -- specifically, from generated HTML. These functions
// are that.switchView(), showDetails(), limitTarget(), limitQuery(),
// limitCategory(), delimitTarget(), delimitQuery(), showPage(),
// pagerPrev(), pagerNext().
//
function team($, teamName) {
    var that = {};
    var m_teamName = teamName;
    var m_submitted = false;
    var m_query; // initially undefined
    var m_sortOrder; // will be set below
    var m_perpage; // will be set below
    var m_filterSet = filterSet(that);
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
    var m_config = mkws.objectInheritingFrom(mkws.config);
    var m_widgets = {}; // Maps widget-type to object

    that.toString = function() { return '[Team ' + teamName + ']'; };

    // Accessor methods for individual widgets: readers
    that.name = function() { return m_teamName; };
    that.submitted = function() { return m_submitted; };
    that.perpage = function() { return m_perpage; };
    that.totalRecordCount = function() { return m_totalRecordCount; };
    that.currentPage = function() { return m_currentPage; };
    that.currentRecordId = function() { return m_currentRecordId; };
    that.currentRecordData = function() { return m_currentRecordData; };
    that.filters = function() { return m_filterSet.list(); };
    that.config = function() { return m_config; };

    // Accessor methods for individual widgets: writers
    that.set_sortOrder = function(val) { m_sortOrder = val };
    that.set_perpage = function(val) { m_perpage = val };


    // The following PubSub code is modified from the jQuery manual:
    // http://api.jquery.com/jQuery.Callbacks/
    //
    // Use as:
    //	team.queue("eventName").subscribe(function(param1, param2 ...) { ... });
    //	team.queue("eventName").publish(arg1, arg2, ...);
    //
    var queues = {};
    function queue(id) {
	if (!queues[id]) {
	    var callbacks = $.Callbacks();
	    queues[id] = {
		publish: callbacks.fire,
		subscribe: callbacks.add,
		unsubscribe: callbacks.remove
	    };
	}
	return queues[id];
    };
    that.queue = queue;


    function log(s) {
	var now = $.now();
	var timestamp = (((now - m_logTime.start)/1000).toFixed(3) + " (+" +
			 ((now - m_logTime.last)/1000).toFixed(3) + ") ");
	m_logTime.last = now;
	mkws.log(m_teamName + ": " + timestamp + s);
	that.queue("log").publish(m_teamName, timestamp, s);
    }
    that.log = log;


    log("start running MKWS");

    m_sortOrder = m_config.sort_default;
    m_perpage = m_config.perpage_default;

    log("Create main pz2 object");
    // create a parameters array and pass it to the pz2's constructor
    // then register the form submit event with the pz2.search function
    // autoInit is set to true on default
    m_paz = new pz2({ "windowid": teamName,
		      "pazpar2path": m_config.pazpar2_url,
		      "usesessions" : m_config.use_service_proxy ? false : true,
		      "oninit": onInit,
		      "onbytarget": onBytarget,
		      "onstat": onStat,
		      "onterm": (m_config.facets.length ? onTerm : undefined),
		      "onshow": onShow,
		      "onrecord": onRecord,
		      "showtime": 500,            //each timer (show, stat, term, bytarget) can be specified this way
		      "termlist": m_config.facets.join(',')
		    });

    // pz2.js event handlers:
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
	queue("stat").publish(data);
	if (parseInt(data.activeclients[0], 10) === 0)
	    queue("complete").publish(parseInt(data.hits[0], 10));
    }

    function onTerm(data) {
	log("term");
	queue("termlists").publish(data);
    }

    function onShow(data, teamName) {
	log("show");
	m_totalRecordCount = data.merged;
	log("found " + m_totalRecordCount + " records");
	queue("pager").publish(data);
	queue("records").publish(data);
    }

    function onRecord(data, args, teamName) {
	log("record");
	// FIXME: record is async!!
	clearTimeout(m_paz.recordTimer);
	var detRecordDiv = findnode(recordDetailsId(data.recid[0]));
	if (detRecordDiv.length) {
	    // in case on_show was faster to redraw element
	    return;
	}
	m_currentRecordData = data;
	var recordDiv = findnode('.' + recordElementId(m_currentRecordData.recid[0]));
	var html = renderDetails(m_currentRecordData);
	$(recordDiv).append(html);
    }


    // Used by the Records widget and onRecord()
    function recordElementId(s) {
	return 'mkwsRec_' + s.replace(/[^a-z0-9]/ig, '_');
    }
    that.recordElementId = recordElementId;

    // Used by onRecord(), showDetails() and renderDetails()
    function recordDetailsId(s) {
	return 'mkwsDet_' + s.replace(/[^a-z0-9]/ig, '_');
    }


    that.targetFiltered = function(id) {
	return m_filterSet.targetFiltered(id);
    };


    that.limitTarget = function(id, name) {
	log("limitTarget(id=" + id + ", name=" + name + ")");
	m_filterSet.add(filter(id, name));
	triggerSearch();
	return false;
    };


    that.limitQuery = function(field, value) {
	log("limitQuery(field=" + field + ", value=" + value + ")");
	m_filterSet.add(filter(null, null, field, value));
	triggerSearch();
	return false;
    };


    that.limitCategory = function(id) {
	log("limitCategory(id=" + id + ")");
	// ### Add a filter
	// ### triggerSearch() if there's a query
	return false;
    };


    that.delimitTarget = function(id) {
	log("delimitTarget(id=" + id + ")");
	m_filterSet.removeMatching(function(f) { return f.id });
	triggerSearch();
	return false;
    };


    that.delimitQuery = function(field, value) {
	log("delimitQuery(field=" + field + ", value=" + value + ")");
	m_filterSet.removeMatching(function(f) { return f.field && field == f.field && value == f.value });
	triggerSearch();
	return false;
    };


    that.showPage = function(pageNum) {
	m_currentPage = pageNum;
	m_paz.showPage(m_currentPage - 1);
    };


    that.pagerNext = function() {
	if (m_totalRecordCount - m_perpage*m_currentPage > 0) {
            m_paz.showNext();
            m_currentPage++;
	}
    };


    that.pagerPrev = function() {
	if (m_paz.showPrev() != false)
            m_currentPage--;
    };


    that.reShow = function() {
	resetPage();
	m_paz.show(0, m_perpage, m_sortOrder);
    };


    function resetPage() {
	m_currentPage = 1;
	m_totalRecordCount = 0;
    }
    that.resetPage = resetPage;


    function newSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery) {
	log("newSearch: " + query);

	if (m_config.use_service_proxy && !mkws.authenticated) {
	    alert("searching before authentication");
	    return;
	}

	m_filterSet = filterSet(that);
	triggerSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery);
	switchView('records'); // In case it's configured to start off as hidden
	m_submitted = true;
    }
    that.newSearch = newSearch;


    function triggerSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery) {
	resetPage();
	queue("navi").publish();


	// Continue to use previous query/sort-order unless new ones are specified
	if (query) m_query = query;
	if (sortOrder) m_sortOrder = sortOrder;
	if (perpage) m_perpage = perpage;
	if (targets) m_filterSet.add(filter(id, id));

	var pp2filter = m_filterSet.pp2filter();
	var pp2limit = m_filterSet.pp2limit(limit);

	var params = {};
	if (pp2limit) params.limit = pp2limit;
	if (maxrecs) params.maxrecs = maxrecs;
	if (torusquery) {
	    if (!mkws.config.use_service_proxy)
		alert("can't narrow search by torusquery when Service Proxy is not in use");
	    params.torusquery = torusquery;
	}

	log("triggerSearch(" + m_query + "): filters = " + $.toJSON(m_filterSet.list()) + ", " +
	    "pp2filter = " + pp2filter + ", params = " + $.toJSON(params));

	m_paz.search(m_query, m_perpage, m_sortOrder, pp2filter, undefined, params);
    }


    // switching view between targets and records
    function switchView(view) {
	var targets = widgetNode('Targets');
	var results = widgetNode('Results') || widgetNode('Records');
	var blanket = widgetNode('Blanket');
	var motd    = widgetNode('MOTD');

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
    that.showDetails = function(recId) {
	var oldRecordId = m_currentRecordId;
	m_currentRecordId = recId;

	// remove current detailed view if any
	findnode('#' + recordDetailsId(oldRecordId)).remove();

	// if the same clicked, just hide
	if (recId == oldRecordId) {
            m_currentRecordId = '';
            m_currentRecordData = null;
            return;
	}
	// request the record
	log("showDetails() requesting record '" + recId + "'");
	m_paz.record(recId);
    };


    /*
     * All the HTML stuff to render the search forms and
     * result pages.
     */
    function mkwsHtmlAll() {
	mkwsSetLang();
	if (m_config.show_lang)
	    mkwsHtmlLang();

	log("HTML search form");
	findnode('.mkwsSearch').html('\
<form name="mkwsSearchForm" class="mkwsSearchForm mkwsTeam_' + m_teamName + '" action="" >\
  <input class="mkwsQuery mkwsTeam_' + m_teamName + '" type="text" size="' + m_config.query_width + '" />\
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

	var acc = [];
	var facets = m_config.facets;
	acc.push('<div class="title">' + M('Termlists') + '</div>');
	for (var i = 0; i < facets.length; i++) {
	    acc.push('<div class="mkwsFacet mkwsTeam_' + m_teamName + '" data-mkws-facet="' + facets[i] + '">');
	    acc.push('</div>');
	}
	findnode(".mkwsTermlists").html(acc.join(''));

	var ranking_data = '<form name="mkwsSelect" class="mkwsSelect mkwsTeam_' + m_teamName + '" action="" >';
	if (m_config.show_sort) {
	    ranking_data +=  M('Sort by') + ' ' + mkwsHtmlSort() + ' ';
	}
	if (m_config.show_perpage) {
	    ranking_data += M('and show') + ' ' + mkwsHtmlPerpage() + ' ' + M('per page') + '.';
	}
        ranking_data += '</form>';
	findnode(".mkwsRanking").html(ranking_data);

	mkwsHtmlSwitch();

	findnode('.mkwsSearchForm').submit(function() {
	    var val = widgetNode('Query').val();
	    newSearch(val);
	    return false;
	});

	// on first page, hide the termlist
	$(document).ready(function() { widgetNode("Termlists").hide(); });
        var container = findnode(".mkwsMOTDContainer");
	if (container.length) {
	    // Move the MOTD from the provided element down into the container
	    findnode(".mkwsMOTD").appendTo(container);
	}
    }


    function mkwsSetLang()  {
	var lang = mkws.getParameterByName("lang") || m_config.lang;
	if (!lang || !mkws.locale_lang[lang]) {
	    m_config.lang = ""
	} else {
	    m_config.lang = lang;
	}

	log("Locale language: " + (m_config.lang ? m_config.lang : "none"));
	return m_config.lang;
    }


    /* create locale language menu */
    function mkwsHtmlLang() {
	var lang_default = "en";
	var lang = m_config.lang || lang_default;
	var list = [];

	/* display a list of configured languages, or all */
	var lang_options = m_config.lang_options || [];
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

	for(var i = 0; i < m_config.sort_options.length; i++) {
	    var opt = m_config.sort_options[i];
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

	for(var i = 0; i < m_config.perpage_options.length; i++) {
	    var key = m_config.perpage_options[i];

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


    // Translation function. At present, this is properly a
    // global-level function (hence the assignment to mkws.M) but we
    // want to make it per-team so different teams can operate in
    // different languages.
    //
    function M(word) {
	var lang = m_config.lang;

	if (!lang || !mkws.locale_lang[lang])
	    return word;

	return mkws.locale_lang[lang][word] || word;
    }
    mkws.M = M; // so the Handlebars helper can use it


    // Finds the node of the specified class within the current team
    function findnode(selector, teamName) {
	teamName = teamName || m_teamName;

	if (teamName === 'AUTO') {
	    selector = (selector + '.mkwsTeam_' + teamName + ',' +
			selector + ':not([class^="mkwsTeam"],[class*=" mkwsTeam"])');
	} else {
	    selector = selector + '.mkwsTeam_' + teamName;
	}

	var node = $(selector);
	//log('findnode(' + selector + ') found ' + node.length + ' nodes');
	return node;
    }
    that.findnode = findnode;


    // This much simpler and more efficient function should be usable
    // in place of most uses of findnode.
    function widgetNode(type) {
        var w = that.widget(type);
        return w ? $(w.node) : undefined;
    }

    function renderDetails(data, marker) {
	var template = loadTemplate("Record");
	var details = template(data);
	return '<div class="details mkwsTeam_' + m_teamName + '" ' +
	    'id="' + recordDetailsId(data.recid[0]) + '">' + details + '</div>';
    }
    that.renderDetails = renderDetails;


    function loadTemplate(name) {
	var template = m_template[name];

	if (template === undefined) {
	    // Fall back to generic template if there is no team-specific one
	    var source;
	    var node = widgetNode("Template_" + name);
	    if (!node) {
		node = widgetNode("Template_" + name, "ALL");
	    }
            if (node) {
	        source = node.html();
            }

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


    function defaultTemplate(name) {
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
	} else if (name === "Image") {
	    return '\
      <a href="#" id="{{_id}}" onclick="{{_onclick}}">\
        {{#first md-thumburl}}\
	  <img src="{{this}}" alt="{{../md-title}}"/>\
        {{/first}}\
	<br/>\
      </a>\
';
	}

	var s = "There is no default '" + name +"' template!";
	alert(s);
	return s;
    }

    that.addWidget = function(w) {
        if (!m_widgets[w.type]) {
            m_widgets[w.type] = w;
            log("Registered '" + w.type + "' widget in team '" + m_teamName + "'");
        } else if (typeof(m_widgets[w.type]) !== 'number') {
            m_widgets[w.type] = 2;
            log("Registered duplicate '" + w.type + "' widget in team '" + m_teamName + "'");
        } else {
            m_widgets[w.type] += 1;
            log("Registered '" + w.type + "' widget #" + m_widgets[w.type] + "' in team '" + m_teamName + "'");
        }
    }

    that.widgetTypes = function() {
        var keys = [];
        for (var k in m_widgets) keys.push(k);
        return keys.sort();
    }

    that.widget = function(type) {
        return m_widgets[type];
    }

    mkwsHtmlAll()

    return that;
};

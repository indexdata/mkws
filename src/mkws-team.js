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
    var m_tempateText = {}; // widgets can register tempates to be compiled
    var m_template = {}; // compiled templates, from any source
    var m_config = mkws.objectInheritingFrom(mkws.config);
    var m_widgets = {}; // Maps widget-type to object

    that.toString = function() { return '[Team ' + teamName + ']'; };

    // Accessor methods for individual widgets: readers
    that.name = function() { return m_teamName; };
    that.submitted = function() { return m_submitted; };
    that.sortOrder = function() { return m_sortOrder; };
    that.perpage = function() { return m_perpage; };
    that.totalRecordCount = function() { return m_totalRecordCount; };
    that.currentPage = function() { return m_currentPage; };
    that.currentRecordId = function() { return m_currentRecordId; };
    that.currentRecordData = function() { return m_currentRecordData; };
    that.filters = function() { return m_filterSet; };
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
	m_filterSet.add(targetFilter(id, name));
	if (m_query) triggerSearch();
	return false;
    };


    that.limitQuery = function(field, value) {
	log("limitQuery(field=" + field + ", value=" + value + ")");
	m_filterSet.add(fieldFilter(field, value));
        if (m_query) triggerSearch();
	return false;
    };


    that.limitCategory = function(id) {
	log("limitCategory(id=" + id + ")");
        // Only one category filter at a time
	m_filterSet.removeMatching(function(f) { return f.type === 'category' });
        if (id !== '') m_filterSet.add(categoryFilter(id));
        if (m_query) triggerSearch();
	return false;
    };


    that.delimitTarget = function(id) {
	log("delimitTarget(id=" + id + ")");
	m_filterSet.removeMatching(function(f) { return f.type === 'target' });
        if (m_query) triggerSearch();
	return false;
    };


    that.delimitQuery = function(field, value) {
	log("delimitQuery(field=" + field + ", value=" + value + ")");
	m_filterSet.removeMatching(function(f) { return f.type == 'field' &&
                                                 field == f.field && value == f.value });
        if (m_query) triggerSearch();
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

	m_filterSet.removeMatching(function(f) { return f.type !== 'category' });
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
	if (targets) m_filterSet.add(targetFilter(targets, targets));

	var pp2filter = m_filterSet.pp2filter();
	var pp2limit = m_filterSet.pp2limit(limit);
        var pp2catLimit = m_filterSet.pp2catLimit();
	if (pp2catLimit) {
            pp2filter = pp2filter ? pp2filter + "," + pp2catLimit : pp2catLimit;
        }

	var params = {};
	if (pp2limit) params.limit = pp2limit;
	if (maxrecs) params.maxrecs = maxrecs;
	if (torusquery) {
	    if (!mkws.config.use_service_proxy)
		alert("can't narrow search by torusquery when Service Proxy is not in use");
	    params.torusquery = torusquery;
	}

	log("triggerSearch(" + m_query + "): filters = " + m_filterSet.toJSON() + ", " +
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


    that.registerTemplate = function(name, text) {
        m_tempateText[name] = text;
    };


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
                source = m_tempateText[name];
            }
	    if (!source) {
		source = mkws.defaultTemplate(name);
	    }

	    template = Handlebars.compile(source);
	    log("compiled template '" + name + "'");
	    m_template[name] = template;
	}

	return template;
    }
    that.loadTemplate = loadTemplate;


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


    mkwsSetLang();

    return that;
};

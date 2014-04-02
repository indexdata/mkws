// Factory function for widget objects.
function widget($, team, type, node) {
    // Static register of attributes that do not contribute to config
    var ignoreAttrs = {
	id:1, 'class':1, style:1, name:1, action:1, type:1, size:1,
	value:1, width:1, valign:1
    };

    var that = {
	team: team,
	type: type,
	node: node,
	config: Object.create(team.config())
    };

    function log(s) {
	team.log(s);
    }
    that.log = log;

    that.toString = function() {
	return '[Widget ' + team.name() + ':' + type + ']';
    };

    for (var i = 0; i < node.attributes.length; i++) {
	var a = node.attributes[i];
	if (a.name === 'data-mkws-config') {
	    // Treat as a JSON fragment configuring just this widget
	    log(node + ": parsing config fragment '" + a.value + "'");
	    var data;
	    try {
		data = $.parseJSON(a.value);
		for (var key in data) {
		    log(node + ": adding config element " + key + "='" + data[key] + "'");
		    that.config[key] = data[key];
		}
	    } catch (err) {
		alert("Can't parse " + node + " data-mkws-config as JSON: " + a.value);
	    }
	} else if (a.name.match (/^data-mkws-/)) {
	    var name = a.name.replace(/^data-mkws-/, '')
	    that.config[name] = a.value;
	    log(node + ": set data-mkws attribute " + name + "='" + a.value + "'");
	} else if (!ignoreAttrs[a.name]) {
	    that.config[a.name] = a.value;
	    log(node + ": set regular attribute " + a.name + "='" + a.value + "'");
	}
    }

    var fn = mkws.promotionFunction(type);
    if (fn) {
	fn.call(that);
	log("made " + type + " widget(node=" + node + ")");
    } else {
	log("made UNPROMOTED widget(type=" + type + ", node=" + node + ")");
    }

    return that;
}


// Functions follow for promoting the regular widget object into
// widgets of specific types. These could be moved into their own
// source files.


mkws.registerWidgetType('Targets', function() {
    var that = this;
    var M = mkws.M;

    this.team.queue("targets").subscribe(function(data) {
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
	var subnode = $(that.node).children('.mkwsBytarget');
	subnode.html(table);
    });
});


mkws.registerWidgetType('Stat', function() {
    var that = this;
    var M = mkws.M;

    this.team.queue("stat").subscribe(function(data) {
	if (that.node.length === 0)  alert("huh?!");

	$(that.node).html('<span class="head">' + M('Status info') + '</span>' +
	    ' -- ' +
	    '<span class="clients">' + M('Active clients') + ': ' + data.activeclients + '/' + data.clients + '</span>' +
	    ' -- ' +
	    '<span class="records">' + M('Retrieved records') + ': ' + data.records + '/' + data.hits + '</span>');
    });
});


mkws.registerWidgetType('Termlists', function() {
    var that = this;
    var M = mkws.M;

    this.team.queue("termlists").subscribe(function(data) {
	if (!that.node) {
	    alert("termlists event when there are no termlists");
	    return;
	}

	// no facets: this should never happen
	var facets = that.config.facets;
	if (!facets || facets.length == 0) {
	    alert("onTerm called even though we have no facets: " + $.toJSON(data));
	    $(that.node).hide();
	    return;
	}

	// display if we first got results
	$(that.node).show();

	var acc = [];
	acc.push('<div class="title">' + M('Termlists') + '</div>');

	for (var i = 0; i < facets.length; i++) {
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

	$(that.node).html(acc.join(''));

	function addSingleFacet(acc, caption, data, max, pzIndex) {
	    var teamName = that.team.name();
	    acc.push('<div class="facet mkwsFacet' + caption + ' mkwsTeam_' + teamName + '">');
	    acc.push('<div class="termtitle">' + M(caption) + '</div>');
	    for (var i = 0; i < data.length && i < max; i++) {
		acc.push('<div class="term">');
		acc.push('<a href="#" ');
		var action = '';
		if (!pzIndex) {
		    // Special case: target selection
		    acc.push('target_id='+data[i].id+' ');
		    if (!that.team.targetFiltered(data[i].id)) {
			action = 'mkws.limitTarget(\'' + teamName + '\', this.getAttribute(\'target_id\'),this.firstChild.nodeValue)';
		    }
		} else {
		    action = 'mkws.limitQuery(\'' + teamName + '\', \'' + pzIndex + '\', this.firstChild.nodeValue)';
		}
		acc.push('onclick="' + action + ';return false;">' + data[i].name + '</a>'
			 + ' <span>' + data[i].freq + '</span>');
		acc.push('</div>');
	    }
	    acc.push('</div>');
	}
    });
});


mkws.registerWidgetType('Pager', function() {
    var that = this;
    var M = mkws.M;

    this.team.queue("pager").subscribe(function(data) {
	$(that.node).html(drawPager(data))

	function drawPager(data) {
	    var teamName = that.team.name();
	    var s = '<div style="float: right">' + M('Displaying') + ': '
		+ (data.start + 1) + ' ' + M('to') + ' ' + (data.start + data.num) +
		' ' + M('of') + ' ' + data.merged + ' (' + M('found') + ': '
		+ data.total + ')</div>';

	    //client indexes pages from 1 but pz2 from 0
	    var onsides = 6;
	    var pages = Math.ceil(that.team.totalRecordCount() / that.team.perpage());
	    var currentPage = that.team.currentPage();

	    var firstClkbl = (currentPage - onsides > 0)
		? currentPage - onsides
		: 1;

	    var lastClkbl = firstClkbl + 2*onsides < pages
		? firstClkbl + 2*onsides
		: pages;

	    var prev = '<span class="mkwsPrev">&#60;&#60; ' + M('Prev') + '</span><b> | </b>';
	    if (currentPage > 1)
		prev = '<a href="#" class="mkwsPrev" onclick="mkws.pagerPrev(\'' + teamName + '\');">'
		+'&#60;&#60; ' + M('Prev') + '</a><b> | </b>';

	    var middle = '';
	    for(var i = firstClkbl; i <= lastClkbl; i++) {
		var numLabel = i;
		if(i == currentPage)
		    numLabel = '<b>' + i + '</b>';

		middle += '<a href="#" onclick="mkws.showPage(\'' + teamName + '\', ' + i + ')"> '
		    + numLabel + ' </a>';
	    }

	    var next = '<b> | </b><span class="mkwsNext">' + M('Next') + ' &#62;&#62;</span>';
	    if (pages - currentPage > 0)
		next = '<b> | </b><a href="#" class="mkwsNext" onclick="mkws.pagerNext(\'' + teamName + '\')">'
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
    });
});


mkws.registerWidgetType('Records', function() {
    var that = this;
    var team = this.team;

    this.team.queue("records").subscribe(function(data) {
	var html = [];
	for (var i = 0; i < data.hits.length; i++) {
	    var hit = data.hits[i];
	    var divId = team.recordElementId(hit.recid[0]);
	    html.push('<div class="record mkwsTeam_' + team.name() + ' ' + divId + '">', renderSummary(hit), '</div>');
	    // ### At some point, we may be able to move the
	    // m_currentRecordId and m_currentRecordData members
	    // from the team object into this widget.
	    if (hit.recid == team.currentRecordId()) {
		if (team.currentRecordData())
		    html.push(team.renderDetails(team.currentRecordData()));
	    }
	}
	$(that.node).html(html.join(''));

	function renderSummary(hit) {
	    var template = team.loadTemplate("Summary");
	    hit._id = team.recordElementId(hit.recid[0]);
	    hit._onclick = "mkws.showDetails('" + team.name() + "', '" + hit.recid[0] + "');return false;"
	    return template(hit);
	}
    });

    var query = that.config.autosearch;
    if (query) {
	if (query.match(/^!param!/)) {
	    var param = query.replace(/^!param!/, '');
	    query = mkws.getParameterByName(param);
	    that.log("obtained query '" + query + "' from param '" + param + "'");
	    if (!query) {
		alert("This page has a MasterKey widget that needs a query specified by the '" + param + "' parameter");
	    }
	} else if (query.match(/^!path!/)) {
	    var index = query.replace(/^!path!/, '');
	    var path = window.location.pathname.split('/');
	    query = path[path.length - index];
	    that.log("obtained query '" + query + "' from path-component '" + index + "'");
	    if (!query) {
		alert("This page has a MasterKey widget that needs a query specified by the path-component " + index);
	    }
	}

	this.team.queue("ready").subscribe(function() {
	    var sortOrder = that.config.sort;
	    var perpage = that.config.perpage;
	    var limit = that.config.limit;
	    var targets = that.config.targets;
	    var torusquery = that.config.torusquery;
	    that.log("torusquery='" + torusquery + "'");
	    var s = "running auto search: '" + query + "'";
	    if (sortOrder) s += " sorted by '" + sortOrder + "'";
	    if (perpage) s += " with " + perpage + " per page";
	    if (limit) s += " limited by '" + limit + "'";
	    if (targets) s += " in targets '" + targets + "'";
	    if (torusquery) s += " constrained by torusquery '" + torusquery + "'";
	    that.log(s);

	    that.team.newSearch(query, sortOrder, perpage, limit, targets, torusquery);
	});
    }
});


mkws.registerWidgetType('Navi', function() {
    var that = this;
    var teamName = this.team.name();
    var M = mkws.M;

    this.team.queue("navi").subscribe(function() {
	var filters = that.team.filters();
	var text = "";

	for (var i in filters) {
	    if (text) {
		text += " | ";
	    }
	    var filter = filters[i];
	    if (filter.id) {
		text += M('source') + ': <a class="crossout" href="#" onclick="mkws.delimitTarget(\'' + teamName +
		    "', '" + filter.id + "'" + ');return false;">' + filter.name + '</a>';
	    } else {
		text += M(filter.field) + ': <a class="crossout" href="#" onclick="mkws.delimitQuery(\'' + teamName +
		    "', '" + filter.field + "', '" + filter.value + "'" +
		    ');return false;">' + filter.value + '</a>';
	    }
	}

	$(that.node).html(text);
    });
});


// It seems this and the Perpage widget doen't need to subscribe to
// anything, since they produce events rather than consuming them.
//
mkws.registerWidgetType('Sort', function() {
    var that = this;

    $(this.node).change(function() {
	that.team.set_sortOrder($(that.node).val());
	if (that.team.submitted()) {
	    that.team.resetPage();
	    that.team.reShow();
	}
	return false;
    });
});


mkws.registerWidgetType('Perpage', function() {
    var that = this;

    $(this.node).change(function() {
	that.team.set_perpage($(that.node).val());
	if (that.team.submitted()) {
	    that.team.resetPage();
	    that.team.reShow();
	}
	return false;
    });
});

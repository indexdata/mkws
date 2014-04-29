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
	config: mkws.objectInheritingFrom(team.config())
    };

    function log(s) {
	team.log(s);
    }
    that.log = log;

    that.toString = function() {
	return '[Widget ' + team.name() + ':' + type + ']';
    };

    that.value = function() {
        return node.value;
    }

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


// Utility function for use by all widgets that can invoke autosearch.
widget.autosearch = function(widget) {
    widget.team.queue("ready").subscribe(function() {
	var query = widget.config.autosearch;
	if (query) {
	    if (query.match(/^!param!/)) {
		var param = query.replace(/^!param!/, '');
		query = mkws.getParameterByName(param);
		widget.log("obtained query '" + query + "' from param '" + param + "'");
		if (!query) {
		    alert("This page has a MasterKey widget that needs a query specified by the '" + param + "' parameter");
		}
	    } else if (query.match(/^!path!/)) {
		var index = query.replace(/^!path!/, '');
		var path = window.location.pathname.split('/');
		query = path[path.length - index];
		widget.log("obtained query '" + query + "' from path-component '" + index + "'");
		if (!query) {
		    alert("This page has a MasterKey widget that needs a query specified by the path-component " + index);
		}
            } else if (query.match(/^!var!/)) {
		var name = query.replace(/^!var!/, '');
		query = window[name]; // It's ridiculous that this works
		widget.log("obtained query '" + query + "' from variable '" + name + "'");
		if (!query) {
		    alert("This page has a MasterKey widget that needs a query specified by the '" + name + "' variable");
		}
	    }

	    var sortOrder = widget.config.sort;
	    var maxrecs = widget.config.maxrecs;
	    var perpage = widget.config.perpage;
	    var limit = widget.config.limit;
	    var targets = widget.config.targets;
	    var targetfilter = widget.config.targetfilter;
	    var target = widget.config.target;
	    if (target) targetfilter = 'udb=="' + target + '"';

	    var s = "running auto search: '" + query + "'";
	    if (sortOrder) s += " sorted by '" + sortOrder + "'";
	    if (maxrecs) s += " restricted to " + maxrecs + " records";
	    if (perpage) s += " with " + perpage + " per page";
	    if (limit) s += " limited by '" + limit + "'";
	    if (targets) s += " in targets '" + targets + "'";
	    if (targetfilter) s += " constrained by targetfilter '" + targetfilter + "'";
	    widget.log(s);

	    widget.team.newSearch(query, sortOrder, maxrecs, perpage, limit, targets, targetfilter);
	}
    });
};


// Functions follow for promoting the regular widget object into
// widgets of specific types. These could be moved into their own
// source files.


mkws.registerWidgetType('Targets', function() {
    var that = this;
    var M = mkws.M;

    $(this.node).html('\
<div class="mkwsBytarget mkwsTeam_' + this.team.name() + '">\
No information available yet.\
</div>');
    $(this.node).css("display", "none");

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

	    var prev = '<span class="mkwsPrev">&#60;&#60; ' + M('Prev') + '</span> | ';
	    if (currentPage > 1)
		prev = '<a href="#" class="mkwsPrev" onclick="mkws.pagerPrev(\'' + teamName + '\');">'
		+'&#60;&#60; ' + M('Prev') + '</a> | ';

	    var middle = '';
	    for(var i = firstClkbl; i <= lastClkbl; i++) {
		var numLabel = i;
		if(i == currentPage)
		    numLabel = '<span class="mkwsSelected">' + i + '</span>';

		middle += '<a href="#" onclick="mkws.showPage(\'' + teamName + '\', ' + i + ')"> '
		    + numLabel + ' </a>';
	    }

	    var next = ' | <span class="mkwsNext">' + M('Next') + ' &#62;&#62;</span>';
	    if (pages - currentPage > 0)
		next = ' | <a href="#" class="mkwsNext" onclick="mkws.pagerNext(\'' + teamName + '\')">'
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


mkws.registerWidgetType('Results', function() {
    // Nothing to do apart from act as an autosearch trigger
    // Contained elements do all the real work
    widget.autosearch(this);
});


mkws.registerWidgetType('Records', function() {
    var that = this;
    var team = this.team;

    this.team.queue("records").subscribe(function(data) {
	var html = [];
	for (var i = 0; i < data.hits.length; i++) {
	    var hit = data.hits[i];
            that.team.queue("record").publish(hit);
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
	    var template = team.loadTemplate(that.config.template || "Summary");
	    hit._id = team.recordElementId(hit.recid[0]);
	    hit._onclick = "mkws.showDetails('" + team.name() + "', '" + hit.recid[0] + "');return false;"
	    return template(hit);
	}
    });

    widget.autosearch(that);
});


mkws.registerWidgetType('Navi', function() {
    var that = this;
    var teamName = this.team.name();
    var M = mkws.M;

    this.team.queue("navi").subscribe(function() {
	var filters = that.team.filters();
	var text = "";

	filters.visitTargets(function(id, name) {
	    if (text) text += " | ";
	    text += M('source') + ': <a class="crossout" href="#" onclick="mkws.delimitTarget(\'' + teamName +
		"', '" + id + "'" + ');return false;">' + name + '</a>';
	});

	filters.visitFields(function(field, value) {
	    if (text) text += " | ";
	    text += M(field) + ': <a class="crossout" href="#" onclick="mkws.delimitQuery(\'' + teamName +
		"', '" + field + "', '" + value + "'" +
		');return false;">' + value + '</a>';
	});

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
	    that.team.reShow();
	}
	return false;
    });
});


mkws.registerWidgetType('Done', function() {
    var that = this;

    this.team.queue("complete").subscribe(function(n) {
	$(that.node).html("Search complete: found " + n + " records");
    });
});


mkws.registerWidgetType('Switch', function() {
    var tname = this.team.name();
    $(this.node).html('\
<a href="#" onclick="mkws.switchView(\'' + tname + '\', \'records\')">Records</a><span> \
| \
</span><a href="#" onclick="mkws.switchView(\'' + tname + '\', \'targets\')">Targets</a>');
});


mkws.registerWidgetType('Search', function() {
    var tname = this.team.name();
    var M = mkws.M;

    $(this.node).html('\
<form name="mkwsSearchForm" class="mkwsSearchForm mkwsTeam_' + tname + '" action="" >\
  <input class="mkwsQuery mkwsTeam_' + tname + '" type="text" size="' + this.config.query_width + '" />\
  <input class="mkwsButton mkwsTeam_' + tname + '" type="submit" value="' + M('Search') + '" />\
</form>');
});


mkws.registerWidgetType('SearchForm', function() {
    var team = this.team;    
    $(this.node).submit(function() {
	var val = team.widget('Query').value();
	team.newSearch(val);
	return false;
    });
});


mkws.registerWidgetType('Results', function() {
    var tname = this.team.name();

    $(this.node).html('\
<table width="100%" border="0" cellpadding="6" cellspacing="0">\
  <tr>\
    <td class="mkwsTermlistContainer1 mkwsTeam_' + tname + '" width="250" valign="top">\
      <div class="mkwsTermlists mkwsTeam_' + tname + '"></div>\
    </td>\
    <td class="mkwsMOTDContainer mkwsTeam_' + tname + '" valign="top">\
      <div class="mkwsRanking mkwsTeam_' + tname + '"></div>\
      <div class="mkwsPager mkwsTeam_' + tname + '"></div>\
      <div class="mkwsNavi mkwsTeam_' + tname + '"></div>\
      <div class="mkwsRecords mkwsTeam_' + tname + '"></div>\
    </td>\
  </tr>\
  <tr>\
    <td colspan="2">\
      <div class="mkwsTermlistContainer2 mkwsTeam_' + tname + '"></div>\
    </td>\
  </tr>\
</table>');
});



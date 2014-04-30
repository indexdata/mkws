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
    <td class="mkwsTermlist-Container-wide mkwsTeam_' + tname + '" width="250" valign="top">\
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
      <div class="mkwsTermlist-Container-narrow mkwsTeam_' + tname + '"></div>\
    </td>\
  </tr>\
</table>');
});


mkws.registerWidgetType('Ranking', function() {
    var tname = this.team.name();
    var that = this;
    var M = mkws.M;

    var s = '<form name="mkwsSelect" class="mkwsSelect mkwsTeam_' + tname + '" action="" >';
    if (this.config.show_sort) {
	s +=  M('Sort by') + ' ' + mkwsHtmlSort() + ' ';
    }
    if (this.config.show_perpage) {
	s += M('and show') + ' ' + mkwsHtmlPerpage() + ' ' + M('per page') + '.';
    }
    s += '</form>';

    $(this.node).html(s);


    function mkwsHtmlSort() {
        var order = that.team.sortOrder();

	that.log("HTML sort, sortOrder = '" + order + "'");
	var sort_html = '<select class="mkwsSort mkwsTeam_' + tname + '">';

	for(var i = 0; i < that.config.sort_options.length; i++) {
	    var opt = that.config.sort_options[i];
	    var key = opt[0];
	    var val = opt.length == 1 ? opt[0] : opt[1];

	    sort_html += '<option value="' + key + '"';
	    if (order == key || order == val) {
		sort_html += ' selected="selected"';
	    }
	    sort_html += '>' + M(val) + '</option>';
	}
	sort_html += '</select>';

	return sort_html;
    }

    function mkwsHtmlPerpage() {
        var perpage = that.team.perpage();

	that.log("HTML perpage, perpage = " + perpage);
	var perpage_html = '<select class="mkwsPerpage mkwsTeam_' + tname + '">';

	for(var i = 0; i < that.config.perpage_options.length; i++) {
	    var key = that.config.perpage_options[i];

	    perpage_html += '<option value="' + key + '"';
	    if (key == perpage) {
		perpage_html += ' selected="selected"';
	    }
	    perpage_html += '>' + key + '</option>';
	}
	perpage_html += '</select>';

	return perpage_html;
    }
});


mkws.registerWidgetType('Lang', function() {
    // dynamic URL or static page? /path/foo?query=test
    /* create locale language menu */
    if (!this.config.show_lang) return;

    var lang_default = "en";
    var lang = this.config.lang || lang_default;
    var list = [];

    /* display a list of configured languages, or all */
    var lang_options = this.config.lang_options || [];
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

    this.log("Language menu for: " + list.join(", "));

    /* the HTML part */
    var data = "";
    for (var i = 0; i < list.length; i++) {
	var l = list[i];
	if (data)
	    data += ' | ';

	if (lang == l) {
	    data += ' <span>' + l + '</span> ';
	} else {
	    data += ' <a href="' + lang_url(l) + '">' + l + '</a> '
	}
    }

    $(this.node).html(data);


    // set or re-set "lang" URL parameter
    function lang_url(lang) {
	var query = location.search;
	// no query parameters? done
	if (!query) {
	    return "?lang=" + lang;
	}

	// parameter does not exist
	if (!query.match(/[\?&]lang=/)) {
            return query + "&lang=" + lang;
        }

	// replace existing parameter
	query = query.replace(/\?lang=([^&#;]*)/, "?lang=" + lang);
	query = query.replace(/\&lang=([^&#;]*)/, "&lang=" + lang);
	return query;
    }
});


mkws.registerWidgetType('MOTD', function() {
    var container = this.team.widget('MOTDContainer');
    if (container) {
	// Move the MOTD from the provided element down into the container
	$(this.node).appendTo(container.node);
    }
});


// Some elements have mkws* classes that makes them appear as widgets
// -- for example, because we want to style them using CSS -- but have
// no actual functionality. We register these to prevent ignorable
// warnings when they occur.

mkws.registerWidgetType('Query', function() {});
mkws.registerWidgetType('MOTDContainer', function() {});
mkws.registerWidgetType('Button', function() {});
mkws.registerWidgetType('Popup', function() {});

// Not sure whether the following should have functionality:
// Select		HTMLFormElement
// Termlist-Container-wide	HTMLTableCellElement
// Termlist-Container-narrow	HTMLDivElement
// Bytarget		HTMLDivElement
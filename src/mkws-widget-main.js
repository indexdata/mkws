// Functions follow for promoting the regular widget object into
// widgets of specific types. These could be moved into their own
// source files.


mkws.registerWidgetType('Targets', function() {
  if (!this.config.show_switch) return;
  var that = this;

  this.node.html('No information available yet.');
  this.node.css("display", "none");

  this.team.queue("targets").subscribe(function(data) {
    // There is a bug in pz2.js wherein it makes each data object an array but
    // simply assigns properties to it.
    // TODO: remove this when PAZ-946 is addressed.
    var cleandata = [];
    for (var i = 0; i < data.length; i++) {
      var cur = {};
      cur.id = data[i].id;
      cur.hits = data[i].hits;
      cur.diagnostic = data[i].diagnostic;
      cur.records = data[i].records;
      cur.state = data[i].state;
      cleandata.push(cur);
    }

    var template = that.team.loadTemplate(that.config.template || "Targets");
    that.node.html(template({data: cleandata}));
  });
});


mkws.registerWidgetType('Stat', function() {
  var that = this;
  this.team.queue("stat").subscribe(function(data) {
    var template = that.team.loadTemplate(that.config.template || "Stat");
    that.node.html(template(data));
  });
});


mkws.registerWidgetType('Pager', function() {
  var that = this;
  var M = mkws.M;

  this.team.queue("pager").subscribe(function(data) {
    var teamName = that.team.name();
    var output = {};
    output.first = data.start + 1;
    output.last = data.start + data.num;
    output.count = data.merged;
    output.found = data.total;

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

    if (firstClkbl > 1) output.morePrev = true;
    if (lastClkbl < pages) output.moreNext = true;

    if (currentPage > 1) output.prevClick = "mkws.pagerPrev(\'" + teamName + "\');";

    output.pages = [];
    for(var i = firstClkbl; i <= lastClkbl; i++) {
      var o = {};
      o.number = i;
      if (i !== currentPage) {
        o.click = "mkws.showPage(\'" + teamName + "\', " + i + ");";
      }
      output.pages.push(o);
    }

    if (pages - currentPage > 0) output.nextClick = "mkws.pagerNext(\'" + teamName + "\')";

    var template = that.team.loadTemplate(that.config.template || "Pager");
    that.node.html(template(output));
  });
});


mkws.registerWidgetType('Records', function() {
  var that = this;
  var team = this.team;

  this.team.queue("records").subscribe(function(data) {
    for (var i = 0; i < data.hits.length; i++) {
      var hit = data.hits[i];
      that.team.queue("record").publish(hit);
      hit.detailLinkId = team.recordElementId(hit.recid[0]);
      hit.detailClick = "mkws.showDetails('" + team.name() + "', '" + hit.recid[0] + "');return false;"
      hit.containerClass = "mkwsSummary mkwsTeam_" + team.name();
      hit.containerClass += " " + hit.detailLinkId;
      // ### At some point, we may be able to move the
      // m_currentRecordId and m_currentRecordData members
      // from the team object into this widget.
      if (hit.recid == team.currentRecordId()) {
        if (team.currentRecordData()) {
          hit.renderedDetails = team.renderDetails(team.currentRecordData());
          console.log(hit.renderedDetails); 
        } 
      }
    }
    var template = team.loadTemplate(that.config.template || "Records");
    var targs = $.extend({}, {"hits": data.hits}, that.config.template_vars);
    that.node.html(template(targs));
  });

  that.autosearch();
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
      text += M('source') + ': <a class="mkwsRemovable" href="#" onclick="mkws.delimitTarget(\'' + teamName +
        "', '" + id + "'" + ');return false;">' + name + '</a>';
    });

    filters.visitFields(function(field, value) {
      if (text) text += " | ";
      text += M(field) + ': <a class="mkwsRemovable" href="#" onclick="mkws.delimitQuery(\'' + teamName +
        "', '" + field + "', '" + value + "'" +
        ');return false;">' + value + '</a>';
    });

    that.node.html(text);
  });
});


// It seems this and the Perpage widget doen't need to subscribe to
// anything, since they produce events rather than consuming them.
//
mkws.registerWidgetType('Sort', function() {
  var that = this;

  this.node.change(function() {
    that.team.set_sortOrder(that.node.val());
    if (that.team.submitted()) {
      that.team.reShow();
    }
    return false;
  });
});


mkws.registerWidgetType('Perpage', function() {
  var that = this;

  this.node.change(function() {
    that.team.set_perpage(that.node.val());
    if (that.team.submitted()) {
      that.team.reShow();
    }
    return false;
  });
});


mkws.registerWidgetType('Done', function() {
  var that = this;
  this.team.queue("complete").subscribe(function(n) {
    var template = that.team.loadTemplate(that.config.template || "Done");
    that.node.html(template({count: n}));
  });
});


mkws.registerWidgetType('Switch', function() {
  if (!this.config.show_switch) return;
  var tname = this.team.name();
  var output = {};
  output.recordClick = "mkws.switchView(\'" + tname + "\', \'records\')";
  output.targetClick = "mkws.switchView(\'" + tname + "\', \'targets\')";
  var template = this.team.loadTemplate(this.config.template || "Switch");
  this.node.html(template(output));
  this.hideWhenNarrow();
});


mkws.registerWidgetType('Search', function() {
  var output = {};
  output.team = this.team.name();
  output.queryWidth = this.config.query_width;
  var template = this.team.loadTemplate(this.config.template || "Search");
  this.node.html(template(output));
});


mkws.registerWidgetType('SearchForm', function() {
  var team = this.team;
  this.node.submit(function() {
    var val = team.widget('Query').value();
    team.newSearch(val);
    return false;
  });
});


mkws.registerWidgetType('Results', function() {
  var tname = this.team.name();

  this.node.html('\
<table width="100%" border="0" cellpadding="6" cellspacing="0">\
  <tr>\
    <td class="mkwsTermlists-Container-wide mkwsTeam_' + tname + '" width="250" valign="top">\
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
      <div class="mkwsTermlists-Container-narrow mkwsTeam_' + tname + '"></div>\
    </td>\
  </tr>\
</table>');

  this.autosearch();
});


mkws.registerWidgetType('Ranking', function() {
  var tname = this.team.name();
  var that = this;
  var M = mkws.M;

  var s = '<form>';
  if (this.config.show_sort) {
    s +=  M('Sort by') + ' ' + mkwsHtmlSort() + ' ';
  }
  if (this.config.show_perpage) {
    s += M('and show') + ' ' + mkwsHtmlPerpage() + ' ' + M('per page') + '.';
  }
  s += '</form>';

  this.node.html(s);


  function mkwsHtmlSort() {
    var order = that.team.sortOrder();

    that.log("making sort HTML, sortOrder = '" + order + "'");
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

    that.log("making perpage HTML, perpage = " + perpage);
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

  this.log("language menu: " + list.join(", "));

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

  this.node.html(data);
  this.hideWhenNarrow();


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
    this.node.appendTo(container.node);
  }
});


// This widget has no functionality of its own, but its configuration
// is copied up into its team, allowing it to affect other widgets in
// the team.
//
mkws.registerWidgetType('Config', function() {
  var c = this.config;
  for (var name in c) {
    if (c.hasOwnProperty(name)) {
      this.team.config[name] = c[name];
      this.log(this + " copied property " + name + "='" + c[name] + "' up to team");
    }
  }
});


mkws.registerWidgetType('Progress', function() {
  var that = this;

  this.node.hide();
  this.team.queue("stat").subscribe(function(data) {
    var s = '<span class="mkwsDone">';
    for (var i = 0; i < data.clients; i++) {
      if (i == data.clients - data.activeclients) {
        s += '</span>';
        s += '<span class="mkwsWaiting">';
      }
      s += '&#x2588;';
    }
    s += '</span>';
    that.node.html(s);
    that.node.show();
  });
});


// Some elements have mkws* classes that makes them appear as widgets
// -- for example, because we want to style them using CSS -- but have
// no actual functionality. We register these to prevent ignorable
// warnings when they occur.

mkws.registerWidgetType('Query', function() {});
mkws.registerWidgetType('MOTDContainer', function() {});
mkws.registerWidgetType('Button', function() {});



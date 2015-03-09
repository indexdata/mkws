(function($) { // jQuery wrapper

// Functions follow for promoting the regular widget object into
// widgets of specific types. These could be moved into their own
// source files.


mkws.registerWidgetType('targets', function() {
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
      cur.name = data[i].name;
      cur.id = data[i].id;
      cur.hits = data[i].hits;
      cur.diagnostic = data[i].diagnostic;
      cur.message = data[i].message;
      cur.records = data[i].records;
      cur.state = data[i].state.replace(/^Client_/, '');
      cleandata.push(cur);
    }

    cleandata.sort(function(a,b) { return a.name.localeCompare(b.name) });

    var template = that.team.loadTemplate(that.config.template || "targets");
    that.node.html(template({data: cleandata}));
  });
});


mkws.registerWidgetType('stat', function() {
  var that = this;
  this.team.queue("stat").subscribe(function(data) {
    var template = that.team.loadTemplate(that.config.template || "stat");
    that.node.html(template(data));
  });
});


mkws.registerWidgetType('pager', function() {
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
    var onsides = 5;
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

    var template = that.team.loadTemplate(that.config.template || "pager");
    that.node.html(template(output));
  });
});

mkws.registerWidgetType('details', function() {
  var that = this;
  var recid = that.node.attr("data-mkws-recid");
  if (this.team.gotRecords()) { 
    that.team.fetchDetails(recid);
  } else {
    this.team.queue("firstrecords").subscribe(function() {
      that.team.fetchDetails(recid);
    });
  }
  this.team.queue("record").subscribe(function(data) {
    if ($.inArray(recid, data.recid) > -1) {
      var template = that.team.loadTemplate(that.config.template || "details");
      that.node.html(template(data));
    }
  });
});

mkws.registerWidgetType('records', function() {
  var that = this;
  var team = this.team;

  this.team.queue("searchtriggered").subscribe(function() {
    var op = that.config.newsearch_opacity;
    if (op !== undefined) { that.node.fadeTo(500, op); }
  });

  var m_dataToRedraw = null;
  function refreshRecordData() {
    that.node.css('opacity', 1);

    if (m_dataToRedraw) {
      for (var i = 0; i < m_dataToRedraw.hits.length; i++) {
        var hit = m_dataToRedraw.hits[i];
        hit.detailLinkId = team.recordElementId(hit.recid[0]);
        hit.detailClick = "mkws.showDetails('" + team.name() + "', '" + hit.recid[0] + "');return false;";
        hit.containerClass = "mkws-summary mkwsSummary mkws-team-" + team.name();
        hit.containerClass += " " + hit.detailLinkId;
        // ### At some point, we may be able to move the
        // m_currentRecordId and m_currentRecordData members
        // from the team object into this widget.
        if (hit.recid == team.currentRecordId()) {
          if (team.currentRecordData()) {
            hit.renderedDetails = team.renderDetails(team.currentRecordData());
          } 
        }
      }
      var template = team.loadTemplate(that.config.template || "records");
      var summaryPartial = team.loadTemplate(that.config['summary-template'] || "summary");
      var tdata = $.extend({}, {"hits": m_dataToRedraw.hits}, that.config.template_vars);
      that.node.html(template(tdata, {"partials":{"summary":summaryPartial}}));
    }

    m_dataToRedraw = null;
  }

  var m_frozen = false;
  this.team.queue("records").subscribe(function(data) {
    m_dataToRedraw = data;
    if (!m_frozen) {
      refreshRecordData();
    }
  });

  var m_timer;
  this.node.mousemove(function() {
    that.debug("freezing display records");
    var op = that.config.freeze_opacity;
    if (op !== undefined) { that.node.css('opacity', op); }
    m_frozen = true;
    clearTimeout(m_timer);
    m_timer = setTimeout(unfreezeRecordDisplay, 1000);
  });

  function unfreezeRecordDisplay() {
    clearTimeout(m_timer);
    that.debug("refreshing records");
    that.node.css('opacity', 1);
    m_frozen = false;
    refreshRecordData();
  }
  this.node.mouseleave(unfreezeRecordDisplay);

  that.autosearch();
});


mkws.registerWidgetType('navi', function() {
  var that = this;
  var teamName = this.team.name();

  this.team.queue("searchtriggered").subscribe(function() {
    var filters = that.team.filters();
    var output = {filters:[]};

    filters.visitTargets(function(id, name) {
      var cur = {};
      cur.facet = 'source';
      cur.value = name;
      cur.click = "mkws.delimitTarget('" + teamName + "', '" + id + "'); return false;";
      output.filters.push(cur);
    });

    filters.visitFields(function(field, value) {
      var cur = {};
      cur.facet = field;
      cur.value = value;
      cur.click = "mkws.delimitQuery('" + teamName + "', '" + field + "', '" + value + "'" + ");return false;";
      output.filters.push(cur);
    });

    var template = that.team.loadTemplate(that.config.template || "navi");
    that.node.html(template(output));
  });
});


// It seems this and the Perpage widget doen't need to subscribe to
// anything, since they produce events rather than consuming them.
//
mkws.registerWidgetType('sort', function() {
  var that = this;

  this.node.change(function() {
    that.team.set_sortOrder(that.node.val());
    if (that.team.submitted()) {
      that.team.reShow();
    }
    return false;
  });
});


mkws.registerWidgetType('per-page', function() {
  var that = this;

  this.node.change(function() {
    that.team.set_perpage(that.node.val());
    if (that.team.submitted()) {
      that.team.reShow();
    }
    return false;
  });
});


mkws.registerWidgetType('done', function() {
  var that = this;
  this.team.queue("complete").subscribe(function(n) {
    var template = that.team.loadTemplate(that.config.template || "done");
    that.node.html(template({count: n}));
  });
});


mkws.registerWidgetType('switch', function() {
  if (!this.config.show_switch) return;
  var tname = this.team.name();
  var output = {};
  output.recordClick = "mkws.switchView(\'" + tname + "\', \'records\')";
  output.targetClick = "mkws.switchView(\'" + tname + "\', \'targets\')";
  var template = this.team.loadTemplate(this.config.template || "switch");
  this.node.html(template(output));
  this.hideWhenNarrow();
});


mkws.registerWidgetType('search', function() {
  var output = {};
  output.team = this.team.name();
  var template = this.team.loadTemplate(this.config.template || "search");
  this.node.html(template(output));
});


mkws.registerWidgetType('search-form', function() {
  var team = this.team;
  this.node.submit(function() {
    var val = team.widget('query').value();
    team.newSearch(val);
    return false;
  });
});


mkws.registerWidgetType('results', function() {
  var template = this.team.loadTemplate(this.config.template || "results");
  this.node.html(template({team: this.team.name()}));
  this.autosearch();
});


mkws.registerWidgetType('ranking', function() {
  var output = {};
  output.perPage = [];
  output.sort = [];
  output.team = this.team.name();
  output.showSort = this.config.show_sort;
  output.showPerPage = this.config.show_perpage;

  var order = this.team.sortOrder();
  this.info("making sort, sortOrder = '" + order + "'");
  for (var i = 0; i < this.config.sort_options.length; i++) {
    var cur = {};
    var opt = this.config.sort_options[i];
    cur.key = opt[0];
    cur.label = opt.length == 1 ? opt[0] : mkws.M(opt[1]);
    if (order == cur.key || order == cur.label) cur.selected = true;
    output.sort.push(cur);
  }

  var perpage = this.team.perpage();
  this.info("making perpage, perpage = " + perpage);
  for(var i = 0; i < this.config.perpage_options.length; i++) {
    var cur = {};
    cur.perPage = this.config.perpage_options[i];
    if (cur.perPage == perpage) cur.selected = true;
    output.perPage.push(cur);
  }

  var template = this.team.loadTemplate(this.config.template || "ranking");
  this.node.html(template(output));
});


mkws.registerWidgetType('lang', function() {
  // dynamic URL or static page? /path/foo?query=test
  /* create locale language menu */
  if (!this.config.show_lang) return;

  var lang_default = "en";
  var lang = this.config.lang || lang_default;
  var list = [];

  /* display a list of configured languages, or all */
  var lang_options = this.config.lang_options;
  var toBeIncluded = {};
  for (var i = 0; i < lang_options.length; i++) {
    toBeIncluded[lang_options[i]] = true;
  }

  for (var k in mkws.locale_lang) {
    if (toBeIncluded[k] || lang_options.length == 0) {
      cur = {};
      if (lang === k) cur.selected = true;
      cur.code = k;
      cur.url = lang_url(k);
      list.push(cur);
    }
  }

  // add english link
  if (lang_options.length == 0 || toBeIncluded[lang_default]) {
      cur = {};
      if (lang === lang_default) cur.selected = true;
      cur.code = lang_default;
      cur.url = lang_url(lang_default);
      list.push(cur);
  }

  this.info("language menu: " + list.join(", "));

  var template = this.team.loadTemplate(this.config.template || "lang");
  this.node.html(template({languages: list}));
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


mkws.registerWidgetType('motd', function() {
  var container = this.team.widget('motd-container');
  if (container) {
    // Move the MOTD from the provided element down into the container
    this.node.appendTo(container.node);
  }
});


// This widget has no functionality of its own, but its configuration
// is copied up into its team, allowing it to affect other widgets in
// the team.
//
mkws.registerWidgetType('config', function() {
  var c = this.config;
  for (var name in c) {
    if (c.hasOwnProperty(name)) {
      this.team.config[name] = c[name];
      this.info(this + " copied property " + name + "='" + c[name] + "' up to team");
    }
  }
});


mkws.registerWidgetType('progress', function() {
  var that = this;
  this.node.hide();
  this.team.queue("stat").subscribe(function(data) {
    var template = that.team.loadTemplate(that.config.template || "progress");
    that.node.html(template({
      done: data.clients - data.activeclients,
      waiting: data.activeclients
    }));
    that.node.show();
  });
});


mkws.registerWidgetType('waiting', function() {
  var that = this;

  this.node.css("visibility", "hidden");
  var template = that.team.loadTemplate(that.config.template || "waiting");
  this.node.html(template({
    src: this.config.src || "http://mkws.indexdata.com/progress.gif"
  }));

  this.team.queue("searchtriggered").subscribe(function(data) {
    that.node.css("visibility", "visible");
  });
  this.team.queue("complete").subscribe(function(n) {
    that.node.css("visibility", "hidden");
  });
});


// Some elements have mkws* classes that makes them appear as widgets
// -- for example, because we want to style them using CSS -- but have
// no actual functionality. We register these to prevent ignorable
// warnings when they occur.

mkws.registerWidgetType('query', function() {});
mkws.registerWidgetType('motd-container', function() {});
mkws.registerWidgetType('button', function() {});


})(mkws.$); // jQuery wrapper

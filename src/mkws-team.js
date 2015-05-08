"use strict";
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
// Before the team can be used for searching and related operations,
// its pz2 object must be created by calling team.makePz2().
//
mkws.makeTeam = function($, teamName) {
  var that = {};

  // Member variables are separated into two categories

  // 1. Persistent state (to be coded in URL fragment)
  var m_state = {
    query: null,                // initially undefined
    sort: null,                 // will be set below
    size: null,                 // will be set below
    page: 1,
    recid: '',
    filters: filterSet(that)
  }

  // 2. Internal state (not to be coded)
  var m_teamName = teamName;
  var m_paz; // will be initialised below
  var m_submitted = false;
  var m_totalRecordCount = 0;
  var m_currentRecordData = null;
  var m_logTime = {
    // Timestamps for logging
    "start": $.now(),
    "last": $.now()
  };
  var m_templateText = {}; // widgets can register templates to be compiled
  var m_template = {}; // compiled templates, from any source
  var m_widgets = {}; // Maps widget-type to array of widget objects
  var m_gotRecords = false;
  
  var config = mkws.objectInheritingFrom(mkws.config);
  that.config = config;

  that.toString = function() { return '[Team ' + teamName + ']'; };

  // Accessor methods for individual widgets: readers
  that.name = function() { return m_teamName; };
  that.submitted = function() { return m_submitted; };
  that.sortOrder = function() { return m_state.sort; };
  that.perpage = function() { return m_state.size; };
  that.query = function() { return m_state.query; };
  that.totalRecordCount = function() { return m_totalRecordCount; };
  that.currentPage = function() { return m_state.page; };
  that.currentRecordId = function() { return m_state.recid; };
  that.currentRecordData = function() { return m_currentRecordData; };
  that.filters = function() { return m_state.filters; };
  that.gotRecords = function() { return m_gotRecords; };

  // Accessor methods for individual widgets: writers
  that.set_sortOrder = function(val) { m_state.sort = val };
  that.set_perpage = function(val) { m_state.size = val };

  m_state.sort = config.sort_default;
  m_state.size = config.perpage_default;

  var m_default = $.extend(true, {}, m_state);
  var tmp = m_default.filters;
  delete m_default.filters;
  $.extend(m_default, tmp.fragmentItems());

  that.urlFragment = function(overrides) {
    var s;

    // Expand the filterSet into a set of key=value properties 
    var state = $.extend(true, {}, m_state, overrides ? overrides : {});
    var tmp = state.filters;
    delete state.filters;
    $.extend(state, tmp.fragmentItems());

    for (var key in state) {
      if (state.hasOwnProperty(key) &&
          state[key] != m_default[key]) {
        if (!s) {
          var s = 'mkws';
          if (m_teamName !== 'AUTO') s += m_teamName;
          s += '=';
        } else {
          s += "@";
        }

        // ### how do we need to quote this?
        s += key + '=' + state[key];
      }
    }

    return s;
  }

  // ### what quoting do we need to undo? Complement of previous function
  that.parseFragment = function(s) {
    var x = {};

    var list = s.split('@');
    for (var i in list) {
      var a = list[i].split('=');
      x[a[0]] = a[1];
    }

    return x;
  }

  that.handleChanges = function(oldState, newState) {
    for (var key in newState) {
      var val = newState[key];
      if (newState.hasOwnProperty(key) &&
          (!oldState || val != oldState[key])) {
        that.warn("changed property " + key + ": " + 
                  (oldState ? ("'" + oldState[key] + "'") : "undefined") +
                  " -> '" + val + "'");
        if (key === 'page') {
          that.showPage(parseInt(val));
        } else if (key === 'sort') {
          that.set_sortOrder(val);
          if (that.submitted()) {
            that.reShow();
          }
        } else if (key === 'size') {
          that.set_perpage(val);
          if (that.submitted()) {
            that.reShow();
          }
        } else if (key.indexOf('xt-') == 0) {
          that.limitTarget(key.substring(3), val);
        } else if (key.indexOf('xf-') == 0) {
          var a = key.split('-');
          that.limitQuery(a[1], a[2]);
        }
      }
    }
  };


  // The following PubSub code is modified from the jQuery manual:
  // http://api.jquery.com/jQuery.Callbacks/
  //
  // Use as:
  //    team.queue("eventName").subscribe(function(param1, param2 ...) { ... });
  //    team.queue("eventName").publish(arg1, arg2, ...);
  //
  var m_queues = {};
  function queue(id) {
    if (!m_queues[id]) {
      var callbacks = $.Callbacks();
      m_queues[id] = {
        publish: callbacks.fire,
        subscribe: callbacks.add,
        unsubscribe: callbacks.remove
      };
    }
    return m_queues[id];
  };
  that.queue = queue;


  function _log(fn, s) {
    var now = $.now();
    var timestamp = (((now - m_logTime.start)/1000).toFixed(3) + " (+" +
                     ((now - m_logTime.last)/1000).toFixed(3) + ") ");
    m_logTime.last = now;
    fn.call(mkws.log, m_teamName + ": " + timestamp + s);
    that.queue("log").publish(m_teamName, timestamp, s);
  }

  that.trace = function(x) { _log(mkws.trace, x) };
  that.debug = function(x) { _log(mkws.debug, x) };
  that.info = function(x) { _log(mkws.info, x) };
  that.warn = function(x) { _log(mkws.warn, x) };
  that.error = function(x) { _log(mkws.error, x) };
  that.fatal = function(x) { _log(mkws.fatal, x) };

  that.info("making new widget team");

  // pz2.js event handlers:
  function onInit() {
    that.info("init");
    m_paz.stat();
    m_paz.bytarget();
  }

  function onBytarget(data) {
    that.info("bytarget");
    queue("targets").publish(data);
  }

  function onStat(data) {
    queue("stat").publish(data);
    var hitcount = parseInt(data.hits[0], 10);
    if (!m_gotRecords && hitcount > 0) {
      m_gotRecords = true;
      queue("firstrecords").publish(hitcount);
    }
    if (parseInt(data.activeclients[0], 10) === 0) {
      that.info("complete");
      queue("complete").publish(hitcount);
    }
  }

  function onTerm(data) {
    that.info("term");
    queue("facets").publish(data);
  }

  function onShow(data, teamName) {
    that.info("show");
    m_totalRecordCount = data.merged;
    that.info("found " + m_totalRecordCount + " records");
    queue("pager").publish(data);
    queue("records").publish(data);
  }

  function onRecord(data, args, teamName) {
    that.info("record");
    // FIXME: record is async!!
    clearTimeout(m_paz.recordTimer);
    queue("record").publish(data);
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


  // create a parameters array and pass it to the pz2's constructor
  // then register the form submit event with the pz2.search function
  // autoInit is set to true on default
  that.makePz2 = function() {
    that.debug("m_queues=" + $.toJSON(m_queues));
    var params = {
      "windowid": teamName,
      "pazpar2path": mkws.pazpar2_url(),
      "usesessions" : config.use_service_proxy ? false : true,
      "showtime": 500,            //each timer (show, stat, term, bytarget) can be specified this way
      "termlist": config.facets.join(',')
    };

    params.oninit = onInit;
    if (m_queues.targets) {
      params.onbytarget = onBytarget;
      that.info("setting bytarget callback");
    }
    if (m_queues.stat || m_queues.firstrecords || m_queues.complete) {
      params.onstat = onStat;
      that.info("setting stat callback");
    }
    if (m_queues.facets && config.facets.length) {
      params.onterm = onTerm;
      that.info("setting term callback");
    }
    if (m_queues.records) {
      that.info("setting show callback");
      params.onshow = onShow;
      // Record callback is subscribed from records callback
      that.info("setting record callback");
      params.onrecord = onRecord;
    }

    m_paz = new pz2(params);
    that.info("created main pz2 object");
  }


  // Used by the Records widget and onRecord()
  function recordElementId(s) {
    return 'mkws-rec_' + s.replace(/[^a-z0-9]/ig, '_');
  }
  that.recordElementId = recordElementId;

  // Used by onRecord(), showDetails() and renderDetails()
  function recordDetailsId(s) {
    return 'mkws-det_' + s.replace(/[^a-z0-9]/ig, '_');
  }


  that.targetFiltered = function(id) {
    return m_state.filters.targetFiltered(id);
  };


  that.limitTarget = function(id, name) {
    that.info("limitTarget(id=" + id + ", name=" + name + ")");
    m_state.filters.add(targetFilter(id, name));
    if (m_state.query) triggerSearch();
    return false;
  };


  that.limitQuery = function(field, value) {
    that.info("limitQuery(field=" + field + ", value=" + value + ")");
    m_state.filters.add(fieldFilter(field, value));
    if (m_state.query) triggerSearch();
    return false;
  };


  that.limitCategory = function(id) {
    that.info("limitCategory(id=" + id + ")");
    // Only one category filter at a time
    m_state.filters.removeMatching(function(f) { return f.type === 'category' });
    if (id !== '') m_state.filters.add(categoryFilter(id));
    if (m_state.query) triggerSearch();
    return false;
  };


  that.delimitTarget = function(id) {
    that.info("delimitTarget(id=" + id + ")");
    m_state.filters.removeMatching(function(f) { return f.type === 'target' });
    if (m_state.query) triggerSearch();
    return false;
  };


  that.delimitQuery = function(field, value) {
    that.info("delimitQuery(field=" + field + ", value=" + value + ")");
    m_state.filters.removeMatching(function(f) { return f.type == 'field' &&
                                             field == f.field && value == f.value });
    if (m_state.query) triggerSearch();
    return false;
  };


  that.showPage = function(pageNum) {
    m_state.page = pageNum;
    m_paz.showPage(m_state.page - 1);
    that.warn("fragment: " + that.urlFragment());
  };


  that.pagerNext = function() {
    if (m_totalRecordCount - m_state.size * m_state.page > 0) {
      m_paz.showNext();
      m_state.page++;
      that.warn("fragment: " + that.urlFragment());
    }
  };


  that.pagerPrev = function() {
    if (m_paz.showPrev() != false) {
      m_state.page--;
      that.warn("fragment: " + that.urlFragment());
    }
  };


  that.reShow = function() {
    resetPage();
    m_paz.show(0, m_state.size, m_state.sort);
    // ### not really the right place for this but it will do for now.
    that.warn("fragment: " + that.urlFragment());
  };


  function resetPage() {
    m_state.page = 1;
    m_totalRecordCount = 0;
    m_gotRecords = false;
  }
  that.resetPage = resetPage;


  function newSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery) {
    that.info("newSearch: " + query);

    if (config.use_service_proxy && !mkws.authenticated) {
      alert("searching before authentication");
      return;
    }

    m_state.filters.removeMatching(function(f) { return f.type !== 'category' });
    triggerSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery);
    switchView('records'); // In case it's configured to start off as hidden
    m_submitted = true;
  }
  that.newSearch = newSearch;


  function triggerSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery) {
    resetPage();

    // Continue to use previous query/sort-order unless new ones are specified
    if (query) m_state.query = query;
    if (sortOrder) m_state.sort = sortOrder;
    if (perpage) m_state.size = perpage;
    if (targets) m_state.filters.add(targetFilter(targets, targets));

    var pp2filter = m_state.filters.pp2filter();
    var pp2limit = m_state.filters.pp2limit(limit);
    var pp2catLimit = m_state.filters.pp2catLimit();
    if (pp2catLimit) {
      pp2filter = pp2filter ? pp2filter + "," + pp2catLimit : pp2catLimit;
    }

    var params = {};
    if (pp2limit) params.limit = pp2limit;
    if (maxrecs) params.maxrecs = maxrecs;
    if (torusquery) {
      if (!mkws.config.use_service_proxy)
        alert("can't narrow search by torusquery when not authenticated");
      params.torusquery = torusquery;
    }

    that.info("triggerSearch(" + m_state.query + "): filters = " + m_state.filters.toJSON() + ", " +
        "pp2filter = " + pp2filter + ", params = " + $.toJSON(params));

    m_paz.search(m_state.query, m_state.size, m_state.sort, pp2filter, undefined, params);
    queue("searchtriggered").publish();

    // ### not really the right place for this but it will do for now.
    that.warn("fragment: " + that.urlFragment());
  }

  // fetch record details to be retrieved from the record queue
  that.fetchDetails = function(recId) {
    that.info("fetchDetails() requesting record '" + recId + "'");
    m_paz.record(recId);
    that.warn("fragment: " + that.urlFragment());
  };


  // switching view between targets and records
  function switchView(view) {
    var targets = widgetNode('targets');
    var results = widgetNode('results') || widgetNode('records');
    var blanket = widgetNode('blanket');
    var motd    = widgetNode('motd');

    switch(view) {
    case 'targets':
      if (targets) $(targets).show();
      if (results) $(results).hide();
      if (blanket) $(blanket).hide();
      if (motd) $(motd).hide();
      break;
    case 'records':
      if (targets) $(targets).hide();
      if (results) $(results).show();
      if (blanket) $(blanket).show();
      if (motd) $(motd).hide();
      break;
    default:
      alert("Unknown view '" + view + "'");
    }
  }
  that.switchView = switchView;


  // detailed record drawing
  that.showDetails = function(recId) {
    var oldRecordId = m_state.recid;
    m_state.recid = recId;

    // remove current detailed view if any
    findnode('#' + recordDetailsId(oldRecordId)).remove();

    // if the same clicked, just hide
    if (recId == oldRecordId) {
      m_state.recid = '';
      m_currentRecordData = null;
      return;
    }
    // request the record
    that.info("showDetails() requesting record '" + recId + "'");
    m_paz.record(recId);
  };


  // Finds the node of the specified class within the current team
  function findnode(selector, teamName) {
    teamName = teamName || m_teamName;

    if (teamName === 'AUTO') {
      selector = (selector + '.mkws-team-' + teamName + ',' +
                  selector + ':not([class^="mkws-team"],[class*=" mkws-team"])');
    } else {
      selector = selector + '.mkws-team-' + teamName;
    }

    var node = $(selector);
    //that.debug('findnode(' + selector + ') found ' + node.length + ' nodes');
    return node;
  }


  function widgetNode(type) {
    var w = that.widget(type);
    return w ? w.node : undefined;
  }

  function renderDetails(data, marker) {
    var template = loadTemplate("details");
    var details = template(data);
    return '<div class="mkws-details mkwsDetails mkwsTeam_' + m_teamName + '" ' +
      'id="' + recordDetailsId(data.recid[0]) + '">' + details + '</div>';
  }
  that.renderDetails = renderDetails;


  that.registerTemplate = function(name, text) {
    if(mkws._old2new.hasOwnProperty(name)) {
      that.warn("registerTemplate: old widget name: " + name + " => " + mkws._old2new[name]);
      name = mkws._old2new[name];
    }
    m_templateText[name] = text;
  };


  function loadTemplate(name, fallbackString) {
    if(mkws._old2new.hasOwnProperty(name)) {
       that.warn("loadTemplate: old widget name: " + name + " => " + mkws._old2new[name]);
       name = mkws._old2new[name];
    }

    var template = m_template[name];
    if (template === undefined && Handlebars.compile) {
      var source;
      var node = $(".mkws-template-" + name + " .mkws-team-" + that.name());
      if (node && node.length < 1) {
        node = $(".mkws-template-" + name);
      }
      if (node) source = node.html();
      if (!source) source = m_templateText[name];
      if (source) {
        template = Handlebars.compile(source);
        that.info("compiled template '" + name + "'");
      }
    }
    //if (template === undefined) template = mkws_templatesbyteam[m_teamName][name];
    if (template === undefined && Handlebars.templates) {
      template = Handlebars.templates["mkws-template-" + name];
    }
    if (template === undefined && mkws.defaultTemplates) {
      template = mkws.defaultTemplates[name];
    }
    if (template) {
      m_template[name] = template;
      return template;
    }
    else {
      that.info("No MKWS template for " + name);
      return null;
    }  
  }
  that.loadTemplate = loadTemplate;


  that.addWidget = function(w) {
    if (m_widgets[w.type] === undefined) {
      m_widgets[w.type] = [ w ];
    } else {
      m_widgets[w.type].push(w);
    }
  }

  that.widget = function(type) {
    var list = m_widgets[type];

    if (!list)
      return undefined;
    if (list.length > 1) {
      alert("widget('" + type + "') finds " + list.length + " widgets: using first");
    }
    return list[0];
  }

  that.visitWidgets = function(callback) {
    for (var type in m_widgets) {
      var list = m_widgets[type];
      for (var i = 0; i < list.length; i++) {
        var res = callback(type, list[i]);
        if (res !== undefined) {
          return res;
        }
      }
    }
    return undefined;
  };

  return that;
};

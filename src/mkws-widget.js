// Factory function for widget objects.
mkws.makeWidget = function($, team, type, node) {
  // Static register of attributes that do not contribute to config
  var ignoreAttrs = {
    id:1, 'class':1, style:1, name:1, action:1, type:1, size:1,
    value:1, width:1, valign:1
  };

  var that = {
    team: team,
    type: type,
    node: $(node),
    config: mkws.objectInheritingFrom(team.config)
  };

  that.log = team.log;
  that.trace = team.trace;
  that.debug = team.debug;
  that.info = team.info;
  that.warn = team.warn;
  that.error = team.error;
  that.fatal = team.fatal;

  that.toString = function() {
    return '[Widget ' + team.name() + ':' + type + ']';
  };

  that.value = function() {
    return node.value;
  };

  // Returns the HTML of a subwidget of the specified type. It gets
  // the same attributes at the parent widget that invokes this
  // function, except where overrides are passed in. If defaults are
  // also provided, then these are used when the parent widget
  // provides no values.
  that.subwidget = function(type, overrides, defaults) {
    var attrs = { _team: team.name() };
    
    // Copy locally-set properties from the parent widget
    for (var name in this.config) {
      if (this.config.hasOwnProperty(name)) {
        attrs[name] = this.config[name];
        this.log(this + " copied property " + name + "='" + attrs[name] + "' to " + type + " subwidget");
      }
    }
    
    for (var name in overrides) {
      this.log(this + " overrode property " + name + "='" + overrides[name] + "' (was '" + attrs[name] + "') for " + type + " subwidget");
      attrs[name] = overrides[name];
    }

    if (defaults) {
      for (var name in defaults) {
        if (!attrs[name]) {
          attrs[name] = defaults[name];
          this.log(this + " fell back to default property " + name + "='" + attrs[name] + "' for " + type + " subwidget");
        }
      }
    }

    var s = [];
    s.push('<div class="mkws', type, ' mkws-team-', attrs._team, '"');
    for (var name in attrs) {    
      if (name !== '_team')
        s.push(' ', name, '="', attrs[name], '"');
    }
    s.push('></div>');
    return s.join('');
  };

  function expandValue(val) {
    if (val.match(/^!param!/)) {
      var param = val.replace(/^!param!/, '');
      val = mkws.getParameterByName(param);
      that.log("obtained val '" + val + "' from param '" + param + "'");
      if (!val) {
        alert("This page has a MasterKey widget that needs a val specified by the '" + param + "' parameter");
      }
    } else if (val.match(/^!path!/)) {
      var index = val.replace(/^!path!/, '');
      var path = window.location.pathname.split('/');
      val = path[path.length - index];
      that.log("obtained val '" + val + "' from path-component '" + index + "'");
      if (!val) {
        alert("This page has a MasterKey widget that needs a val specified by the path-component " + index);
      }
    } else if (val.match(/^!var!/)) {
      var name = val.replace(/^!var!/, '');
      val = window[name]; // It's ridiculous that this works
      that.log("obtained val '" + val + "' from variable '" + name + "'");
      if (!val) {
        alert("This page has a MasterKey widget that needs a val specified by the '" + name + "' variable");
      }
    }
    return val;
  };

  // Utility function for use by all widgets that can invoke autosearch.
  that.autosearch = function() {
    var that = this;
    var query = this.config.autosearch;
    if (query) {
      var old = this.team.config.query;
      if (!old) {
        // Stash this for subsequent inspection
        this.team.config.query = query;
      } else if (old === query) {
        this.log("duplicate autosearch: '" + query + "': ignoring");
        return;
      } else {
        this.log("conflicting autosearch: '" + query + "' vs '" + old + "': ignoring");
        return;
      }

      this.team.queue("ready").subscribe(function() {
        // Postpone testing for the configuration items: these are not
        // yet set for Record subclass widgets that fill them in in the
        // subclass, as widget.autosearch is called in the superclass,
        // before the subclass fiddles with the configuration.
        var sortOrder = that.config.sort;
        var maxrecs = that.config.maxrecs;
        var perpage = that.config.perpage;
        var limit = that.config.limit;
        var targets = that.config.targets;
        var targetfilter = that.config.targetfilter;
        var target = that.config.target;
        if (target) targetfilter = 'udb=="' + target + '"';

        var s = "running auto search: '" + query + "'";
        if (sortOrder) s += " sorted by '" + sortOrder + "'";
        if (maxrecs) s += " restricted to " + maxrecs + " records";
        if (perpage) s += " with " + perpage + " per page";
        if (limit) s += " limited by '" + limit + "'";
        if (targets) s += " in targets '" + targets + "'";
        if (targetfilter) s += " constrained by targetfilter '" + targetfilter + "'";
        that.log(s);

        that.team.newSearch(query, sortOrder, maxrecs, perpage, limit, targets, targetfilter);
      });
    }
  };

  // Utility function for all widgets that want to hide in narrow windows
  that.hideWhenNarrow = function() {
    var that = this;
    this.team.queue("resize-narrow").subscribe(function(n) {
      that.node.hide();
    });
    this.team.queue("resize-wide").subscribe(function(n) {
      that.node.show();
    });
  };


  for (var i = 0; i < node.attributes.length; i++) {
    var a = node.attributes[i];
    var val = expandValue(a.value);
    if (a.name === 'data-mkws-config') {
      // Treat as a JSON fragment configuring just this widget
      this.log(node + ": parsing config fragment '" + val + "'");
      var data;
      try {
        data = $.parseJSON(val);
        for (var key in data) {
          this.log(node + ": adding config element " + key + "='" + data[key] + "'");
          that.config[key] = data[key];
        }
      } catch (err) {
        alert("Can't parse " + node + " data-mkws-config as JSON: " + val);
      }
    } else if (a.name.match (/^data-mkws-/)) {
      var name = a.name.replace(/^data-mkws-/, '')
      that.config[name] = val;
      this.log(that + ": set data-mkws attribute " + name + "='" + val + "'");
    } else if (!ignoreAttrs[a.name]) {
      that.config[a.name] = val;
      this.log(that + ": set regular attribute " + a.name + "='" + val + "'");
    }
  }

  var fn = mkws.promotionFunction(type);
  if (fn) {
    fn.call(that);
    this.log("made " + type + " widget(node=" + node + ")");
  } else if (type.match(/-Container-(narrow|wide)$/)) {
    // Not really a widget: no need to log its lack of promotion
  } else {
    this.log("made UNPROMOTED widget(type=" + type + ", node=" + node + ")");
  }

  return that;
};

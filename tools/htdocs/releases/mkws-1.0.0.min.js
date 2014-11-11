// Handlebars helpers

Handlebars.registerHelper('mkws-json', function(obj) {
  return mkws.$.toJSON(obj);
});


// This is intended to handle paragraphs from Wikipedia, hence the
// rather hacky code to remove numbered references.
//
Handlebars.registerHelper('mkws-paragraphs', function(obj, nPara, nSent) {
  var acc = [];

  // For some reason, Handlebars provides the value
  // {"hash":{},"data":{}} for parameters that are not provided. So we
  // have to be prepared for actual numbers, explicitly undefined
  // values and this dumb magic value.
  if (obj && (nPara === undefined || nPara.hasOwnProperty('hash') || nPara == 0 || nPara > obj.length)) {
    nPara = obj.length;
  }
  if (nSent === undefined || nSent.hasOwnProperty('hash') || nSent == 0) {
    nSent = Infinity;
  }

  for (var i = 0; i < nPara; i++) {
    // Remove numbered references such as "[1,3,4]" from text
    var text = obj[i].replace(/\[[0-9,]+\]/g, '');
    // Next line from http://stackoverflow.com/questions/18914629/split-string-into-sentences-in-javascript
    var sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    if (sentences.length > nSent)
      sentences.length = nSent;

    acc.push('<p>', sentences.join(' '), '</p>');
    nSent -= sentences.length;
    if (nSent == 0)
      break;
  }

  return acc.join('');
});


Handlebars.registerHelper('mkws-translate', function(s) {
  return mkws.M(s);
});


// We need {{mkws-attr '@name'}} because Handlebars can't parse {{@name}}
Handlebars.registerHelper('mkws-attr', function(attrName) {
  return this[attrName];
});


/*
 * Use as follows: {{#mkws-if-any NAME1 having="NAME2"}}
 * Applicable when NAME1 is the name of an array
 * The guarded code runs only if at least one element of the NAME1
 * array has a subelement called NAME2.
 */
Handlebars.registerHelper('mkws-if-any', function(items, options) {
  var having = options.hash.having;
  for (var i in items) {
    var item = items[i]
    if (!having || item[having]) {
      return options.fn(this);
    }
  }
  return "";
});


Handlebars.registerHelper('mkws-first', function(items, options) {
  var having = options.hash.having;
  for (var i in items) {
    var item = items[i]
    if (!having || item[having]) {
      return options.fn(item);
    }
  }
  return "";
});


Handlebars.registerHelper('mkws-commaList', function(items, options) {
  var out = "";

  for (var i in items) {
    if (i > 0) out += ", ";
    out += options.fn(items[i])
  }

  return out;
});


Handlebars.registerHelper('mkws-index1', function(obj) {
  return obj.data.index + 1;
});

Handlebars.registerHelper('mkws-repeat', function(count, options) {
  var out = "";
  for (var i = 0; i < count; i++) {
    out += options.fn(this);
  }
  return out;
});
/*! MKWS, the MasterKey Widget Set.
 *  Copyright (C) 2013-2014 Index Data
 *  See the file LICENSE for details
 */

"use strict"; // HTML5: disable for log_level >= 2


// Set up global mkws object. Contains truly global state such as SP
// authentication, and a hash of team objects, indexed by team-name.
//
// We set it as a property of window to make the global explicit as
// some things complain about an implicit global.
window.mkws = {
  $: $, // Our own local copy of the jQuery object
  authenticated: false,
  authenticating: false,
  active: false,
  log_level: 1, // Will be overridden from mkws.config, but
                // initial value allows jQuery popup to use logging.
  teams: {},
  widgetType2function: {},
  defaultTemplates: {},

  locale_lang: {
    "de": {
      "Authors": "Autoren",
      "Subjects": "Schlagw&ouml;rter",
      "Sources": "Daten und Quellen",
      "source": "datenquelle",
      "Facets": "Termlisten",
      "Next": "Weiter",
      "Prev": "Zur&uuml;ck",
      "Search": "Suche",
      "Sort by": "Sortieren nach",
      "and show": "und zeige",
      "per page": "pro Seite",
      "Displaying": "Zeige",
      "to": "von",
      "of": "aus",
      "found": "gefunden",
      "Title": "Titel",
      "Author": "Autor",
      "author": "autor",
      "Date": "Datum",
      "Subject": "Schlagwort",
      "subject": "schlagwort",
      "Location": "Ort",
      "Records": "Datens&auml;tze",
      "Targets": "Datenbanken",

      "dummy": "dummy"
    },

    "da": {
      "Authors": "Forfattere",
      "Subjects": "Emner",
      "Sources": "Kilder",
      "source": "kilder",
      "Facets": "Termlists",
      "Next": "N&aelig;ste",
      "Prev": "Forrige",
      "Search": "S&oslash;g",
      "Sort by": "Sorter efter",
      "and show": "og vis",
      "per page": "per side",
      "Displaying": "Viser",
      "to": "til",
      "of": "ud af",
      "found": "fandt",
      "Title": "Title",
      "Author": "Forfatter",
      "author": "forfatter",
      "Date": "Dato",
      "Subject": "Emneord",
      "subject": "emneord",
      "Location": "Lokation",
      "Records": "Poster",
      "Targets": "Baser",

      "dummy": "dummy"
    }
  }
};

// We may be using a separate copy
if (typeof(mkws_jQuery) !== "undefined") {
  mkws.$ = mkws_jQuery;
} else {
  mkws.$ = jQuery;
}

mkws.log = function(string) {
  if (!mkws.log_level)
    return;

  if (typeof console === "undefined" || typeof console.log === "undefined") { /* ARGH!!! old IE */
    return;
  }

  // you need to disable use strict at the top of the file!!!
  if (mkws.log_level >= 3) {
    // Works in Chrome; not sure about elsewhere
    console.trace();
  } else if (mkws.log_level >= 2) {
    console.log(">>> called from function " + arguments.callee.caller.name + ' <<<');
  }
  console.log(string);
};


// Translation function.
mkws.M = function(word) {
  var lang = mkws.config.lang;

  if (!lang || !mkws.locale_lang[lang])
    return word;

  return mkws.locale_lang[lang][word] || word;
};


// This function is taken from a StackOverflow answer
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/901144#901144
mkws.getParameterByName = function(name, url) {
  if (!url) url = location.search;
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(url);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


mkws.registerWidgetType = function(name, fn) {
  if(mkws._old2new.hasOwnProperty(name)) {
      mkws.log("Warning: registerWidgetType old widget name: " + name + " => " + mkws._old2new[name]);
      name = mkws._old2new[name];
  }

  mkws.widgetType2function[name] = fn;
  mkws.log("registered widget-type '" + name + "'");
};

mkws.promotionFunction = function(name) {
  return mkws.widgetType2function[name];
};


mkws.setMkwsConfig = function(overrides) {
  // Set global log_level flag early so that mkws.log() works
  var tmp = overrides.log_level;
  if (typeof(tmp) !== 'undefined') mkws.log_level = tmp;

  var config_default = {
    use_service_proxy: true,
    pazpar2_url: undefined,
    pp2_hostname: "sp-mkws.indexdata.com",
    pp2_path: "service-proxy/",
    service_proxy_auth: undefined,
    sp_auth_path: undefined,
    sp_auth_query: "command=auth&action=perconfig",
    sp_auth_credentials: undefined,
    lang: "",
    sort_options: [["relevance"], ["title:1", "title"], ["date:0", "newest"], ["date:1", "oldest"]],
    perpage_options: [10, 20, 30, 50],
    sort_default: "relevance",
    perpage_default: 20,
    show_lang: true,    /* show/hide language menu */
    show_sort: true,    /* show/hide sort menu */
    show_perpage: true, /* show/hide perpage menu */
    show_switch: true,  /* show/hide switch menu */
    lang_options: [],   /* display languages links for given languages, [] for all */
    facets: ["xtargets", "subject", "author"], /* display facets, in this order, [] for none */
    responsive_design_width: undefined, /* a page with less pixel width considered as narrow */
    log_level: 1,     /* log level for development: 0..2 */
    template_vars: {}, /* values that may be exposed to templates */

    dummy: "dummy"
  };

  mkws.config = mkws.objectInheritingFrom(config_default);
  for (var k in overrides) {
    mkws.config[k] = overrides[k];
  }
};


// This code is from Douglas Crockford's article "Prototypal Inheritance in JavaScript"
// http://javascript.crockford.com/prototypal.html
// mkws.objectInheritingFrom behaves the same as Object.create,
// but since the latter is not available in IE8 we can't use it.
//
mkws.objectInheritingFrom = function(o) {
  function F() {}
  F.prototype = o;
  return new F();
}


// The following functions are dispatchers for team methods that
// are called from the UI using a team-name rather than implicit
// context.
mkws.switchView = function(tname, view) {
  mkws.teams[tname].switchView(view);
};

mkws.showDetails = function(tname, prefixRecId) {
  mkws.teams[tname].showDetails(prefixRecId);
};

mkws.limitTarget  = function(tname, id, name) {
  mkws.teams[tname].limitTarget(id, name);
};

mkws.limitQuery  = function(tname, field, value) {
  mkws.teams[tname].limitQuery(field, value);
};

mkws.limitCategory  = function(tname, id) {
  mkws.teams[tname].limitCategory(id);
};

mkws.delimitTarget = function(tname, id) {
  mkws.teams[tname].delimitTarget(id);
};

mkws.delimitQuery = function(tname, field, value) {
  mkws.teams[tname].delimitQuery(field, value);
};

mkws.showPage = function(tname, pageNum) {
  mkws.teams[tname].showPage(pageNum);
};

mkws.pagerPrev = function(tname) {
  mkws.teams[tname].pagerPrev();
};

mkws.pagerNext = function(tname) {
  mkws.teams[tname].pagerNext();
};


mkws.pazpar2_url = function() {
  if (mkws.config.pazpar2_url) {
    mkws.log("using pre-baked pazpar2_url '" + mkws.config.pazpar2_url + "'");
    return mkws.config.pazpar2_url;
  } else {
    var s = document.location.protocol + "//" + mkws.config.pp2_hostname + "/" + mkws.config.pp2_path;
    mkws.log("generated pazpar2_url '" + s + "'");
    return s;
  }
};


// We put a session token in window.name, as it's the only place to
// keep data that is preserved across reloads and within-site
// navigation. pz2.js picks this up and uses it as part of the
// cookie-name, to ensure we get a new session when we need one.
//
// We want to use different sessions for different windows/tabs (so
// they don't receive each other's messages), different hosts and
// different paths on a host (since in general these will
// authenticate as different libraries). So the window name needs to
// include the hostname and the path from the URL, plus the token.
//
var token;
if (window.name) {
  token = window.name.replace(/.*\//, '');
  mkws.log("Reusing existing window token '" + token + "'");
} else {
  // Incredible that the standard JavaScript runtime doesn't define a
  // unique windowId. Instead, we have to make one up. And since there's
  // no global area shared between windows, the best we can do for
  // ensuring uniqueness is generating a random ID and crossing our
  // fingers.
  //
  // Ten chars from 26 alpha-numerics = 36^10 = 3.65e15 combinations.
  // At one per second, it will take 116 million years to duplicate a token
  token = Math.random().toString(36).slice(2, 12);
  mkws.log("Generated new window token '" + token + "'");
}

window.name = window.location.hostname + window.location.pathname + '/' + token;
mkws.log("Using window.name '" + window.name + "'");


// wrapper to provide local copy of the jQuery object.
(function($) {
  var log = mkws.log;
  var _old2new = { // Maps old-style widget names to new-style
    'Authname': 'auth-name',
    'ConsoleBuilder': 'console-builder',
    'Coverart': 'cover-art',
    'GoogleImage': 'google-image',
    'MOTD': 'motd',
    'MOTDContainer': 'motd-container',
    'Perpage': 'per-page',
    'SearchForm': 'search-form',
    'ReferenceUniverse': 'reference-universe',
    'Termlists': 'facets'
  };
  // Annoyingly, there is no built-in way to invert a hash
  var _new2old = {};
  for (var key in _old2new) {
    if(_old2new.hasOwnProperty(key)) {
      _new2old[_old2new[key]] = key;
    }
  }

  mkws._old2new = _old2new;

  function handleNodeWithTeam(node, callback) {
    // First branch for DOM objects; second branch for jQuery objects
    var classes = node.className || node.attr('class');
    if (!classes) {
      // For some reason, if we try to proceed when classes is
      // undefined, we don't get an error message, but this
      // function and its callers, up several stack level,
      // silently return. What a crock.
      log("handleNodeWithTeam() called on node with no classes");
      return;
    }
    var list = classes.split(/\s+/)
    var teamName, type;

    for (var i = 0; i < list.length; i++) {
      var cname = list[i];
      if (cname.match(/^mkws-team-/)) {
        // New-style teamnames of the form mkws-team-xyz
        teamName = cname.replace(/^mkws-team-/, '');
      } else if (cname.match(/^mkwsTeam_/)) {
        // Old-style teamnames of the form mkwsTeam_xyz
        teamName = cname.replace(/^mkwsTeam_/, '');
      } else if (cname.match(/^mkws-/)) {
        // New-style names of the from mkws-foo-bar
        type = cname.replace(/^mkws-/, '');
      } else if (cname.match(/^mkws/)) {
        // Old-style names of the form mkwsFooBar
        var tmp = cname.replace(/^mkws/, '');
        type = _old2new[tmp] || tmp.toLowerCase();
      }
    }

    // Widgets without a team are on team "AUTO"
    if (!teamName) {
      teamName = "AUTO";
      // Autosearch widgets don't join team AUTO if there is already an
      // autosearch on the team or the team has otherwise gotten a query
      if (node.getAttribute("autosearch")) {
        if (mkws.autoHasAuto ||
            mkws.teams["AUTO"] && mkws.teams["AUTO"].config["query"]) {
          log("AUTO team already has a query, using unique team");
          teamName = "UNIQUE";
        }
        mkws.autoHasAuto = true;
      }
    }

    // Widgets on team "UNIQUE" get a random team
    if (teamName === "UNIQUE") {
      teamName = Math.floor(Math.random() * 100000000).toString();
    }

    callback.call(node, teamName, type);
  }


  function resizePage() {
    var threshhold = mkws.config.responsive_design_width;
    var width = $(window).width();
    var from, to, method;

    if ((mkws.width === undefined || mkws.width > threshhold) &&
        width <= threshhold) {
      from = "wide"; to = "narrow"; method = "hide";
    } else if ((mkws.width === undefined || mkws.width <= threshhold) &&
               width > threshhold) {
      from = "narrow"; to = "wide"; method = "show";
    }
    mkws.width = width;

    if (from) {
      log("changing from " + from + " to " + to + ": " + width);
      for (var tname in mkws.teams) {
        var team = mkws.teams[tname];
        team.visitWidgets(function(t, w) {
          var w1 = team.widget(t + "-container-" + from);
          var w2 = team.widget(t + "-container-" + to);
          if (w1) {
            w1.node.hide();
          }
          if (w2) {
            w2.node.show();
            w.node.appendTo(w2.node);
          }
        });
        team.queue("resize-" + to).publish();
      }
    }
  };


  /*
   * Run service-proxy authentication in background (after page load).
   * The username/password is configured in the apache config file
   * for the site.
   */
  function authenticateSession(auth_url, auth_domain, pp2_url) {
    mkws.authenticating = true;
    log("service proxy authentication on URL: " + auth_url);

    if (!auth_domain) {
      auth_domain = pp2_url.replace(/^(https?:)?\/\/(.*?)\/.*/, '$2');
      log("guessed auth_domain '" + auth_domain + "' from pp2_url '" + pp2_url + "'");
    }

    var request = new pzHttpRequest(auth_url, function(err) {
      alert("HTTP call for authentication failed: " + err)
      return;
    }, auth_domain);

    request.get(null, function(data) {
      mkws.authenticating = false;
      if (!$.isXMLDoc(data)) {
        alert("Service Proxy authentication response is not a valid XML document");
        return;
      }
      var status = $(data).find("status");
      if (status.text() != "OK") {
        var message = $(data).find("message");
        alert("Service Proxy authentication response: " + status.text() + " (" + message.text() + ")");
        return;
      }

      log("service proxy authentication successful");
      mkws.authenticated = true;
      var authName = $(data).find("displayName").text();
      // You'd think there would be a better way to do this:
      var realm = $(data).find("realm:not(realmAttributes realm)").text();
      for (var teamName in mkws.teams) {
        mkws.teams[teamName].queue("authenticated").publish(authName, realm);
      }

      runAutoSearches();
    });
  }


  function runAutoSearches() {
    log("running auto searches");

    for (var teamName in mkws.teams) {
      mkws.teams[teamName].queue("ready").publish();
    }
  }


  function selectorForAllWidgets() {
    if (mkws.config && mkws.config.scan_all_nodes) {
      // This is the old version, which works by telling jQuery to
      // find every node that has a class beginning with "mkws". In
      // theory it should be slower than the class-based selector; but
      // instrumentation suprisingly shows this is consistently
      // faster. It also has the advantage that any widgets of
      // non-registered types are logged as warnings rather than
      // silently ignored.
      return '[class^="mkws"],[class*=" mkws"]';
    } else {
      // This is the new version, which works by looking up the
      // specific classes of all registered widget types and their
      // resize containers. Because all it requires jQuery to do is
      // some hash lookups in pre-built tables, it should be very
      // fast; but it silently ignores widgets of unregistered types.
      var s = "";
      for (var type in mkws.widgetType2function) {
	if (s) s += ',';
	s += '.mkws-' + type;
	s += ',.mkws-' + type + "-container-wide";
	s += ',.mkws-' + type + "-container-narrow";
        // Annoyingly, we also need to recognise old-style names
        var oldtype = _new2old[type] || type.charAt(0).toUpperCase() + type.slice(1);
	s += ',.mkws' + oldtype;
	s += ',.mkws' + oldtype + "-Container-wide";
	s += ',.mkws' + oldtype + "-Container-narrow";
      }
      return s;
    }
  }


  function makeWidgetsWithin(level, node) {
    if (node) var widgetNodes = node.find(selectorForAllWidgets());
    else widgetNodes = $(selectorForAllWidgets());
    // Return false if we parse no widgets
    if (widgetNodes.length < 1) return false;
    widgetNodes.each(function() {
      handleNodeWithTeam(this, function(tname, type) {
        var myTeam = mkws.teams[tname];
        if (!myTeam) {
          myTeam = mkws.teams[tname] = mkws.makeTeam($, tname);
        }

        var oldHTML = this.innerHTML;
        var myWidget = mkws.makeWidget($, myTeam, type, this);
        myTeam.addWidget(myWidget);
        var newHTML = this.innerHTML;
        if (newHTML !== oldHTML) {
          myTeam.log("widget " + type + " HTML changed: reparsing");
          makeWidgetsWithin(level+1, $(this));
        }
      });
    });
    return true;
  }


  // The second "rootsel" parameter is passed to jQuery and is a DOM node
  // or a selector string you would like to constrain the search for widgets to.
  //
  // This function has no side effects if run again on an operating session,
  // even if the element/selector passed causes existing widgets to be reparsed: 
  //
  // (TODO: that last bit isn't true and we currently have to avoid reinitialising
  // widgets, MKWS-261)
  //
  // * configuration is not regenerated
  // * authentication is not performed again
  // * autosearches are not re-run
  mkws.init = function(message, rootsel) {
    var greet = "MKWS initialised";
    if (rootsel) greet += " (limited to " + rootsel + ")"
    if (message) greet += " :: " + message; 
    mkws.log(greet);

    // MKWS is not active until init() has been run against an object with widget nodes.
    // We only set initial configuration when MKWS is first activated.
    if (!mkws.isActive) {
      var widgetSelector = selectorForAllWidgets();
      if ($(widgetSelector).length < 1) {
        mkws.log("no widgets found");
        return;
      }

      // Initial configuration
      mkws.autoHasAuto = false;
      var saved_config;
      if (typeof mkws_config === 'undefined') {
        log("setting empty config");
        saved_config = {};
      } else {
        log("using config: " + $.toJSON(mkws_config));
        saved_config = mkws_config;
      }
      mkws.setMkwsConfig(saved_config);

      for (var key in mkws.config) {
        if (mkws.config.hasOwnProperty(key)) {
          if (key.match(/^language_/)) {
            var lang = key.replace(/^language_/, "");
            // Copy custom languages into list
            mkws.locale_lang[lang] = mkws.config[key];
            log("added locally configured language '" + lang + "'");
          }
        }
      }

      var lang = mkws.getParameterByName("lang") || mkws.config.lang;
      if (!lang || !mkws.locale_lang[lang]) {
        mkws.config.lang = ""
      } else {
        mkws.config.lang = lang;
      }

      log("using language: " + (mkws.config.lang ? mkws.config.lang : "none"));

      // protocol independent link for pazpar2: "//mkws/sp" -> "https://mkws/sp"
      if (mkws.pazpar2_url().match(/^\/\//)) {
        mkws.config.pazpar2_url = document.location.protocol + mkws.config.pazpar2_url;
        log("adjusted protocol independent link to " + mkws.pazpar2_url());
      }

      if (mkws.config.responsive_design_width) {
        // Responsive web design - change layout on the fly based on
        // current screen width. Required for mobile devices.
        $(window).resize(resizePage);
        // initial check after page load
        $(document).ready(resizePage);
      }
    }

    var then = $.now();
    // If we've made no widgets, return without starting an SP session
    // or marking MKWS active.
    if (makeWidgetsWithin(1, rootsel ? $(rootsel) : undefined) === false) {
      return false;
    }
    var now = $.now();

    log("walking MKWS nodes took " + (now-then) + " ms");
    for (var tName in mkws.teams) {
      var myTeam = mkws.teams[tName]
      myTeam.makePz2();
      myTeam.log("made PZ2 object");
      /*
        myTeam.visitWidgets(function(t, w) {
          log("  has widget of type '" + t + "': " + w);
        });
      */
    }

    function sp_auth_url(config) {
      if (config.service_proxy_auth) {
	mkws.log("using pre-baked sp_auth_url '" + config.service_proxy_auth + "'");
	return config.service_proxy_auth;
      } else {
	var s = '//';
	s += config.sp_auth_hostname ? config.sp_auth_hostname : config.pp2_hostname;
	s += '/';
	s += config.sp_auth_path ? config.sp_auth_path : config.pp2_path;
        var q = config.sp_auth_query;
        if (q) {
          s += '?' + q;
        }
	var c = config.sp_auth_credentials;
	if (c) {
	  s += ('&username=' + c.substr(0, c.indexOf('/')) +
		'&password=' + c.substr(c.indexOf('/')+1));
	}
	mkws.log("generated sp_auth_url '" + s + "'");
	return s;
      }
    }

    if (mkws.config.use_service_proxy && !mkws.authenticated && !mkws.authenticating) {
      authenticateSession(sp_auth_url(mkws.config),
                          mkws.config.service_proxy_auth_domain,
                          mkws.pazpar2_url());
    } else if (!mkws.authenticating) {
      // raw pp2 or we have a session already open
      runAutoSearches();
    }
    
    mkws.isActive = true;
    return true;
  };

  $(document).ready(function() {
    if (!window.mkws_noready && !mkws.authenticating && !mkws.active) {
       mkws.init();
    }
  });

})(mkws.$);
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
  that.sortOrder = function() { return m_sortOrder; };
  that.perpage = function() { return m_perpage; };
  that.query = function() { return m_query; };
  that.totalRecordCount = function() { return m_totalRecordCount; };
  that.currentPage = function() { return m_currentPage; };
  that.currentRecordId = function() { return m_currentRecordId; };
  that.currentRecordData = function() { return m_currentRecordData; };
  that.filters = function() { return m_filterSet; };
  that.gotRecords = function() { return m_gotRecords; };

  // Accessor methods for individual widgets: writers
  that.set_sortOrder = function(val) { m_sortOrder = val };
  that.set_perpage = function(val) { m_perpage = val };


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


  function log(s) {
    var now = $.now();
    var timestamp = (((now - m_logTime.start)/1000).toFixed(3) + " (+" +
                     ((now - m_logTime.last)/1000).toFixed(3) + ") ");
    m_logTime.last = now;
    mkws.log(m_teamName + ": " + timestamp + s);
    that.queue("log").publish(m_teamName, timestamp, s);
  }
  that.log = log;


  log("making new widget team");

  m_sortOrder = config.sort_default;
  m_perpage = config.perpage_default;
 
  // pz2.js event handlers:
  function onInit() {
    log("init");
    m_paz.stat();
    m_paz.bytarget();
  }

  function onBytarget(data) {
    log("bytarget");
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
      log("complete");
      queue("complete").publish(hitcount);
    }
  }

  function onTerm(data) {
    log("term");
    queue("facets").publish(data);
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
    log("m_queues=" + $.toJSON(m_queues));
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
      log("setting bytarget callback");
    }
    if (m_queues.stat) {
      params.onstat = onStat;
      log("setting stat callback");
    }
    if (m_queues.facets && config.facets.length) {
      params.onterm = onTerm;
      log("setting term callback");
    }
    if (m_queues.records) {
      log("setting show callback");
      params.onshow = onShow;
      // Record callback is subscribed from records callback
      log("setting record callback");
      params.onrecord = onRecord;
    }

    m_paz = new pz2(params);
    log("created main pz2 object");
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
    m_gotRecords = false;
  }
  that.resetPage = resetPage;


  function newSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery) {
    log("newSearch: " + query);

    if (config.use_service_proxy && !mkws.authenticated) {
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
        alert("can't narrow search by torusquery when not authenticated");
      params.torusquery = torusquery;
    }

    log("triggerSearch(" + m_query + "): filters = " + m_filterSet.toJSON() + ", " +
        "pp2filter = " + pp2filter + ", params = " + $.toJSON(params));

    m_paz.search(m_query, m_perpage, m_sortOrder, pp2filter, undefined, params);
  }

  // fetch record details to be retrieved from the record queue
  that.fetchDetails = function(recId) {
    log("fetchDetails() requesting record '" + recId + "'");
    m_paz.record(recId);
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
    //log('findnode(' + selector + ') found ' + node.length + ' nodes');
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
      mkws.log("Warning: registerTemplate old widget name: " + name + " => " + mkws._old2new[name]);
      name = mkws._old2new[name];
    }
    m_templateText[name] = text;
  };


  function loadTemplate(name, fallbackString) {
    if(mkws._old2new.hasOwnProperty(name)) {
       mkws.log("Warning loadTemplate: old widget name: " + name + " => " + mkws._old2new[name]);
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
        log("compiled template '" + name + "'");
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
      log("No MKWS template for " + name);
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
  }


  return that;
};
// Factory function for sets of filters.
function filterSet(team) {
  var m_team = team;
  var m_list = [];

  var that = {};

  that.toJSON = function() {
    return mkws.$.toJSON(m_list);
  };

  that.add = function(filter) {
    m_list.push(filter);
  };

  that.visitTargets = function(callback) {
    for (var i in m_list) {
      var filter = m_list[i];
      if (filter.type === 'target') {
        callback(filter.id, filter.name);
      }
    }
  };

  that.visitFields = function(callback) {
    for (var i in m_list) {
      var filter = m_list[i];
      if (filter.type === 'field') {
        callback(filter.field, filter.value);
      }
    }
  };

  that.visitCategories = function(callback) {
    for (var i in m_list) {
      var filter = m_list[i];
      if (filter.type === 'category') {
        callback(filter.id);
      }
    }
  };

  that.removeMatching = function(matchFn) {
    var newList = [];
    for (var i in m_list) {
      var filter = m_list[i];
      if (matchFn(filter)) {
        m_team.log("removeMatching: removing filter " + mkws.$.toJSON(filter));
      } else {
        m_team.log("removeMatching: keeping filter " + mkws.$.toJSON(filter));
        newList.push(filter);
      }
    }
    m_list = newList;
  };

  that.targetFiltered = function(id) {
    for (var i = 0; i < m_list.length; i++) {
      if (m_list[i].type === 'target' ||
          m_list[i].id === 'pz:id=' + id) {
        return true;
      }
    }
    return false;
  };

  that.pp2filter = function() {
    var res = "";

    that.visitTargets(function(id, name) {
      if (res) res += ",";
      if (id.match(/^[a-z:]+[=~]/)) {
        m_team.log("filter '" + id + "' already begins with SETTING OP");
      } else {
        id = 'pz:id=' + id;
      }
      res += id;
    });

    return res;
  };

  that.pp2limit = function(initial) {
    var res = initial || "";

    that.visitFields(function(field, value) {
      if (res) res += ",";
      res += field + "=" + value.replace(/[\\|,]/g, '\\$&');
    });
    return res;
  }

  that.pp2catLimit = function() {
    var res = "";

    that.visitCategories(function(id) {
      if (res) res += ",";
      res += "category~" + id.replace(/[\\|,]/g, '\\$&');
    });
    return res;
  }

  return that;
}


// Factory functions for filters. These can be of several types.
function targetFilter(id, name) {
  return {
    type: 'target',
    id: id,
    name: name
  };
}

function fieldFilter(field, value) {
  return {
    type: 'field',
    field: field,
    value: value
  };
}

function categoryFilter(id) {
  return {
    type: 'category',
    id: id
  };
}
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

  function log(s) {
    team.log(s);
  }
  that.log = log;

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
        log(this + " copied property " + name + "='" + attrs[name] + "' to " + type + " subwidget");
      }
    }
    
    for (var name in overrides) {
      log(this + " overrode property " + name + "='" + overrides[name] + "' (was '" + attrs[name] + "') for " + type + " subwidget");
      attrs[name] = overrides[name];
    }

    if (defaults) {
      for (var name in defaults) {
        if (!attrs[name]) {
          attrs[name] = defaults[name];
          log(this + " fell back to default property " + name + "='" + attrs[name] + "' for " + type + " subwidget");
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
      log("obtained val '" + val + "' from param '" + param + "'");
      if (!val) {
        alert("This page has a MasterKey widget that needs a val specified by the '" + param + "' parameter");
      }
    } else if (val.match(/^!path!/)) {
      var index = val.replace(/^!path!/, '');
      var path = window.location.pathname.split('/');
      val = path[path.length - index];
      log("obtained val '" + val + "' from path-component '" + index + "'");
      if (!val) {
        alert("This page has a MasterKey widget that needs a val specified by the path-component " + index);
      }
    } else if (val.match(/^!var!/)) {
      var name = val.replace(/^!var!/, '');
      val = window[name]; // It's ridiculous that this works
      log("obtained val '" + val + "' from variable '" + name + "'");
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
      log(node + ": parsing config fragment '" + val + "'");
      var data;
      try {
        data = $.parseJSON(val);
        for (var key in data) {
          log(node + ": adding config element " + key + "='" + data[key] + "'");
          that.config[key] = data[key];
        }
      } catch (err) {
        alert("Can't parse " + node + " data-mkws-config as JSON: " + val);
      }
    } else if (a.name.match (/^data-mkws-/)) {
      var name = a.name.replace(/^data-mkws-/, '')
      that.config[name] = val;
      log(that + ": set data-mkws attribute " + name + "='" + val + "'");
    } else if (!ignoreAttrs[a.name]) {
      that.config[a.name] = val;
      log(that + ": set regular attribute " + a.name + "='" + val + "'");
    }
  }

  var fn = mkws.promotionFunction(type);
  if (fn) {
    fn.call(that);
    log("made " + type + " widget(node=" + node + ")");
  } else if (type.match(/-Container-(narrow|wide)$/)) {
    // Not really a widget: no need to log its lack of promotion
  } else {
    log("made UNPROMOTED widget(type=" + type + ", node=" + node + ")");
  }

  return that;
};
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
      cur.id = data[i].id;
      cur.hits = data[i].hits;
      cur.diagnostic = data[i].diagnostic;
      cur.message = data[i].message;
      cur.records = data[i].records;
      cur.state = data[i].state;
      cleandata.push(cur);
    }

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

  this.team.queue("records").subscribe(function(data) {
    for (var i = 0; i < data.hits.length; i++) {
      var hit = data.hits[i];
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
    var tdata = $.extend({}, {"hits": data.hits}, that.config.template_vars);
    that.node.html(template(tdata, {"partials":{"summary":summaryPartial}}));
  });

  that.autosearch();
});


mkws.registerWidgetType('navi', function() {
  var that = this;
  var teamName = this.team.name();

  this.team.queue("navi").subscribe(function() {
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
  this.log("making sort, sortOrder = '" + order + "'");
  for (var i = 0; i < this.config.sort_options.length; i++) {
    var cur = {};
    var opt = this.config.sort_options[i];
    cur.key = opt[0];
    cur.label = opt.length == 1 ? opt[0] : opt[1];
    if (order == cur.key || order == cur.label) cur.selected = true;
    output.sort.push(cur);
  }

  var perpage = this.team.perpage();
  this.log("making perpage, perpage = " + perpage);
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

  this.log("language menu: " + list.join(", "));

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
      this.log(this + " copied property " + name + "='" + c[name] + "' up to team");
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


// Some elements have mkws* classes that makes them appear as widgets
// -- for example, because we want to style them using CSS -- but have
// no actual functionality. We register these to prevent ignorable
// warnings when they occur.

mkws.registerWidgetType('query', function() {});
mkws.registerWidgetType('motd-container', function() {});
mkws.registerWidgetType('button', function() {});


})(mkws.$); // jQuery wrapper
mkws.registerWidgetType('facets', function() {
  // Initially hide the facets; display when we get results
  var that = this;
  var team = this.team;
  team.queue("facets").subscribe(function(data) {
    that.node.addClass("active");
  });

  var template = team.loadTemplate(this.config.template || "facets");
  this.node.html(template({
    team: team.name(),
    facets: this.config.facets
  }));
  this.autosearch();
});


mkws.registerWidgetType('facet', function() {
  var facetConfig = {
    xtargets: [ "Sources",  16, false ],
    subject:  [ "Subjects", 10, true ],
    author:   [ "Authors",  10, true ]
  }
  var that = this;
  var team = this.team;
  var name = that.config.facet;
  var ref = facetConfig[name] || [ "Unknown", 10, true ];
  var caption = this.config['facet_caption_' + name] || ref[0];
  var max     = parseInt(this.config['facet_max_' + name] || ref[1]);
  var pzIndex = ref[2] ? name : null;

  that.toString = function() {
    return '[Widget ' + team.name() + ':' + that.type + '(' + name + ')]';
  };

  team.queue("facets").subscribe(function(data) {
    data = data[name];
    var terms = [];
    var teamName = team.name();
    for (var i = 0; i < data.length && i < max; i++) {
      var linkdata = "";
      var action = "";
      if (!pzIndex) {
        // Special case: target selection
        linkdata += ('target_id='+data[i].id+' ');
        if (!team.targetFiltered(data[i].id)) {
          action = 'mkws.limitTarget(\'' + teamName + '\', this.getAttribute(\'target_id\'),this.firstChild.nodeValue)';
        }
      } else {
        action = 'mkws.limitQuery(\'' + teamName + '\', \'' + pzIndex + '\', this.firstChild.nodeValue)';
      }
      linkdata += 'onclick="' + action + ';return false;"';
      terms.push({
        term: data[i].name,
        field: data[i].id,
        count: data[i].freq,
        linkdata: linkdata
      }); 
    }
    // configured template > facet specific template > default facet template
    var template;
    if (that.config.template) {
      template = team.loadTemplate(that.config.template);
    } else {
      template = team.loadTemplate("facet-" + name);
      if (template) {
        that.log("Using facet-" + name + " template.")
      } else {
        that.log("No " + name + " specific template, using default.")
        template = team.loadTemplate("facet");
      }
    }
    that.node.html(template({
      name: name,
      caption: caption,
      query: that.config.query,
      terms: terms
    }));
  });
  this.autosearch();
});
mkws.registerWidgetType('auth-name', function() {
  var that = this;

  this.team.queue("authenticated").subscribe(function(authName) {
    that.node.html(authName);
  });
});
mkws.registerWidgetType('categories', function() {
  var that = this;

  if (!mkws.authenticated) {
    alert("can't use categories widget when not authenticated");
    return;
  }

  this.team.queue("authenticated").subscribe(function(authName, realm) {
    var req = new pzHttpRequest(mkws.pazpar2_url() + "?command=categories", function(err) {
      alert("HTTP call for categories failed: " + err)
    });

    req.get(null, function(data) {
      if (!$.isXMLDoc(data)) {
        alert("categories response document is not XML");
        return;
      }
      that.log("got categories: " + data);

      var text = [];
      text.push("Select category: ");
      text.push("<select name='mkws-category mkwsCategory' " +
                "onchange='mkws.limitCategory(\"" + that.team.name() + "\", this.value)'>");
      text.push("<option value=''>[All]</option>");
      $(data).find('category').each(function() {
        var name = $(this).find('categoryName').text();
        var id = $(this).find('categoryId').text();
        text.push("<option value='", id, "'>", name, "</option>");
      });
      text.push("</select>");
      that.node.html(text.join(''));
    });
  });
});
mkws.registerWidgetType('log', function() {
  var that = this;

  this.team.queue("log").subscribe(function(teamName, timestamp, message) {
    that.node.append(teamName + ": " + timestamp + message + "<br/>");
  });
});
// A widget for a record-list of a single record
mkws.registerWidgetType('record', function() {
  if (!this.config.maxrecs) this.config.maxrecs = 1;
  var that = this;
  var team = this.team;
  team.queue("records").subscribe(function(data) {
    var template = team.loadTemplate(that.config.template || "details");
    var targs = mkws.$.extend({}, data.hits[0], that.config.template_vars);
    that.node.html(template(targs));
  });
  that.autosearch();
});

mkws.registerWidgetType('images', function() {
  mkws.promotionFunction('records').call(this);
  if (!this.config.template) this.config.template = 'images';
});

mkws.registerWidgetType('google-image', function() {
  mkws.promotionFunction('images').call(this);
  if (!this.config.target) this.config.target = 'Google_Images';
});

mkws.registerWidgetType('lolcat', function() {
  mkws.promotionFunction('google-image').call(this);
  if (!this.config.autosearch) this.config.autosearch = 'kitteh';
});

mkws.registerWidgetType('cover-art', function() {
  mkws.promotionFunction('images').call(this);
  if (!this.config.target) this.config.target = 'AmazonBooks';
});
mkws.registerWidgetType('reference', function() {
  mkws.promotionFunction('record').call(this);
  if (!this.config.target) this.config.target = 'wikimedia_wikipedia_single_result';
  if (!this.config.template) this.config.template = 'reference';
  this.config.template_vars.paragraphs = this.config.paragraphs || 0;
  this.config.template_vars.sentences = this.config.sentences || 0;
});
mkws.registerWidgetType('builder', function() {
  var that = this;
  var team = this.team;

  var button = mkws.$('<button/>', {
    type: 'button',
    text: this.config.text || "Build!"
  });
  this.node.append(button);
  button.click(function() {
    var   query = team.widget('query').value();
    var    sort = team.widget('sort').value();
    var perpage = team.widget('per-page').value();

    var html = ('<div class="mkws-records mkwsRecords" ' +
                'autosearch="' + query + '" ' +
                'sort="' + sort + '" ' +
                'perpage="' + perpage + '"></div>');
    var fn = that.callback || alert;
    fn(html);
  });
});

mkws.registerWidgetType('console-builder', function() {
  mkws.promotionFunction('builder').call(this);
  this.callback = function(s) {
    console.log("generated widget: " + s);
  }
});
(function() {
  var template = Handlebars.template, templates = mkws.defaultTemplates = mkws.defaultTemplates || {};
templates['details'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        ("
    + escapeExpression(((helper = (helper = helpers['md-title-remainder'] || (depth0 != null ? depth0['md-title-remainder'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-title-remainder","hash":{},"data":data}) : helper)))
    + ")\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <i>"
    + escapeExpression(((helper = (helper = helpers['md-title-responsibility'] || (depth0 != null ? depth0['md-title-responsibility'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-title-responsibility","hash":{},"data":data}) : helper)))
    + "</i>\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "  <tr>\n    <th>"
    + escapeExpression(((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Date", {"name":"mkws-translate","hash":{},"data":data})))
    + "</th>\n    <td>"
    + escapeExpression(((helper = (helper = helpers['md-date'] || (depth0 != null ? depth0['md-date'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-date","hash":{},"data":data}) : helper)))
    + "</td>\n  </tr>\n";
},"7":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "  <tr>\n    <th>"
    + escapeExpression(((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Author", {"name":"mkws-translate","hash":{},"data":data})))
    + "</th>\n    <td>"
    + escapeExpression(((helper = (helper = helpers['md-author'] || (depth0 != null ? depth0['md-author'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-author","hash":{},"data":data}) : helper)))
    + "</td>\n  </tr>\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <tr>\n    <th>"
    + escapeExpression(((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Links", {"name":"mkws-translate","hash":{},"data":data})))
    + "</th>\n    <td>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0['md-electronic-url'] : depth0), {"name":"each","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </td>\n  </tr>\n";
},"10":function(depth0,helpers,partials,data) {
  var helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "        <a href=\""
    + escapeExpression(lambda(depth0, depth0))
    + "\">Link"
    + escapeExpression(((helper = (helper = helpers['mkws-index1'] || (depth0 != null ? depth0['mkws-index1'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"mkws-index1","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"12":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <tr>\n    <th>"
    + escapeExpression(((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Subject", {"name":"mkws-translate","hash":{},"data":data})))
    + "</th>\n    <td>\n";
  stack1 = ((helpers['mkws-first'] || (depth0 && depth0['mkws-first']) || helperMissing).call(depth0, (depth0 != null ? depth0.location : depth0), {"name":"mkws-first","hash":{
    'having': ("md-subject")
  },"fn":this.program(13, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </td>\n  </tr>\n";
},"13":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-subject'] : depth0), {"name":"if","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"14":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers['mkws-commaList'] || (depth0 && depth0['mkws-commaList']) || helperMissing).call(depth0, (depth0 != null ? depth0['md-subject'] : depth0), {"name":"mkws-commaList","hash":{},"fn":this.program(15, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"15":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(lambda(depth0, depth0));
},"17":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        "
    + escapeExpression(((helpers['mkws-attr'] || (depth0 && depth0['mkws-attr']) || helperMissing).call(depth0, "@name", {"name":"mkws-attr","hash":{},"data":data})));
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "<table>\n  <tr>\n    <th>"
    + escapeExpression(((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Title", {"name":"mkws-translate","hash":{},"data":data})))
    + "</th>\n    <td>\n      "
    + escapeExpression(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-title","hash":{},"data":data}) : helper)))
    + "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-title-remainder'] : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-title-responsibility'] : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </td>\n  </tr>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-date'] : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-author'] : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-electronic-url'] : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers['mkws-if-any'] || (depth0 && depth0['mkws-if-any']) || helperMissing).call(depth0, (depth0 != null ? depth0.location : depth0), {"name":"mkws-if-any","hash":{
    'having': ("md-subject")
  },"fn":this.program(12, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "  <tr>\n    <th>"
    + escapeExpression(((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Locations", {"name":"mkws-translate","hash":{},"data":data})))
    + "</th>\n    <td>\n";
  stack1 = ((helpers['mkws-commaList'] || (depth0 && depth0['mkws-commaList']) || helperMissing).call(depth0, (depth0 != null ? depth0.location : depth0), {"name":"mkws-commaList","hash":{},"fn":this.program(17, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n    </td>\n  </tr>\n</table>\n";
},"useData":true});
templates['done'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Search complete: found", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " "
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + " ";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "records", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n";
},"useData":true});
templates['facet'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <div class=\"mkws-term mkwsTerm\">\n    <a href=\"#\" ";
  stack1 = ((helper = (helper = helpers.linkdata || (depth0 != null ? depth0.linkdata : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"linkdata","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">"
    + escapeExpression(((helper = (helper = helpers.term || (depth0 != null ? depth0.term : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"term","hash":{},"data":data}) : helper)))
    + "</a> <span>"
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "\n<div class=\"mkws-facet-title mkwsFacetTitle\">"
    + escapeExpression(((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"caption","hash":{},"data":data}) : helper)))
    + "</div>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.terms : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['facets'] = template({"1":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <div class=\"mkws-facet mkwsFacet mkws-team-"
    + escapeExpression(lambda((depths[1] != null ? depths[1].team : depths[1]), depth0))
    + "\" data-mkws-facet=\""
    + escapeExpression(lambda(depth0, depth0))
    + "\"></div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.facets : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true,"useDepths":true});
templates['images'] = template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <a href=\"#\" id=\""
    + escapeExpression(((helper = (helper = helpers.detailLinkId || (depth0 != null ? depth0.detailLinkId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"detailLinkId","hash":{},"data":data}) : helper)))
    + "\" onclick=\""
    + escapeExpression(((helper = (helper = helpers.detailClick || (depth0 != null ? depth0.detailClick : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"detailClick","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = ((helpers['mkws-first'] || (depth0 && depth0['mkws-first']) || helperMissing).call(depth0, (depth0 != null ? depth0['md-thumburl'] : depth0), {"name":"mkws-first","hash":{},"fn":this.program(2, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    <br/>\n  </a>\n";
},"2":function(depth0,helpers,partials,data,depths) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "      <img src=\""
    + escapeExpression(lambda(depth0, depth0))
    + "\" alt=\""
    + escapeExpression(lambda((depths[1] != null ? depths[1]['md-title'] : depths[1]), depth0))
    + "\"/>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.hits : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true,"useDepths":true});
templates['lang'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.selected : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers.unless.call(depth0, (data && data.last), {"name":"unless","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<span>"
    + escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"code","hash":{},"data":data}) : helper)))
    + "</span>";
},"4":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<a href=\"";
  stack1 = ((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">"
    + escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"code","hash":{},"data":data}) : helper)))
    + "</a>";
},"6":function(depth0,helpers,partials,data) {
  return "    |\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.languages : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"useData":true});
templates['navi'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "  ";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, (depth0 != null ? depth0.facet : depth0), {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += ": <a class=\"mkws-removable mkwsRemovable\" href=\"#\" onclick=\"";
  stack1 = ((helper = (helper = helpers.click || (depth0 != null ? depth0.click : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"click","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "</a>\n  ";
  stack1 = helpers.unless.call(depth0, (data && data.last), {"name":"unless","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"2":function(depth0,helpers,partials,data) {
  return "|";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.filters : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"useData":true});
templates['pager'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <a href=\"#\" class=\"mkws-prev mkwsPrev\" onclick=\""
    + escapeExpression(((helper = (helper = helpers.prevClick || (depth0 != null ? depth0.prevClick : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"prevClick","hash":{},"data":data}) : helper)))
    + "\">&#60;&#60; ";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Prev", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a> |\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "    <span class=\"mkws-prev mkwsPrev\">&#60;&#60; ";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Prev", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span> |\n";
},"5":function(depth0,helpers,partials,data) {
  return "...";
  },"7":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.click : depth0), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.program(10, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"8":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <a href=\"#\" onclick=\""
    + escapeExpression(((helper = (helper = helpers.click || (depth0 != null ? depth0.click : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"click","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"number","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"10":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <span class=\"mkws-current-page mkwsCurrentPage\">"
    + escapeExpression(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"number","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"12":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    | <a href=\"#\" class=\"mkws-next mkwsNext\" onclick=\""
    + escapeExpression(((helper = (helper = helpers.nextClick || (depth0 != null ? depth0.nextClick : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"nextClick","hash":{},"data":data}) : helper)))
    + "\">";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Next", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + " &#62;&#62;</a>\n";
},"14":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "    | <span class=\"mkws-next mkwsNext\">";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Next", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + " &#62;&#62;</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "<div style=\"float: right\">\n  "
    + escapeExpression(((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Displaying", {"name":"mkws-translate","hash":{},"data":data})))
    + ":\n  "
    + escapeExpression(((helper = (helper = helpers.first || (depth0 != null ? depth0.first : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"first","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "to", {"name":"mkws-translate","hash":{},"data":data})))
    + " "
    + escapeExpression(((helper = (helper = helpers.last || (depth0 != null ? depth0.last : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"last","hash":{},"data":data}) : helper)))
    + "\n  "
    + escapeExpression(((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "of", {"name":"mkws-translate","hash":{},"data":data})))
    + " "
    + escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"count","hash":{},"data":data}) : helper)))
    + " (";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "found", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += ": "
    + escapeExpression(((helper = (helper = helpers.found || (depth0 != null ? depth0.found : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"found","hash":{},"data":data}) : helper)))
    + ")\n</div>\n\n<div style=\"float: clear\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.prevClick : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.morePrev : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.pages : depth0), {"name":"each","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.moreNext : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.nextClick : depth0), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.program(14, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"useData":true});
templates['progress'] = template({"1":function(depth0,helpers,partials,data) {
  return "&#x2588;";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "<span class=\"mkws-waiting mkws-waiting mkwsWaiting\">";
  stack1 = ((helpers['mkws-repeat'] || (depth0 && depth0['mkws-repeat']) || helperMissing).call(depth0, (depth0 != null ? depth0.waiting : depth0), {"name":"mkws-repeat","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "<span class=\"mkws-done mkws-done mkwsDone\">";
  stack1 = ((helpers['mkws-repeat'] || (depth0 && depth0['mkws-repeat']) || helperMissing).call(depth0, (depth0 != null ? depth0.done : depth0), {"name":"mkws-repeat","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span>";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.waiting : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['ranking'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Sort by", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    <select class=\"mkws-sort mkwsSort mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.sort : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </select>";
},"2":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.selected : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "          <option value=\"";
  stack1 = ((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"key","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" selected=\"selected\">";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, (depth0 != null ? depth0.label : depth0), {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</option>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "          <option value=\""
    + escapeExpression(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"key","hash":{},"data":data}) : helper)))
    + "\">";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, (depth0 != null ? depth0.label : depth0), {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</option>\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = "    ";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "and show", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    <select class=\"mkws-perpage mkwsPerpage mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.perPage : depth0), {"name":"each","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </select>\n    ";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "per page", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"8":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.selected : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"9":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "          <option value=\""
    + escapeExpression(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"perPage","hash":{},"data":data}) : helper)))
    + "\" selected=\"selected\">"
    + escapeExpression(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"perPage","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"11":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "          <option value=\""
    + escapeExpression(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"perPage","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"perPage","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<form>";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.showSort : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.showPerPage : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</form>\n\n";
},"useData":true});
templates['records'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "  <div class=\""
    + escapeExpression(((helper = (helper = helpers.containerClass || (depth0 != null ? depth0.containerClass : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"containerClass","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = this.invokePartial(partials.summary, '    ', 'summary', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.hits : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"usePartial":true,"useData":true});
templates['reference'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<b>"
    + escapeExpression(((helper = (helper = helpers['md-title-remainder'] || (depth0 != null ? depth0['md-title-remainder'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-title-remainder","hash":{},"data":data}) : helper)))
    + "</b>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<i>"
    + escapeExpression(((helper = (helper = helpers['md-title-responsibility'] || (depth0 != null ? depth0['md-title-responsibility'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-title-responsibility","hash":{},"data":data}) : helper)))
    + "</i>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<img src=\""
    + escapeExpression(((helper = (helper = helpers['md-thumburl'] || (depth0 != null ? depth0['md-thumburl'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-thumburl","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + escapeExpression(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-title","hash":{},"data":data}) : helper)))
    + "\">\n<h1><a href=\""
    + escapeExpression(((helper = (helper = helpers['md-electronic-url'] || (depth0 != null ? depth0['md-electronic-url'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-electronic-url","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-title","hash":{},"data":data}) : helper)))
    + "</a></h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-title-remainder'] : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-title-responsibility'] : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers['mkws-paragraphs'] || (depth0 && depth0['mkws-paragraphs']) || helperMissing).call(depth0, (depth0 != null ? depth0['md-description'] : depth0), (depth0 != null ? depth0.paragraphs : depth0), (depth0 != null ? depth0.sentences : depth0), {"name":"mkws-paragraphs","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n<p class=\"mkws-credit mkwsCredit\">Wikipedia</p>\n";
},"useData":true});
templates['results'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<table width=\"100%\" border=\"0\" cellpadding=\"6\" cellspacing=\"0\">\n  <tr>\n    <td class=\"mkws-facets-container-wide mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\" width=\"250\" valign=\"top\">\n      <div class=\"mkws-facets mkwsTermlists mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </td>\n    <td class=\"mkws-motd-container mkwsMOTDContainer mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\" valign=\"top\">\n      <div class=\"mkws-ranking mkwsRanking mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n      <div class=\"mkws-pager mkwsPager mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n      <div class=\"mkws-navi mkwsNavi mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n      <div class=\"mkws-records mkwsRecords mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </td>\n  </tr>\n  <tr>\n    <td colspan=\"2\">\n      <div class=\"mkws-facets-container-narrow mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </td>\n  </tr>\n</table>\n\n";
},"useData":true});
templates['search'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<form name=\"mkws-search-form\" class=\"mkws-search-form mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\" action=\"\">\n  <input class=\"mkws-query mkws-query mkwsQuery mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\" type=\"text\"/>\n  <input class=\"mkws-button mkws-button mkwsButton mkws-team-"
    + escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"team","hash":{},"data":data}) : helper)))
    + "\" type=\"submit\" value=\"";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Search", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\"/>\n</form>\n\n";
},"useData":true});
templates['stat'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, buffer = " -- <span class=\"mkws-client-count mkwsClientCount\">";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Active clients", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " : "
    + escapeExpression(((helper = (helper = helpers.activeclients || (depth0 != null ? depth0.activeclients : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"activeclients","hash":{},"data":data}) : helper)))
    + "/"
    + escapeExpression(((helper = (helper = helpers.clients || (depth0 != null ? depth0.clients : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"clients","hash":{},"data":data}) : helper)))
    + "</span> -- ";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Retrieved records", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + " : "
    + escapeExpression(((helper = (helper = helpers.records || (depth0 != null ? depth0.records : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"records","hash":{},"data":data}) : helper)))
    + "/"
    + escapeExpression(((helper = (helper = helpers.hits || (depth0 != null ? depth0.hits : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hits","hash":{},"data":data}) : helper)))
    + "\n";
},"useData":true});
templates['summary'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "  <a class=\"mkws-field-thumb\" href=\"#\" onclick=\""
    + escapeExpression(((helper = (helper = helpers.detailClick || (depth0 != null ? depth0.detailClick : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"detailClick","hash":{},"data":data}) : helper)))
    + "\">\n    <img src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0['md-thumburl'] : depth0)) != null ? stack1['0'] : stack1), depth0))
    + "\"/>\n  </a>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <span class=\"mkws-field-title-remainder\">"
    + escapeExpression(((helper = (helper = helpers['md-title-remainder'] || (depth0 != null ? depth0['md-title-remainder'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-title-remainder","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <span class=\"mkws-field-author\">"
    + escapeExpression(((helper = (helper = helpers['md-author'] || (depth0 != null ? depth0['md-author'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-author","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-title-responsibility'] : depth0), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"8":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <span class=\"mkws-field-author\">"
    + escapeExpression(((helper = (helper = helpers['md-title-responsibility'] || (depth0 != null ? depth0['md-title-responsibility'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-title-responsibility","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"10":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <div class=\"mkws-field-description\">"
    + escapeExpression(((helper = (helper = helpers['md-description'] || (depth0 != null ? depth0['md-description'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-description","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"12":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <span class=\"mkws-field-date\">"
    + escapeExpression(((helper = (helper = helpers['md-date'] || (depth0 != null ? depth0['md-date'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-date","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"14":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "  ";
  stack1 = ((helper = (helper = helpers.renderedDetails || (depth0 != null ? depth0.renderedDetails : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"renderedDetails","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-thumburl'] : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "<div class=\"mkws-field-data\">\n  <span class=\"mkws-field-title\">\n  <a href=\"#\" id=\""
    + escapeExpression(((helper = (helper = helpers.detailLinkId || (depth0 != null ? depth0.detailLinkId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"detailLinkId","hash":{},"data":data}) : helper)))
    + "\" onclick=\""
    + escapeExpression(((helper = (helper = helpers.detailClick || (depth0 != null ? depth0.detailClick : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"detailClick","hash":{},"data":data}) : helper)))
    + "\">\n    "
    + escapeExpression(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"md-title","hash":{},"data":data}) : helper)))
    + "\n  </a>\n  </span>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-title-remainder'] : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-author'] : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-description'] : depth0), {"name":"if","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['md-date'] : depth0), {"name":"if","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.renderedDetails : depth0), {"name":"if","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
templates['switch'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<a href=\"#\" onclick=\"";
  stack1 = ((helper = (helper = helpers.recordClick || (depth0 != null ? depth0.recordClick : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"recordClick","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Records", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</a>\n<span>|</span>\n<a href=\"#\" onclick=\"";
  stack1 = ((helper = (helper = helpers.targetClick || (depth0 != null ? depth0.targetClick : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"targetClick","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Targets", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n";
},"useData":true});
templates['targets'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <tr>\n      <td>";
  stack1 = ((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</td>\n      <td>"
    + escapeExpression(((helper = (helper = helpers.hits || (depth0 != null ? depth0.hits : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hits","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.message : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </td>\n      <td>"
    + escapeExpression(((helper = (helper = helpers.records || (depth0 != null ? depth0.records : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"records","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + escapeExpression(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"state","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "         "
    + escapeExpression(((helper = (helper = helpers.diagnostic || (depth0 != null ? depth0.diagnostic : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"diagnostic","hash":{},"data":data}) : helper)))
    + " ("
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + ")\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "<table>\n  <thead>\n    <tr>\n      <td>";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Target ID", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</td>\n      <td>";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Hits", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</td>\n      <td>";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Diags", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</td>\n      <td>";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "Records", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</td>\n      <td>";
  stack1 = ((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helperMissing).call(depth0, "State", {"name":"mkws-translate","hash":{},"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</td>\n      </td>\n    </tr>\n  </thead>\n  <tbody>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </tbody>\n</table>\n";
},"useData":true});
})();/* generic function to open results in a popup window
 *
 */

//"use strict";
// $(document).ready(function () {
mkws.registerWidgetType('popup', function() {
    var $ = mkws.$;
    var debug = this.log;
    debug("init popup window");

    var popup_window = $(this.node);
    // var popup_window = $(".mkws-popup mkwsPopup"); // $(document).ready()
    if (!popup_window) {
        debug("no popup found, skip...");
        return;
    } else {
        debug("number of popup windows found: " + popup_window.length);
    }

    if (!$.ui) {
        alert("Error: jquery-ui.js is missing, did you include it after jQuery core in the HTML file?");
        return;
    }

    // more than one widget on a page are possible
    popup_window.each(function(i) {
        var that = $(this);

        // all atributes are strings, convert them to integers here
        var width = parseInt(that.attr("popup_width") || "800");
        var height = parseInt(that.attr("popup_height") || "600");
        var autoOpen = parseInt(that.attr("popup_autoOpen") || "0");
        var modal = parseInt(that.attr("popup_modal") || "0");

        debug("Popup parameters: width: " + width + ", height: " + height + ", autoOpen: " + autoOpen);
        that.dialog({
            closeOnEscape: true,
            autoOpen: autoOpen,
            height: height,
            width: width,
            modal: modal ? true : false,
            resizable: true,
            buttons: {
                Cancel: function() {
                    that.dialog("close");
                }
            },
            close: function() {}
        });

        // open at search query submit: "input.mkws-button mkwsButton"
        var id_botton = that.attr("popup_button");
        if (id_botton) {
            $(id_botton).button().click(function() {
                that.dialog("open");
            });
        }
    });
});

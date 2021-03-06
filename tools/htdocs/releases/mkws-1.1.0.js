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

Handlebars.registerHelper('mkws-indexplus', function(delta, obj) {
  return obj.data.index + delta;
});

Handlebars.registerHelper('mkws-repeat', function(count, options) {
  var out = "";
  for (var i = 0; i < count; i++) {
    out += options.fn(this);
  }
  return out;
});

// Ridiculous that Handlebars has no way to do "or"
Handlebars.registerHelper('mkws-if-either', function(cond1, cond2, options) {
  if (typeof cond1 === 'function') { cond1 = cond1.call(this); }
  if (typeof cond2 === 'function') { cond2 = cond2.call(this); }

  if (cond1 || cond2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// Ridiculous that this, too, is not part of regular Handlebars
// This code is by Mike Griffin, taken from this blog comment:
//      http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/#comment-44

Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {
  var operators, result;

  if (arguments.length < 3) {
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }

  if (options === undefined) {
    options = rvalue;
    rvalue = operator;
    operator = "===";
  }

  operators = {
    '==': function (l, r) { return l == r; },
    '===': function (l, r) { return l === r; },
    '!=': function (l, r) { return l != r; },
    '!==': function (l, r) { return l !== r; },
    '<': function (l, r) { return l < r; },
    '>': function (l, r) { return l > r; },
    '<=': function (l, r) { return l <= r; },
    '>=': function (l, r) { return l >= r; },
    'typeof': function (l, r) { return typeof l == r; },
    'matches': function (l, r) { return l.match(r); }
  };

  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }

  result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
/*! MKWS, the MasterKey Widget Set.
 *  Copyright (C) 2013-2015 Index Data
 *  See the file LICENSE for details
 */

"use strict";


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
  logger: undefined,
  log_level: "info",
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
      "Location": "Bestand",
      "Locations": "Bestand",
      "Records": "Datens&auml;tze",
      "Targets": "Datenbanken",
      "State": "Status",
      "relevance": "Relevanz",
      "title": "Titel",
      "newest": "Neueste",
      "oldest": "&Auml;lteste",

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
      "Locations": "Lokationer",
      "Records": "Poster",
      "Targets": "Baser",
      "State": "Status",
      "relevance": "Relevans",
      "title": "Titel",
      "newest": "Nyeste",
      "oldest": "Ældste",

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

// It's ridiculous that JSNLog doesn't provide this
mkws.stringToLevel = function(s) {
  if (s === 'trace') {
    return JL.getTraceLevel();
  } else if (s === 'debug') {
    return JL.getDebugLevel();
  } else if (s === 'info') {
    return JL.getInfoLevel();
  } else if (s === 'warn') {
    return JL.getWarnLevel();
  } else if (s === 'error') {
    return JL.getErrorLevel();
  } else if (s === 'fatal') {
    return JL.getFatalLevel();
  } else {
    throw "bad log-level '" + s + "'";
  }
}

mkws.logger = JL('mkws');
var consoleAppender = JL.createConsoleAppender('consoleAppender');
mkws.logger.setOptions({ "appenders": [consoleAppender] });


function _log() {
  var argsAsARealArray = Array.prototype.slice.call(arguments);
  var fn = argsAsARealArray.shift();
  fn.apply(mkws.logger, argsAsARealArray);
};
mkws.trace = function(x) { _log(mkws.logger.trace, x) };
mkws.debug = function(x) { _log(mkws.logger.debug, x) };
mkws.info = function(x) { _log(mkws.logger.info, x) };
mkws.warn = function(x) { _log(mkws.logger.warn, x) };
mkws.error = function(x) { _log(mkws.logger.error, x) };
mkws.fatal = function(x) { _log(mkws.logger.fatal, x) };


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
      mkws.warn("registerWidgetType old widget name: " + name + " => " + mkws._old2new[name]);
      name = mkws._old2new[name];
  }

  mkws.widgetType2function[name] = fn;
  mkws.info("registered widget-type '" + name + "'");
};

mkws.aliasWidgetType = function(newName, oldName) {
  mkws.widgetType2function[newName] = mkws.widgetType2function[oldName];
  mkws.info("aliased widget-type '" + newName + "' to '" + oldName + "'");

};

mkws.promotionFunction = function(name) {
  return mkws.widgetType2function[name];
};


mkws.setMkwsConfig = function(overrides) {
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

mkws.limitMultipleTargets = function(tname, idsAndNames) {
  mkws.teams[tname].limitMultipleTargets(idsAndNames);
}

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
    mkws.info("using pre-baked pazpar2_url '" + mkws.config.pazpar2_url + "'");
    return mkws.config.pazpar2_url;
  } else {
    var s = document.location.protocol + "//" + mkws.config.pp2_hostname + "/" + mkws.config.pp2_path;
    mkws.info("generated pazpar2_url '" + s + "'");
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
  mkws.debug("Reusing existing window token '" + token + "'");
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
  mkws.debug("Generated new window token '" + token + "'");
}

window.name = window.location.hostname + window.location.pathname + '/' + token;
mkws.info("Using window.name '" + window.name + "'");


// wrapper to provide local copy of the jQuery object.
(function($) {
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
      mkws.fatal("handleNodeWithTeam() called on node with no classes");
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
          mkws.warn("AUTO team already has a query, using unique team");
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
      mkws.info("changing from " + from + " to " + to + ": " + width);
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
    mkws.info("service proxy authentication on URL: " + auth_url);

    if (!auth_domain) {
      auth_domain = pp2_url.replace(/^(https?:)?\/\/(.*?)\/.*/, '$2');
      mkws.info("guessed auth_domain '" + auth_domain + "' from pp2_url '" + pp2_url + "'");
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

      mkws.info("service proxy authentication successful");
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
    mkws.info("running auto searches");

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
          myTeam.info("widget " + type + " HTML changed: reparsing");
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
    mkws.info(greet);

    // MKWS is not active until init() has been run against an object with widget nodes.
    // We only set initial configuration when MKWS is first activated.
    if (!mkws.isActive) {
      var widgetSelector = selectorForAllWidgets();
      if ($(widgetSelector).length < 1) {
        mkws.warn("no widgets found");
        return;
      }

      // Initial configuration
      mkws.autoHasAuto = false;
      var saved_config;
      if (typeof mkws_config === 'undefined') {
        mkws.info("setting empty config");
        saved_config = {};
      } else {
        mkws.info("using config: " + $.toJSON(mkws_config));
        saved_config = mkws_config;
      }
      mkws.setMkwsConfig(saved_config);

      for (var key in mkws.config) {
        if (mkws.config.hasOwnProperty(key)) {
          if (key.match(/^language_/)) {
            var lang = key.replace(/^language_/, "");
            // Copy custom languages into list
            mkws.locale_lang[lang] = mkws.config[key];
            mkws.info("added locally configured language '" + lang + "'");
          }
        }
      }

      var lang = mkws.getParameterByName("lang") || mkws.config.lang;
      if (!lang || !mkws.locale_lang[lang]) {
        mkws.config.lang = ""
      } else {
        mkws.config.lang = lang;
      }

      mkws.info("using language: " + (mkws.config.lang ? mkws.config.lang : "none"));

      // protocol independent link for pazpar2: "//mkws/sp" -> "https://mkws/sp"
      if (mkws.pazpar2_url().match(/^\/\//)) {
        mkws.config.pazpar2_url = document.location.protocol + mkws.config.pazpar2_url;
        mkws.info("adjusted protocol independent link to " + mkws.pazpar2_url());
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

    mkws.info("walking MKWS nodes took " + (now-then) + " ms");
    for (var tName in mkws.teams) {
      var myTeam = mkws.teams[tName]
      myTeam.makePz2();
      myTeam.info("made PZ2 object");
      /*
        myTeam.visitWidgets(function(t, w) {
          mkws.debug("  has widget of type '" + t + "': " + w);
        });
      */
    }

    function sp_auth_url(config) {
      if (config.service_proxy_auth) {
	mkws.info("using pre-baked sp_auth_url '" + config.service_proxy_auth + "'");
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
	mkws.info("generated sp_auth_url '" + s + "'");
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
      for (var teamName in mkws.teams) {
        mkws.teams[teamName].queue("authenticated").publish();
      }
    }

    mkws.isActive = true;
    return true;
  };

  $(document).ready(function() {
    if (!window.mkws_noready && !mkws.authenticating && !mkws.active) {
       mkws.init();
    }
  });

  // Set global log_level flag early so that _log() works
  if (typeof mkws_config !== 'undefined') {
    var tmp = mkws_config.log_level;
    if (typeof tmp !== 'undefined') {
      mkws.logger.setOptions({ "level": mkws.stringToLevel(tmp) });
    }
  }
})(mkws.$);
// Factory function for team objects. As much as possible, this uses
// only member variables (prefixed "m_") and inner functions with
// private scope.
//
// Some functions are visible as member-functions to be called from
// outside code -- specifically, from generated HTML. These functions
// are that.switchView(), showDetails(), limitTarget(), limitMultipleTargets(), limitQuery(),
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

  m_sortOrder = config.sort_default;
  m_perpage = config.perpage_default;

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
    return m_filterSet.targetFiltered(id);
  };


  that.limitTarget = function(id, name) {
    that.info("limitTarget(id=" + id + ", name=" + name + ")");
    m_filterSet.add(targetFilter(id, name));
    if (m_query) triggerSearch();
    return false;
  };


  that.limitMultipleTargets = function(idsAndNames) {
    that.info("limitMultipleTargetsTargets", idsAndNames);
    for (var i in idsAndNames) {
      var pair = idsAndNames[i];
      m_filterSet.add(targetFilter(pair[0], pair[1]));
    }
    if (m_query) triggerSearch();
    return false;
  };


  that.limitQuery = function(field, value) {
    that.info("limitQuery(field=" + field + ", value=" + value + ")");
    m_filterSet.add(fieldFilter(field, value));
    if (m_query) triggerSearch();
    return false;
  };


  that.limitCategory = function(id) {
    that.info("limitCategory(id=" + id + ")");
    // Only one category filter at a time
    m_filterSet.removeMatching(function(f) { return f.type === 'category' });
    if (id !== '') m_filterSet.add(categoryFilter(id));
    if (m_query) triggerSearch();
    return false;
  };


  that.delimitTarget = function(id) {
    that.info("delimitTarget(id=" + id + ")");
    m_filterSet.removeMatching(function(f) { return f.type === 'target' });
    if (m_query) triggerSearch();
    return false;
  };


  that.delimitQuery = function(field, value) {
    that.info("delimitQuery(field=" + field + ", value=" + value + ")");
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


  function newSearch(widget, query, sortOrder, maxrecs, perpage, limit, targets, torusquery) {
    that.info("newSearch: " + query);

    if (config.use_service_proxy && !mkws.authenticated) {
      alert("searching before authentication");
      return;
    }

    {
      if (!sortOrder) sortOrder = widget.config.sort;
      if (!maxrecs) maxrecs = widget.config.maxrecs;
      if (!perpage) perpage = widget.config.perpage;
      if (!limit) limit = widget.config.limit;
      if (!targets) targets = widget.config.targets;
      if (!torusquery) torusquery = widget.config.targetfilter;
      var target = widget.config.target;
      if (target) torusquery = 'udb=="' + target + '"';

      var s = "running search: '" + query + "'";
      if (sortOrder) s += " sorted by '" + sortOrder + "'";
      if (maxrecs) s += " restricted to " + maxrecs + " records";
      if (perpage) s += " with " + perpage + " per page";
      if (limit) s += " limited by '" + limit + "'";
      if (targets) s += " in targets '" + targets + "'";
      if (torusquery) s += " constrained by torusquery '" + torusquery + "'";
      that.info(s);
    }

    m_filterSet.removeMatching(function(f) { return f.type !== 'category' });
    triggerSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery);
    switchView('records'); // In case it's configured to start off as hidden
    m_submitted = true;
  }
  that.newSearch = newSearch;


  function triggerSearch(query, sortOrder, maxrecs, perpage, limit, targets, torusquery) {
    resetPage();

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

    that.info("triggerSearch(" + m_query + "): filters = " + m_filterSet.toJSON() + ", " +
        "pp2filter = " + pp2filter + ", params = " + $.toJSON(params));

    m_paz.search(m_query, m_perpage, m_sortOrder, pp2filter, undefined, params);
    queue("searchtriggered").publish();
  }

  // fetch record details to be retrieved from the record queue
  that.fetchDetails = function(recId) {
    that.info("fetchDetails() requesting record '" + recId + "'");
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
        m_team.info("removeMatching: removing filter " + mkws.$.toJSON(filter));
      } else {
        m_team.info("removeMatching: keeping filter " + mkws.$.toJSON(filter));
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
      if (res) res += "|";
      if (id.match(/^[a-z:]+[=~]/)) {
        var newId = id.replace(/^[a-z:]+[=~]/, '');
        m_team.info("filter '" + id + "' already begins with SETTING OP: changed to '" + newId + "'");
        id = newId;
      }
      res += id;
    });

    return res ? 'pz:id=' + res : "";
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
      res += "category~" + id.replace(/[\\,]/g, '\\$&');
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
        this.info(this + " copied property " + name + "='" + attrs[name] + "' to " + type + " subwidget");
      }
    }
    
    for (var name in overrides) {
      this.info(this + " overrode property " + name + "='" + overrides[name] + "' (was '" + attrs[name] + "') for " + type + " subwidget");
      attrs[name] = overrides[name];
    }

    if (defaults) {
      for (var name in defaults) {
        if (!attrs[name]) {
          attrs[name] = defaults[name];
          this.info(this + " fell back to default property " + name + "='" + attrs[name] + "' for " + type + " subwidget");
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
      var optional = param.match(/^\?/);
      if (optional) {
        param = param.replace(/^\?/, ''); 
      }
      val = mkws.getParameterByName(param);
      that.info("obtained val '" + val + "' from param '" + param + "'");
      if (!val && !optional) {
        alert("This page has a MasterKey widget that needs a val specified by the '" + param + "' parameter");
      }
    } else if (val.match(/^!path!/)) {
      var index = val.replace(/^!path!/, '');
      var path = window.location.pathname.split('/');
      val = path[path.length - index];
      that.info("obtained val '" + val + "' from path-component '" + index + "'");
      if (!val) {
        alert("This page has a MasterKey widget that needs a val specified by the path-component " + index);
      }
    } else if (val.match(/^!var!/)) {
      var name = val.replace(/^!var!/, '');
      val = window[name]; // It's ridiculous that this works
      that.info("obtained val '" + val + "' from variable '" + name + "'");
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
      // Should do this more elegantly with message passing
      var widget = this.team.widget('query');
      if (widget) { widget.node.val(query); }

      this.team.queue("ready").subscribe(function() {
        // Postpone search until the team is ready: configuration
        // items are not yet set for Record subclass widgets that fill
        // them in in the subclass, as widget.autosearch is called in
        // the superclass, before the subclass fiddles with the
        // configuration.
        that.team.newSearch(that, query);
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
      this.info(node + ": parsing config fragment '" + val + "'");
      var data;
      try {
        data = $.parseJSON(val);
        for (var key in data) {
          this.info(node + ": adding config element " + key + "='" + data[key] + "'");
          that.config[key] = data[key];
        }
      } catch (err) {
        alert("Can't parse " + node + " data-mkws-config as JSON: " + val);
      }
    } else if (a.name.match (/^data-mkws-/)) {
      var name = a.name.replace(/^data-mkws-/, '')
      that.config[name] = val;
      this.info(that + ": set data-mkws attribute " + name + "='" + val + "'");
    } else if (!ignoreAttrs[a.name]) {
      that.config[a.name] = val;
      this.info(that + ": set regular attribute " + a.name + "='" + val + "'");
    }
  }

  var fn = mkws.promotionFunction(type);
  if (fn) {
    fn.call(that);
    this.info("made " + type + " widget(node=" + node + ")");
  } else if (type.match(/-[Cc]ontainer-(narrow|wide)$/)) {
    // Not really a widget: no need to log its lack of promotion
  } else {
    this.info("made UNPROMOTED widget(type=" + type + ", node=" + node + ")");
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

        var urls = hit['md-electronic-url'];
        if (!urls && hit.location && hit.location[0]) {
          urls = hit.location[0]['md-electronic-url'];
        }

        if (urls) {
          var bestLink = null;
          var otherLinks = [];
          for (var j = 0; j < urls.length; j++) {
            var url = urls[j];
            if (!url.match(/^(https?:)?\/\//)) {
              that.warn("link '" + url + "' is not a valid URL");
            } else if (!bestLink) {
              bestLink = url;
            } else {
              otherLinks.push(url);
            }
          }
          hit.bestLink = bestLink;
          hit.otherLinks = otherLinks;
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
    var op = that.config.freeze_opacity;
    if (op !== undefined) { that.node.css('opacity', op); }
    m_frozen = true;
    clearTimeout(m_timer);
    m_timer = setTimeout(unfreezeRecordDisplay, 1000);
  });

  function unfreezeRecordDisplay() {
    clearTimeout(m_timer);
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
  var that = this;
  this.node.submit(function() {
    var val = team.widget('query').value();
    if (team.widget('query-field')) {
      // If there's a query-field widget, it must name its radio-buttons "field"
      val = that.node.context.field.value + '=' + val;
    }
    team.newSearch(that, val);
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
    src: this.config.src || "//mkws.indexdata.com/progress.gif"
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
mkws.registerWidgetType('query-field', function() {});
mkws.registerWidgetType('motd-container', function() {});
mkws.registerWidgetType('button', function() {});


})(mkws.$); // jQuery wrapper
mkws.registerWidgetType('facets', function() {
  // Initially hide the facets; display when we get results
  var that = this;
  var team = this.team;

  this.team.queue("searchtriggered").subscribe(function() {
    var op = that.config.newsearch_opacity;
    if (op !== undefined) { that.node.fadeTo(500, op); }
  });

  team.queue("facets").subscribe(function(data) {
    that.node.css('opacity', 1);
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
        that.info("Using facet-" + name + " template.")
      } else {
        that.info("No " + name + " specific template, using default.")
        template = team.loadTemplate("facet");
      }
    }
    that.node.html(template({
      team: teamName,
      name: name,
      caption: caption,
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

  this.team.queue("authenticated").subscribe(function(authName, realm) {
    var req = new pzHttpRequest(mkws.pazpar2_url() + "?command=categories", function(err) {
      alert("HTTP call for categories failed: " + err)
    });

    req.get(null, function(data) {
      var $ = mkws.$;
      if (!$.isXMLDoc(data)) {
        alert("categories response document is not XML");
        return;
      }
      that.info("got categories: " + data);

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
mkws.registerWidgetType('wikipedia', function() {
  mkws.promotionFunction('record').call(this);
  if (!this.config.target) this.config.target = 'wikimedia_wikipedia_single_result';
  if (!this.config.template) this.config.template = 'wikipedia';
  this.config.template_vars.paragraphs = this.config.paragraphs || 0;
  this.config.template_vars.sentences = this.config.sentences || 0;
  this.config.template_vars.credit = this.config.credit || "Wikipedia";
});
mkws.aliasWidgetType('reference', 'wikipedia');
mkws.registerWidgetType('reference-universe', function() {
  if (!this.config.target) this.config.target = 'paratext_ruprime';
  if (!this.config.perpage) this.config.perpage = 5;
  if (!this.config.sort) this.config.sort = "position";
  this.team.registerTemplate('reference-universe', '\
<h2>Results from Reference Universe</h2>\
<ul>\
{{#each hits}}\
  <li>\
    {{#mkws-first md-electronic-url}}\
    <a href="{{this}}">\
    {{/mkws-first}}\
      {{md-title}}\
    </a>\
  {{#if md-title-remainder}}\
    <span>{{md-title-remainder}}</span>\
  {{/if}}\
  {{#if md-title-responsibility}}\
    <span><i>{{md-title-responsibility}}</i></span>\
  {{/if}}\
  </li>\
{{/each}}\
</ul>\
');

  var that = this;
  var template = that.team.loadTemplate(that.config.template || "reference-universe");
  this.team.queue("records").subscribe(function(data) {
    that.node.html(template(data));
  }); 
  that.autosearch();
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
    that.info("generated widget: " + s);
  }
});
(function() {
  var template = Handlebars.template, templates = mkws.defaultTemplates = mkws.defaultTemplates || {};
templates['details'] = template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "        ("
    + this.escapeExpression(((helper = (helper = helpers['md-title-remainder'] || (depth0 != null ? depth0['md-title-remainder'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-remainder","hash":{},"data":data}) : helper)))
    + ")\n";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "        <i>"
    + this.escapeExpression(((helper = (helper = helpers['md-title-responsibility'] || (depth0 != null ? depth0['md-title-responsibility'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-responsibility","hash":{},"data":data}) : helper)))
    + "</i>\n";
},"5":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "  <tr>\n    <th>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Date",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>"
    + alias2(((helper = (helper = helpers['md-date'] || (depth0 != null ? depth0['md-date'] : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"md-date","hash":{},"data":data}) : helper)))
    + "</td>\n  </tr>\n";
},"7":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "  <tr>\n    <th>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Author",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>"
    + alias2(((helper = (helper = helpers['md-author'] || (depth0 != null ? depth0['md-author'] : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"md-author","hash":{},"data":data}) : helper)))
    + "</td>\n  </tr>\n";
},"9":function(depth0,helpers,partials,data) {
    var stack1;

  return "  <tr>\n    <th>"
    + this.escapeExpression((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helpers.helperMissing).call(depth0,"Links",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0['md-electronic-url'] : depth0),{"name":"each","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n  </tr>\n";
},"10":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return "        <a href=\""
    + alias1(this.lambda(depth0, depth0))
    + "\">Link"
    + alias1(((helper = (helper = helpers['mkws-index1'] || (depth0 != null ? depth0['mkws-index1'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"mkws-index1","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "  <tr>\n    <th>"
    + this.escapeExpression((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Subject",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>\n"
    + ((stack1 = (helpers['mkws-first'] || (depth0 && depth0['mkws-first']) || alias1).call(depth0,(depth0 != null ? depth0.location : depth0),{"name":"mkws-first","hash":{"having":"md-subject"},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n  </tr>\n";
},"13":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-subject'] : depth0),{"name":"if","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers['mkws-commaList'] || (depth0 && depth0['mkws-commaList']) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['md-subject'] : depth0),{"name":"mkws-commaList","hash":{},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"15":function(depth0,helpers,partials,data) {
    return "            "
    + this.escapeExpression(this.lambda(depth0, depth0));
},"17":function(depth0,helpers,partials,data) {
    return "        "
    + this.escapeExpression((helpers['mkws-attr'] || (depth0 && depth0['mkws-attr']) || helpers.helperMissing).call(depth0,"@name",{"name":"mkws-attr","hash":{},"data":data}));
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<table>\n  <tr>\n    <th>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Title",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>\n      "
    + alias2(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-remainder'] : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-responsibility'] : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n  </tr>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-date'] : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-author'] : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-electronic-url'] : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers['mkws-if-any'] || (depth0 && depth0['mkws-if-any']) || alias1).call(depth0,(depth0 != null ? depth0.location : depth0),{"name":"mkws-if-any","hash":{"having":"md-subject"},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  <tr>\n    <th>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Locations",{"name":"mkws-translate","hash":{},"data":data}))
    + "</th>\n    <td>\n"
    + ((stack1 = (helpers['mkws-commaList'] || (depth0 && depth0['mkws-commaList']) || alias1).call(depth0,(depth0 != null ? depth0.location : depth0),{"name":"mkws-commaList","hash":{},"fn":this.program(17, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    </td>\n  </tr>\n</table>\n";
},"useData":true});
templates['done'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Search complete: found",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + " "
    + this.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"records",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "\n\n";
},"useData":true});
templates['facet'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "  <div class=\"mkws-term mkwsTerm\">\n    <a href=\"#\" "
    + ((stack1 = ((helper = (helper = helpers.linkdata || (depth0 != null ? depth0.linkdata : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"linkdata","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ">"
    + alias3(((helper = (helper = helpers.term || (depth0 != null ? depth0.term : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"term","hash":{},"data":data}) : helper)))
    + "</a> <span>"
    + alias3(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n<div class=\"mkws-facet-title mkwsFacetTitle\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.caption : depth0),{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.terms : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['facets'] = template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "  <div class=\"mkws-facet mkwsFacet mkws-team-"
    + alias2(alias1((depths[1] != null ? depths[1].team : depths[1]), depth0))
    + "\" data-mkws-facet=\""
    + alias2(alias1(depth0, depth0))
    + "\"></div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.facets : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
templates['images'] = template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "  <a href=\"#\" id=\""
    + alias3(((helper = (helper = helpers.detailLinkId || (depth0 != null ? depth0.detailLinkId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"detailLinkId","hash":{},"data":data}) : helper)))
    + "\" onclick=\""
    + alias3(((helper = (helper = helpers.detailClick || (depth0 != null ? depth0.detailClick : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"detailClick","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = (helpers['mkws-first'] || (depth0 && depth0['mkws-first']) || alias1).call(depth0,(depth0 != null ? depth0['md-thumburl'] : depth0),{"name":"mkws-first","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <br/>\n  </a>\n";
},"2":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "      <img src=\""
    + alias2(alias1(depth0, depth0))
    + "\" alt=\""
    + alias2(alias1((depths[1] != null ? depths[1]['md-title'] : depths[1]), depth0))
    + "\"/>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.hits : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
templates['lang'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(depth0,(data && data.last),{"name":"unless","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var helper;

  return "<span>"
    + this.escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"code","hash":{},"data":data}) : helper)))
    + "</span>";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<a href=\""
    + ((stack1 = ((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + this.escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"code","hash":{},"data":data}) : helper)))
    + "</a>";
},"6":function(depth0,helpers,partials,data) {
    return "    |\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.languages : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});
templates['navi'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "  <span>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,(depth0 != null ? depth0.facet : depth0),{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>: <a class=\"mkws-removable mkwsRemovable\" href=\"#\" onclick=\""
    + ((stack1 = ((helper = (helper = helpers.click || (depth0 != null ? depth0.click : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"click","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + this.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "</a>\n  "
    + ((stack1 = helpers.unless.call(depth0,(data && data.last),{"name":"unless","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(depth0,helpers,partials,data) {
    return "|";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});
templates['pager'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "  <span>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Displaying",{"name":"mkws-translate","hash":{},"data":data}))
    + "</span>:\n  "
    + alias2(((helper = (helper = helpers.first || (depth0 != null ? depth0.first : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"first","hash":{},"data":data}) : helper)))
    + " <span>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"to",{"name":"mkws-translate","hash":{},"data":data}))
    + "</span> "
    + alias2(((helper = (helper = helpers.last || (depth0 != null ? depth0.last : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"last","hash":{},"data":data}) : helper)))
    + "\n  <span>"
    + alias2((helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"of",{"name":"mkws-translate","hash":{},"data":data}))
    + "</span> "
    + alias2(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + " (<span>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"found",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>: "
    + alias2(((helper = (helper = helpers.found || (depth0 != null ? depth0.found : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"found","hash":{},"data":data}) : helper)))
    + ")\n";
},"3":function(depth0,helpers,partials,data) {
    return "  No hits.\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "    <a href=\"#\" class=\"mkws-prev mkwsPrev\" onclick=\""
    + this.escapeExpression(((helper = (helper = helpers.prevClick || (depth0 != null ? depth0.prevClick : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"prevClick","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Prev",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</a> |\n";
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return "    <span class=\"mkws-prev mkwsPrev\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helpers.helperMissing).call(depth0,"Prev",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span> |\n";
},"9":function(depth0,helpers,partials,data) {
    return "...";
},"11":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.click : depth0),{"name":"if","hash":{},"fn":this.program(12, data, 0),"inverse":this.program(14, data, 0),"data":data})) != null ? stack1 : "");
},"12":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "      <a href=\"#\" onclick=\""
    + alias3(((helper = (helper = helpers.click || (depth0 != null ? depth0.click : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"click","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"number","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"14":function(depth0,helpers,partials,data) {
    var helper;

  return "      <span class=\"mkws-current-page mkwsCurrentPage\">"
    + this.escapeExpression(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"number","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"16":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "    | <a href=\"#\" class=\"mkws-next mkwsNext\" onclick=\""
    + this.escapeExpression(((helper = (helper = helpers.nextClick || (depth0 != null ? depth0.nextClick : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"nextClick","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Next",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</a>\n";
},"18":function(depth0,helpers,partials,data) {
    var stack1;

  return "    | <span class=\"mkws-next mkwsNext\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || helpers.helperMissing).call(depth0,"Next",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mkws-pager-desc\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.found : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n\n<div class=\"mkws-pager-list\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.prevClick : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.morePrev : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n  "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.moreNext : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.nextClick : depth0),{"name":"if","hash":{},"fn":this.program(16, data, 0),"inverse":this.program(18, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['progress'] = template({"1":function(depth0,helpers,partials,data) {
    return "&#x2588;";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"mkws-waiting mkws-waiting mkwsWaiting\">"
    + ((stack1 = (helpers['mkws-repeat'] || (depth0 && depth0['mkws-repeat']) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.waiting : depth0),{"name":"mkws-repeat","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</span>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"mkws-done mkws-done mkwsDone\">"
    + ((stack1 = (helpers['mkws-repeat'] || (depth0 && depth0['mkws-repeat']) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.done : depth0),{"name":"mkws-repeat","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</span>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.waiting : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['ranking'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<span>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Sort by",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n    <select class=\"mkws-sort mkwsSort mkws-team-"
    + this.escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.sort : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </select>";
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "");
},"3":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "          <option value=\""
    + ((stack1 = ((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" selected=\"selected\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</option>\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "          <option value=\""
    + this.escapeExpression(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</option>\n";
},"7":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "    <span>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"and show",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n    <select class=\"mkws-perpage mkwsPerpage mkws-team-"
    + this.escapeExpression(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.perPage : depth0),{"name":"each","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </select>\n    <span>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"per page",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>";
},"8":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.program(11, data, 0),"data":data})) != null ? stack1 : "");
},"9":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "          <option value=\""
    + alias3(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"perPage","hash":{},"data":data}) : helper)))
    + "\" selected=\"selected\">"
    + alias3(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"perPage","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"11":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "          <option value=\""
    + alias3(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"perPage","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.perPage || (depth0 != null ? depth0.perPage : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"perPage","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<form>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showSort : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.showPerPage : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</form>\n\n";
},"useData":true});
templates['records'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "  <div class=\""
    + this.escapeExpression(((helper = (helper = helpers.containerClass || (depth0 != null ? depth0.containerClass : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"containerClass","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = this.invokePartial(partials.summary,depth0,{"name":"summary","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.hits : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['results'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<table width=\"100%\" border=\"0\" cellpadding=\"6\" cellspacing=\"0\">\n  <tr>\n    <td class=\"mkws-facets-container-wide mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\" width=\"250\" valign=\"top\">\n      <div class=\"mkws-facets mkwsTermlists mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </td>\n    <td class=\"mkws-motd-container mkwsMOTDContainer mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\" valign=\"top\">\n      <div class=\"mkws-ranking mkwsRanking mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n      <div class=\"mkws-pager mkwsPager mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n      <div class=\"mkws-navi mkwsNavi mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n      <div class=\"mkws-records mkwsRecords mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </td>\n  </tr>\n  <tr>\n    <td colspan=\"2\">\n      <div class=\"mkws-facets-container-narrow mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\"></div>\n    </td>\n  </tr>\n</table>\n\n";
},"useData":true});
templates['search'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<form name=\"mkws-search-form\" class=\"mkws-search-form mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\" action=\"\">\n  <input class=\"mkws-query mkws-query mkwsQuery mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\" type=\"text\"/>\n  <input class=\"mkws-button mkws-button mkwsButton mkws-team-"
    + alias3(((helper = (helper = helpers.team || (depth0 != null ? depth0.team : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"team","hash":{},"data":data}) : helper)))
    + "\" type=\"submit\" value=\""
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Search",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "\"/>\n</form>\n\n";
},"useData":true});
templates['stat'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return " -- <span class=\"mkws-client-count mkwsClientCount\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Active clients",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + " : "
    + alias3(((helper = (helper = helpers.activeclients || (depth0 != null ? depth0.activeclients : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"activeclients","hash":{},"data":data}) : helper)))
    + "/"
    + alias3(((helper = (helper = helpers.clients || (depth0 != null ? depth0.clients : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"clients","hash":{},"data":data}) : helper)))
    + "</span> -- "
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Retrieved records",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + " : "
    + alias3(((helper = (helper = helpers.records || (depth0 != null ? depth0.records : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"records","hash":{},"data":data}) : helper)))
    + "/"
    + alias3(((helper = (helper = helpers.hits || (depth0 != null ? depth0.hits : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"hits","hash":{},"data":data}) : helper)))
    + "\n";
},"useData":true});
templates['summary'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "  <a class=\"mkws-field-thumb\" href=\"#\" onclick=\""
    + alias1(((helper = (helper = helpers.detailClick || (depth0 != null ? depth0.detailClick : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"detailClick","hash":{},"data":data}) : helper)))
    + "\">\n    <img src=\""
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0['md-thumburl'] : depth0)) != null ? stack1['0'] : stack1), depth0))
    + "\" onerror=\"this.style.display='none'\"/>\n  </a>\n";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "    <span class=\"mkws-field-title-remainder\">"
    + this.escapeExpression(((helper = (helper = helpers['md-title-remainder'] || (depth0 != null ? depth0['md-title-remainder'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-remainder","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "    <span class=\"mkws-field-author\">"
    + this.escapeExpression(((helper = (helper = helpers['md-author'] || (depth0 != null ? depth0['md-author'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-author","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-responsibility'] : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"8":function(depth0,helpers,partials,data) {
    var helper;

  return "      <span class=\"mkws-field-author\">"
    + this.escapeExpression(((helper = (helper = helpers['md-title-responsibility'] || (depth0 != null ? depth0['md-title-responsibility'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-responsibility","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"10":function(depth0,helpers,partials,data) {
    var helper;

  return "    <div class=\"mkws-field-description\">"
    + this.escapeExpression(((helper = (helper = helpers['md-description'] || (depth0 != null ? depth0['md-description'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-description","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"12":function(depth0,helpers,partials,data) {
    var helper;

  return "    <span class=\"mkws-field-date\">"
    + this.escapeExpression(((helper = (helper = helpers['md-date'] || (depth0 != null ? depth0['md-date'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-date","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"14":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "  "
    + ((stack1 = ((helper = (helper = helpers.renderedDetails || (depth0 != null ? depth0.renderedDetails : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"renderedDetails","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-thumburl'] : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"mkws-field-data\">\n  <span class=\"mkws-field-title\">\n  <a href=\"#\" id=\""
    + alias3(((helper = (helper = helpers.detailLinkId || (depth0 != null ? depth0.detailLinkId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"detailLinkId","hash":{},"data":data}) : helper)))
    + "\" onclick=\""
    + alias3(((helper = (helper = helpers.detailClick || (depth0 != null ? depth0.detailClick : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"detailClick","hash":{},"data":data}) : helper)))
    + "\">\n    "
    + alias3(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "\n  </a>\n  </span>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-remainder'] : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-author'] : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-description'] : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-date'] : depth0),{"name":"if","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.renderedDetails : depth0),{"name":"if","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['switch'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<a href=\"#\" onclick=\""
    + ((stack1 = ((helper = (helper = helpers.recordClick || (depth0 != null ? depth0.recordClick : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"recordClick","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Records",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</a>\n<span>|</span>\n<a href=\"#\" onclick=\""
    + ((stack1 = ((helper = (helper = helpers.targetClick || (depth0 != null ? depth0.targetClick : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"targetClick","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Targets",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</a>\n";
},"useData":true});
templates['targets'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "    <tr>\n      <td>"
    + ((stack1 = ((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n      <td>\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.id : depth0),"matches","^(solr-|lui.)",{"name":"compare","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "      </td>\n      <td>"
    + alias3(((helper = (helper = helpers.hits || (depth0 != null ? depth0.hits : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"hits","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "      </td>\n      <td>"
    + alias3(((helper = (helper = helpers.records || (depth0 != null ? depth0.records : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"records","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias3(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"state","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n";
},"2":function(depth0,helpers,partials,data) {
    return "	  <b title=\"Harvested, and stored locally\" style=\"color:darkgreen\">H</b>\n";
},"4":function(depth0,helpers,partials,data) {
    return "	  <span title=\"Searched on the remote site\" style=\"color:darkred\">S</span>\n";
},"6":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "         "
    + alias3(((helper = (helper = helpers.diagnostic || (depth0 != null ? depth0.diagnostic : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"diagnostic","hash":{},"data":data}) : helper)))
    + " ("
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + ")\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "<table>\n  <thead>\n    <tr>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Target ID",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Type",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Hits",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Diags",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"Records",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      <td>"
    + ((stack1 = (helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']) || alias1).call(depth0,"State",{"name":"mkws-translate","hash":{},"data":data})) != null ? stack1 : "")
    + "</td>\n      </td>\n    </tr>\n  </thead>\n  <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </tbody>\n</table>\n";
},"useData":true});
templates['waiting'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<img src=\""
    + this.escapeExpression(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"src","hash":{},"data":data}) : helper)))
    + "\"/>\n";
},"useData":true});
templates['wikipedia'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<!--\ndisplay only the first image\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-thumburl'] : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "-->\n\n<!-- multiple images -->\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0['md-thumburl'] : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n<h1><a href=\""
    + alias3(((helper = (helper = helpers['md-electronic-url'] || (depth0 != null ? depth0['md-electronic-url'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"md-electronic-url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + alias3(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "</a></h1>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-remainder'] : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title-responsibility'] : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-disambiguationurl'] : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers['mkws-paragraphs'] || (depth0 && depth0['mkws-paragraphs']) || alias1).call(depth0,(depth0 != null ? depth0['md-description'] : depth0),(depth0 != null ? depth0.paragraphs : depth0),(depth0 != null ? depth0.sentences : depth0),{"name":"mkws-paragraphs","hash":{},"data":data})) != null ? stack1 : "")
    + "\n<p class=\"mkws-credit mkwsCredit\">"
    + alias3(((helper = (helper = helpers.credit || (depth0 != null ? depth0.credit : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"credit","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "<img src=\""
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0['md-thumburl'] : depth0)) != null ? stack1['0'] : stack1), depth0))
    + "\" alt=\""
    + alias1(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "\">\n";
},"4":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return "  <img src=\""
    + alias1(this.lambda(depth0, depth0))
    + "\" alt=\""
    + alias1(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "\">\n";
},"6":function(depth0,helpers,partials,data) {
    var helper;

  return "<b>"
    + this.escapeExpression(((helper = (helper = helpers['md-title-remainder'] || (depth0 != null ? depth0['md-title-remainder'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-remainder","hash":{},"data":data}) : helper)))
    + "</b>\n";
},"8":function(depth0,helpers,partials,data) {
    var helper;

  return "<i>"
    + this.escapeExpression(((helper = (helper = helpers['md-title-responsibility'] || (depth0 != null ? depth0['md-title-responsibility'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"md-title-responsibility","hash":{},"data":data}) : helper)))
    + "</i>\n";
},"10":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<p class=\"mkws-disambiguation\"\n>Did you mean <a href=\""
    + alias3(((helper = (helper = helpers['md-disambiguationurl'] || (depth0 != null ? depth0['md-disambiguationurl'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"md-disambiguationurl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"\n	>a different "
    + alias3(((helper = (helper = helpers['md-title'] || (depth0 != null ? depth0['md-title'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"md-title","hash":{},"data":data}) : helper)))
    + "</a>?</p>\n";
},"12":function(depth0,helpers,partials,data) {
    return "<p>Not found in Wikipedia.</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['md-title'] : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
})();/* generic function to open results in a popup window
 *
 */

//"use strict";
// $(document).ready(function () {
mkws.registerWidgetType('popup', function() {
    var $ = mkws.$;
    var debug = this.info;
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
function _setFontSize(size) {
  console.log('setting font-size to "' + size + '"');
  document.getElementById("top-header").style.fontSize = size;
  document.getElementById("main-content").style.fontSize = size;
}

function smallerText() { _setFontSize('medium') }
function regularText() { _setFontSize('large') }
function biggerText() { _setFontSize('x-large') }
  

function _setColorsForClass(className, foregroundColor, backgroundColor) {
  var e = document.getElementsByClassName(className);
  for(var i = 0; i < e.length; i++) {
    e[i].style.color = foregroundColor;
    e[i].style.backgroundColor =  backgroundColor;
  }
}

function _setColors(foregroundColor, backgroundColor, linkColor, currentPageForegroundColor, currentPageBackgroundColor, facetTitleBackgroundColor) {
  console.log('setting foreground=' + foregroundColor + ', background=' + backgroundColor);

  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].href) {
      links[i].style.color = linkColor;
    }
  }

  _setColorsForClass('main', foregroundColor, backgroundColor);
  _setColorsForClass('header', foregroundColor, backgroundColor);
  _setColorsForClass('footer', foregroundColor, backgroundColor);
  _setColorsForClass('results', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-waiting', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-targets', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-ranking', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-pager', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-navi', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-records', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-switch', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-facets', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-facet-title', foregroundColor, facetTitleBackgroundColor);
  _setColorsForClass('mkws-current-page', currentPageForegroundColor, currentPageBackgroundColor);
}

function highContrast() { _setColors("White", "Black", "Yellow", "White", "DimGray", "DimGray") }
function defaultContrast() { _setColors("Black", "White", "DarkBlue", "White", "DarkBlue", "WhiteSmoke") }

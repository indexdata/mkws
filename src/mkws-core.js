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

  locale_lang: {
    "de": {
      "Authors": "Autoren",
      "Subjects": "Schlagw&ouml;rter",
      "Sources": "Daten und Quellen",
      "source": "datenquelle",
      "Termlists": "Termlisten",
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
      "Termlists": "Termlists",
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


// Incredible that the standard JavaScript runtime doesn't define a
// unique windowId. Instead, we have to make one up. And since there's
// no global area shared between windows, the best we can do for
// ensuring uniqueness is generating a random ID and crossing our
// fingers. We stash this in window.name, as it's the only place to
// keep data that is preserved across reloads and within-site
// navigation. pz2.js picks this up and uses it as part of the
// cookie-name, to ensure each tab gets its own session.
if (window.name) {
  mkws.log("Using existing window.name '" + window.name + "'");
} else {
  // Ten chars from 26 alpha-numerics = 36^10 = 3.65e15 combinations.
  // At one per second, it will take 116 million years to duplicate a session
  window.name = Math.random().toString(36).slice(2, 12);
  mkws.log("Generated new window.name '" + window.name + "'");
}


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
  mkws.widgetType2function[name] = fn;
  mkws.log("registered widget-type '" + name + "'");
};

mkws.promotionFunction = function(name) {
  return mkws.widgetType2function[name];
};


mkws.setMkwsConfig = function(overrides) {
  // Set global log_level flag early so that mkws.log() works
  // Fall back to old "debug_level" setting for backwards compatibility
  var tmp = overrides.log_level;
  if (typeof(tmp) === 'undefined') tmp = overrides.debug_level;
  if (typeof(tmp) !== 'undefined') mkws.log_level = tmp;

  var config_default = {
    use_service_proxy: true,
    pazpar2_url: undefined,
    pp2_hostname: "mkws.indexdata.com",
    pp2_path: "service-proxy",
    service_proxy_auth: undefined,
    sp_auth_path: "service-proxy-auth",
    sp_auth_query: undefined, // Will be: "command=auth&action=perconfig",
    sp_auth_credentials: undefined,
    lang: "",
    sort_options: [["relevance"], ["title:1", "title"], ["date:0", "newest"], ["date:1", "oldest"]],
    perpage_options: [10, 20, 30, 50],
    sort_default: "relevance",
    perpage_default: 20,
    query_width: 50,
    show_lang: true,    /* show/hide language menu */
    show_sort: true,    /* show/hide sort menu */
    show_perpage: true, /* show/hide perpage menu */
    show_switch: true,  /* show/hide switch menu */
    lang_options: [],   /* display languages links for given languages, [] for all */
    facets: ["xtargets", "subject", "author"], /* display facets, in this order, [] for none */
    responsive_design_width: undefined, /* a page with less pixel width considered as narrow */
    log_level: 1,     /* log level for development: 0..2 */

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


mkws.defaultTemplate = function(name) {
  if (name === 'Record') {
    return '\
<table>\
  <tr>\
    <th>{{mkws-translate "Title"}}</th>\
    <td>\
      {{md-title}}\
      {{#if md-title-remainder}}\
        ({{md-title-remainder}})\
      {{/if}}\
      {{#if md-title-responsibility}}\
        <i>{{md-title-responsibility}}</i>\
      {{/if}}\
    </td>\
  </tr>\
  {{#if md-date}}\
  <tr>\
    <th>{{mkws-translate "Date"}}</th>\
    <td>{{md-date}}</td>\
  </tr>\
  {{/if}}\
  {{#if md-author}}\
  <tr>\
    <th>{{mkws-translate "Author"}}</th>\
    <td>{{md-author}}</td>\
  </tr>\
  {{/if}}\
  {{#if md-electronic-url}}\
  <tr>\
    <th>{{mkws-translate "Links"}}</th>\
    <td>\
      {{#each md-electronic-url}}\
        <a href="{{this}}">Link{{mkws-index1}}</a>\
      {{/each}}\
    </td>\
  </tr>\
  {{/if}}\
  {{#mkws-if-any location having="md-subject"}}\
  <tr>\
    <th>{{mkws-translate "Subject"}}</th>\
    <td>\
      {{#mkws-first location having="md-subject"}}\
        {{#if md-subject}}\
          {{#mkws-commaList md-subject}}\
            {{this}}{{/mkws-commaList}}\
        {{/if}}\
      {{/mkws-first}}\
    </td>\
  </tr>\
  {{/mkws-if-any}}\
  <tr>\
    <th>{{mkws-translate "Locations"}}</th>\
    <td>\
      {{#mkws-commaList location}}\
        {{mkws-attr "@name"}}{{/mkws-commaList}}\
    </td>\
  </tr>\
</table>\
';
  } else if (name === "Summary") {
    return '\
<a href="#" id="{{_id}}" onclick="{{_onclick}}">\
  <b>{{md-title}}</b>\
</a>\
{{#if md-title-remainder}}\
  <span>{{md-title-remainder}}</span>\
{{/if}}\
{{#if md-title-responsibility}}\
  <span><i>{{md-title-responsibility}}</i></span>\
{{/if}}\
{{#if md-date}}, {{md-date}}\
{{#if location}}\
, {{#mkws-first location}}{{mkws-attr "@name"}}{{/mkws-first}}\
{{/if}}\
{{#if md-medium}}\
<span>, {{md-medium}}</span>\
{{/if}}\
{{/if}}\
';
  } else if (name === "Image") {
    return '\
      <a href="#" id="{{_id}}" onclick="{{_onclick}}">\
        {{#mkws-first md-thumburl}}\
          <img src="{{this}}" alt="{{../md-title}}"/>\
        {{/mkws-first}}\
        <br/>\
      </a>\
';
  } else if (name === 'Facet') {
    return '\
<a href="#"\
{{#if fn}}\
onclick="mkws.{{fn}}(\'{{team}}\', \'{{field}}\', \'{{term}}\');return false;"\
{{/if}}\
>{{term}}</a>\
<span>{{count}}</span>\
';
  }

  return null;
};


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
    var s = document.location.protocol + "//" + mkws.config.pp2_hostname + "/" + mkws.config.pp2_path + "/";
    mkws.log("generated pazpar2_url '" + s + "'");
    return s;
  }
};


// wrapper to provide local copy of the jQuery object.
(function($) {
  var log = mkws.log;

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
      if (cname.match(/^mkwsTeam_/)) {
        teamName = cname.replace(/^mkwsTeam_/, '');
      } else if (cname.match(/^mkws/)) {
        type = cname.replace(/^mkws/, '');
      }
    }

    // Widgets without a team are on team "AUTO"
    if (!teamName) {
      teamName = "AUTO";
      // Autosearch widgets don't join team AUTO if there is already an
      // autosearch on the team or the team has otherwise gotten a query
      if (node.hasAttribute("autosearch")) {
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
          var w1 = team.widget(t + "-Container-" + from);
          var w2 = team.widget(t + "-Container-" + to);
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
      // instrumentation suprisnigly shows this is consistently
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
	s += '.mkws' + type;
	s += ',.mkws' + type + "-Container-wide";
	s += ',.mkws' + type + "-Container-narrow";
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
          myTeam = mkws.teams[tname] = team($, tname);
          log("made MKWS team '" + tname + "'");
        }

        var oldHTML = this.innerHTML;
        var myWidget = widget($, myTeam, type, this);
        myTeam.addWidget(myWidget);
        var newHTML = this.innerHTML;
        if (newHTML !== oldHTML) {
          log("widget " + tname + ":" + type + " HTML changed: reparsing");
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

    // TODO: Let's remove this soon
    // Backwards compatibility: set new magic class names on any
    // elements that have the old magic IDs.
    var ids = [ "Switch", "Lang", "Search", "Pager", "Navi",
                "Results", "Records", "Targets", "Ranking",
                "Termlists", "Stat", "MOTD" ];
    for (var i = 0; i < ids.length; i++) {
      var id = 'mkws' + ids[i];
      var node = $('#' + id);
      if (node.attr('id')) {
        node.addClass(id);
        log("added magic class to '" + node.attr('id') + "'");
      }
    }

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

      if (mkws.config.query_width < 5 || mkws.config.query_width > 150) {
        log("reset query width to " + mkws.config.query_width);
        mkws.config.query_width = 50;
      }

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

    /*
      for (var tName in mkws.teams) {
      var myTeam = mkws.teams[tName]
      log("team '" + tName + "' = " + myTeam + " ...");
      myTeam.visitWidgets(function(t, w) {
      log("  has widget of type '" + t + "': " + w);
      });
      }
    */

    function sp_auth_url(config) {
      if (config.service_proxy_auth) {
	mkws.log("using pre-baked sp_auth_url '" + config.service_proxy_auth + "'");
	return config.service_proxy_auth;
      } else {
	var s = '//';
	s += config.auth_hostname ? config.auth_hostname : config.pp2_hostname;
	s += '/' + config.sp_auth_path;
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

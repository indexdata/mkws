/*! MKWS, the MasterKey Widget Set.
 *  Copyright (C) 2013-2014 Index Data
 *  See the file LICENSE for details
 */

"use strict"; // HTML5: disable for log_level >= 2


// Set up global mkws object. Contains truly global state such as SP
// authentication, and a hash of team objects, indexed by team-name.
//
var mkws = {
    authenticated: false,
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


// This function is taken from a StackOverflow answer
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/901144#901144
mkws.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
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
	pazpar2_url: "//mkws.indexdata.com/service-proxy/",
	service_proxy_auth: "//mkws.indexdata.com/service-proxy-auth",
	lang: "",
	sort_options: [["relevance"], ["title:1", "title"], ["date:0", "newest"], ["date:1", "oldest"]],
	perpage_options: [10, 20, 30, 50],
	sort_default: "relevance",
	perpage_default: 20,
	query_width: 50,
	show_lang: true, 	/* show/hide language menu */
	show_sort: true, 	/* show/hide sort menu */
	show_perpage: true, 	/* show/hide perpage menu */
	lang_options: [], 	/* display languages links for given languages, [] for all */
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
    <th>{{translate "Title"}}</th>\
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
    <th>{{translate "Date"}}</th>\
    <td>{{md-date}}</td>\
  </tr>\
  {{/if}}\
  {{#if md-author}}\
  <tr>\
    <th>{{translate "Author"}}</th>\
    <td>{{md-author}}</td>\
  </tr>\
  {{/if}}\
  {{#if md-electronic-url}}\
  <tr>\
    <th>{{translate "Links"}}</th>\
    <td>\
      {{#each md-electronic-url}}\
	<a href="{{this}}">Link{{index1}}</a>\
      {{/each}}\
    </td>\
  </tr>\
  {{/if}}\
  {{#if-any location having="md-subject"}}\
  <tr>\
    <th>{{translate "Subject"}}</th>\
    <td>\
      {{#first location having="md-subject"}}\
	{{#if md-subject}}\
	  {{#commaList md-subject}}\
	    {{this}}{{/commaList}}\
	{{/if}}\
      {{/first}}\
    </td>\
  </tr>\
  {{/if-any}}\
  <tr>\
    <th>{{translate "Locations"}}</th>\
    <td>\
      {{#commaList location}}\
	{{attr "@name"}}{{/commaList}}\
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
';
    } else if (name === "Image") {
	return '\
      <a href="#" id="{{_id}}" onclick="{{_onclick}}">\
        {{#first md-thumburl}}\
	  <img src="{{this}}" alt="{{../md-title}}"/>\
        {{/first}}\
	<br/>\
      </a>\
';
    }

    var s = "There is no default '" + name +"' template!";
    alert(s);
    return s;
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


// wrapper to call team() after page load
(function(j) {
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

        if (!teamName) teamName = "AUTO";
	callback.call(node, teamName, type);
    }


    function resizePage() {
	var list = ["mkwsSwitch", "mkwsLang"];

	var width = mkws.config.responsive_design_width;
	var parent = $(".mkwsTermlists").parent();

	if ($(window).width() <= width &&
	    parent.hasClass("mkwsTermlist-Container-wide")) {
	    log("changing from wide to narrow: " + $(window).width());
	    $(".mkwsTermlist-Container-wide").hide();
	    $(".mkwsTermlist-Container-narrow").show();
	    for (var tname in mkws.teams) {
		$(".mkwsTermlists.mkwsTeam_" + tname).appendTo($(".mkwsTermlist-Container-narrow.mkwsTeam_" + tname));
		for(var i = 0; i < list.length; i++) {
		    $("." + list[i] + ".mkwsTeam_" + tname).hide();
		}
	    }
	} else if ($(window).width() > width &&
		   parent.hasClass("mkwsTermlist-Container-narrow")) {
	    log("changing from narrow to wide: " + $(window).width());
	    $(".mkwsTermlist-Container-wide").show();
	    $(".mkwsTermlist-Container-narrow").hide();
	    for (var tname in mkws.teams) {
		$(".mkwsTermlists.mkwsTeam_" + tname).appendTo($(".mkwsTermlist-Container-wide.mkwsTeam_" + tname));
		for(var i = 0; i < list.length; i++) {
		    $("." + list[i] + ".mkwsTeam_" + tname).show();
		}
	    }
	}
    };


    /*
     * Run service-proxy authentication in background (after page load).
     * The username/password is configured in the apache config file
     * for the site.
     */
    function authenticateSession(auth_url, auth_domain, pp2_url) {
	log("Run service proxy auth URL: " + auth_url);

	if (!auth_domain) {
	    auth_domain = pp2_url.replace(/^(https?:)?\/\/(.*?)\/.*/, '$2');
	    log("guessed auth_domain '" + auth_domain + "' from pp2_url '" + pp2_url + "'");
	}

	var request = new pzHttpRequest(auth_url, function(err) {
	    alert("HTTP call for authentication failed: " + err)
	    return;
	}, auth_domain);

	request.get(null, function(data) {
	    if (!$.isXMLDoc(data)) {
		alert("service proxy auth response document is not valid XML document, give up!");
		return;
	    }
	    var status = $(data).find("status");
	    if (status.text() != "OK") {
		alert("service proxy auth response status: " + status.text() + ", give up!");
		return;
	    }

	    log("Service proxy auth successfully done");
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


    function makeWidgetsWithin(level, node) {
        node.find('[class^="mkws"],[class*=" mkws"]').each(function() {
            handleNodeWithTeam(this, function(tname, type) {
                var oldHTML = this.innerHTML;
                var myTeam = mkws.teams[tname];
                var myWidget = widget(j, myTeam, type, this);
                myTeam.addWidget(myWidget);
                var newHTML = this.innerHTML;
                if (newHTML !== oldHTML) {
                    log("widget " + tname + ":" + type + " HTML changed from '" + oldHTML + "' to '" + newHTML + "': reparse!");
                    makeWidgetsWithin(level+1, $(this));
                }
            });
        });
    }


    $(document).ready(function() {
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
		    log("Added locally configured language '" + lang + "'");
		}
	    }
	}

	if (mkws.config.query_width < 5 || mkws.config.query_width > 150) {
	    log("Reset query width: " + mkws.config.query_width);
	    mkws.config.query_width = 50;
	}

	// protocol independent link for pazpar2: "//mkws/sp" -> "https://mkws/sp"
	if (mkws.config.pazpar2_url.match(/^\/\//)) {
	    mkws.config.pazpar2_url = document.location.protocol + mkws.config.pazpar2_url;
	    log("adjust protocol independent links: " + mkws.config.pazpar2_url);
	}

	if (mkws.config.responsive_design_width) {
	    // Responsive web design - change layout on the fly based on
	    // current screen width. Required for mobile devices.
	    $(window).resize(resizePage);
	    // initial check after page load
	    $(document).ready(resizePage);
	}

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

	// Find all nodes with an MKWS class, and determine their team from
	// the mkwsTeam_* class. Make all team objects.
	var then = $.now();
	$('[class^="mkws"],[class*=" mkws"]').each(function() {
	    handleNodeWithTeam(this, function(tname, type) {
		if (!mkws.teams[tname]) {
		    mkws.teams[tname] = team(j, tname);
		    log("Made MKWS team '" + tname + "'");
		}
	    });
	});

        makeWidgetsWithin(1, $(':root'));
        
	var now = $.now();
	log("Walking MKWS nodes took " + (now-then) + " ms");

//        for (var tName in mkws.teams) {
//            var myTeam = mkws.teams[tName]
//            var types = myTeam.widgetTypes();
//            log("TEAM '" + tName + "' = " + myTeam + " has widget types " + types);
//            for (var i = 0; i < types.length; i++) {
//                var type = types[i];
//                log("  has widget of type '" + type + "': " + myTeam.widget(type));
//            }
//        }

	if (mkws.config.use_service_proxy) {
	    authenticateSession(mkws.config.service_proxy_auth,
				mkws.config.service_proxy_auth_domain,
				mkws.config.pazpar2_url);
	} else {
	    // raw pp2
	    runAutoSearches();
	}
    });
})(jQuery);

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
    log_level: 1, // Will be overridden from mkws_config, but
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


// Define empty mkws_config for simple applications that don't define it.
if (mkws_config == null || typeof mkws_config != 'object') {
    var mkws_config = {};
}


// wrapper to call team() after page load
(function (j) {
    function log(string) {
	if (!mkws.log_level)
	    return;

	if (typeof console === "undefined" || typeof console.log === "undefined") { /* ARGH!!! old IE */
	    return;
	}

	// you need to disable use strict at the top of the file!!!
	if (mkws.log_level >= 3) {
	    console.log(arguments.callee.caller);
	} else if (mkws.log_level >= 2) {
	    console.log(">>> called from function " + arguments.callee.caller.name + ' <<<');
	}
	console.log(string);
    }
    mkws.log = log;


    mkws.registerWidgetType = function(name, fn) {
	mkws.widgetType2function[name] = fn;
	log("registered widget-type '" + name + "'");
    }

    mkws.promotionFunction = function(name) {
	return mkws.widgetType2function[name];
    }


    function handleNodeWithTeam(node, callback) {
	// First branch for DOM objects; second branch for jQuery objects
	var classes = node.className || node.attr('class');
	if (!classes) {
	    // For some reason, if we try to proceed when classes is
	    // undefined, we don't get an error message, but this
	    // function and its callers, up several stack level,
	    // silently return. What a crock.
	    mkws.log("handleNodeWithTeam() called on node with no classes");
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
	callback.call(node, teamName, type);
    }


    function resizePage() {
	var list = ["mkwsSwitch", "mkwsLang"];

	var width = mkws_config.responsive_design_width;
	var parent = $(".mkwsTermlists").parent();

	if ($(window).width() <= width &&
	    parent.hasClass("mkwsTermlistContainer1")) {
	    log("changing from wide to narrow: " + $(window).width());
	    $(".mkwsTermlistContainer1").hide();
	    $(".mkwsTermlistContainer2").show();
	    for (var tname in mkws.teams) {
		$(".mkwsTermlists.mkwsTeam_" + tname).appendTo($(".mkwsTermlistContainer2.mkwsTeam_" + tname));
		for(var i = 0; i < list.length; i++) {
		    $("." + list[i] + ".mkwsTeam_" + tname).hide();
		}
	    }
	} else if ($(window).width() > width &&
		   parent.hasClass("mkwsTermlistContainer2")) {
	    log("changing from narrow to wide: " + $(window).width());
	    $(".mkwsTermlistContainer1").show();
	    $(".mkwsTermlistContainer2").hide();
	    for (var tname in mkws.teams) {
		$(".mkwsTermlists.mkwsTeam_" + tname).appendTo($(".mkwsTermlistContainer1.mkwsTeam_" + tname));
		for(var i = 0; i < list.length; i++) {
		    $("." + list[i] + ".mkwsTeam_" + tname).show();
		}
	    }
	}
    };


    // The following functions are dispatchers for team methods that
    // are called from the UI using a team-name rather than implicit
    // context. Apart from mkws.log, they are the ONLY public UI to
    // this module.
    mkws.switchView = function(tname, view) {
	mkws.teams[tname].switchView(view);
    }

    mkws.showDetails = function (tname, prefixRecId) {
	mkws.teams[tname].showDetails(prefixRecId);
    }

    mkws.limitTarget  = function (tname, id, name) {
	mkws.teams[tname].limitTarget(id, name);
    }

    mkws.limitQuery  = function (tname, field, value) {
	mkws.teams[tname].limitQuery(field, value);
    }

    mkws.delimitTarget = function (tname, id) {
	mkws.teams[tname].delimitTarget(id);
    }

    mkws.delimitQuery = function (tname, field, value) {
	mkws.teams[tname].delimitQuery(field, value);
    }

    mkws.showPage = function (tname, pageNum) {
	mkws.teams[tname].showPage(pageNum);
    }

    mkws.pagerPrev = function (tname) {
	mkws.teams[tname].pagerPrev();
    }

    mkws.pagerNext = function (tname) {
	mkws.teams[tname].pagerNext();
    }


    function defaultMkwsConfig() {
	/* default mkws config */
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

	// Set global log_level flag early so that log() works
	// Fall back to old "debug_level" setting for backwards compatibility
	var tmp = mkws_config.log_level;
	if (typeof(tmp) === 'undefined') tmp = mkws_config.debug_level;

	if (typeof(tmp) !== 'undefined') {
	    mkws.log_level = tmp;
	} else if (typeof(config_default.log_level) !== 'undefined') {
	    mkws.log_level = config_default.log_level;
	}

	// make sure the mkws_config is a valid hash
	if (!$.isPlainObject(mkws_config)) {
	    log("ERROR: mkws_config is not an JS object, ignore it....");
	    mkws_config = {};
	}

	/* override standard config values by function parameters */
	for (var k in config_default) {
	    if (typeof mkws_config[k] === 'undefined')
		mkws_config[k] = config_default[k];
	    //log("Set config: " + k + ' => ' + mkws_config[k]);
	}
    }


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
	    mkws.authName = $(data).find("displayName").text();
	    log("authName='" + mkws.authName + "'");
	    runAutoSearches();
	});
    }


    function runAutoSearches() {
	log("running auto searches");

	for (var teamName in mkws.teams) {
	    mkws.teams[teamName].runAutoSearch();
	}
    }


    $(document).ready(function() {
	defaultMkwsConfig();

	if (mkws_config.query_width < 5 || mkws_config.query_width > 150) {
	    log("Reset query width: " + mkws_config.query_width);
	    mkws_config.query_width = 50;
	}

	for (var key in mkws_config) {
	    if (mkws_config.hasOwnProperty(key)) {
		if (key.match(/^language_/)) {
		    var lang = key.replace(/^language_/, "");
		    // Copy custom languages into list
		    mkws.locale_lang[lang] = mkws_config[key];
		    log("Added locally configured language '" + lang + "'");
		}
	    }
	}

	if (mkws_config.responsive_design_width) {
	    // Responsive web design - change layout on the fly based on
	    // current screen width. Required for mobile devices.
	    $(window).resize(resizePage);
	    // initial check after page load
	    $(document).ready(resizePage);
	}

	// protocol independent link for pazpar2: "//mkws/sp" -> "https://mkws/sp"
	if (mkws_config.pazpar2_url.match(/^\/\//)) {
	    mkws_config.pazpar2_url = document.location.protocol + mkws_config.pazpar2_url;
	    log("adjust protocol independent links: " + mkws_config.pazpar2_url);
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

	// For all MKWS-classed nodes that don't have a team
	// specified, set the team to AUTO.
	$('[class^="mkws"],[class*=" mkws"]').each(function () {
	    if (!this.className.match(/mkwsTeam_/)) {
		log("adding AUTO team to node with class '" + this.className + "'");
		$(this).addClass('mkwsTeam_AUTO');
	    }
	});

	// Find all nodes with an MKWS class, and determine their team from
	// the mkwsTeam_* class. Make all team objects.
	var then = $.now();
	$('[class^="mkws"],[class*=" mkws"]').each(function () {
	    handleNodeWithTeam(this, function(tname, type) {
		if (!mkws.teams[tname]) {
		    mkws.teams[tname] = team(j, tname);
		    log("Made MKWS team '" + tname + "'");
		}
	    });
	});
	// Second pass: make the individual widget objects. This has
	// to be done separately, and after the team-creation, since
	// that sometimes makes new widget nodes (e.g. creating
	// mkwsTermlists inside mkwsResults.
	$('[class^="mkws"],[class*=" mkws"]').each(function () {
	    handleNodeWithTeam(this, function(tname, type) {
		var myTeam = mkws.teams[tname];
		var myWidget = widget(j, myTeam, type, this);
	    });
	});
	var now = $.now();
	log("Walking MKWS nodes took " + (now-then) + " ms");

	if (mkws_config.use_service_proxy) {
	    authenticateSession(mkws_config.service_proxy_auth,
				mkws_config.service_proxy_auth_domain,
				mkws_config.pazpar2_url);
	} else {
	    // raw pp2
	    runAutoSearches();
	}
    });
})(jQuery);

/* A very simple client that shows a basic usage of the pz2.js
*/

"use strict"; // HTML5: disable for debug >= 2

/* 
 * global config object: mkws_config 
 * 
 * needs to be defined in the HTML header before 
 * including this JS file
 */

if (!mkws_config)
    var mkws_config = {}; // for the guys who forgot to define mkws_config...

if (typeof mkws_config.use_service_proxy === 'undefined')
    mkws_config.use_service_proxy = true;

var mkws_debug = 1;

var pazpar2_url = mkws_config.pazpar2_url ? mkws_config.pazpar2_url : "/pazpar2/search.pz2";
var service_proxy_url = mkws_config.service_proxy_url ? mkws_config.service_proxy_url : "http://mkws.indexdata.com/service-proxy/";

var pazpar2path = mkws_config.use_service_proxy ? service_proxy_url : pazpar2_url;
var usesessions = mkws_config.use_service_proxy ? false : true;


var mkws_locale_lang = {
    "de": {
	"Authors": "Autoren",
	"Subjects": "Schlagw&ouml;rter",
	"Sources": "Daten und Quellen",
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
	"Date": "Datum",
	"Subject": "Schlagwort",
	"Location": "Ort",

	"dummy": "dummy"
    },

    "da": {
	"Authors": "Forfattere",
	"Subjects": "Emner",
	"Sources": "Kilder",
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
	"Date": "Dato",
	"Subject": "Emneord",
	"Location": "Lokation",

	"dummy": "dummy"
    }
};

// create a parameters array and pass it to the pz2's constructor
// then register the form submit event with the pz2.search function
// autoInit is set to true on default
var my_paz = new pz2( { "onshow": my_onshow,
                    "showtime": 500,            //each timer (show, stat, term, bytarget) can be specified this way
                    "pazpar2path": pazpar2path,
                    "oninit": my_oninit,
                    "onstat": my_onstat,
                    "onterm": my_onterm,
                    "termlist": "xtargets,subject,author",
                    "onbytarget": my_onbytarget,
	 	    "usesessions" : usesessions,
                    "showResponseType": '', // or "json" (for debugging?)
                    "onrecord": my_onrecord } );
// some state vars
var curPage = 1;
var recPerPage = 20;
var totalRec = 0;
var curDetRecId = '';
var curDetRecData = null;
var curSort = 'relevance';
var curFilter = null;
var submitted = false;
var SourceMax = 16;
var SubjectMax = 10;
var AuthorMax = 10;

//
// pz2.js event handlers:
//
function my_oninit() {
    my_paz.stat();
    my_paz.bytarget();
}

function my_onshow(data) {
    totalRec = data.merged;
    // move it out
    var pager = document.getElementById("pager");
    pager.innerHTML = "";
    pager.innerHTML +='<hr/><div style="float: right">' + M('Displaying') + ': '
                    + (data.start + 1) + ' ' + M('to') + ' ' + (data.start + data.num) +
                     ' ' + M('of') + ' ' + data.merged + ' (' + M('found') + ': '
                     + data.total + ')</div>';
    drawPager(pager);
    // navi
    var results = document.getElementById("results");

    var html = [];
    for (var i = 0; i < data.hits.length; i++) {
        var hit = data.hits[i];
	      html.push('<div class="record" id="recdiv_'+hit.recid+'" >'
            +'<span>'+ (i + 1 + recPerPage * (curPage - 1)) +'. </span>'
            +'<a href="#" id="rec_'+hit.recid
            +'" onclick="showDetails(this.id);return false;"><b>'
            + hit["md-title"] +' </b></a>');
	      if (hit["md-title-remainder"] !== undefined) {
	        html.push('<span>' + hit["md-title-remainder"] + ' </span>');
	      }
	      if (hit["md-title-responsibility"] !== undefined) {
    	    html.push('<span><i>'+hit["md-title-responsibility"]+'</i></span>');
      	}
        if (hit.recid == curDetRecId) {
            html.push(renderDetails(curDetRecData));
        }
      	html.push('</div>');
    }
    replaceHtml(results, html.join(''));
}

function my_onstat(data) {
    var stat = document.getElementById("mkwsStat");
    if (stat == null)
	return;

    stat.innerHTML = '<span class="head">Status info</span>' +
	' -- ' +
	'<span class="clients">' + data.activeclients + '/' + data.clients + '</span>' +
	' -- ' +
        '<span class="records">' + data.records + '/' + data.hits + '</span>';
}

function my_onterm(data) {
    if (!mkws_config.termlist_menu)
	return;
    
    var termlists = [];
    termlists.push('<div class="title">' + M('Termlists') + '</div>');

    termlists.push('<div class="termlist">');
    termlists.push('<div class="termtitle">' + M('Sources') + '</div>');
    for (var i = 0; i < data.xtargets.length && i < SourceMax; i++ ) {
        termlists.push('<a href="#" target_id='+data.xtargets[i].id
            + ' onclick="limitTarget(this.getAttribute(\'target_id\'), this.firstChild.nodeValue);return false;">' + data.xtargets[i].name
        + ' </a><span> (' + data.xtargets[i].freq + ')</span><br/>');
    }
    termlists.push('</div>');

    termlists.push('<div class="termlist">');
    termlists.push('<hr/><div class="termtitle">' + M('Subjects') + '</div>');
    for (var i = 0; i < data.subject.length && i < SubjectMax; i++ ) {
        termlists.push('<a href="#" onclick="limitQuery(\'su\', this.firstChild.nodeValue);return false;">' + data.subject[i].name + '</a><span>  ('
              + data.subject[i].freq + ')</span><br/>');
    }
    termlists.push('</div>');

    termlists.push('<div class="termlist">');
    termlists.push('<hr/><div class="termtitle">' + M('Authors') + '</div>');
    for (var i = 0; i < data.author.length && i < AuthorMax; i++ ) {
        termlists.push('<a href="#" onclick="limitQuery(\'au\', this.firstChild.nodeValue);return false;">'
                            + data.author[i].name
                            + ' </a><span> ('
                            + data.author[i].freq
                            + ')</span><br/>');
    }
    termlists.push('</div>');

    var termlist = document.getElementById("termlist");
    replaceHtml(termlist, termlists.join(''));
}

function my_onrecord(data) {
    // FIXME: record is async!!
    clearTimeout(my_paz.recordTimer);
    // in case on_show was faster to redraw element
    var detRecordDiv = document.getElementById('det_'+data.recid);
    if (detRecordDiv) return;
    curDetRecData = data;
    var recordDiv = document.getElementById('recdiv_'+curDetRecData.recid);
    var html = renderDetails(curDetRecData);
    recordDiv.innerHTML += html;
}

function my_onbytarget(data) {
    var targetDiv = document.getElementById("bytarget");
    var table ='<table><thead><tr><td>Target ID</td><td>Hits</td><td>Diags</td>'
        +'<td>Records</td><td>State</td></tr></thead><tbody>';

    for (var i = 0; i < data.length; i++ ) {
        table += "<tr><td>" + data[i].id +
            "</td><td>" + data[i].hits +
            "</td><td>" + data[i].diagnostic +
            "</td><td>" + data[i].records +
            "</td><td>" + data[i].state + "</td></tr>";
    }

    table += '</tbody></table>';
    targetDiv.innerHTML = table;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// wait until the DOM is ready
function domReady ()
{
    document.search.onsubmit = onFormSubmitEventHandler;
    document.search.query.value = '';
    document.select.sort.onchange = onSelectDdChange;
    document.select.perpage.onchange = onSelectDdChange;
}

// when search button pressed
function onFormSubmitEventHandler()
{
    resetPage();
    loadSelect();
    triggerSearch();
    switchView('records'); // In case it's configured to start off as hidden
    submitted = true;
    return false;
}

function onSelectDdChange()
{
    if (!submitted) return false;
    resetPage();
    loadSelect();
    my_paz.show(0, recPerPage, curSort);
    return false;
}

function resetPage()
{
    curPage = 1;
    totalRec = 0;
}

function triggerSearch ()
{
    my_paz.search(document.search.query.value, recPerPage, curSort, curFilter);
}

function loadSelect ()
{
    curSort = document.select.sort.value;
    recPerPage = document.select.perpage.value;
}

// limit the query after clicking the facet
function limitQuery (field, value)
{
    document.search.query.value += ' and ' + field + '="' + value + '"';
    onFormSubmitEventHandler();
}

// limit by target functions
function limitTarget (id, name)
{
    var navi = document.getElementById('navi');
    navi.innerHTML =
        'Source: <a class="crossout" href="#" onclick="delimitTarget();return false;">'
        + name + '</a>';
    navi.innerHTML += '<hr/>';
    curFilter = 'pz:id=' + id;
    resetPage();
    loadSelect();
    triggerSearch();
    return false;
}

function delimitTarget ()
{
    var navi = document.getElementById('navi');
    navi.innerHTML = '';
    curFilter = null;
    resetPage();
    loadSelect();
    triggerSearch();
    return false;
}

function drawPager (pagerDiv)
{
    //client indexes pages from 1 but pz2 from 0
    var onsides = 6;
    var pages = Math.ceil(totalRec / recPerPage);

    var firstClkbl = ( curPage - onsides > 0 )
        ? curPage - onsides
        : 1;

    var lastClkbl = firstClkbl + 2*onsides < pages
        ? firstClkbl + 2*onsides
        : pages;

    var prev = '<span id="prev">&#60;&#60; ' + M('Prev') + '</span><b> | </b>';
    if (curPage > 1)
        prev = '<a href="#" id="prev" onclick="pagerPrev();">'
        +'&#60;&#60; ' + M('Prev') + '</a><b> | </b>';

    var middle = '';
    for(var i = firstClkbl; i <= lastClkbl; i++) {
        var numLabel = i;
        if(i == curPage)
            numLabel = '<b>' + i + '</b>';

        middle += '<a href="#" onclick="showPage(' + i + ')"> '
            + numLabel + ' </a>';
    }

    var next = '<b> | </b><span id="next">' + M('Next') + ' &#62;&#62;</span>';
    if (pages - curPage > 0)
        next = '<b> | </b><a href="#" id="next" onclick="pagerNext()">'
        + M('Next') + ' &#62;&#62;</a>';

    var predots = '';
    if (firstClkbl > 1)
        predots = '...';

    var postdots = '';
    if (lastClkbl < pages)
        postdots = '...';

    pagerDiv.innerHTML += '<div style="float: clear">'
        + prev + predots + middle + postdots + next + '</div><hr/>';
}

function showPage (pageNum)
{
    curPage = pageNum;
    my_paz.showPage( curPage - 1 );
}

// simple paging functions

function pagerNext() {
    if ( totalRec - recPerPage*curPage > 0) {
        my_paz.showNext();
        curPage++;
    }
}

function pagerPrev() {
    if ( my_paz.showPrev() != false )
        curPage--;
}

// swithing view between targets and records

function switchView(view) {

    var targets = document.getElementById('mkwsTargets');
    var records = document.getElementById('mkwsRecords');
    var blanket = document.getElementById('mkwsBlanket');

    switch(view) {
        case 'targets':
            targets.style.display = "block";
            records.style.display = "none";
            if (blanket) { blanket.style.display = "none"; }
            break;
        case 'records':
            targets.style.display = "none";
            records.style.display = "block";
            if (blanket) { blanket.style.display = "block"; }
            break;
	case 'none':
            targets.style.display = "none";
            records.style.display = "none";
            if (blanket) { blanket.style.display = "none"; }
            break;
        default:
            alert('Unknown view.');
    }
}

// detailed record drawing
function showDetails (prefixRecId) {
    var recId = prefixRecId.replace('rec_', '');
    var oldRecId = curDetRecId;
    curDetRecId = recId;

    // remove current detailed view if any
    var detRecordDiv = document.getElementById('det_'+oldRecId);
    // lovin DOM!
    if (detRecordDiv)
      detRecordDiv.parentNode.removeChild(detRecordDiv);

    // if the same clicked, just hide
    if (recId == oldRecId) {
        curDetRecId = '';
        curDetRecData = null;
        return;
    }
    // request the record
    my_paz.record(recId);
}

function replaceHtml(el, html) {
  var oldEl = typeof el === "string" ? document.getElementById(el) : el;
  /*@cc_on // Pure innerHTML is slightly faster in IE
    oldEl.innerHTML = html;
    return oldEl;
    @*/
  var newEl = oldEl.cloneNode(false);
  newEl.innerHTML = html;
  oldEl.parentNode.replaceChild(newEl, oldEl);
  /* Since we just removed the old element from the DOM, return a reference
     to the new element, which can be used to restore variable references. */
  return newEl;
};

function renderDetails(data, marker)
{
    var details = '<div class="details" id="det_'+data.recid+'"><table>';
    if (marker) details += '<tr><td>'+ marker + '</td></tr>';
    if (data["md-title"] != undefined) {
        details += '<tr><td><b>' + M('Title') + '</b></td><td><b>:</b> '+data["md-title"];
  	if (data["md-title-remainder"] !== undefined) {
	      details += ' : <span>' + data["md-title-remainder"] + ' </span>';
  	}
  	if (data["md-title-responsibility"] !== undefined) {
	      details += ' <span><i>'+ data["md-title-responsibility"] +'</i></span>';
  	}
 	  details += '</td></tr>';
    }
    if (data["md-date"] != undefined)
        details += '<tr><td><b>' + M('Date') + '</b></td><td><b>:</b> ' + data["md-date"] + '</td></tr>';
    if (data["md-author"] != undefined)
        details += '<tr><td><b>' + M('Author') + '</b></td><td><b>:</b> ' + data["md-author"] + '</td></tr>';
    if (data["md-electronic-url"] != undefined)
        details += '<tr><td><b>URL</b></td><td><b>:</b> <a href="' + data["md-electronic-url"] + '" target="_blank">' + data["md-electronic-url"] + '</a>' + '</td></tr>';
    if (data["location"][0]["md-subject"] != undefined)
        details += '<tr><td><b>' + M('Subject') + '</b></td><td><b>:</b> ' + data["location"][0]["md-subject"] + '</td></tr>';
    if (data["location"][0]["@name"] != undefined)
        details += '<tr><td><b>' + M('Location') + '</b></td><td><b>:</b> ' + data["location"][0]["@name"] + " (" +data["location"][0]["@id"] + ")" + '</td></tr>';
    details += '</table></div>';
    return details;
}

/*
 * All the HTML stuff to render the search forms and
 * result pages.
 */
function mkws_html_all(config) {

    /* default mkws config */
    var mkws_config_default = {
	sort: [["relevance"], ["title:1", "title"], ["date:0", "newest"], ["date:1", "oldest"]],
	perpage: [10, 20, 30, 50],
	sort_default: "relevance",
	perpage_default: 20,
	query_width: 50,
	switch_menu: true, 	/* show/hide Records|Targets menu */
	lang_menu: true, 	/* show/hide language menu */
	lang_display: [], 	/* display languages links for given languages, [] for all */
	termlist_menu: true, 	/* show/hide termlist */
	debug: 0,     /* debug level for development: 0..2 */

	dummy: "dummy"
    };

    /* set global debug flag early */
    if (config.debug !== 'undefined') {
	mkws_debug = config.debug;
    } else if (mkws_config_default.debug !== 'undefined') {
	mkws_debug = mkws_config_default.debug;
    }
    
    /* override standard config values by function parameters */
    for (var k in mkws_config_default) {
	if (typeof config[k] === 'undefined')
	   mkws_config[k] = mkws_config_default[k];
	debug("Set config: " + k + ' => ' + mkws_config[k]);
    }

    if (mkws_config.query_width < 5 || mkws_config.query_width > 150) {
	debug("Reset query width: " + mkws_config.query_width);
	mkws_config.query_width = 50;
    }
   
    mkws_set_lang(mkws_config); 
    if (mkws_config.lang_menu)
	mkws_html_lang(mkws_config); 

    // For some reason, doing this programmatically results in
    // document.search.query being undefined, hence the raw HTML.
    debug("HTML search form");
    $("#mkwsSearch").html('\
    <form id="searchForm" name="search" action="" >\
      <input id="query" type="text" size="' + mkws_config.query_width + '" />\
      <input id="button" type="submit" value="' + M('Search') + '" />\
    </form>');

    debug("HTML records");
    $("#mkwsRecords").html('\
      <table width="100%" border="0" cellpadding="6" cellspacing="0">\
        <tr>\
          <td width="250" valign="top">\
            <div id="termlist"></div>\
          </td>\
          <td valign="top">\
            <div id="ranking">\
              <form name="select" id="select" action="" >\
        ' + M('Sort by') + mkws_html_sort(config) + '\
        ' + M('and show') + ' ' + mkws_html_perpage(config) + '\
        ' + M('per page') + '.\
       </form>\
            </div>\
            <div id="pager"></div>\
            <div id="navi"></div>\
            <div id="results"></div>\
          </td>\
        </tr>\
      </table>');

    mkws_html_switch(config);
    if (mkws_config.use_service_proxy)
	mkws_service_proxy_auth(config.service_proxy_auth);

    domReady();
}

function mkws_set_lang(mkws_config)  {
    var lang = jQuery.parseQuerystring().lang || mkws_config.lang || "";
    if (!lang || !mkws_locale_lang[lang]) {
	mkws_config.lang = ""
    } else {
	mkws_config.lang = lang;
    }
    
    debug("Locale language: " + (mkws_config.lang ? mkws_config.lang : "none"));
    return mkws_config.lang;
}

function mkws_html_switch(config) {
    debug("HTML switch");
    
    $("#mkwsSwitch").html($("<a/>", {
	href: '#',
	onclick: "switchView(\'records\')",
	text: "Records"
    }));
    $("#mkwsSwitch").append($("<span/>", { text: " | " }));
    $("#mkwsSwitch").append($("<a/>", {
	href: '#',
	onclick: "switchView(\'targets\')",
	text: "Targets"
    }));

    debug("HTML targets");
    $("#mkwsTargets").html('\
      <div id="bytarget">\
       No information available yet.\
      </div>');
    $("#mkwsTargets").css("display", "none");

    if (!config.switch_menu) {
	debug("disable switch menu");
        $("#mkwsSwitch").css("display", "none");
    }
}

function mkws_html_sort(config) {
    debug("HTML sort");
    var sort_html = '<select name="sort" id="sort">';

    for(var i = 0; i < config.sort.length; i++) {
	var key = config.sort[i][0];
	var val = config.sort[i].length == 1 ? config.sort[i][0] : config.sort[i][1];

	sort_html += '<option value="' + key + '"';
	if (key == config.sort_default) {
	    sort_html += ' selected="selected"';
	}
	sort_html += '>' + val + '</option>';
    }
    sort_html += '</select>';

    return sort_html;
}

function mkws_html_perpage(config) {
    debug("HTML perpage");
    var perpage_html = '<select name="perpage" id="perpage">';

    for(var i = 0; i < config.perpage.length; i++) {
	var key = config.perpage[i];

	perpage_html += '<option value="' + key + '"';
	if (key == config.perpage_default) {
	    perpage_html += ' selected="selected"';
	}
	perpage_html += '>' + key + '</option>';
    }
    perpage_html += '</select>';

    return perpage_html;
}

/*
 * Run service-proxy authentication in background (after page load).
 * The username/password is configured in the apache config file
 * for the site.
 */
function mkws_service_proxy_auth(auth_url) {
    if (!auth_url)
	auth_url = "http://mkws.indexdata.com/service-proxy-auth";
	
    debug("Run service proxy auth URL: " + auth_url);

    var request = new pzHttpRequest(auth_url);
    request.get(null, function(data) {
	if (!jQuery.isXMLDoc(data)) {
	    alert("service proxy auth response document is not valid XML document, give up!");
	    return;
	}
	var status = $(data).find("status");
	if (status.text() != "OK") {
	    alert("service proxy auth repsonse status: " + status.text() + ", give up!");
	    return;
	}
    });
}

/* create locale language menu */
function mkws_html_lang(mkws_config) {
    var lang_default = "en";
    var lang = mkws_config.lang || lang_default;
    var list = [];

    /* display a list of configured languages, or all */
    var lang_display = mkws_config.lang_display || [];
    var hash = {};
    for (var i = 0; i < lang_display.length; i++) {
	hash[lang_display[i]] = 1;
    }
    
    for (var k in mkws_locale_lang) {
	if (hash[k] == 1 || lang_display.length == 0)
	    list.push(k);
    }

    // add english link
    if (lang_display.length == 0 || hash[lang_default] == 1)
        list.push(lang_default);

    debug("Language menu for: " + list.join(", "));

    /* the HTML part */
    var data = "";    
    for(var i = 0; i < list.length; i++) {
	var l = list[i];
	
	if (data)
	    data += ' | ';
	    
	if (lang == l) {
	    data += l;
	} else {
	    data += ' <a href="?lang=' + l + '">' + l + '</a> '
	}
    }
    
    $("#mkwsLang").html(data);
}

/* locale */
function M(word) {
    var lang = mkws_config.lang;

    if (!lang || !mkws_locale_lang[lang])
	return word;

    return mkws_locale_lang[lang][word] ? mkws_locale_lang[lang][word] : word;
}

/* implement jQuery.parseQuerystring() for parsing URL parameters */
jQuery.extend({
  parseQuerystring: function() {
    var nvpair = {};
    var qs = window.location.search.replace('?', '');
    var pairs = qs.split('&');
    $.each(pairs, function(i, v){
	var pair = v.split('=');
	nvpair[pair[0]] = pair[1];
    });
    return nvpair;
  }, 
  pazpar2: function(data) {
	document.write('<div id="mkwsSwitch"></div>\
    <div id="mkwsLang"></div>\
    <div id="mkwsSearch"></div>\
    <div id="mkwsRecords"></div>\
    <div id="mkwsTargets"></div>\
    <div id="footer">\
      <div id="mkwsStat"></div>\
      <span>Powered by MKWS &copy; 2013 <a href="http://www.indexdata.com">Index Data</a></span>\
    </div>');

    mkws_html_all(mkws_config);
  }
});

function debug(string) {
    if (!mkws_debug)
	return;

    if (typeof console === "undefined" || typeof console.log === "undefined") { /* ARGH!!! old IE */
	return;
    }

    // you need to disable use strict at the top of the file!!!
    if (mkws_debug >= 3) {
	console.log(arguments.callee.caller);
    } else if (mkws_debug >= 2) {
	console.log(">>> called from function " + arguments.callee.caller.name + ' <<<');
    }
    console.log(string);
}

/* magic */
$(document).ready(function() { mkws_html_all(mkws_config) });

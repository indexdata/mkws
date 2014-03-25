/*! jQuery plugin for MKWS, the MasterKey Widget Set.
 *  Copyright (C) 2013-2014 Index Data
 *  See the file LICENSE for details
 */

"use strict";


/*
 * implement jQuery plugin $.pazpar2({})
 */
function _mkws_jquery_plugin ($) {
    function debug (string) {
	mkws.log("jquery.pazpar2: " + string);
    }

    function init_popup(obj) {
	var config = obj ? obj : {};

	var height = config.height || 760;
	var width = config.width || 880;
	var id_button = config.id_button || "input.mkwsButton";
	var id_popup = config.id_popup || "#mkwsPopup";

	debug("popup height: " + height + ", width: " + width);

	// make sure that jquery-ui was loaded afte jQuery core lib, e.g.:
	// <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>
	if (!$.ui) {
	    debug("Error: jquery-ui.js is missing, did you include it after jQuery core in the HTML file?");
	    return;
	}

	$(id_popup).dialog({
	    closeOnEscape: true,
	    autoOpen: false,
	    height: height,
	    width: width,
	    modal: true,
	    resizable: true,
	    buttons: {
		Cancel: function() {
		    $(this).dialog("close");
		}
	    },
	    close: function() { }
	});

	$(id_button)
	    .button()
	    .click(function() {
		$(id_popup).dialog("open");
	    });
    };

    $.extend({

	// service-proxy or pazpar2
	pazpar2: function(config) {
	    if (config == null || typeof config != 'object') { 
		config = {};
	    }
	    var id_popup = config.id_popup || "#mkwsPopup";
	    id_popup = id_popup.replace(/^#/, "");

	    // simple layout
	    var div = '\
<div id="mkwsSwitch"></div>\
<div id="mkwsLang"></div>\
<div id="mkwsSearch"></div>\
<div id="mkwsResults"></div>\
<div id="mkwsTargets"></div>\
<div id="mkwsStat"></div>';

	    // new table layout
	    var table = '\
<style type="text/css">\
  #mkwsTermlists div.facet {\
  float:left;\
  width: 30%;\
  margin: 0.3em;\
  }\
  #mkwsStat {\
  text-align: right;\
  }\
</style>\
    \
<table width="100%" border="0">\
  <tr>\
    <td>\
      <div id="mkwsSwitch"></div>\
      <div id="mkwsLang"></div>\
      <div id="mkwsSearch"></div>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      <div style="height:500px; overflow: auto">\
	<div id="mkwsPager"></div>\
	<div id="mkwsNavi"></div>\
	<div id="mkwsRecords"></div>\
	<div id="mkwsTargets"></div>\
	<div id="mkwsRanking"></div>\
      </div>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      <div style="height:300px; overflow: hidden">\
	<div id="mkwsTermlists"></div>\
      </div>\
    </td>\
  </tr>\
  <tr>\
    <td>\
      <div id="mkwsStat"></div>\
    </td>\
  </tr>\
</table>';

	    var popup = '\
<div id="mkwsSearch"></div>\
<div id="' + id_popup + '">\
  <div id="mkwsSwitch"></div>\
  <div id="mkwsLang"></div>\
  <div id="mkwsResults"></div>\
  <div id="mkwsTargets"></div>\
  <div id="mkwsStat"></div>\
</div>'

	    if (config && config.layout == 'div') {
		debug("jquery plugin layout: div");
		document.write(div);
	    } else if (config && config.layout == 'popup') {
		debug("jquery plugin layout: popup with id: " + id_popup);
		document.write(popup);
		$(document).ready(function() { init_popup(config); });
	    } else {
		debug("jquery plugin layout: table");
		document.write(table);
	    }
	}
    });
};


(function (j) {
    // enable before page load, so we could call it before mkws() runs
    _mkws_jquery_plugin(j);
})(jQuery);

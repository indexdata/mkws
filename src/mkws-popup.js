/* generic function to open results in a popup window
 *
 */

// "use strict";

$(document).ready(function () {
    // mkws.registerWidgetType('PopupWindow', function() {
    var $ = mkws.$;
    var debug = mkws.log;
    debug("init popup window");

    if (!$.ui) {
        alert("Error: jquery-ui.js is missing, did you include it after jQuery core in the HTML file?");
        return;
    }

    var popup = $(".PopupWindow");
    if (!popup) {
        debug("no popup found");
        return;
    } else {
        debug("found popup windows: " + popup.length);
    }

    var width = parseInt($(popup).attr("popup_width") || "800");
    var height = parseInt($(popup).attr("popup_height") || "600");
    var autoOpen = parseInt($(popup).attr("popup_autoOpen") || "0");

    $(popup).dialog({
        closeOnEscape: true,
        autoOpen: autoOpen,
        height: height,
        width: width,
        modal: true,
        resizable: true,
        buttons: {
            Cancel: function () {
                $(popup).dialog("close");
            }
        },
        close: function () {}
    });
});

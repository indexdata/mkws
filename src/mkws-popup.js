/* generic function to open results in a popup window
 *
 */

"use strict";

// $(document).ready(function () {
mkws.registerWidgetType('Popup', function() {
    var $ = mkws.$;
    var debug = mkws.log;
    debug("init popup window");

    if (!$.ui) {
        alert("Error: jquery-ui.js is missing, did you include it after jQuery core in the HTML file?");
        return;
    }

    var popup_window = $(this.node);       // mkws.registerWidgetType('Popup',....)
    // var popup_window = $(".mkwsPopup"); // $(document).ready()

    if (!popup_window) {
        debug("no popup found, skip");
        return;
    } else {
        debug("found popup windows: " + popup_window.length);
    }

    // more than one widget on a page are possible
    popup_window.each(function (i) {
        var that = $(this);

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
                Cancel: function () {
                    that.dialog("close");
                }
            },
            close: function () {}
        });

        // open at search query submit
        var id_botton = that.attr("popup_button");
        if (id_botton) {
            $(id_botton).button().click(function () {
                that.dialog("open");
            });
        }
    });
});

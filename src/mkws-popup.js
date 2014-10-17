/* generic function to open results in a popup window
 *
 */

//"use strict";
// $(document).ready(function () {
mkws.registerWidgetType('popup', function() {
    var $ = mkws.$;
    var debug = mkws.log;
    debug("init popup window");

    var popup_window = $(this.node);
    // var popup_window = $(".mkws-popup"); // $(document).ready()
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

        // open at search query submit: "input.mkws-button"
        var id_botton = that.attr("popup_button");
        if (id_botton) {
            $(id_botton).button().click(function() {
                that.dialog("open");
            });
        }
    });
});

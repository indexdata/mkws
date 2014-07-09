/* generic function to open results in a popup window
 *
 */

// "use strict";

mkws.registerWidgetType('Popup', function() {
  alert("running popup");

  if (!mkws.$.ui) {
      alert("Error: jquery-ui.js is missing, did you include it after jQuery core in the HTML file?");
      return;
  }

  if (!this.config.popup_width) this.config.popup_width = "800";
  if (!this.config.popup_height) this.config.popup_height = "600";
  if (!this.config.auto_open) this.config.auto_open = "0";

  $(this).dialog({
      closeOnEscape: true,
      autoOpen: parseInt(this.config.auto_open) ? true : false,
      height: parseInt(this.config.popup_height),
      width: parseInt(this.config.popup_width),
      modal: true,
      resizable: true,
      buttons: {
        Cancel: function() {
          $(this).dialog("close");
        }
      },
      close: function() { }
  });

});


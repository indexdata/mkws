mkws.registerWidgetType('wikicategories', function() {
  $.ajax({
    url: mkws.pazpar2_url() + "?command=wiki&query=" + this.config.autosearch,
    context: this
  })
  .done(function(data) {
    outstr = new XMLSerializer().serializeToString(data.getElementsByTagName("targetcategories").item(0));
    this.node.html(outstr.replace("targetcategories", "ul").replace(/targetcategory/g, "li"));
  });
});



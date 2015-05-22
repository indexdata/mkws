mkws.registerWidgetType('categories', function() {
  var that = this;

  this.team.queue("authenticated").subscribe(function(authName, realm) {
    var req = new pzHttpRequest(mkws.pazpar2_url() + "?command=categories", function(err) {
      alert("HTTP call for categories failed: " + err)
    });

    req.get(null, function(data) {
      if (!$.isXMLDoc(data)) {
        alert("categories response document is not XML");
        return;
      }
      that.info("got categories: " + data);

      var text = [];
      text.push("Select category: ");
      text.push("<select name='mkws-category mkwsCategory' " +
                "onchange='mkws.limitCategory(\"" + that.team.name() + "\", this.value)'>");
      text.push("<option value=''>[All]</option>");
      $(data).find('category').each(function() {
        var name = $(this).find('categoryName').text();
        var id = $(this).find('categoryId').text();
        text.push("<option value='", id, "'>", name, "</option>");
      });
      text.push("</select>");
      that.node.html(text.join(''));
    });
  });
});

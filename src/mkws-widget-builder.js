mkws.registerWidgetType('builder', function() {
  var that = this;
  var team = this.team;

  var button = mkws.$('<button/>', {
    type: 'button',
    text: this.config.text || "Build!"
  });
  this.node.append(button);
  button.click(function() {
    var   query = team.widget('query').value();
    var    sort = team.widget('sort').value();
    var perpage = team.widget('per-page').value();

    var html = ('<div class="mkws-records mkwsRecords" ' +
                'autosearch="' + query + '" ' +
                'sort="' + sort + '" ' +
                'perpage="' + perpage + '"></div>');
    var fn = that.callback || alert;
    fn(html);
  });
});

mkws.registerWidgetType('console-builder', function() {
  mkws.promotionFunction('builder').call(this);
  this.callback = function(s) {
    console.log("generated widget: " + s);
  }
});

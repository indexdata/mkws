mkws.registerWidgetType('Builder', function() {
  var that = this;
  var team = this.team;

  this.button = mkws.$('<button/>', {
    type: 'button',
    text: this.config.text || "Build!"
  });
  this.node.append(this.button);
  this.button.click(function() {
    var   query = team.widget('Query').value();
    var    sort = team.widget('Sort').value();
    var perpage = team.widget('Perpage').value();

    var html = ('<div class="mkwsRecords" ' +
                'autosearch="' + query + '" ' +
                'sort="' + sort + '" ' +
                'perpage="' + perpage + '"></div>');
    var fn = that.callback || alert;
    fn(html);
  });
});

mkws.registerWidgetType('ConsoleBuilder', function() {
  mkws.promotionFunction('Builder').call(this);
  this.callback = function(s) {
    console.log("generated widget: " + s);
  }
});

// A widget for a record-list of a single record
mkws.registerWidgetType('record', function() {
  if (!this.config.maxrecs) this.config.maxrecs = 1;
  var that = this;
  var team = this.team;
  team.queue("records").subscribe(function(data) {
    var template = team.loadTemplate(that.config.template || "details");
    var targs = mkws.$.extend({}, data.hits[0], that.config.template_vars);
    that.node.html(template(targs));
  });
  that.autosearch();
});

mkws.registerWidgetType('images', function() {
  mkws.promotionFunction('records').call(this);
  if (!this.config.template) this.config.template = 'images';
});

mkws.registerWidgetType('google-image', function() {
  mkws.promotionFunction('images').call(this);
  if (!this.config.target) this.config.target = 'Google_Images';
});

mkws.registerWidgetType('lolcat', function() {
  mkws.promotionFunction('google-image').call(this);
  if (!this.config.autosearch) this.config.autosearch = 'kitteh';
});

mkws.registerWidgetType('cover-art', function() {
  mkws.promotionFunction('images').call(this);
  if (!this.config.target) this.config.target = 'AmazonBooks';
});

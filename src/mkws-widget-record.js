// A widget for one record
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

mkws.registerWidgetType('image', function() {
  mkws.promotionFunction('records').call(this);
  if (!this.config.template) this.config.template = 'Image';
});

mkws.registerWidgetType('google-image', function() {
  mkws.promotionFunction('image').call(this);
  if (!this.config.target) this.config.target = 'Google_Images';
});

mkws.registerWidgetType('lolcat', function() {
  mkws.promotionFunction('google-image').call(this);
  if (!this.config.autosearch) this.config.autosearch = 'kitteh';
});

mkws.registerWidgetType('cover-art', function() {
  mkws.promotionFunction('image').call(this);
  if (!this.config.target) this.config.target = 'AmazonBooks';
});

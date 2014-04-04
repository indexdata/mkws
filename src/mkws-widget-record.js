mkws.registerWidgetType('Record', function() {
    mkws.promotionFunction('Records').call(this);
    if (!this.config.maxrecs) this.config.maxrecs = 1;
});

mkws.registerWidgetType('Image', function() {
    mkws.promotionFunction('Record').call(this);
    if (!this.config.template) this.config.template = 'Image';
});

mkws.registerWidgetType('GoogleImage', function() {
    mkws.promotionFunction('Image').call(this);
    if (!this.config.target) this.config.target = 'Google_Images';
});

mkws.registerWidgetType('Lolcat', function() {
    mkws.promotionFunction('GoogleImage').call(this);
    if (!this.config.autosearch) this.config.autosearch = 'kitteh';
});

mkws.registerWidgetType('Coverart', function() {
    mkws.promotionFunction('Image').call(this);
    if (!this.config.target) this.config.target = 'AmazonBooks';
});

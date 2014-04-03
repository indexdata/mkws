mkws.registerWidgetType('Image', function() {
    mkws.promotionFunction('Record').call(this);
    if (!this.config.template) this.config.template = 'Image';
});

mkws.registerWidgetType('GoogleImage', function() {
    mkws.promotionFunction('Image').call(this);
    if (!this.config.target) this.config.target = 'Google_Images';
});

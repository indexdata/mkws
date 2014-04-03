mkws.registerWidgetType('Image', function() {
    mkws.promotionFunction('Record').call(this);
    if (!this.config.template) this.config.template = 'Image';
});

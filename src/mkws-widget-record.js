mkws.registerWidgetType('Record', function() {
    mkws.promotionFunction('Records').call(this);
    if (!this.config.maxrecs) this.config.maxrecs = 1;
});

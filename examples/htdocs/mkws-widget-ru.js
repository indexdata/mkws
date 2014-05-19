mkws.registerWidgetType('ReferenceUniverse', function() {
    //this.team.config.service_proxy_auth = "http://mkws.indexdata.com/service-proxy/?command=auth&action=login&username=paratext&password=paratext_mkc";
    // this.team.config.perpage_default = 5;
    // this.team.config.sort_default = "position";
    this.node.html("<h2>Reference Universe results:</h2>\n" +
                   this.subwidget('Records', { sort: 'position', perpage: 5 }));
});

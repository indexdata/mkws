mkws.registerWidgetType('ReferenceUniverse', function() {
    //this.team.config.service_proxy_auth = "http://mkws.indexdata.com/service-proxy/?command=auth&action=login&username=paratext&password=paratext_mkc";
    // this.team.config.perpage_default = 5;
    // this.team.config.sort_default = "position";
    var teamClass = 'mkwsTeam_' + this.team.name();
    var html = "<h2>Reference Universe results:</h2>\n";
    html += '<div class="mkwsRecords ' + teamClass 
            + '" autosearch="' + this.node.attr("autosearch")
            + '" sort="position" perpage="5"></div>';
    this.node.html(html);
});

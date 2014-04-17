mkws.registerWidgetType('Categories', function() {
    var that = this;

    if (!this.config.use_service_proxy) {
	alert("can't use categories widget without Service Proxy");
	return;
    }

    this.team.queue("authenticated").subscribe(function(authName, realm) {
	$(that.node).append("<p><b>Categories for " + realm + "</b></p>");	
	var req = new pzHttpRequest(that.config.pazpar2_url + "?command=categories", function(err) {
	    alert("HTTP call for categories failed: " + err)
	});

	req.get(null, function(data) {
	    if (!$.isXMLDoc(data)) {
		alert("categories response document is not XML");
		return;
	    }
	    that.log("got categories: " + data);
	    // Parse once we've figured out the format
	});
    });
});

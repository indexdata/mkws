mkws.registerWidgetType('Categories', function() {
    var that = this;

    if (!this.config.use_service_proxy) {
	alert("can't use categories widget without Service Proxy");
	return;
    }

    this.team.queue("authenticated").subscribe(function(authName, realm) {
	var req = new pzHttpRequest(that.config.pazpar2_url + "?command=categories", function(err) {
	    alert("HTTP call for categories failed: " + err)
	});

	req.get(null, function(data) {
	    if (!$.isXMLDoc(data)) {
		alert("categories response document is not XML");
		return;
	    }
	    that.log("got categories: " + data);

            var text = [];
            text.push("<p><b>Categories for " + realm + "</b></p>");
            text.push("<ul>");
            $(data).find('category').each(function() {
                var name = $(this).find('categoryName').text();
                var id = $(this).find('categoryId').text();
                text.push("<li>");
                text.push('<a href="#" onclick="mkws.setCategory(' + "'" + id + "'" + ')">' + name + '</a>');
                text.push("</li>");
            });
            text.push("</ul>");
	    $(that.node).html(text.join(''));
	});
    });
});

mkws.registerWidgetType('Termlists', function() {
    var that = this;
    var facets = that.config.facets;
    var M = mkws.M;

    this.team.queue("termlists").subscribe(function(data) {
	// display if we first got results
	$(that.node).show();
    });

    for (var i = 0; i < facets.length; i++) {
	var name = facets[i]
	var ref = mkws.facetConfig[name];
	if (!ref) {
	    alert("bad facet configuration: '" + name + "'");
	} else {
	    (function(ref, name) {
		var caption = ref[0];
		that.team.queue("termlists").subscribe(function(data) {
		    makeSingleFacet(caption, data[name], ref[1], ref[2] ? name : null);
		})
	    }(ref, name));
	}
    }
    
    function makeSingleFacet(caption, data, max, pzIndex) {
	that.log("in makeSingleFacet(" + caption + ")");
	var teamName = that.team.name();

	var acc = [];
	acc.push('<div class="termtitle">' + M(caption) + '</div>');
	for (var i = 0; i < data.length && i < max; i++) {
	    acc.push('<div class="term">');
	    acc.push('<a href="#" ');
	    var action = '';
	    if (!pzIndex) {
		// Special case: target selection
		acc.push('target_id='+data[i].id+' ');
		if (!that.team.targetFiltered(data[i].id)) {
		    action = 'mkws.limitTarget(\'' + teamName + '\', this.getAttribute(\'target_id\'),this.firstChild.nodeValue)';
		}
	    } else {
		action = 'mkws.limitQuery(\'' + teamName + '\', \'' + pzIndex + '\', this.firstChild.nodeValue)';
	    }
	    acc.push('onclick="' + action + ';return false;">' + data[i].name + '</a>'
		     + ' <span>' + data[i].freq + '</span>');
	    acc.push('</div>');
	}
	that.team.findnode('.mkwsFacet' + caption).html(acc.join(''));
    }

    widget.autosearch(that);
});

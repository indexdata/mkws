mkws.registerWidgetType('Termlists', function() {
    var that = this;
    var M = mkws.M;

    var facetConfig = {
	xtargets: [ "Sources",  16, false ],
	subject:  [ "Subjects", 10, true ],
	author:   [ "Authors",  10, true ]
    }

    this.team.queue("termlists").subscribe(function(data) {
	// no facets: this should never happen
	var facets = that.config.facets;
	if (!facets || facets.length == 0) {
	    alert("onTerm called even though we have no facets: " + $.toJSON(data));
	    $(that.node).hide();
	    return;
	}

	// display if we first got results
	$(that.node).show();

	var acc = [];
	acc.push('<div class="title">' + M('Termlists') + '</div>');
	for (var i = 0; i < facets.length; i++) {
	    var name = facets[i]
	    var ref = facetConfig[name];
	    if (!ref) {
		alert("bad facet configuration: '" + name + "'");
	    } else {
		acc.push('<div class="mkwsFacet mkwsFacet' + ref[0] + ' mkwsTeam_' + that.team.name() + '">');
		acc.push('</div>');
	    }
	}
	$(that.node).html(acc.join(''));


	var output = {};
	for (var i = 0; i < facets.length; i++) {
	    var name = facets[i]
	    var ref = facetConfig[name];
	    if (!ref) {
		alert("bad facet configuration: '" + name + "'");
	    } else {
		output[name] = makeSingleFacet(ref[0], data[name], ref[1], ref[2] ? name : null);
	    }
	}

	for (var i = 0; i < facets.length; i++) {
	    var name = facets[i]
	    var ref = facetConfig[name];
	    var caption = ref[0];

	    that.log("setting HTML for facet '" + name + "'");
	    that.team.findnode('.mkwsFacet' + caption).html(output[name]);
	}


	function makeSingleFacet(caption, data, max, pzIndex) {
	    var teamName = that.team.name();

	    var a2 = [];
	    a2.push('<div class="termtitle">' + M(caption) + '</div>');
	    for (var i = 0; i < data.length && i < max; i++) {
		a2.push('<div class="term">');
		a2.push('<a href="#" ');
		var action = '';
		if (!pzIndex) {
		    // Special case: target selection
		    a2.push('target_id='+data[i].id+' ');
		    if (!that.team.targetFiltered(data[i].id)) {
			action = 'mkws.limitTarget(\'' + teamName + '\', this.getAttribute(\'target_id\'),this.firstChild.nodeValue)';
		    }
		} else {
		    action = 'mkws.limitQuery(\'' + teamName + '\', \'' + pzIndex + '\', this.firstChild.nodeValue)';
		}
		a2.push('onclick="' + action + ';return false;">' + data[i].name + '</a>'
			 + ' <span>' + data[i].freq + '</span>');
		a2.push('</div>');
	    }
	    return a2.join('');
	}
    });

    widget.autosearch(that);
});

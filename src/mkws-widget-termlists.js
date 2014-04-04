mkws.registerWidgetType('Termlists', function() {
    var that = this;
    var M = mkws.M;

    this.team.queue("termlists").subscribe(function(data) {
	if (!that.node) {
	    alert("termlists event when there are no termlists");
	    return;
	}

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
	    if (facets[i] == "xtargets") {
		addSingleFacet(acc, "Sources",  data.xtargets, 16, null);
	    } else if (facets[i] == "subject") {
		addSingleFacet(acc, "Subjects", data.subject,  10, "subject");
	    } else if (facets[i] == "author") {
		addSingleFacet(acc, "Authors",  data.author,   10, "author");
	    } else {
		alert("bad facet configuration: '" + facets[i] + "'");
	    }
	}

	$(that.node).html(acc.join(''));

	function addSingleFacet(acc, caption, data, max, pzIndex) {
	    var teamName = that.team.name();
	    acc.push('<div class="facet mkwsFacet' + caption + ' mkwsTeam_' + teamName + '">');
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
	    acc.push('</div>');
	}
    });

    widget.autosearch(that);
});

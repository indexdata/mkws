// Factory function for sets of filters.
function filterSet(team) {
    var m_team = team;
    var m_list = [];

    var that = {};

    that.toJSON = function() {
	return $.toJSON(m_list);
    };

    that.add = function(filter) {
	m_list.push(filter);
    };

    that.visitTargets = function(callback) {
	for (var i in m_list) {
	    var filter = m_list[i];
	    if (filter.type === 'target') {
		callback(filter.id, filter.name);
	    }
	}
    };

    that.visitFields = function(callback) {
	for (var i in m_list) {
	    var filter = m_list[i];
	    if (filter.type === 'field') {
		callback(filter.field, filter.value);
	    }
	}
    };

    that.visitCategories = function(callback) {
	for (var i in m_list) {
	    var filter = m_list[i];
	    if (filter.type === 'category') {
		callback(filter.id);
	    }
	}
    };

    that.removeMatching = function(matchFn) {
	var newList = [];
	for (var i in m_list) {
	    var filter = m_list[i];
	    if (matchFn(filter)) {
		m_team.log("removeMatching() removing filter " + $.toJSON(filter));
	    } else {
		m_team.log("removeMatching() keeping filter " + $.toJSON(filter));
		newList.push(filter);
	    }
	}
	m_list = newList;
    };

    that.targetFiltered = function(id) {
	for (var i = 0; i < m_list.length; i++) {
	    if (m_list[i].type === 'target' ||
		m_list[i].id === 'pz:id=' + id) {
		return true;
	    }
	}
	return false;
    };

    that.pp2filter = function() {
	var res = "";

	that.visitTargets(function(id, name) {
	    if (res) res += ",";
	    if (id.match(/^[a-z:]+[=~]/)) {
		m_team.log("filter '" + id + "' already begins with SETTING OP");
	    } else {
		id = 'pz:id=' + id;
	    }
	    res += id;
	});

	return res;
    };

    that.pp2limit = function(initial) {
	var res = initial || "";

	that.visitFields(function(field, value) {
	    if (res) res += ",";
	    res += field + "=" + value.replace(/[\\|,]/g, '\\$&');
	});
	return res;
    }

    that.pp2catLimit = function() {
	var res = "";

	that.visitCategories(function(id) {
	    if (res) res += ",";
	    res += "category~" + id.replace(/[\\|,]/g, '\\$&');
	});
	return res;
    }

    return that;
}


// Factory functions for filters. These can be of several types.
function targetFilter(id, name) {
    return {
        type: 'target',
        id: id,
        name: name
    };
}

function fieldFilter(field, value) {
    return {
        type: 'field',
        field: field,
        value: value
    };
}

function categoryFilter(id) {
    return {
        type: 'category',
        id: id,
    };
}

// Factory function for sets of filters.
function filterSet(team) {
    var m_team = team;
    var m_list = [];

    var that = {};

    that.list = function() {
	return m_list;
    };

    that.add = function(filter) {
	m_list.push(filter);
    };

    that.visitTargets = function(callback) {
	for (var i in m_list) {
	    var filter = m_list[i];
	    if (filter.id) {
		callback(filter.id, filter.name);
	    }
	}
    };

    that.visitFields = function(callback) {
	for (var i in m_list) {
	    var filter = m_list[i];
	    if (!filter.id) {
		callback(filter.field, filter.value);
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
	    if (m_list[i].id === id ||
		m_list[i].id === 'pz:id=' + id) {
		return true;
	    }
	}
	return false;
    }

    that.pp2filter = function() {
	var res = "";

	for (var i in m_list) {
	    var filter = m_list[i];
	    if (filter.id) {
		if (res) res += ",";
		if (filter.id.match(/^[a-z:]+[=~]/)) {
		    m_team.log("filter '" + filter.id + "' already begins with SETTING OP");
		} else {
		    filter.id = 'pz:id=' + filter.id;
		}
		res += filter.id;
	    }
	}

	return res;
    }

    that.pp2limit = function(initial) {
	var res = initial || "";

	for (var i in m_list) {
	    var filter = m_list[i];
	    if (!filter.id) {
		if (res) res += ",";
		res += filter.field + "=" + filter.value.replace(/[\\|,]/g, '\\$&');
	    }
	}

	return res;
    }


    return that;
}


// Factory function for filters. These can be of several types.
function filter(id, name, field, value) {
    var res;

    if (id) {
	res = { id: id, name: name };
    } else {
	res = { field: field, value: value };
    }

    return res;
}

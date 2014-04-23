// Factory function for sets of filters.
function filterSet() {
    var that = {};
    var m_list = [];

    that.list = function() {
	return m_list;
    };

    that.add = function(filter) {
	m_list.push(filter);
    };

    that.removeMatching = function(matchFn) {
	var newList = [];
	for (var i in m_list) {
	    var filter = m_list[i];
	    if (matchFn(filter)) {
		log("removeMatching() removing filter " + $.toJSON(filter));
	    } else {
		log("removeMatching() keeping filter " + $.toJSON(filter));
		newList.push(filter);
	    }
	}
	m_list = newList;
    };

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

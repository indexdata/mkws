// Factory function for filters. These can be of several types.
function filter(id, field, value) {
    var res;

    if (id) {
	res = { id: id, name: name };
    } else {
	res = { field: field, value: value };
    }

    return res;
}

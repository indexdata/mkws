// Factory function for sets of filters.
function filterSet(team) {
  var m_team = team;
  var m_list = [];

  var that = {};

  that.toJSON = function() {
    return mkws.$.toJSON(m_list);
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
        m_team.info("removeMatching: removing filter " + mkws.$.toJSON(filter));
      } else {
        m_team.info("removeMatching: keeping filter " + mkws.$.toJSON(filter));
        newList.push(filter);
      }
    }
    m_list = newList;
  };

  // ### Surely the || in this function should be &&
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
        m_team.info("filter '" + id + "' already begins with SETTING OP");
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
      res += "category~" + id.replace(/[\\,]/g, '\\$&');
    });
    return res;
  }

  // Returns a hash of key=value pairs representing the filter-set
  // These will become part of the URL-fragment representing the state
  that.fragmentItems = function() {
    var hash = {};

    for (var i in m_list) {
      var filter = m_list[i];
      var type = filter.type;
      if (type === 'target') {
        hash['xt-' + filter.id] = filter.name;
      } else if (type === 'field') {
        // Ugly names, but we need to include the value because fields can be repeated
        hash['xf-' + filter.field + '-' + filter.value] = 1;
      } else if (type === 'category') {
        hash['xc-' + filter.id] = 1;
      } else {
        alert("unsupported filter-type '" + type + "'");
      }
    }
    
    return hash;
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
    id: id
  };
}

/*
 * combine arrays, return a flat list
 * [["a","b"], ["c"], "d"] => ["a", "b", "c", "d"]
 *
 */
var flat_list = function (list) {
  var data = [];

  for(var i = 0; i < list.length; i++) {
      if (typeof list[i] == 'object') {
        for(var j = 0; j < list[i].length; j++) {
          data.push(list[i][j]);
        }

      } else {
        data.push(list[i]);
      }
  }

  return data;
};

var tags = { 
	required: ["mkwsSearch", "mkwsResults"],
	optional: ["mkwsSwitch", "mkwsLang", "mkwsTargets"],
	optional2: ["mkwsMOTD", "mkwsStat", "footer"]
};

module.exports = {
	flat_list: flat_list,
	tags: tags
};




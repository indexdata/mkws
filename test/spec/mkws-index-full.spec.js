/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * jQuery test with DOM/windows object
 *
 */

var file = '../examples/htdocs/index-full.html'

var jsdom = require('jsdom').jsdom;
var myWindow = jsdom().createWindow();
var $ = jQuery = require('jquery').create(myWindow);

var fs = require("fs");
var index_full = fs.readFileSync(file, "utf-8");

var mkws_tags_required = ["mkwsSearch", "mkwsResults"];
var mkws_tags_optional = ["mkwsSwitch", "mkwsLang", "mkwsTargets"];
var mkws_tags_optional2 = ["mkwsMOTD", "mkwsStat", "footer"];

/*
 * combine arrays, return a flat list
 * [["a","b"], ["c"], "d"] => ["a", "b", "c", "d"]
 *
 */
function flat_list (list) {
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
}


describe("index-full.html test", function() {
  it("html test", function() {
    expect(index_full).toBeDefined();

    expect(index_full).toMatch(/<html.*?>/); // forgotten doctype?
    expect(index_full).toMatch(/<head.*?>/);
    expect(index_full).toMatch(/<body.*?>/);
    expect(index_full).toMatch(/<\/html.*?>/);
    expect(index_full).toMatch(/<\/head.*?>/);
    expect(index_full).toMatch(/<\/body.*?>/);

    expect(index_full).toMatch(/<meta .*?charset=utf-8/i);
    expect(index_full).toMatch(/<title>.+<\/title>/i);
    expect(index_full).toMatch(/<link .*?type="text\/css" href=".*?\/mkwsStyle.css"/);

    var tags = flat_list([mkws_tags_required, mkws_tags_optional, mkws_tags_optional2]);

    for(var i = 0, data = ""; i < tags.length; i++) {
      data = '<div id="' + tags[i] + '">';
      // console.log(data)
      expect(index_full).toMatch(data);
    }
  });
});

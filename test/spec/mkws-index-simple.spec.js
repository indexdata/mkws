/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * jQuery test with DOM/windows object
 *
 */


var fs = require("fs");
var utils = require("./mkws_utils.js");

/*
 * simple test with string matching of the HTML page
 *
 */

function html_check (file, tags_array, ignore_doctype) {
  var html = fs.readFileSync(file, "utf-8");
  var tags = utils.flat_list(tags_array);

  describe("index-full.html string test for " + file, function() {
    it("html test", function() {
      expect(html).toBeDefined();

      // forgotten doctype declaration
      if (!ignore_doctype) {
        expect(html).toMatch(/<html.*?>/);
        expect(html).toMatch(/<\/html.*?>/);
      }
      expect(html).toMatch(/<head.*?>/);
      expect(html).toMatch(/<body.*?>/);
      expect(html).toMatch(/<\/head.*?>/);
      expect(html).toMatch(/<\/body.*?>/);

      expect(html).toMatch(/<meta .*?charset=utf-8/i);
      expect(html).toMatch(/<title>.+<\/title>/i);
      expect(html).toMatch(/<link .*?type="text\/css" href=".*?\/?mkwsStyle.css"/);


      for(var i = 0, data = ""; i < tags.length; i++) {
        data = '<div id="' + tags[i] + '">';
        // console.log(data)
        expect(html).toMatch(data);
      }
    });
  });
}


/*
 * parse HTML data to DOM, and run jQuery request on it
 *
 */

function jsdom_check (file, tags_array, ignore_doctype) {
  var html = fs.readFileSync(file, "utf-8");
  var tags = utils.flat_list(tags_array);

  describe("index-full.html jsdom + jquery for " + file, function() {
    var window = require('jsdom').jsdom(html, null, {

      FetchExternalResources: false,
      ProcessExternalResources: false,
      MutationEvents: false,
      QuerySelector: false
    }).createWindow();

    /* apply jquery to the window */
    var $ = jQuery = require('jquery').create(window);


    it("html jquery test", function() {
      expect(html).toBeDefined();

      expect($("body").length == 0).toEqual(false);
      expect($("body").length == 1).toEqual(true);
      expect($("head").length == 1).toEqual(true);

      for(var i = 0; i < tags.length; i++) {
        expect($("#" + tags[i]).length == 1).toEqual(true);
      }
    });

    it("html jquery fail test", function() {
      expect(html).toBeDefined();

      expect($("body_does_not_exists").length == 1).toEqual(false);
      expect($("#body_does_not_exists").length == 1).toEqual(false);
    });
  });
}

html_check('../examples/htdocs/index-full.html', [utils.tags.required, utils.tags.optional, utils.tags.optional2]);
html_check('../examples/htdocs/index-mobile.html', [utils.tags.required, utils.tags.optional]);
html_check('../examples/htdocs/index-popup.html', [], true);
html_check('../examples/htdocs/index-jquery.html', []);
html_check('../examples/htdocs/index-mike.html', [utils.tags.required, utils.tags.optional], true);

jsdom_check('../examples/htdocs/index-full.html', [utils.tags.required, utils.tags.optional, utils.tags.optional2]);
jsdom_check('../examples/htdocs/index-mobile.html', [utils.tags.required, utils.tags.optional]);
jsdom_check('../examples/htdocs/index-popup.html', [], true);
jsdom_check('../examples/htdocs/index-jquery.html', []);
jsdom_check('../examples/htdocs/index-mike.html', [utils.tags.required, utils.tags.optional], true);

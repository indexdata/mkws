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

function html_check(file, tags_array, ignore_doctype) {
    var html = fs.readFileSync(file, "utf-8");
    var tags = utils.flat_list(tags_array);

    describe("language.html string test for " + file, function () {
        it("html test", function () {
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
            expect(html).toMatch(/<link .*?type="text\/css" href=".*?\/?mkws.css"/);


            for (var i = 0, data = ""; i < tags.length; i++) {
                data = '<div id="' + tags[i] + '">';
                // console.log(data)
                expect(html).toMatch(data);
            }
        });
    });
}

html_check('../examples/htdocs/language.html', [utils.tags.required, utils.tags.optional, utils.tags.optional2]);
html_check('../examples/htdocs/mobile.html', [utils.tags.required, utils.tags.optional]);
html_check('../examples/htdocs/popup.html', [], true);
html_check('../examples/htdocs/jquery.html', []);
// html_check('../examples/htdocs/mike.html', [utils.tags.required, utils.tags.optional], true);

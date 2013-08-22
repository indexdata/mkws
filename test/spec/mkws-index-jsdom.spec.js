/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * jQuery test with DOM/windows object
 *
 */


var fs = require("fs");
var utils = require("./mkws_utils.js");

/*
 * parse HTML data to DOM, and run jQuery request on it
 *
 */

function jsdom_check(file, tags_array, ignore_doctype) {
    var html = fs.readFileSync(file, "utf-8");
    var tags = utils.flat_list(tags_array);

    describe("index-full.html jsdom + jquery for " + file, function () {
        var window = require('jsdom').jsdom(html, null, {
            FetchExternalResources: false,
            ProcessExternalResources: false,
            MutationEvents: false,
            QuerySelector: false
        }).createWindow();

        /* apply jquery to the window */
        var $ = require('jquery').create(window);


        it("html jquery test", function () {
            expect(html).toBeDefined();

            expect($("body").length == 0).toEqual(false);
            expect($("body").length == 1).toEqual(true);
            expect($("head").length == 1).toEqual(true);

            for (var i = 0; i < tags.length; i++) {
                expect($("#" + tags[i]).length == 1).toEqual(true);
            }
        });

        it("html jquery fail test", function () {
            expect(html).toBeDefined();

            expect($("body_does_not_exists").length == 1).toEqual(false);
            expect($("#body_does_not_exists").length == 1).toEqual(false);
        });
    });
}

jsdom_check('../examples/htdocs/index-full.html', [utils.tags.required, utils.tags.optional, utils.tags.optional2]);
jsdom_check('../examples/htdocs/index-mobile.html', [utils.tags.required, utils.tags.optional]);
jsdom_check('../examples/htdocs/index-popup.html', [], true);
jsdom_check('../examples/htdocs/index-jquery.html', []);
jsdom_check('../examples/htdocs/index-mike.html', [utils.tags.required, utils.tags.optional], true);

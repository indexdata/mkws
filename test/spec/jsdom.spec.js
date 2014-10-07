/* Copyright (c) 2013 Index Data ApS. http://indexdata.com
 *
 * jQuery test with DOM/windows object
 *
 */

describe("jQuery suite", function () {
    var jsdom = require('jsdom').jsdom;
    var myWindow = jsdom().createWindow();

    var $ = require('jQuery');
    var jq = require('jQuery').create();
    var jQuery = require('jQuery').create(myWindow);

    it("jQuery append test", function () {
        jQuery("<h1>test passes h1</h1>").appendTo("body");
        expect(jQuery("body").html()).toMatch(/<h1>/);
    });

    it("$ append test", function () {
        $("<h2>test passes h2</h2>").appendTo("body");
        expect($("body").html()).toMatch(/<h2>/);
    });

    it("jq append test", function () {
        jq("<h2>test passes h2</h2>").appendTo("body");
        expect(jq("body").html()).toMatch(/<h2>/);
    });

    it("window test", function () {
        expect(myWindow).toBeDefined();
    });
});

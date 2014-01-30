describe("jsdom/jQuery suite simple", function () {
    it("jsdom test", function () {
        var jsdom = require("jsdom");

        var $, w;
        jsdom.env('<p><a class="the-link" href="http://indexdata.com">jsdom\'s Homepage</a></p>', ["http://code.jquery.com/jquery.js"], function (errors, window) {
            console.log("contents of a.the-link:", window.$("a.the-link").text());
            w = window;
            $ = window.$;
        });

        waitsFor(function () {
            if (!w) {
                console.log(".");
            }
            return w;
        }, "window object done", 2 * 1000);

        runs(function () {
            console.log("got window");
            expect(w).toBeDefined();
            expect(w.document).toBeDefined();
            expect($.parseXML).toBeDefined();

            var xmlstring = "<rss version='2.0' jsessionId='CD8AFDD3040A81CFFDDD4EC066497139'><channel><title>RSS Title</title></channel></rss>";

            var DOMParser = require('xmldom').DOMParser;
            var doc = new DOMParser().parseFromString(xmlstring);
            console.log("doc: " + doc.documentElement.getAttribute('jsessionId'));

            var xmlDoc = doc; // $.parseXML(xml);
            var xml = $(xmlDoc);
            var title = xml.find("title");

            console.log("title: " + $(title).text());
            $.parseXML = function (data) {
                return new DOMParser().parseFromString(data)
            };;

            console.log("parseXML: " + $($.parseXML(xmlstring)).text());

            // console.log(w.document);
        })
    });

});

console.log("EOF");

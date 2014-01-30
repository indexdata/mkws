describe("jsdom/jQuery suite simple", function () {
    it("jsdom test", function () {
        var jsdom = require("jsdom");
        var DOMParser = require('xmldom').DOMParser;

        var w = undefined;
        var $ = undefined;

        jsdom.env({
            url: "http://mkws-dev.indexdata.com/jasmine-local-popup.html",
            scripts: [""],
            features: {
                FetchExternalResources: ["script"]
            },

            done: function (errors, window) {
                var DOMParser = require('xmldom').DOMParser;

                w = window;
                $ = window.$;

                $(window).ready(function () {
                    console.log("document ready event");
                    console.log("mkws: " + window.mkws_config.pazpar2_url);

                    // setTimeout( function () { console.log("timeer...") }, 1000);
                });

                // spyOn(window, 'alert').andCallFake(function(msg) {  console.log("fake allert: " + msg); });
                window.alert = console.log;
                window.console = console;

                console.log("window.DOMParser: " + window.DOMParser);
                console.log("window.document: " + window.document);


                var xmlstring = "<rss version='2.0' jsessionId='CD8AFDD3040A81CFFDDD4EC066497139'><channel><title>RSS Title</title></channel></rss>";
                $.parseXML = function (data) {
                    return new DOMParser().parseFromString(data)
                };;
                console.log("parseXML: " + $.parseXML(xmlstring).documentElement.getAttribute('jsessionId'));
            }
        });

        waitsFor(function () {
            if (!w) {
                console.log(".");
            } else if (w && !w.mkws) {
                console.log("*");
            } else {
                // console.log("+");
            }

            return w && w.mkws && w.mkws.authenticated;
        }, "window object done", 2 * 1000);

        runs(function () {
            console.log("got window");
            console.log("got mkws auth: " + w.mkws.authenticated);
            console.log("window.DOMParser: " + w.$.parseXML);
            // console.log("W: " + $("html").text() );
            expect(w).toBeDefined();
        });

        waitsFor(function () {
            // console.log(".");
            return w.mkws.jasmine_done;
        }, "jasmine test done", 3 * 1000);

        runs(function () {
            console.log("jasmine test done: " + w.mkws.jasmine_done);
            expect(w.mkws.jasmine_done).toBeTruthy();
        });
    });

    it("jsdom test2", function () {
        // expect($).toBeDefined();
    });

});

console.log("EOF");

/*
jsdom.defaultDocumentFeatures = {
  FetchExternalResources   : ['script'],
  ProcessExternalResources : ['script'],
  MutationEvents           : false,
  QuerySelector            : false
};
*/

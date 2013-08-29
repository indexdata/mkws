/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * perform papzpar2 / pz2.js search & retrieve request in the browser
 *
 */

var debug = mkws.debug;

var get_hit_counter = function () {
    if ($("#mkwsPager").length == 0) return -1;

    var found = $("#mkwsPager").text();
    var re = /\([A-Za-z]+:\s+([0-9]+)\)/;
    re.exec(found);
    var hits = -1;

    if (RegExp.$1) {
        hits = parseInt(RegExp.$1);
        expect(hits).toBeGreaterThan(0);
    }

    //debug("Hits: " + hits);
    return hits;
}

describe("Check pazpar2 search", function () {
    it("pazpar2 was successfully initialize", function () {
        expect(mkws_config.error).toBe(undefined);
    });

    it("validate HTML id's", function () {
        expect($("input#mkwsQuery").length == 1).toBe(true);
        expect($("input#mkwsButton").length == 1).toBe(true);

        expect($("#mkwsNext").length == 1).toBe(false);
        expect($("#mkwsPrev").length == 1).toBe(false);
    });

    it("run search query", function () {
	var search_query = "freebsd"; // short hit counter with some paging

        $("input#mkwsQuery").val(search_query);
	debug("set search query: " + search_query)
        expect($("input#mkwsQuery").val()).toMatch("^" + search_query + "$");

	// wait for service proxy auth
	waitsFor(function () {
            return mkws.service_proxy_auth;
        }, "SP auth done", 10 * 1000);

        runs(function () {
	    debug("Click on submit button");
            var click = $("input#mkwsButton").trigger("click");
	    expect(click.length == 1).toBe(true);
        })
    });
});


describe("Check pazpar2 navigation", function () {
    // Asynchronous part
    it("check running search next/prev", function () {
        expect($("#mkwsPager").length == 1).toBe(true);

        function my_click(id, time) {
            setTimeout(function () {
                debug("trigger click on id: " + id);
                var click = $(id).trigger("click");

                debug("next click is success: " + click.length);
                expect(click.length == 1).toBe(true);

            }, time * 1000);
        }

        runs(function () {
            // click next/prev after N seconds
            my_click("#mkwsNext", 7);
            my_click("#mkwsNext", 8);
            my_click("#mkwsPrev", 9);
        });
    });
});

describe("Check pazpar2 hit counter", function () {
    it("check running search hit counter", function () {
        var max_time = 10; // in seconds
        var expected_hits = 116; // at least expected hit counter

        var hits = 0;

        waitsFor(function () {
	    hits = get_hit_counter();

            return hits >= expected_hits;
        }, "Expect N hits in x seconds", max_time * 1000);


        runs(function () {
	    debug("mkws pager found records: '" + hits + "'");
            expect($("#mkwsPager").length == 1).toBe(true);
            expect(hits).toBeGreaterThan(expected_hits);
        });
    });
});

describe("Check Termlist", function () {
    function show_record() {
        var click = $("div#mkwsRecords div.record:nth-child(3) :nth-child(2)").trigger("click");
        debug("show click is success: " + click.length);
        expect(click.length == 1).toBe(true);
    }

    // show_record();
    it("found Termlist", function () {
        var termlist = $("div#mkwsTermlists");
        debug("Termlist success: " + termlist.length);
        expect(termlist.length == 1).toBe(true);

        var sources = $("div#mkwsFacetSources");
        expect(sources.length == 1).toBe(true);

        var subjects = $("div#mkwsFacetSubjects");
        expect(subjects.length == 1).toBe(true);

        var authors = $("div#mkwsFacetAuthors");
        expect(authors.length == 1).toBe(true);
    });

    it("limit search to first source", function () {
        var hits_all_targets = get_hit_counter();

        var click = $("div#mkwsFacetSources div.term:nth-child(2) a").trigger("click");
        debug("limit source click is success: " + click.length);
        expect(click.length == 1).toBe(true);

        waitsFor(function () {
            if ($("div#mkwsNavi").length && $("div#mkwsNavi").text().match(/^Source/)) {
                return true;
            } else {
                return false;
            }
        }, "Search for source in navi bar", 1000);

        waitsFor(function () {
            return get_hit_counter() < hits_all_targets ? true : false;
        }, "Search for with less hits", 9 * 1000);

        runs(function () {
            var hits_single_target = get_hit_counter();
            debug("get less hits for sources: " + hits_all_targets + " > " + hits_single_target);
            expect(hits_all_targets).toBeGreaterThan(hits_single_target);
        });
    });

    it("limit search to first author", function () {
        var hits_all_targets = get_hit_counter();

        var click = $("div#mkwsFacetAuthors div.term:nth-child(2) a").trigger("click");
        debug("limit author click is success: " + click.length);
        expect(click.length == 1).toBe(true);

        waitsFor(function () {
            return get_hit_counter() < hits_all_targets ? true : false;
        }, "Search for with less hits", 9 * 1000);

        runs(function () {
            var hits_single_target = get_hit_counter();
            debug("get less hits for authors: " + hits_all_targets + " > " + hits_single_target);
            expect(hits_all_targets).toBeGreaterThan(hits_single_target);
        });
    });

    it("show record author", function () {
        show_record();
    });
});

describe("Check status client counter", function () {
    function get_time() {
        var date = new Date();
        return date.getTime();
    }
    var time = get_time();

    it("check status clients", function () {

        waitsFor(function () {
            var clients = $("div#mkwsStat span.clients");
            if (clients.length == 1 && clients.text() == "0/1") {
                return true;
            } else {
                return false;
            }

        }, "wait for status", 4 * 1000);

    });
    runs(function () {
        var clients = $("div#mkwsStat span.clients");
        debug("span.clients: " + clients.text());
        expect(clients.text()).toEqual("0/1");
    });

});

/* dummy EOF */
describe("All tests are done", function () {
    it(">>> hooray!!! <<<", function () {
    });
});

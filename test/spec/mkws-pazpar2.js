/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * perform papzpar2 / pz2.js search & retrieve request in the browser
 *
 */

function get_hit_counter() {
    if ($("#mkwsPager").length == 0) return -1;

    var found = $("#mkwsPager").text();
    var re = /found: ([0-9]+)/;
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
        $("input#mkwsQuery").val("freebsd");
        expect($("input#mkwsQuery").val()).toMatch(/^freebsd$/);

        setTimeout(function () {
            $("input#mkwsButton").trigger("click");
        }, 3 * 1000);
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
        var expected_hits = 116; //
        var j_time = 0;
        var j_hits = 0;

        function found(time, none) {
            setTimeout(function () {
                j_time = time;
                hits = get_hit_counter();

                // debug("found: " + found);
                if (none) {
                    expect(hits < 0).toBeTruthy();
                } else {
                    j_hits = hits;
                }

                debug("mkws pager found records: '" + hits + "'");
                debug("time state: " + j_time);

                expect(time >= 0).toBeTruthy();
            }, time * 1000);
        }

        runs(function () {
            // check hit counter after N seconds
            found(0, true);
            found(3);
            found(6);
            found(8);
            found(max_time);
        });

        waitsFor(function () {
            return j_time == max_time ? true : false;
        }, "The Value should be 20 seconds", max_time * 1000);


        runs(function () {
            expect($("#mkwsPager").length == 1).toBe(true);
        })

        runs(function () {
            expect(j_time <= max_time).toBeTruthy();
            expect(j_hits).toBeGreaterThan(expected_hits);
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

    it("Limit search to first source", function () {
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

    it("Limit search to first author", function () {
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

    it("Show record author", function () {
        show_record();
    });
});

describe("Check status client counter", function () {
    function get_time() {
        var date = new Date();
        return date.getTime();
    }
    var time = get_time();

    it("Limit search to first author", function () {

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

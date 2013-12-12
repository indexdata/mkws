/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * perform papzpar2 / pz2.js search & retrieve request in the browser
 *
 */

var debug_level = mkws.debug_level;
var debug = mkws.debug_function;

var get_hit_counter = function () {
        // not yet here
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
        expect($("input#mkwsQuery").length).toBe(1);
        expect($("input#mkwsButton").length).toBe(1);

        expect($("#mkwsNext").length).not.toBe(1);
        expect($("#mkwsPrev").length).not.toBe(1);
    });

    it("run search query", function () {
        var search_query = "freebsd"; // short hit counter with some paging
        $("input#mkwsQuery").val(search_query);
        debug("set search query: " + search_query)
        expect($("input#mkwsQuery").val()).toMatch("^" + search_query + "$");

        // wait for service proxy auth
        waitsFor(function () {
            return mkws.authenticated;
        }, "SP auth done", 10 * 1000);

        runs(function () {
            debug("Click on submit button");
            var click = $("input#mkwsButton").trigger("click");
            expect(click.length).toBe(1);
        })
    });
});


/*
 * This part runs in background. It should be rewritten with
 * async jasmine functions
 *
 */
describe("Check pazpar2 navigation", function () {
    // Asynchronous part
    it("check running search next/prev", function () {
        expect($("#mkwsPager").length).toBe(1);

        function my_click(id, time) {
            setTimeout(function () {
                debug("trigger click on id: " + id);
                var click = $(id).trigger("click");

                debug("next/prev: " + id + " click is success: " + click.length);
                expect(click.length).toBe(1);
            }, time * 1000);
        }

        waitsFor(function () {
            return $("div#mkwsPager div:nth-child(2) a").length >= 2 ? true : false;
        }, "Expect next link 2", 10 * 1000);

        runs(function () {
            // click next/prev after N seconds
            my_click("#mkwsNext", 0);
        });

        waitsFor(function () {
            return $("div#mkwsPager div:nth-child(2) a").length >= 3 ? true : false;
        }, "Expect next link 3", 5 * 1000);

        runs(function () {
            // click next/prev after N seconds
            my_click("#mkwsNext", 0);
            my_click("#mkwsPrev", 0.2);
        });
    });
});

describe("Check pazpar2 hit counter", function () {
    it("check running search hit counter", function () {
        var max_time = 16; // in seconds
        var expected_hits = 80; // at least expected hit counter
        var hits = 0;

        waitsFor(function () {
            hits = get_hit_counter();

            return hits > expected_hits;
        }, "Expect " + expected_hits + " hits", max_time * 1000);


        runs(function () {
            debug("mkws pager found records: '" + hits + "'");
            expect($("#mkwsPager").length).toBe(1);
            expect(hits).toBeGreaterThan(expected_hits);
        });
    });
});

describe("Check Termlist", function () {
    it("found Termlist", function () {
        var termlist = $("div#mkwsTermlists");
        debug("Termlist success: " + termlist.length);
        expect(termlist.length).toBe(1);

        waitsFor(function () {
            return $("div#mkwsFacetSources").length == 1 ? true : false;
        }, "check for facet sources", 2 * 1000);


        // everything displayed?
        runs(function () {
            var sources = $("div#mkwsFacetSources");
            debug("Termlist sources success: " + sources.length);
            expect(sources.length).toBe(1);

            var subjects = $("div#mkwsFacetSubjects");
            expect(subjects.length).toBe(1);

            var authors = $("div#mkwsFacetAuthors");
            expect(authors.length).toBe(1);
        });

        waitsFor(function () {
            return $("div#mkwsFacetAuthors div.term").length >= 2 ? true : false;
        }, "At least one author link displayed", 2 * 1000);

        runs(function () {
            expect($("div#mkwsFacetAuthors div.term").length).toBeGreaterThan(1);
        });
    });

    it("limit search to first author", function () {
        var hits_all_targets = get_hit_counter();

        var click = $("div#mkwsFacetAuthors div.term:nth-child(2) a").trigger("click");
        debug("limit author click is success: " + click.length);
        expect(click.length).toBe(1);

        waitsFor(function () {
            return get_hit_counter() < hits_all_targets ? true : false;
        }, "Limited author search for less than " + hits_all_targets + " hits", 8 * 1000);

        runs(function () {
            var hits_single_target = get_hit_counter();
            debug("get less hits for authors: " + hits_all_targets + " > " + hits_single_target);
            expect(hits_all_targets).toBeGreaterThan(hits_single_target);
        });
    });

    it("limit search to first source", function () {
        var hits_all_targets = get_hit_counter();
        var source_number = 2; // 2=first source
        var source_name = $("div#mkwsFacetSources div.term:nth-child(" + source_number + ") a").text();
        // do not click on wikipedia link - no author or subject facets possible
        if (source_name.match(/wikipedia/i)) {
            source_number++;
        }

        var click = $("div#mkwsFacetSources div.term:nth-child(" + source_number + ") a").trigger("click");
        debug("limit source click " + (source_number - 1) + " is success: " + click.length);
        expect(click.length).toBe(1);

        waitsFor(function () {
            if ($("div#mkwsNavi").length && $("div#mkwsNavi").text().match(/^Source/)) {
                return true;
            } else {
                return false;
            }
        }, "Search for source in navi bar", 1000);

        waitsFor(function () {
            return get_hit_counter() < hits_all_targets ? true : false;
        }, "Limited source earch for less than " + hits_all_targets + " hits", 9 * 1000);

        runs(function () {
            var hits_single_target = get_hit_counter();
            debug("get less hits for sources: " + hits_all_targets + " > " + hits_single_target);
            expect(hits_all_targets).toBeGreaterThan(hits_single_target);
        });
    });
});

describe("Show record", function () {
    var record_number = 1; // the Nth record in hit list
    it("show record author", function () {
        var click = $("div#mkwsRecords div.record:nth-child(" + record_number + ") :nth-child(2)").trigger("click");
        debug("show click is success: " + click.length);
        expect(click.length).toBe(1);

        // wait until the record pops up
        waitsFor(function () {
            var show = $("div#mkwsRecords div.record:nth-child(" + record_number + ") div");
            return show != null && show.length ? true : false;
        }, "wait some miliseconds to show up a record", 2 * 1000);

        runs(function () {
            debug("show record pop up");
            expect($("div#mkwsRecords div.record:nth-child(" + record_number + ") div")).not.toBe(null);
        });
    });

    it("extract URL", function () {
        var url = $("div#mkwsRecords div.record:nth-child(" + record_number + ") div table tbody tr td a").text();
        debug("extracted URL from record: " + url);

        expect(url).not.toBe(null);
        expect(url).toMatch(/^http:\/\/[a-z0-9]+\.[0-9a-z].*\//i);
    });
});

describe("Check switch menu Records/Targets", function () {
    it("check mkwsSwitch", function () {
        expect($("div#mkwsSwitch").length).toBe(1);

        // expect 2 clickable links
        expect($("div#mkwsSwitch a").length).toBe(2);
    });

    it("switch to target view", function () {
        var click = $("a#mkwsSwitch_targets").trigger("click");
        debug("target click is success: " + click.length);
        expect(click.length).toBe(1);

        // now the target table must be visible
        expect($("div#mkwsBytarget").is(":visible")).toBe(true);
        expect($("div#mkwsRecords").is(":visible")).toBe(false);

        // wait a half second, to show the target view
        var time = (new Date).getTime();
        waitsFor(function () {
            return (new Date).getTime() - time > 700 ? true : false;
        }, "wait some miliseconds", 1 * 1000);

        // look for table header
        runs(function () {
            expect($("div#mkwsBytarget").html()).toMatch(/Target ID/);
        });
    });

    it("switch back to record view", function () {
        var click = $("a#mkwsSwitch_records").trigger("click");
        debug("record click is success: " + click.length);
        expect(click.length).toBe(1);

        // now the target table must be visible
        expect($("div#mkwsBytarget").is(":visible")).toBe(false);
        expect($("div#mkwsRecords").is(":visible")).toBe(true);
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

        runs(function () {
            var clients = $("div#mkwsStat span.clients");
            debug("span.clients: " + clients.text());
            expect(clients.text()).toEqual("0/1");
        });

    });

});

/* dummy EOF */
describe("All tests are done", function () {
    it(">>> hooray <<<", function () {});
});

/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * perform papzpar2 / pz2.js search & retrieve request in the browser
 *
 */

// get references from mkws.js, lazy evaluation
var debug = function (text) {
        mkws.debug_function(text)
    }

    // Define empty mkws_config for simple applications that don't define it.
if (jasmine_config == null || typeof jasmine_config != 'object') {
    var jasmine_config = {};
}

/* check config for jasmine test
 *
 * you can override the default values in the config
 * object: jasmine_config = {};
 *
 */
function init_jasmine_config() {

    var jasmine_config_default = {
        search_query: "freebsd",
        max_time: 16,
        // in seconds
        expected_hits: 80,
        // at least expected hit counter
        second: 1000,
        // miliseconds to seconds
        show_record_url: true,
        // check for valid URL in records
        dummy: false
    };

    // use default values for undefined values
    for (var key in jasmine_config_default) {
        if (!jasmine_config.hasOwnProperty(key)) {
            jasmine_config[key] = jasmine_config_default[key];
        }
        debug("jasmine config: " + key + " => " + jasmine_config[key]);
    }

    mkws.jasmine_done = false;
}

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

describe("Init jasmine config", function () {
    it("jasmine was successfully initialized", function () {
        init_jasmine_config();

        expect(jasmine_config.search_query).toMatch(/\w/);
        expect(jasmine_config.second).toBeGreaterThan(100);
        expect(jasmine_config.max_time).toBeGreaterThan(1);
        expect(jasmine_config.expected_hits).toBeGreaterThan(1);
    });
});

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
        var search_query = jasmine_config.search_query; // short hit counter with some paging
        $("input#mkwsQuery").val(search_query);
        debug("set search query: " + search_query)
        expect($("input#mkwsQuery").val()).toMatch("^" + search_query + "$");

        if (mkws_config.use_service_proxy) {
            // wait for service proxy auth
            waitsFor(function () {
                return mkws.authenticated;
            }, "SP auth done", 10 * jasmine_config.second);
        } else {
            debug("running raw pp2, don't wait for mkws auth");
        }

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
            }, time * jasmine_config.second);
        }

        waitsFor(function () {
            return $("div#mkwsPager div:nth-child(2) a").length >= 2 ? true : false;
        }, "Expect next link 2", 10 * jasmine_config.second);

        runs(function () {
            // click next/prev after N seconds
            my_click("#mkwsNext", 0);
        });

        waitsFor(function () {
            return $("div#mkwsPager div:nth-child(2) a").length >= 3 ? true : false;
        }, "Expect next link 3", 5 * jasmine_config.second);

        runs(function () {
            // click next/prev after N seconds
            my_click("#mkwsNext", 0);
            my_click("#mkwsPrev", 0.2);
        });
    });
});

describe("Check pazpar2 hit counter", function () {
    it("check running search hit counter", function () {
        var max_time = jasmine_config.max_time; // in seconds
        var expected_hits = jasmine_config.expected_hits; // at least expected hit counter
        var hits = 0;

        waitsFor(function () {
            hits = get_hit_counter();

            return hits > expected_hits;
        }, "Expect " + expected_hits + " hits", max_time * jasmine_config.second);


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
        }, "check for facet sources", 4 * jasmine_config.second);


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
        }, "At least one author link displayed", 4 * jasmine_config.second);

        runs(function () {
            expect($("div#mkwsFacetAuthors div.term").length).toBeGreaterThan(1);
        });
    });

    it("limit search to first author", function () {
        var hits_all_targets = get_hit_counter();
        var author_number = 2; // 2=first author
        // do not click on author with numbers, e.g.: "Bower, James M. Beeman, David, 1938-"
        // do not click on author names without a comma, e.g.: "Joe Barbara"
        var terms = $("div#mkwsFacetAuthors div.term a");
        for (var i = 0; i < terms.length; i++) {
            var term = $(terms[i]).text();
            if (term.match(/[0-9].+[0-9]/i) || !term.match(/,/)) {
                debug("ignore author facet: " + term);
                author_number++;
            } else {
                break;
            }
        }

        var click = $("div#mkwsFacetAuthors div.term:nth-child(" + author_number + ") a").trigger("click");
        debug("limit author click is success: " + click.length);
        expect(click.length).toBe(1);

        waitsFor(function () {
            return get_hit_counter() < hits_all_targets ? true : false;
        }, "Limited author search for less than " + hits_all_targets + " hits", 6 * jasmine_config.second);

        runs(function () {
            var hits_single_target = get_hit_counter();
            debug("get less hits for authors: " + hits_all_targets + " > " + hits_single_target);
            expect(hits_all_targets).toBeGreaterThan(hits_single_target);
        });
    });

    it("limit search to first source", function () {
        var hits_all_targets = get_hit_counter();
        var source_number = 2; // 2=first source
        // do not click on wikipedia link - no author or subject facets possible
        var terms = $("div#mkwsFacetSources div.term a");
        for (var i = 0; i < terms.length; i++) {
            var term = $(terms[i]).text();
            if (term.match(/wikipedia/i)) {
                debug("ignore source facet: " + term);
                source_number++;
            } else {
                break;
            }
        }

        var click = $("div#mkwsFacetSources div.term:nth-child(" + source_number + ") a").trigger("click");
        debug("limit source click " + (source_number - 1) + " is success: " + click.length);
        expect(click.length).toBe(1);

        waitsFor(function () {
            if ($("div#mkwsNavi").length && $("div#mkwsNavi").text().match(/Source: /)) {
                return true;
            } else {
                return false;
            }
        }, "Search for source in navi bar", 4 * jasmine_config.second);

        // Note: it may happens that limited source search returns the same number of hits
        // as before. Thats not really an error, but unfortunate
        waitsFor(function () {
            return get_hit_counter() <= hits_all_targets ? true : false;
        }, "Limited source search for less than " + hits_all_targets + " hits", 5 * jasmine_config.second);

        runs(function () {
            var hits_single_target = get_hit_counter();
            debug("get less hits for sources: " + hits_all_targets + " > " + hits_single_target);
            expect(hits_all_targets).not.toBeLessThan(hits_single_target);
        });
    });
});

describe("Show record", function () {
    var record_number = 1; // the Nth record in hit list
    it("show record author", function () {
        var click = $("div#mkwsRecords div.record:nth-child(" + record_number + ") a").trigger("click");
        debug("show record click is success: " + click.length);
        expect(click.length).toBe(1);

        // wait until the record pops up
        waitsFor(function () {
            var show = $("div#mkwsRecords div.record:nth-child(" + record_number + ") div");
            return show != null && show.length ? true : false;
        }, "wait some miliseconds to show up a record", 2 * jasmine_config.second);

        runs(function () {
            debug("show record pop up");
            expect($("div#mkwsRecords div.record:nth-child(" + record_number + ") div")).not.toBe(null);
        });
    });

    it("extract URL", function () {
        if (jasmine_config.show_record_url == false) {
            debug("ignore test for URL in record")
            return;
        }

        var urls = $("div#mkwsRecords div.record:nth-child(" + record_number + ") div table tbody tr td a");
        debug("number of extracted URL from record: " + urls.length);
        for (var i = 0; i < urls.length; i++) {
            var url = $(urls[i]);
            debug("URL: " + url.attr('href'));
            expect(url.attr('href')).not.toBe(null);
            expect(url.attr('href')).toMatch(/^https?:\/\/[a-z0-9]+\.[0-9a-z].*\//i);
            expect(url.attr('href')).toBe(url.text());
        }
    });
});

describe("Check switch menu Records/Targets", function () {
    it("check mkwsSwitch", function () {
        expect($("div.mkwsSwitch").length).toBe(1);

        // expect 2 clickable links
        expect($("div.mkwsSwitch a").length).toBe(2);
    });

    it("switch to target view", function () {
        var click = $("div.mkwsSwitch").children('a').eq(1).trigger("click");
        debug("target view click is success: " + click.length);
        expect(click.length).toBe(1);

        // now the target table must be visible
        expect($("div.mkwsBytarget").is(":visible")).toBe(true);
        expect($("div#mkwsRecords").is(":visible")).toBe(false);

        // wait a half second, to show the target view
        var time = (new Date).getTime();
        waitsFor(function () {
            return (new Date).getTime() - time > 700 ? true : false;
        }, "wait some miliseconds", 1 * jasmine_config.second);

        // look for table header
        runs(function () {
            expect($("div.mkwsBytarget").html()).toMatch(/Target ID/);
        });
    });

    it("switch back to record view", function () {
        var click = $("div.mkwsSwitch").children('a').eq(0).trigger("click");
        debug("record view click is success: " + click.length);
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
            if (clients.length == 1 && clients.text().match("0/1$")) {
                return true;
            } else {
                return false;
            }

        }, "wait for Active clients: 0/1", 4 * jasmine_config.second);

/*
        runs(function () {
            var clients = $("div#mkwsStat span.clients");
            debug("span.clients: " + clients.text());
            expect(clients.text()).toEqual("0/1");
        });
        */

    });

});

/* done */
describe("All tests are done", function () {
    it(">>> hooray <<<", function () {
        mkws.jasmine_done = true;
    });
});

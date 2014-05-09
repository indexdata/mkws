/* Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com
 *
 * perform papzpar2 / pz2.js search & retrieve request in the browser
 *
 */

// get references from mkws.js, lazy evaluation
var debug = function (text) {
        mkws.log("Jasmine: " + text)
    }

    // Define empty jasmine_config for simple applications that don't define it.
if (jasmine_config == null || typeof jasmine_config != 'object') {
    var jasmine_config = {};
}

var jasmine_status = {
    source_click: 0
};

/* check config for jasmine test
 *
 * you can override the default values in the config
 * object: jasmine_config = {};
 *
 */
function init_jasmine_config() {

    var jasmine_config_default = {
        search_query: "freebsd",
        max_time: 17,
        // in seconds
        expected_hits: 80,
        // at least expected hit counter
        second: 1000,
        // miliseconds to seconds
        show_record_url: true,
        // check for valid URL in records
        check_motd: true,
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
        if ($(".mkwsPager").length == 0) return -1;

        var found = $(".mkwsPager").text();
        var re = /\([A-Za-z]+:\s+([0-9]+)\)/;
        re.exec(found);
        var hits = -1;

        if (RegExp.$1) {
            hits = parseInt(RegExp.$1);
            if (hits <= 0) {
                debug("Oooops in get_hit_counter: " + RegExp.$1 + " '" + found + "'");
            }
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

//disabled
xdescribe("Check MOTD before search", function () {
    // Check that the MOTD has been moved into its container, and
    // is visible before the search.
    // the mkwsMOTD div was originally inside a testMOTD div, which should
    // now be empty
    // Note that the testMOTD is a regular div, and uses #testMOTD,
    // since the automagic class-making does not apply to it.
    it("MOTD is hidden", function () {
        expect($(".mkwsMOTD").length).toBe(1);
        expect($("#testMOTD").length).toBe(1);
        expect($("#testMOTD").text()).toMatch("^ *$");
    });

    it("mkwsMOTDContainer has received the text", function () {
        expect($(".mkwsMOTDContainer").length).toBe(1);
        expect($(".mkwsMOTDContainer").text()).toMatch(/MOTD/);
    });
});

describe("Check pazpar2 search", function () {
    it("pazpar2 was successfully initialized", function () {
        expect(mkws.config.error).toBe(undefined);
    });

    it("validate HTML id's", function () {
        expect($("input.mkwsQuery").length).toBe(1);
        expect($("input.mkwsButton").length).toBe(1);

        expect($(".mkwsNext").length).not.toBe(1);
        expect($(".mkwsPrev").length).not.toBe(1);
    });

    it("run search query", function () {
        var search_query = jasmine_config.search_query; // short hit counter with some paging
        $("input.mkwsQuery").val(search_query);
        debug("set search query: " + search_query)
        expect($("input.mkwsQuery").val()).toMatch("^" + search_query + "$");

        if (mkws.config.use_service_proxy) {
            // wait for service proxy auth
            waitsFor(function () {
                return mkws.authenticated;
            }, "SP auth done", 10 * jasmine_config.second);
        } else {
            debug("running raw pp2, don't wait for mkws auth");
        }

        runs(function () {
            debug("Click on submit button");
            $("input.mkwsButton").trigger("click");
        })
    });
});

describe("Check MOTD after search", function () {
    it("MOTD is hidden", function () {
        if (!jasmine_config.check_motd) {
            return;
        }

        expect($(".mkwsMOTD").length).toBe(1);
        expect($(".mkwsMOTD").is(":hidden")).toBe(true);
        debug("motd t=" + $(".mkwsMOTD").text());
        debug("motd v=" + $(".mkwsMOTD").is(":visible"));
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
        expect($(".mkwsPager").length).toBe(1);

        function my_click(id, time) {
            setTimeout(function () {
                debug("trigger click on id: " + id);
                $(id).trigger("click");
            }, time * jasmine_config.second);
        }

        waitsFor(function () {
            return $("div.mkwsPager div:nth-child(2) a").length >= 2 ? true : false;
        }, "Expect next link 2", 10 * jasmine_config.second);

        runs(function () {
            // click next/prev after N seconds
            my_click(".mkwsNext", 0);
        });

        waitsFor(function () {
            return $("div.mkwsPager div:nth-child(2) a").length >= 3 ? true : false;
        }, "Expect next link 3", 5 * jasmine_config.second);

        runs(function () {
            // click next/prev after N seconds
            my_click(".mkwsNext", 0);
            my_click(".mkwsPrev", 0.2);
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
            expect($(".mkwsPager").length).toBe(1);
            expect(hits).toBeGreaterThan(expected_hits);
        });
    });
});

describe("Check Termlist", function () {
    it("found Termlist", function () {
        var termlist = $("div.mkwsTermlists");
        debug("Termlist success: " + termlist.length);
        expect(termlist.length).toBe(1);

        waitsFor(function () {
            return $("div.mkwsFacet[data-mkws-facet='xtargets']").length == 1 ? true : false;
        }, "check for facet sources", 4 * jasmine_config.second);

        // everything displayed?
        runs(function () {
            var sources = $("div.mkwsFacet[data-mkws-facet='xtargets']");
            debug("Termlist sources success: " + sources.length);
            expect(sources.length).toBe(1);

            var subjects = $("div.mkwsFacet[data-mkws-facet='subject']");
            expect(subjects.length).toBe(1);

            var authors = $("div.mkwsFacet[data-mkws-facet='author']");
            expect(authors.length).toBe(1);
        });

        waitsFor(function () {
            return $("div.mkwsFacet[data-mkws-facet='author'] div.term").length >= 2 ? true : false;
        }, "At least one author link displayed", 4 * jasmine_config.second);

        runs(function () {
            expect($("div.mkwsFacet[data-mkws-facet='author'] div.term").length).toBeGreaterThan(1);
        });
    });
});

describe("Check Author Facets", function () {
    it("limit search to first author", function () {
        if (mkws.config.disable_facet_authors_search) {
            debug("Facets: ignore limit search for authors");
            return;
        }

        var hits_all_targets = get_hit_counter();
        var author_number = 2; // 2=first author
        // do not click on author with numbers, e.g.: "Bower, James M. Beeman, David, 1938-"
        // do not click on author names without a comma, e.g.: "Joe Barbara"
        // because searching on such authors won't find anything.
        runs(function () {
            var terms = $("div.mkwsFacet[data-mkws-facet='author'] div.term a");
            for (var i = 0; i < terms.length; i++) {
                var term = $(terms[i]).text();
                if (term.match(/[0-9].+[0-9]/i) || !term.match(/,/)) {
                    debug("ignore author facet: " + term);
                    author_number++;
                } else {
                    break;
                }
            }
            if ($("div.mkwsFacet[data-mkws-facet='author'] div.term:nth-child(" + author_number + ") a").text().length == 0) {
                debug("No good authors found. Not clicking on the bad ones");
                return;
            }

            debug("Clicking on author (" + author_number + ") " + $("div.mkwsFacet[data-mkws-facet='author'] div.term:nth-child(" + author_number + ") a").text());
            $("div.mkwsFacet[data-mkws-facet='author'] div.term:nth-child(" + author_number + ") a").trigger("click");
        });

        waitsFor(function () {
            var hits_single_target = get_hit_counter();
            return hits_single_target > 0 && hits_single_target < hits_all_targets ? true : false;
        }, "Limited author search for less than " + hits_all_targets + " hits", 4.5 * jasmine_config.second);

        runs(function () {
            var hits_single_target = get_hit_counter();
            debug("get less hits for authors: " + hits_all_targets + " > " + hits_single_target);
        });
    });
});

describe("Check active clients author", function () {
    it("check for active clients after limited author search", function () {
        waitsFor(function () {
            var clients = $("div.mkwsStat span.clients");
            // debug("clients: " + clients.text());
            return clients.length == 1 && clients.text().match("/[1-9]+[0-9]*$");
        }, "wait for Active clients: x/y", 5.5 * jasmine_config.second);

        runs(function () {
            var clients = $("div.mkwsStat span.clients");
            debug("span.clients: " + clients.text());
            expect(clients.text()).toMatch("/[1-9]+[0-9]*$");

            // exact match of active clients (e.g. a SP misconfiguration)
            if (jasmine_config.active_clients) {
                debug("check for " + jasmine_config.active_clients + " active connections");
                expect(clients.text()).toMatch(" [0-9]+/" + jasmine_config.active_clients + "$");
            }
        });
    });
});

describe("Check Source Facets", function () {
    it("limit search to first source", function () {
        var hits_all_targets = get_hit_counter();
        var source_number = 2; // 2=first source
        // wait for a stat response
        var waitcount = 0;
        // do not click on wikipedia link - no author or subject facets possible
        var link = "div.mkwsFacet[data-mkws-facet='xtargets'] div.term a";

        // wait for a visible source link in facets
        waitsFor(function () {
            var terms = $(link);
            return terms && terms.length > 0;
        }, "wait for source facets after author search", 5 * jasmine_config.second);


        runs(function () {
            var terms = $(link);
            for (var i = 0; i < terms.length; i++) {
                var term = $(terms[i]).text();
                debug("check for good source: " + term);

                if (term.match(/wikipedia/i)) {
                    debug("ignore source facet: " + term);
                    source_number++;
                } else {
                    break;
                }
            }
            debug("Source counter: " + terms.length + ", select: " + (source_number - 1));

            if ($("div.mkwsFacet[data-mkws-facet='xtargets'] div.term:nth-child(" + source_number + ") a").text().length == 0) {
                debug("No good source found. Not clicking on the bad ones");
                return;
            }

            debug("click on source link nth-child(): " + source_number);
            $("div.mkwsFacet[data-mkws-facet='xtargets'] div.term:nth-child(" + source_number + ") a").trigger("click");

            $(".mkwsPager").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
                waitcount++;
                debug("DOM wait for stat: " + waitcount);
            });
        });

        waitsFor(function () {
            if ($("div.mkwsNavi").length && $("div.mkwsNavi").text().match(/(Source|datenquelle|kilder): /i)) {
                return true;
            } else {
                return false;
            }
        }, "Search for source in navi bar", 4 * jasmine_config.second);

        // Note: it may happens that limited source search returns the same number of hits
        // as before. Thats not really an error, but unfortunate
        waitsFor(function () {
            var hits_single_target = get_hit_counter();

            return waitcount >= 2 && hits_single_target > 0 && hits_single_target <= hits_all_targets ? true : false;
        }, "Limited source search for less than " + hits_all_targets + " hits", 5 * jasmine_config.second);

        runs(function () {
            var hits_single_target = get_hit_counter();
            debug("get less hits for sources: " + hits_all_targets + " >= " + hits_single_target);
            expect(hits_all_targets).not.toBeLessThan(hits_single_target);
            jasmine_status.source_click = 1;

            $(".mkwsPager").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
        });
    });
});


describe("Check record list", function () {
    it("check for single active client", function () {
        if (!jasmine_status.source_click) {
            debug("skip clients check due missing source click");
            return;
        }

        waitsFor(function () {
            var clients = $("div.mkwsStat span.clients");
            //debug("clients: " + clients.text());
            return clients.length == 1 && clients.text().match("/1$");
        }, "wait for Active clients: x/1", 5 * jasmine_config.second);

        runs(function () {
            var clients = $("div.mkwsStat span.clients");
            debug("span.clients: " + clients.text());
            expect(clients.text()).toMatch("/1$");
        });
    });

    it("got a record", function () {
        var linkaddr = "div.mkwsRecords div.record:nth-child(1) a";

        waitsFor(function () {
            // remove + insert node: must be at least 2
            return $(linkaddr).length > 0;
        }, "wait until we see a new record", 2.5 * jasmine_config.second);

        runs(function () {
            expect($(linkaddr).length).toBeGreaterThan(0);
        });
    });
});

describe("Show record", function () {
    var record_number = 1; // the Nth record in hit list
    it("show record author", function () {
        var click = $("div.mkwsRecords div.record:nth-child(" + record_number + ") a").trigger("click");
        debug("show record click is success: " + click.length);
        expect(click.length).toBe(1);

        // wait until the record pops up
        waitsFor(function () {
            var show = $("div.mkwsRecords div.record:nth-child(" + record_number + ") > div.mkwsDetails");
            //debug("poprecord: " + (show ? show.length : -1) + " " + $("div.mkwsRecords div.record").text());
            return show != null && show.length ? true : false;
        }, "wait some miliseconds to show up a record", 2 * jasmine_config.second);

        runs(function () {
            debug("show record pop up");
            expect($("div.mkwsRecords div.record:nth-child(" + record_number + ") div")).not.toBe(null);
        });
    });

    it("extract URL", function () {
        if (jasmine_config.show_record_url == false) {
            debug("ignore test for URL in record")
            return;
        }

        var urls = $("div.mkwsRecords div.record:nth-child(" + record_number + ") div table tbody tr td a");
        debug("number of extracted URL from record: " + urls.length);
        // expect(urls.length).toBeGreaterThan(0); // LoC has records without links
        for (var i = 0; i < urls.length; i++) {
            var url = $(urls[i]);
            debug("URL: " + url.attr('href') + " text: " + url.text());

            expect(url.attr('href')).not.toBe(null);
            expect(url.attr('href')).toMatch(/^https?:\/\/[a-z0-9\-]+\.[0-9a-z].*\//i);
            expect(url.text()).not.toBe("");
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
        $("div.mkwsSwitch").children('a').eq(1).trigger("click");

        // now the target table must be visible
        expect($("div.mkwsTargets").is(":visible")).toBe(true);
        expect($("div.mkwsRecords").is(":visible")).toBe(false);

        // wait a half second, to show the target view
        var time = (new Date).getTime();
        waitsFor(function () {
            return (new Date).getTime() - time > 700 ? true : false;
        }, "wait some miliseconds", 1 * jasmine_config.second);

        // look for table header
        runs(function () {
            expect($("div.mkwsTargets").html()).toMatch(/Target ID/);
        });
    });

    it("switch back to record view", function () {
        $("div.mkwsSwitch").children('a').eq(0).trigger("click");

        // now the target table must be visible
        expect($("div.mkwsTargets").is(":visible")).toBe(false);
        expect($("div.mkwsRecords").is(":visible")).toBe(true);
    });
});

describe("Check status client counter", function () {
    function get_time() {
        var date = new Date();
        return date.getTime();
    }
    var time = get_time();

    it("check status clients", function () {
        if (!jasmine_status.source_click) {
            debug("skip clients check due missing source click");
            return;
        }

        waitsFor(function () {
            var clients = $("div.mkwsStat span.clients");
            debug("clients: " + clients.text());
            if (clients.length == 1 && clients.text().match("0/1$")) {
                return true;
            } else {
                return false;
            }
        }, "wait for Active clients: 0/1", 4 * jasmine_config.second);

        runs(function () {
            var clients = $("div.mkwsStat span.clients");
            debug("span.clients: " + clients.text());
            expect(clients.text()).toMatch("0/1$");
        });
    });
});

/* done */
describe("All tests are done", function () {
    it(">>> hooray <<<", function () {
        mkws.jasmine_done = true;
    });
});

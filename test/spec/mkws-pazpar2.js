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
        if (mkws.$(".mkwsPager").length == 0) return -1;

        var found = mkws.$(".mkwsPager").text();
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
        expect(mkws.$(".mkwsMOTD").length).toBe(1);
        expect(mkws.$("#testMOTD").length).toBe(1);
        expect(mkws.$("#testMOTD").text()).toMatch("^ *$");
    });

    it("mkwsMOTDContainer has received the text", function () {
        expect(mkws.$(".mkwsMOTDContainer").length).toBe(1);
        expect(mkws.$(".mkwsMOTDContainer").text()).toMatch(/MOTD/);
    });
});

describe("Check pazpar2 search", function () {
    it("pazpar2 was successfully initialized", function () {
        expect(mkws.config.error).toBe(undefined);
    });

    it("validate HTML id's", function () {
        expect(mkws.$("input.mkwsQuery").length).toBe(1);
        expect(mkws.$("input.mkwsButton").length).toBe(1);

        expect(mkws.$(".mkwsNext").length).not.toBe(1);
        expect(mkws.$(".mkwsPrev").length).not.toBe(1);
    });

    it("run search query", function () {
        var search_query = jasmine_config.search_query; // short hit counter with some paging
        mkws.$("input.mkwsQuery").val(search_query);
        debug("set search query: " + search_query)
        expect(mkws.$("input.mkwsQuery").val()).toMatch("^" + search_query + "$");

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
            mkws.$("input.mkwsButton").trigger("click");
        })
    });
});

describe("Check MOTD after search", function () {
    it("MOTD is hidden", function () {
        if (!jasmine_config.check_motd) {
            return;
        }

        expect(mkws.$(".mkwsMOTD").length).toBe(1);
        expect(mkws.$(".mkwsMOTD").is(":hidden")).toBe(true);
        debug("motd t=" + mkws.$(".mkwsMOTD").text());
        debug("motd v=" + mkws.$(".mkwsMOTD").is(":visible"));
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
        expect(mkws.$(".mkwsPager").length).toBe(1);

        function my_click(id, time) {
            setTimeout(function () {
                debug("trigger click on id: " + id);
                mkws.$(id).trigger("click");
            }, time * jasmine_config.second);
        }

        waitsFor(function () {
            return mkws.$("div.mkwsPager div:nth-child(2) a").length >= 2 ? true : false;
        }, "Expect next link 2", 10 * jasmine_config.second);

        runs(function () {
            // click next/prev after N seconds
            my_click(".mkwsNext", 0);
        });

        waitsFor(function () {
            return mkws.$("div.mkwsPager div:nth-child(2) a").length >= 3 ? true : false;
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
            expect(mkws.$(".mkwsPager").length).toBe(1);
            expect(hits).toBeGreaterThan(expected_hits);
        });
    });
});

describe("Check Termlist", function () {
    it("found Termlist", function () {
        var termlist = mkws.$("div.mkwsTermlists");
        debug("Termlist success: " + termlist.length);
        expect(termlist.length).toBe(1);

        waitsFor(function () {
            return mkws.$("div.mkwsFacet[data-mkws-facet='xtargets']").length == 1 ? true : false;
        }, "check for facet sources", 4 * jasmine_config.second);

        // everything displayed?
        runs(function () {
            var sources = mkws.$("div.mkwsFacet[data-mkws-facet='xtargets']");
            debug("Termlist sources success: " + sources.length);
            expect(sources.length).toBe(1);

            var subjects = mkws.$("div.mkwsFacet[data-mkws-facet='subject']");
            expect(subjects.length).toBe(1);

            var authors = mkws.$("div.mkwsFacet[data-mkws-facet='author']");
            expect(authors.length).toBe(1);
        });

        waitsFor(function () {
            return mkws.$("div.mkwsFacet[data-mkws-facet='author'] div.mkwsTerm").length >= 2 ? true : false;
        }, "At least one author link displayed", 4 * jasmine_config.second);

        runs(function () {
            expect(mkws.$("div.mkwsFacet[data-mkws-facet='author'] div.mkwsTerm").length).toBeGreaterThan(1);
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
            var terms = mkws.$("div.mkwsFacet[data-mkws-facet='author'] div.mkwsTerm a");
            for (var i = 0; i < terms.length; i++) {
                var term = mkws.$(terms[i]).text();
                if (term.match(/[0-9].+[0-9]/i) || !term.match(/,/)) {
                    debug("ignore author facet: " + term);
                    author_number++;
                } else {
                    break;
                }
            }
            if (mkws.$("div.mkwsFacet[data-mkws-facet='author'] div.mkwsTerm:nth-child(" + author_number + ") a").text().length == 0) {
                debug("No good authors found. Not clicking on the bad ones");
                return;
            }

            debug("Clicking on author (" + author_number + ") " + mkws.$("div.mkwsFacet[data-mkws-facet='author'] div.mkwsTerm:nth-child(" + author_number + ") a").text());
            mkws.$("div.mkwsFacet[data-mkws-facet='author'] div.mkwsTerm:nth-child(" + author_number + ") a").trigger("click");
        });

        waitsFor(function () {
            var hits_single_target = get_hit_counter();
            console.log("hits_single_target='" + hits_single_target + "' cf. hits_all_targets='" + hits_all_targets + "'");
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
            var clients = mkws.$("div.mkwsStat span.mkwsClientCount");
            // debug("clients: " + clients.text());
            return clients.length == 1 && clients.text().match("/[1-9]+[0-9]*$");
        }, "wait for Active clients: x/y", 5.5 * jasmine_config.second);

        runs(function () {
            var clients = mkws.$("div.mkwsStat span.mkwsClientCount");
            debug("span.mkwsClientCount: " + clients.text());
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
        var link = "div.mkwsFacet[data-mkws-facet='xtargets'] div.mkwsTerm a";

        // wait for a visible source link in facets
        waitsFor(function () {
            var terms = mkws.$(link);
            return terms && terms.length > 0;
        }, "wait for source facets after author search", 5 * jasmine_config.second);


        runs(function () {
            var terms = mkws.$(link);
            for (var i = 0; i < terms.length; i++) {
                var term = mkws.$(terms[i]).text();
                debug("check for good source: " + term);

                if (term.match(/wikipedia/i)) {
                    debug("ignore source facet: " + term);
                    source_number++;
                } else {
                    break;
                }
            }
            debug("Source counter: " + terms.length + ", select: " + (source_number - 1));

            if (mkws.$("div.mkwsFacet[data-mkws-facet='xtargets'] div.mkwsTerm:nth-child(" + source_number + ") a").text().length == 0) {
                debug("No good source found. Not clicking on the bad ones");
                return;
            }

            debug("click on source link nth-child(): " + source_number);
            mkws.$("div.mkwsFacet[data-mkws-facet='xtargets'] div.mkwsTerm:nth-child(" + source_number + ") a").trigger("click");

            mkws.$(".mkwsPager").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
                waitcount++;
                debug("DOM wait for stat: " + waitcount);
            });
        });

        waitsFor(function () {
            if (mkws.$("div.mkwsNavi").length && mkws.$("div.mkwsNavi").text().match(/(Source|datenquelle|kilder): /i)) {
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

            mkws.$(".mkwsPager").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
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
            var clients = mkws.$("div.mkwsStat span.mkwsClientCount");
            //debug("clients: " + clients.text());
            return clients.length == 1 && clients.text().match("/1$");
        }, "wait for Active clients: x/1", 5 * jasmine_config.second);

        runs(function () {
            var clients = mkws.$("div.mkwsStat span.mkwsClientCount");
            debug("span.mkwsClientCount: " + clients.text());
            expect(clients.text()).toMatch("/1$");
        });
    });

    it("got a record", function () {
        var linkaddr = "div.mkwsRecords div.mkwsSummary:nth-child(1) a";

        waitsFor(function () {
            // remove + insert node: must be at least 2
            return mkws.$(linkaddr).length > 0;
        }, "wait until we see a new record", 2.5 * jasmine_config.second);

        runs(function () {
            expect(mkws.$(linkaddr).length).toBeGreaterThan(0);
        });
    });
});

describe("Show record", function () {
    var record_number = 1; // the Nth record in hit list
    it("show record author", function () {
        var click = mkws.$("div.mkwsRecords div.mkwsSummary:nth-child(" + record_number + ") a").trigger("click");
        debug("show record click is success: " + click.length);
        expect(click.length).toBe(1);

        // wait until the record pops up
        waitsFor(function () {
            var show = mkws.$("div.mkwsRecords div.mkwsSummary:nth-child(" + record_number + ") > div.mkwsDetails");
            //debug("poprecord: " + (show ? show.length : -1) + " " + mkws.$("div.mkwsRecords div.mkwsSummary").text());
            return show != null && show.length ? true : false;
        }, "wait some miliseconds to show up a record", 2 * jasmine_config.second);

        runs(function () {
            debug("show record pop up");
            expect(mkws.$("div.mkwsRecords div.mkwsSummary:nth-child(" + record_number + ") div")).not.toBe(null);
        });
    });

    it("extract URL", function () {
        if (jasmine_config.show_record_url == false) {
            debug("ignore test for URL in record")
            return;
        }

        var urls = mkws.$("div.mkwsRecords div.mkwsSummary:nth-child(" + record_number + ") div table tbody tr td a");
        debug("number of extracted URL from record: " + urls.length);
        // expect(urls.length).toBeGreaterThan(0); // LoC has records without links
        for (var i = 0; i < urls.length; i++) {
            var url = mkws.$(urls[i]);
            debug("URL: " + url.attr('href') + " text: " + url.text());

            expect(url.attr('href')).not.toBe(null);
            expect(url.attr('href')).toMatch(/^https?:\/\/[a-z0-9\-]+\.[0-9a-z].*\//i);
            expect(url.text()).not.toBe("");
        }
    });
});

describe("Check switch menu Records/Targets", function () {
    it("check mkwsSwitch", function () {
        expect(mkws.$("div.mkwsSwitch").length).toBe(1);

        // expect 2 clickable links
        expect(mkws.$("div.mkwsSwitch > a").length).toBe(2);
    });

    it("switch to target view", function () {
        mkws.$("div.mkwsSwitch > a").eq(1).trigger("click");

        // now the target table must be visible
        expect(mkws.$("div.mkwsTargets").is(":visible")).toBe(true);
        expect(mkws.$("div.mkwsRecords").is(":visible")).toBe(false);

        // wait a half second, to show the target view
        var time = (new Date).getTime();
        waitsFor(function () {
            return (new Date).getTime() - time > 700 ? true : false;
        }, "wait some miliseconds", 1 * jasmine_config.second);

        // look for table header
        runs(function () {
            expect(mkws.$("div.mkwsTargets").html()).toMatch(/Target ID/);
        });
    });

    it("switch back to record view", function () {
        mkws.$("div.mkwsSwitch > a").eq(0).trigger("click");

        // now the target table must be visible
        expect(mkws.$("div.mkwsTargets").is(":visible")).toBe(false);
        expect(mkws.$("div.mkwsRecords").is(":visible")).toBe(true);
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
            var clients = mkws.$("div.mkwsStat span.mkwsClientCount");
            debug("clients: " + clients.text());
            if (clients.length == 1 && clients.text().match("0/1$")) {
                return true;
            } else {
                return false;
            }
        }, "wait for Active clients: 0/1", 4 * jasmine_config.second);

        runs(function () {
            var clients = mkws.$("div.mkwsStat span.mkwsClientCount");
            debug("span.mkwsClientCount: " + clients.text());
            expect(clients.text()).toMatch("0/1$");
        });
    });
});

/* remove the "source" and "author" facet link to get more records again */
describe("Check removable facets links", function () {
    var $ = mkws.$;

    it("remove links for source and author", function () {
        var waitcount = 0;

        runs(function () {
            var click = $("a.mkwsRemovable").trigger("click");
            debug("Removed facets links: " + click.length);
            expect(click.length).toBe(2);
        });

        runs(function () {
            $(".mkwsPager").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
                waitcount++;
                debug("DOM change for removeable: " + waitcount);
            });
        });

        waitsFor(function () {
            // debug("wait for: " + waitcount);
            return waitcount >= 2 ? true : false;
        }, "Records DOM change, by per page", 2 * jasmine_config.second);


        runs(function () {
            debug("unbind removable");
            $(".mkwsPager").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
        });
    });
});


describe("Check per page options", function () {
    var $ = mkws.$;

    it("show per page", function () {
        var waitcount = 0;
        var per_page_number = 20;

        runs(function () {
            var select = $("select.mkwsPerpage option[selected='selected']");
            debug("per page default is: " + select.text() + " and unselect it");
            select.removeAttr('selected');

            select = $("select.mkwsPerpage option[value='" + per_page_number + "']").attr('selected', true);
            debug("per page is set to: " + select.text());
            select.trigger("change");

            $("div.mkwsRecords").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
                waitcount++;
                debug("DOM wait for change, per page: " + waitcount);
            });
        });

        waitsFor(function () {
            debug("wait for: " + waitcount);
            return waitcount >= 6 ? true : false;
        }, "Records DOM change, by per page", 3 * jasmine_config.second);

        runs(function () {
            $("div.mkwsRecords").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
            debug("unbind per page");
        });

        runs(function () {
            var records = $("div.mkwsRecords > div.mkwsSummary");
            debug("Got now " + records.length + " records");
            expect(records.length).toBe(per_page_number);
        });
    });
});

describe("Check SortBy options", function () {
    var $ = mkws.$;

    it("show per page", function () {
        var waitcount = 0;
        var sort_value = 'title:1';
        var per_page_number = 20;
        var title_list_old = title_list("xxx ");

        function title_list(prefix) {
            var list = [];
            var terms = $("div.mkwsRecords > div.mkwsSummary > a");
            for (var i = 0; i < terms.length; i++) {
                var term = $(terms[i]).text();
                list.push(term);
                // debug(prefix + "title: " + term);
            }
            return list;
        }

        runs(function () {
            $("div.mkwsRecords").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
                waitcount++;
                debug("DOM wait for change, per page: " + waitcount);
            });

            var select = $("select.mkwsSort option[selected='selected']");
            debug("Sort by default is: " + select.text() + " and unselect it");
            select.removeAttr('selected');

            select = $("select.mkwsSort option[value='" + sort_value + "']").attr('selected', true);
            debug("srot by is set to: " + select.text());
            select.trigger("change");


        });

        waitsFor(function () {
            debug("wait for2: " + waitcount);
            return waitcount >= 6 ? true : false;
        }, "Records DOM change, by sort page", 3 * jasmine_config.second);

        runs(function () {
            $("div.mkwsRecords").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
            debug("unbind per page");
        });

        runs(function () {
            var records = $("div.mkwsRecords > div.mkwsSummary a");
            debug("Got now " + records.length + " records");
            expect(records.length).toBe(per_page_number);
        });

        runs(function () {
            var title_list_new = title_list("yyy ");
            var diff_flag = 0;
            for (var i = 0; i < title_list_old.length; i++) {
                debug(title_list_old[i] + " :: " + title_list_new[i]);

                if (title_list_old[i] != title_list_new[i]) {
                    diff_flag++;
                }
            }
            debug("Title changes: " + diff_flag + " out of " + per_page_number);
            expect(diff_flag).not.toBe(0);
        });
    });
});


/* done */
describe("All tests are done", function () {
    it(">>> hooray <<<", function () {
        mkws.jasmine_done = true;
    });
});

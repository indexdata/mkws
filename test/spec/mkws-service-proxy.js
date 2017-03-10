/* Copyright (c) 2013-2017 Index Data ApS. http://indexdata.com
 *
 * perform service-proxy / pz2.js search & retrieve request in the browser
 *
 */

// compatible with jasmine 1.3.x
var waitsForAndRuns = function (escapeFunction, runFunction, escapeTime) {
        // check the escapeFunction every millisecond so as soon as it is met we can escape the function
        var interval = setInterval(function () {
            if (escapeFunction()) {
                clearMe();
                runFunction();
            }
        }, 10); // 10ms is enough for polling
        // in case we never reach the escapeFunction, we will time out
        // at the escapeTime
        var timeOut = setTimeout(function () {
            clearMe();
            runFunction();
        }, escapeTime);

        // clear the interval and the timeout

        function clearMe() {
            clearInterval(interval);
            clearTimeout(timeOut);
        }
    };

// get references from mkws.js, lazy evaluation
var debug = function (text) {
        // use a debug function with time stamps
        mkws.teams["AUTO"].info("Jasmine: " + text);

        //mkws.log("Jasmine: " + text)
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
        // tune parameter for batch testing
        batch_tuning: true,

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

        // check sort by and per page menu
        check_sortby: false,

        dummy: false
    };

    // use default values for undefined values
    for (var key in jasmine_config_default) {
        if (!jasmine_config.hasOwnProperty(key)) {
            jasmine_config[key] = jasmine_config_default[key];
        }
        debug("jasmine config: " + key + " => " + jasmine_config[key]);
    }

    // jenkins batch tests
    if (jasmine_config.batch_tuning) {
        var sec = mkws.getParameterByName("second", document.location);

        // run on localhost
        if (!sec && document.location.href.match(/^http:\/\/localhost:4040/)) {
            sec = 2000;
        }

        if (sec && parseInt(sec) >= 100) {
            jasmine_config.second = parseInt(sec);
            debug("longer timeouts for batch testing: " + jasmine_config.second);
        }
    }

    mkws.jasmine_done = false;
    debug("init_jasmine_config done");
};

function get_hit_counter() {
    var $ = mkws.$;
    // not yet here
    if ($(".mkws-pager").length == 0) return -1;

    var found = $(".mkws-pager").text();
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
};

/******************************************************************************/
describe("Init jasmine config", function () {
    it("jasmine was successfully initialized", function () {
        init_jasmine_config();

        expect(jasmine_config.search_query).toMatch(/\w/);
        expect(jasmine_config.second).toBeGreaterThan(100);
        expect(jasmine_config.max_time).toBeGreaterThan(1);
        expect(jasmine_config.expected_hits).toBeGreaterThan(1);
    });
});


describe("Check service-proxy auth is done", function () {
    var $ = mkws.$;

    beforeEach(function (done) {
        debug("beforeEach starts");
        if (mkws.config.use_service_proxy) {
            // wait for service proxy auth
            waitsForAndRuns(function () {
                return mkws.authenticated;
            }, function () {
                debug("service proxy auth done");
                expect(mkws.authenticated).toBe(true);
                done();
                debug("beforeEach ends");
            }, 5 * jasmine_config.second);

        } else {
            debug("running raw pp2, don't wait for mkws auth");
        }
    });

    it("pazpar2 was successfully initialized", function () {
        expect(mkws.config.error).toBe(undefined);
        expect(mkws.authenticated).toBe(true);
    });
});

describe("Check pazpar2 search", function () {
    var $ = mkws.$;

    it("validate HTML id's", function () {
        expect($("input.mkws-query").length).toBe(1);
        expect($("input.mkws-button").length).toBe(1);

        expect($(".mkws-next").length).not.toBe(1);
        expect($(".mkws-prev").length).not.toBe(1);
    });

    it("run search query", function () {
        var search_query = jasmine_config.search_query; // short hit counter with some paging
        $("input.mkws-query").val(search_query);
        debug("set search query: " + search_query)
        expect($("input.mkws-query").val()).toMatch("^" + search_query + "$");

        debug("Click on submit button");
        $("input.mkws-button").trigger("click");
    });
});

describe("Check MOTD after search", function () {
    var $ = mkws.$;

    it("MOTD is hidden", function () {
        expect(true).toBe(true);
        if (!jasmine_config.check_motd) {
            return;
        }

        expect($(".mkws-motd").length).toBe(1);
        expect($(".mkws-motd").is(":hidden")).toBe(true);
        debug("motd t=" + $(".mkws-motd").text());
        debug("motd v=" + $(".mkws-motd").is(":visible"));
    });
});


/*
 * This part runs in background. It should be rewritten with
 * async jasmine functions
 *
 */
describe("Check pazpar2 navigation", function () {
    var $ = mkws.$;

    function my_click(id, time) {
        setTimeout(function () {
            debug("trigger click on id: " + id);
            $(id).trigger("click");
        }, time * jasmine_config.second);
    }

    // Asynchronous part
    it("check running search next/prev", function () {
        expect($(".mkws-pager").length).toBe(1);
    });

    describe("Expect next link 2", function () {
        beforeEach(function (done) {
            var path = "div.mkws-pager div:nth-child(2) a";
            waitsForAndRuns(function () {
                return $(path).length >= 2 ? true : false;
            }, function () {
                expect($(path).length >= 2).toBeTruthy();
                debug("Expect next link 2 done")
                done();
            }, 10 * jasmine_config.second);
        });

        it("click next link", function () {
            my_click(".mkws-next", 0);
        });
    });

    describe("Expect next link 3", function () {
        beforeEach(function (done) {
            var path = "div.mkws-pager div:nth-child(2) a";

            waitsForAndRuns(function () {
                return $(path).length >= 3 ? true : false;
            }, function () {
                expect($(path).length >= 3).toBeTruthy();
                debug("Expect next link 3 done")
                done();
            }, 5 * jasmine_config.second);
        });

        it("click next and prev link", function () {
            my_click(".mkws-next", 0);
            my_click(".mkws-prev", 0.2);
        });
    });
});

describe("Check pazpar2 hit counter", function () {
    var $ = mkws.$;
    var hits = -2;

    beforeEach(function (done) {
        waitsForAndRuns(function () {
            hits = get_hit_counter();
            return hits > jasmine_config.expected_hits;
        }, function () {
            debug("Expect " + jasmine_config.expected_hits + " hits");
            done();
        }, jasmine_config.max_time * jasmine_config.second);
    });

    it("check running search hit counter", function () {
        debug("mkws pager found records: '" + hits + "'");
        expect($(".mkws-pager").length).toBe(1);
        expect(hits).toBeGreaterThan(jasmine_config.expected_hits);
    });
});

describe("Check Facets", function () {
    var $ = mkws.$;

    describe("Check facets", function () {
        it("found Facets", function () {
            var facets = $("div.mkws-facets");
            debug("Facet success: " + facets.length);
            expect(facets.length).toBe(1);
        });
    });

    describe("Check facets sources/xtargets", function () {
        beforeEach(function (done) {
            waitsForAndRuns(function () {
                return $("div.mkws-facet[data-mkws-facet='xtargets']").length == 1 ? true : false;
            }, function () {
                debug("check for facet sources/xtargets");
                done();
            }, 4 * jasmine_config.second);
        });

        describe("found facets", function () {
            it("found facets sources/xtargets", function () {
                var sources = $("div.mkws-facet[data-mkws-facet='xtargets']");
                debug("Facet sources/xtargets success: " + sources.length);
                expect(sources.length).toBe(1);
            });

            it("found facets subjects", function () {
                var subjects = $("div.mkws-facet[data-mkws-facet='subject']");
                debug("Facet subjects success: " + subjects.length);
                expect(subjects.length).toBe(1);
            });

            it("found facets authors", function () {
                var authors = $("div.mkws-facet[data-mkws-facet='author']");
                debug("Facet authors success: " + authors.length);
                expect(authors.length).toBe(1);
            });
        });
    });

    describe("Check facets author", function () {
        var path = "div.mkws-facet[data-mkws-facet='author'] div.mkws-term";
        beforeEach(function (done) {
            var min_authors = 5;

            waitsForAndRuns(function () {
                return $(path).length >= min_authors ? true : false;
            }, function () {
                debug("At least " + min_authors + " author link displayed");
                done();
            }, 6 * jasmine_config.second);
        });

        it("found some authors", function () {
            expect($(path).length).toBeGreaterThan(1);
            debug("author facet length: " + $(path).length);
        });
    });
});

describe("Check Author Facets", function () {
    var $ = mkws.$;

    describe("Limit search to first author", function () {
        it("pick a good author name", function () {
            expect(true).toBe(true); // XXX: spec has no expectations ???
            if (mkws.config.disable_facet_authors_search) {
                debug("Facets: ignore limit search for authors");
                return;
            }

            var author_number = 2; // 2=first author
            // do not click on author with numbers, e.g.: "Bower, James M. Beeman, David, 1938-"
            // do not click on author names without a comma, e.g.: "Joe Barbara"
            // because searching on such authors won't find anything.
            var terms = $("div.mkws-facet[data-mkws-facet='author'] > div.mkws-term a");
            for (var i = 0; i < terms.length; i++) {
                var term = $(terms[i]).text();
                if (term.match(/[0-9].+[0-9]/i) || !term.match(/,/)) {
                    debug("ignore author facet: " + term);
                    author_number++;
                } else {
                    break;
                }
            }
            if ($("div.mkws-facet[data-mkws-facet='author'] > div.mkws-term:nth-child(" + author_number + ") a").text().length == 0) {
                debug("No good authors found. Not clicking on the bad ones: " + terms.length);
                console.log(terms);
                return;
            }

            var path = $("div.mkws-facet[data-mkws-facet='author'] div.mkws-term:nth-child(" + author_number + ") a");
            expect(path.length).toBe(1);

            debug("Clicking on author (" + author_number + ") " + path.text());
            path.trigger("click");
        });

        describe("Limited author search", function () {
            beforeEach(function (done) {
                var hits_all_targets = get_hit_counter();

                waitsForAndRuns(function () {
                    var hits_single_target = get_hit_counter();
                    return hits_single_target > 0 && hits_single_target < hits_all_targets ? true : false;
                }, function () {
                    debug("Limited author search for less than " + hits_all_targets + " hits");
                    done();
                }, 4.5 * jasmine_config.second);
            });


            it("Got less hits for limited author search", function () {
                expect(true).toBe(true); // XXX: spec has no expectations ???
            });

        });
    });
});

describe("Check active clients author", function () {
    var $ = mkws.$;

    describe("check for active clients after limited author search", function () {
        beforeEach(function (done) {
            waitsForAndRuns(function () {
                var clients = $("div.mkws-stat span.mkws-client-count");
                // debug("clients: " + clients.text());
                return clients.length == 1 && clients.text().match("/[1-9]+[0-9]*$");
            }, function () {
                debug("wait for Active clients: x/y");
                done();
            }, 5.5 * jasmine_config.second);
        });

        it("client count", function () {
            var clients = $("div.mkws-stat span.mkws-client-count");
            debug("span.mkws-client-count: " + clients.text());
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
    var $ = mkws.$;
    var hits_all_targets = -2;

    describe("limit search to first source", function () {
        var source_number = 2; // 2=first source
        // wait for a stat response
        var waitcount = 0;
        // do not click on wikipedia link - no author or subject facets possible
        var link = "div.mkws-facet[data-mkws-facet='xtargets'] div.mkws-term a";

        beforeEach(function (done) {
            hits_all_targets = get_hit_counter();

            waitsForAndRuns(function () {
                var terms = $(link);
                return terms && terms.length > 0;
            }, function () {
                debug("wait for source facets after author search");
                done();
            }, 5 * jasmine_config.second);
        });

        it("check for good source", function () {
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

            if ($("div.mkws-facet[data-mkws-facet='xtargets'] div.mkws-term:nth-child(" + source_number + ") a").text().length == 0) {
                debug("No good source found. Not clicking on the bad ones");
                return;
            }

            debug("click on source link nth-child(): " + source_number);
            $("div.mkws-facet[data-mkws-facet='xtargets'] div.mkws-term:nth-child(" + source_number + ") a").trigger("click");

            $(".mkws-pager").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
                waitcount++;
                debug("DOM change mkws-pager, for stat: " + waitcount);
            });

            expect(true).toBe(true);
        });
    });

    describe("wait for source facets", function () {
        beforeEach(function (done) {
            waitsForAndRuns(function () {
                return $("div.mkws-navi").length && $("div.mkws-navi").text().match(/(Source|datenquelle|kilder): /i) ? true : false;
            }, function () {
                debug("wait for source facets");
                done();
            }, 5 * jasmine_config.second);
        });

        it("got new facets results", function () {
            expect(true).toBe(true);
        });
    });

    describe("Limited source search for less hits", function () {
        var hits_single_target = -2;

        // Note: it may happens that limited source search returns the same number of hits
        // as before. Thats not really an error, but unfortunate
        beforeEach(function (done) {
            waitsForAndRuns(function () {
                hits_single_target = get_hit_counter();
                return hits_single_target > 0 && hits_single_target < hits_all_targets ? true : false;
            }, function () {
                debug("Limited source search for less than " + hits_all_targets + " > " + hits_single_target + " hits");
                done();
            }, 5 * jasmine_config.second);
        });


        it("get less hits for sources", function () {
            var hits_single_target = get_hit_counter();
            debug("get less hits for sources: " + hits_single_target + " >= " + hits_all_targets);
            expect(hits_all_targets + 10).not.toBeLessThan(hits_single_target);
            jasmine_status.source_click = 1;

            $(".mkws-pager").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
        });
    });
});


describe("Check record list", function () {
    var $ = mkws.$;

    describe("check for single active client", function () {
        beforeEach(function (done) {
            if (!jasmine_status.source_click) {
                expect(true).toBe(true);
                debug("skip clients check due missing source click");
                return;
            }

            waitsForAndRuns(function () {
                var clients = $("div.mkws-stat span.mkws-client-count");
                //debug("clients: " + clients.text());
                return clients.length == 1 && clients.text().match("/1$");
            }, function () {
                debug("wait for Active clients: x/1");
                done();
            }, 5 * jasmine_config.second);
        });

        it("got a singel target", function () {
            var clients = $("div.mkws-stat span.mkws-client-count");
            debug("span.mkws-client-count: " + clients.text());
            expect(clients.text()).toMatch("/1$");
        });
    });

    describe("got a record", function () {
        var linkaddr = "div.mkws-records div.mkws-summary:nth-child(1) a";

        beforeEach(function (done) {
            waitsForAndRuns(function () {
                // remove + insert node: must be at least 2
                return $(linkaddr).length > 0;
            }, function () {
                debug("wait until we see a new record");
                done();
            }, 2.5 * jasmine_config.second);
        });

        it("got a record", function () {
            expect($(linkaddr).length).toBeGreaterThan(0);
        });
    });
});

describe("Show record", function () {
    var $ = mkws.$;
    var record_number = 1; // the Nth record in hit list
    describe("show record author", function () {
        it("show record author", function () {
            var click = $("div.mkws-records div.mkws-summary:nth-child(" + record_number + ") a").trigger("click");
            debug("show record click is success: " + click.length);
            expect(click.length).toBe(1);
        });
    });

    describe("got a record", function () {
        beforeEach(function (done) {
            waitsForAndRuns(function () {
                var show = $("div.mkws-records div.mkws-summary:nth-child(" + record_number + ") > div.mkws-details");
                //debug("poprecord: " + (show ? show.length : -1) + " " + $("div.mkws-records div.mkws-summary").text());
                return show != null && show.length ? true : false;
            }, function () {
                debug("wait some miliseconds to show up a record");
                done();
            }, 2 * jasmine_config.second);
        });

        it("show record pop up", function () {
            debug("show record pop up");
            expect($("div.mkws-records div.mkws-summary:nth-child(" + record_number + ") div")).not.toBe(null);
        });
    });

    describe("extract URL", function () {
        it("extract URL", function () {
            expect(true).toBe(true);
            if (jasmine_config.show_record_url == false) {
                debug("ignore test for URL in record")
                return;
            }

            var urls = $("div.mkws-records div.mkws-summary:nth-child(" + record_number + ") div table tbody tr td a");
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
});

describe("Check switch menu Records/Targets", function () {
    var $ = mkws.$;

    it("check mkws-switch", function () {
        expect($("div.mkws-switch").length).toBe(1);

        // expect 2 clickable links
        expect($("div.mkws-switch > a").length).toBe(2);
    });

    it("switch to target view", function () {
        $("div.mkws-switch > a").eq(1).trigger("click");

        // now the target table must be visible
        expect($("div.mkws-targets").is(":visible")).toBe(true);
        expect($("div.mkws-records").is(":visible")).toBe(false);


        // avoid race conditions of source facets updates
        it("wait a little bit for a source facets update", function () {
            // wait a half second, to show the target view
            var waittime = 0.7;
            var time = (new Date).getTime();

            waitsForAndRuns(function () {
                return (new Date).getTime() - time > (waittime * jasmine_config.second) ? true : false;
            }, function () {
                debug("wait some miliseconds: " + waittime);
            }, (waittime + 0.5) * jasmine_config.second);

            expect(true).toBe(true);
        });


        expect($("div.mkws-targets").html()).toMatch(/Target ID/);
    });

    it("switch back to record view", function () {
        $("div.mkws-switch > a").eq(0).trigger("click");

        // now the target table must be visible
        expect($("div.mkws-targets").is(":visible")).toBe(false);
        expect($("div.mkws-records").is(":visible")).toBe(true);
    });
});

// temporary disabled due records without an author, MKWS-400
describe("Check translations", function () {
    var $ = mkws.$;

    // handle html entities, "Zur&uuml;ck" => "Zurück"

    function M(string) {
        var text = $("<span/>").html(mkws.M(string)).text()
        debug("translate check for: " + text);
        return text;
    };

    function lang() {
        return mkws.config.lang
    };

    function check_translation(list, text) {
        expect(list.length).toBe(text.length);
        if (list.length != text.length) {
            debug("check_translation: " + list.length + " " + text.length);
            console.log(list);
            console.log(text);
        }

        for (var i = 0; i < text.length; i++) {
            expect($(list[i]).text().match(M(text[i]))).not.toBeNull();
        }
    }

    function check_translation_list(list, keywords) {
        var errors = [];
        for (var i = 0; i < keywords.length; i++) {
            var text = $(list[i]);
            var keyword = keywords[i];

            if (text.text().match("^" + M(keyword) + "")) {
                debug("found: " + text.text() + " :: " + keyword);
            } else {
                debug("NOT found: " + text.text() + " :: " + keyword);
                errors.push(keyword)
            }
        }

        // we except one missing field, or one error
        expect(errors.length).not.toBeGreaterThan(1);
        debug("found error length: " + errors.length)
    }

    it("check language", function () {
        var lang = mkws.config.lang;
        debug("lang: " + lang);
        expect(lang).toMatch(/^(de|da|)$/);
    });

/*
  locale_lang: {
    "de": {
      "Authors": "Autoren",
      "Subjects": "Schlagw&ouml;rter",
      "Sources": "Daten und Quellen",
      "source": "datenquelle",
      "Facets": "Termlisten",
      "Next": "Weiter",
      "Prev": "Zur&uuml;ck",
      "Search": "Suche",
      "Sort by": "Sortieren nach",
      "and show": "und zeige",
      "per page": "pro Seite",
      "Displaying": "Zeige",
      "to": "von",
      "of": "aus",
      "found": "gefunden",
      "Title": "Titel",
      "Author": "Autor",
      "author": "autor",
      "Date": "Datum",
      "Subject": "Schlagwort",
      "subject": "schlagwort",
      "Location": "Bestand",
      "Locations": "Bestand",
      "Records": "Datens&auml;tze",
      "Targets": "Datenbanken",
      "relevance": "Relevanz",
      "title": "Titel",
      "newest": "Neueste",
      "oldest": "&Auml;lteste",

      "dummy": "dummy"
    },
*/

    it("search button", function () {
        var list = $(".mkws-pager-desc > span");
        expect($("form > input[type=submit]").attr("value")).toBe(M("Search"));
    });

    it("switch", function () {
        var list = $(".mkws-switch > a")
        var text = ["Records", "Targets"];

        check_translation(list, text);
    });


    it("ranking form", function () {
        var list = $(".mkws-ranking > form > span");
        var text = ["Sort by", "and show", "per page"];

        check_translation(list, text);

        // double check
        if (lang == "de") {
            expect("Sortieren nach").toBe(M("Sort by"));
            expect("Sortieren nach").toBe($(list[0]).text());
        } else if (lang == "da") {
            expect("Sorter efter").toBe(M("Sort by"));
            expect("Sorter efter").toBe($(list[0]).text());
        }


        expect($("select.mkws-sort > option[selected=selected]").text()).toBe(M("relevance"));
    });

    it("facets sidebar", function () {
        var list = $(".mkws-facet-title");
        var text = ["Sources", "Subjects", "Authors"];

        check_translation(list, text);
    });

    it("facets navigation/filter", function () {
        var list = $(".mkws-navi > span");
        var text = ["author"];

        if (jasmine_status.source_click) {
            text = ["source", "author"];
        }

        check_translation(list, text);
    });

    it("navigation", function () {
        var list = $(".mkws-pager-desc > span");
        var text = ["Displaying", "to", "of", "found"];

        check_translation(list, text);

        expect($(".mkws-next").text().match(M("Next"))).not.toBeNull();
        expect($(".mkws-next").text().match(M("NextXXX"))).toBeNull();
        expect($(".mkws-prev").text().match(M("Prev"))).not.toBeNull();
    });

    it("record details", function () {
        var keywords = ["Title", "Date", "Author"]; // , "Subject", "Locations"];
        var list = $("div.mkws-details table > tbody > tr > th");

        // compare only the first 3 elements
        // list = list.splice(0, text.length)
        check_translation_list(list, keywords);
    });

/* not tested
     *
     * Status line:  -- Active clients : 0/1 -- Retrieved records : 4/4
     *
     */
});

describe("Check status client counter", function () {
    var $ = mkws.$;

    it("check status clients", function () {
        expect(true).toBe(true);

        if (!jasmine_status.source_click) {
            debug("skip clients check due missing source click");
            return;
        }


        describe("Check status client counter", function () {
            beforeEach(function (done) {
                waitsForAndRuns(function () {
                    var clients = $("div.mkws-stat span.mkws-client-count");
                    debug("clients: " + clients.text());
                    return clients.length == 1 && clients.text().match("0/1$");
                }, function () {
                    debug("wait for Active clients: 0/1");
                    done();
                }, 4 * jasmine_config.second);
            });


            it("client count", function () {
                var clients = $("div.mkws-stat span.mkws-client-count");
                debug("span.mkws-client-count: " + clients.text());
                expect(clients.text()).toMatch("0/1$");
            });
        });
    });
});

/* remove the "source" and "author" facet link to get more records again */
describe("Check removable facets links", function () {
    var $ = mkws.$;

    it("remove links for source and author", function () {
        var waitcount = 0;

        expect(true).toBe(true);
        if (!jasmine_config.check_sortby) {
            debug("ignore check for removable facets");
            return;
        }


        var click = $("a.mkws-removable").eq(0).trigger("click");
        debug("Removed first facets link: " + click.length);
        expect(click.length).toBe(1);

        $("div.mkws-records").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
            waitcount++;
            if (waitcount <= 5 || (waitcount % 5 == 0)) {
                debug("DOM change mkws-records for removeable: " + waitcount);
            }
        });

        describe("Check removable facets links", function () {

            beforeEach(function (done) {
                waitsForAndRuns(function () {
                    return waitcount >= 2 && $("a.mkws-removable").length == 1 ? 1 : 0;
                }, function () {
                    debug("Records DOM change mkws-records, removable");
                    done();
                }, 2 * jasmine_config.second);
            });

            it("unbind removable", function () {

                debug("unbind removable");
                $("div.mkws-records").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
                waitcount = 0;

                $("div.mkws-records").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
                    waitcount++;
                    if (waitcount <= 5 || (waitcount % 5 == 0)) {
                        debug("DOM change mkws-records for removeable2: " + waitcount);
                    }
                });

                var click = $("a.mkws-removable").eq(0).trigger("click");
                debug("Removed second facets link: " + click.length);
                expect(click.length).toBe(1);
            });
        });

        describe("Check removable facets links", function () {

            beforeEach(function (done) {
                waitsForAndRuns(function () {
                    return waitcount >= 2 && $("a.mkws-removable").length == 0 ? true : false;
                }, function () {
                    debug("DOM change mkws-records, removable2");
                    done();
                }, 2 * jasmine_config.second);
            });

            it("unbind removable2", function () {
                debug("unbind removable2");
                $("div.mkws-records").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
            });
        });
    });
});


describe("Check per page options", function () {
    var $ = mkws.$;

    it("show per page", function () {
        expect(true).toBe(true);

        if (!jasmine_config.check_sortby) {
            debug("ignore check for per page select");
            return;
        }
        var waitcount = 0;
        var per_page_number = 20;


        var select = $("select.mkws-perpage option[selected='selected']");
        debug("per page default is: " + select.text() + " and unselect it");
        select.removeAttr('selected');

        select = $("select.mkws-perpage option[value='" + per_page_number + "']").attr('selected', true);
        debug("per page is set to: " + select.text());
        select.trigger("change");

        $("div.mkws-records").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
            waitcount++;
            if (waitcount <= 5 || (waitcount % 10 == 0)) {
                debug("DOM change mkws-records, per page: " + waitcount);
            }
        });

        describe("DOM change mkws-records, by per page", function () {

            beforeEach(function (done) {
                waitsForAndRuns(function () {
                    // debug("per page waitcounter: " + waitcount)
                    return waitcount >= (per_page_number + 10) ? true : false;
                }, function () {
                    debug("DOM change mkws-records, by per page");
                    done();
                }, 3 * jasmine_config.second);
            });

            it("unbind per page", function () {
                debug("unbind per page");
                $("div.mkws-records").unbind("DOMNodeInserted DOMNodeRemoved propertychange");

                var records = $("div.mkws-records > div.mkws-summary");
                debug("Per page got now " + records.length + " records");
                expect(records.length).toBe(per_page_number);
            });
        });
    });
});

describe("Check SortBy options", function () {
    var $ = mkws.$;

    it("sort by title", function () {
        expect(true).toBe(true);

        if (!jasmine_config.check_sortby) {
            debug("ignore check for sort by");
            return;
        }

        var waitcount = 0;
        var sort_value = 'title:1';
        var per_page_number = 20;

        // keep current title list
        var title_list_old = title_list("xxx ");

        function title_list(prefix) {
            var list = [];
            var terms = $("div.mkws-records > div.mkws-summary > div.mkws-field-data span.mkws-field-title");
            for (var i = 0; i < terms.length; i++) {
                var term = $(terms[i]).text().trim();
                list.push(term);
                // debug(prefix + "title: " + term);
            }
            return list;
        }

        $("div.mkws-records").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
            waitcount++;
            if (waitcount <= 5 || (waitcount % 10 == 0)) {
                debug("DOM change mkws-records, sort by: " + waitcount);
            }
        });

        var select = $("select.mkws-sort option[selected='selected']");
        debug("Sort by default is: " + select.text() + " and unselect it");
        select.removeAttr('selected');

        select = $("select.mkws-sort option[value='" + sort_value + "']").attr('selected', true);
        debug("sort by is set to: " + select.text());
        select.trigger("change");

        describe("DOM change mkws-records, by sort page", function () {
            beforeEach(function (done) {
                waitsForAndRuns(function () {
                    //debug("wait for2: " + waitcount);
                    return waitcount >= (per_page_number + 10) ? true : false;
                }, function () {
                    debug("DOM change mkws-records, by sort page");
                    done();
                }, 3 * jasmine_config.second);
            });

            it("unbind by sort", function () {
                $("div.mkws-records").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
                debug("unbind by sort");

                var records = $("div.mkws-records > div.mkws-summary");
                debug("Sort by got now " + records.length + " records");
                expect(records.length).toBe(per_page_number);

                var title_list_new = title_list("yyy ");
                var diff_flag = 0;
                for (var i = 0; i < title_list_old.length; i++) {
                    debug((i + 1) + ". " + title_list_old[i] + " :: " + title_list_new[i]);

                    if (title_list_old[i] != title_list_new[i]) {
                        diff_flag++;
                    }
                }
                debug("Title changes: " + diff_flag + " out of " + per_page_number);
                expect(diff_flag).not.toBe(0);
            });
        });
    });
});


/* done */
describe("All tests are done", function () {
    it(">>> hooray <<<", function () {
        expect(mkws.jasmine_done).toBe(false);
        mkws.jasmine_done = true;
        debug(">>> hooray <<<");
    });
});

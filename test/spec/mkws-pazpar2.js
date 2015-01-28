/* Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com
 *
 * perform papzpar2 / pz2.js search & retrieve request in the browser
 *
 */

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

    mkws.jasmine_done = false;
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

//disabled
xdescribe("Check MOTD before search", function () {
    var $ = mkws.$;

    // Check that the MOTD has been moved into its container, and
    // is visible before the search.
    // the mkws-motd div was originally inside a testMOTD div, which should
    // now be empty
    // Note that the testMOTD is a regular div, and uses #testMOTD,
    // since the automagic class-making does not apply to it.
    it("MOTD is hidden", function () {
        expect($(".mkws-motd").length).toBe(1);
        expect($("#testMOTD").length).toBe(1);
        expect($("#testMOTD").text()).toMatch("^ *$");
    });

    it("mkws-motd-container has received the text", function () {
        expect($(".mkws-motd-container").length).toBe(1);
        expect($(".mkws-motd-container").text()).toMatch(/MOTD/);
    });
});

describe("Check pazpar2 search", function () {
    var $ = mkws.$;

    it("pazpar2 was successfully initialized", function () {
        expect(mkws.config.error).toBe(undefined);
    });

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
            $("input.mkws-button").trigger("click");
        })
    });
});

describe("Check MOTD after search", function () {
    var $ = mkws.$;

    it("MOTD is hidden", function () {
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

    // Asynchronous part
    it("check running search next/prev", function () {
        expect($(".mkws-pager").length).toBe(1);

        function my_click(id, time) {
            setTimeout(function () {
                debug("trigger click on id: " + id);
                $(id).trigger("click");
            }, time * jasmine_config.second);
        }

        waitsFor(function () {
            return $("div.mkws-pager div:nth-child(2) a").length >= 2 ? true : false;
        }, "Expect next link 2", 10 * jasmine_config.second);

        runs(function () {
            // click next/prev after N seconds
            my_click(".mkws-next", 0);
        });

        waitsFor(function () {
            return $("div.mkws-pager div:nth-child(2) a").length >= 3 ? true : false;
        }, "Expect next link 3", 5 * jasmine_config.second);

        runs(function () {
            // click next/prev after N seconds
            my_click(".mkws-next", 0);
            my_click(".mkws-prev", 0.2);
        });
    });
});

describe("Check pazpar2 hit counter", function () {
    var $ = mkws.$;

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
            expect($(".mkws-pager").length).toBe(1);
            expect(hits).toBeGreaterThan(expected_hits);
        });
    });
});

describe("Check Facets", function () {
    var $ = mkws.$;

    it("found Facets", function () {
        var facets = $("div.mkws-facets");
        debug("Facet success: " + facets.length);
        expect(facets.length).toBe(1);

        waitsFor(function () {
            return $("div.mkws-facet[data-mkws-facet='xtargets']").length == 1 ? true : false;
        }, "check for facet sources", 4 * jasmine_config.second);

        // everything displayed?
        runs(function () {
            var sources = $("div.mkws-facet[data-mkws-facet='xtargets']");
            debug("Facet sources success: " + sources.length);
            expect(sources.length).toBe(1);

            var subjects = $("div.mkws-facet[data-mkws-facet='subject']");
            expect(subjects.length).toBe(1);

            var authors = $("div.mkws-facet[data-mkws-facet='author']");
            expect(authors.length).toBe(1);
        });

        waitsFor(function () {
            return $("div.mkws-facet[data-mkws-facet='author'] div.mkws-term").length >= 2 ? true : false;
        }, "At least two author link displayed", 4 * jasmine_config.second);

        runs(function () {
            expect($("div.mkws-facet[data-mkws-facet='author'] div.mkws-term").length).toBeGreaterThan(1);
        });
    });
});



describe("Check Author Facets", function () {
    var $ = mkws.$;

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
            var terms = $("div.mkws-facet[data-mkws-facet='author'] div.mkws-term a");
            for (var i = 0; i < terms.length; i++) {
                var term = $(terms[i]).text();
                if (term.match(/[0-9].+[0-9]/i) || !term.match(/,/)) {
                    debug("ignore author facet: " + term);
                    author_number++;
                } else {
                    break;
                }
            }
            if ($("div.mkws-facet[data-mkws-facet='author'] div.mkws-term:nth-child(" + author_number + ") a").text().length == 0) {
                debug("No good authors found. Not clicking on the bad ones");
                return;
            }

            debug("Clicking on author (" + author_number + ") " + $("div.mkws-facet[data-mkws-facet='author'] div.mkws-term:nth-child(" + author_number + ") a").text());
            $("div.mkws-facet[data-mkws-facet='author'] div.mkws-term:nth-child(" + author_number + ") a").trigger("click");
        });

        waitsFor(function () {
            var hits_single_target = get_hit_counter();
            // debug("hits_single_target='" + hits_single_target + "' cf. hits_all_targets='" + hits_all_targets + "'");
            return hits_single_target > 0 && hits_single_target < hits_all_targets ? true : false;
        }, "Limited author search for less than " + hits_all_targets + " hits", 4.5 * jasmine_config.second);

        runs(function () {
            var hits_single_target = get_hit_counter();
            debug("get less hits for authors: " + hits_all_targets + " > " + hits_single_target);
        });
    });
});

describe("Check active clients author", function () {
    var $ = mkws.$;

    it("check for active clients after limited author search", function () {
        waitsFor(function () {
            var clients = $("div.mkws-stat span.mkws-client-count");
            // debug("clients: " + clients.text());
            return clients.length == 1 && clients.text().match("/[1-9]+[0-9]*$");
        }, "wait for Active clients: x/y", 5.5 * jasmine_config.second);

        runs(function () {
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

    it("limit search to first source", function () {
        var hits_all_targets = get_hit_counter();
        var source_number = 2; // 2=first source
        // wait for a stat response
        var waitcount = 0;
        // do not click on wikipedia link - no author or subject facets possible
        var link = "div.mkws-facet[data-mkws-facet='xtargets'] div.mkws-term a";

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
        });

        waitsFor(function () {
            if ($("div.mkws-navi").length && $("div.mkws-navi").text().match(/(Source|datenquelle|kilder): /i)) {
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

            $(".mkws-pager").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
        });
    });
});


describe("Check record list", function () {
    var $ = mkws.$;

    it("check for single active client", function () {
        if (!jasmine_status.source_click) {
            debug("skip clients check due missing source click");
            return;
        }

        waitsFor(function () {
            var clients = $("div.mkws-stat span.mkws-client-count");
            //debug("clients: " + clients.text());
            return clients.length == 1 && clients.text().match("/1$");
        }, "wait for Active clients: x/1", 5 * jasmine_config.second);

        runs(function () {
            var clients = $("div.mkws-stat span.mkws-client-count");
            debug("span.mkws-client-count: " + clients.text());
            expect(clients.text()).toMatch("/1$");
        });
    });

    it("got a record", function () {
        var linkaddr = "div.mkws-records div.mkws-summary:nth-child(1) a";

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
    var $ = mkws.$;

    var record_number = 1; // the Nth record in hit list
    it("show record author", function () {
        var click = $("div.mkws-records div.mkws-summary:nth-child(" + record_number + ") a").trigger("click");
        debug("show record click is success: " + click.length);
        expect(click.length).toBe(1);

        // wait until the record pops up
        waitsFor(function () {
            var show = $("div.mkws-records div.mkws-summary:nth-child(" + record_number + ") > div.mkws-details");
            //debug("poprecord: " + (show ? show.length : -1) + " " + $("div.mkws-records div.mkws-summary").text());
            return show != null && show.length ? true : false;
        }, "wait some miliseconds to show up a record", 2 * jasmine_config.second);

        runs(function () {
            debug("show record pop up");
            expect($("div.mkws-records div.mkws-summary:nth-child(" + record_number + ") div")).not.toBe(null);
        });
    });

    it("extract URL", function () {
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

        // wait a half second, to show the target view
        var time = (new Date).getTime();
        waitsFor(function () {
            return (new Date).getTime() - time > 700 ? true : false;
        }, "wait some miliseconds", 1 * jasmine_config.second);

        // look for table header
        runs(function () {
            expect($("div.mkws-targets").html()).toMatch(/Target ID/);
        });
    });

    it("switch back to record view", function () {
        $("div.mkws-switch > a").eq(0).trigger("click");

        // now the target table must be visible
        expect($("div.mkws-targets").is(":visible")).toBe(false);
        expect($("div.mkws-records").is(":visible")).toBe(true);
    });
});

describe("Check translations", function () {
    var $ = mkws.$;

    // handle html entities, "Zur&uuml;ck" => "Zurück"
    var M = function (string) {
            var text = $("<span/>").html(mkws.M(string)).text()
            debug("translate check for: " + text);
            return text;
        };
    var lang = function () {
            return mkws.config.lang
        };

    function check_translation(list, text) {
        expect(list.length).toBe(text.length);

        for (var i = 0; i < text.length; i++) {
            expect($(list[i]).text()).toBe(M(text[i]));
        }
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
      "Location": "Ort",
      "Records": "Datens&auml;tze",
      "Targets": "Datenbanken",

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
    });

    xit("facets sidebar", function () {
        var list = $(".mkws-facet-title");
        var text = ["Sources", "Subjects", "Authors"];

        check_translation(list, text);
    });

    it("facets navigation/filter", function () {
        var list = $(".mkws-navi > span");
        var text = ["source", "author"];

        check_translation(list, text);
    });

    it("navigation", function () {
        var list = $(".mkws-pager-desc > span");
        var text = ["Displaying", "to", "of", "found"];

        check_translation(list, text);

        expect($(".mkws-next").text()).toBe(M("Next"));
        expect($(".mkws-prev").text()).toBe(M("Prev"));
    });

    it("record details", function () {
        var text = ["Title", "Date", "Author"]; // , "Subject", "Locations"];
        var list = $("div.mkws-details table > tbody > tr > th");

        // compare only the first 3 elements
        list = list.splice(0, text.length)

        check_translation(list, text);
    });
});

describe("Check status client counter", function () {
    var $ = mkws.$;

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
            var clients = $("div.mkws-stat span.mkws-client-count");
            debug("clients: " + clients.text());
            if (clients.length == 1 && clients.text().match("0/1$")) {
                return true;
            } else {
                return false;
            }
        }, "wait for Active clients: 0/1", 4 * jasmine_config.second);

        runs(function () {
            var clients = $("div.mkws-stat span.mkws-client-count");
            debug("span.mkws-client-count: " + clients.text());
            expect(clients.text()).toMatch("0/1$");
        });
    });
});

/* remove the "source" and "author" facet link to get more records again */
describe("Check removable facets links", function () {
    var $ = mkws.$;

    it("remove links for source and author", function () {
        var waitcount = 0;
        if (!jasmine_config.check_sortby) {
            debug("ignore check for removable facets");
            return;
        }


        runs(function () {
            var click = $("a.mkws-removable").eq(0).trigger("click");
            debug("Removed first facets link: " + click.length);
            expect(click.length).toBe(1);
        });

        runs(function () {
            $("div.mkws-records").bind("DOMNodeInserted DOMNodeRemoved propertychange", function () {
                waitcount++;
                if (waitcount <= 5 || (waitcount % 5 == 0)) {
                    debug("DOM change mkws-records for removeable: " + waitcount);
                }
            });
        });

        waitsFor(function () {
            return waitcount >= 2 && $("a.mkws-removable").length == 1 ? 1 : 0;
        }, "Records DOM change mkws-records, removable", 2 * jasmine_config.second);

        runs(function () {
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

        waitsFor(function () {
            return waitcount >= 2 && $("a.mkws-removable").length == 0 ? true : false;
        }, "DOM change mkws-records, removable2", 2 * jasmine_config.second);

        runs(function () {
            debug("unbind removable2");
            $("div.mkws-records").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
        });
    });
});


describe("Check per page options", function () {
    var $ = mkws.$;

    it("show per page", function () {
        if (!jasmine_config.check_sortby) {
            debug("ignore check for per page select");
            return;
        }
        var waitcount = 0;
        var per_page_number = 20;


        runs(function () {
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
        });

        waitsFor(function () {
            // debug("per page waitcounter: " + waitcount)
            return waitcount >= (per_page_number + 10) ? true : false;
        }, "DOM change mkws-records, by per page", 3 * jasmine_config.second);

        runs(function () {
            debug("unbind per page");
            $("div.mkws-records").unbind("DOMNodeInserted DOMNodeRemoved propertychange");

            var records = $("div.mkws-records > div.mkws-summary");
            debug("Per page got now " + records.length + " records");
            expect(records.length).toBe(per_page_number);
        });
    });
});

describe("Check SortBy options", function () {
    var $ = mkws.$;

    it("sort by title", function () {
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

        runs(function () {
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
        });

        waitsFor(function () {
            //debug("wait for2: " + waitcount);
            return waitcount >= (per_page_number + 10) ? true : false;
        }, "DOM change mkws-records, by sort page", 3 * jasmine_config.second);

        runs(function () {
            $("div.mkws-records").unbind("DOMNodeInserted DOMNodeRemoved propertychange");
            debug("unbind by sort");

            var records = $("div.mkws-records > div.mkws-summary");
            debug("Sort by got now " + records.length + " records");
            expect(records.length).toBe(per_page_number);
        });

        runs(function () {
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


xdescribe("Check async widget discovery", function () {
    var $ = mkws.$;
    it("initialises a new widget", function () {
        $("div.mkws-search").after('<div id="asyncSearch"><div class="mkws-search mkws-team-async"></div></div>');
        mkws.init("Another search box", "#asyncSearch");
        waitsFor(function () {
            return $("#asyncSearch input").length >= 1 ? true : false;
        }, "Call init() to build an .mkws-search", 750);
        runs(function () {
            var numInput = $("div.mkws-search input").length;
            debug("Input elements present: " + numInput);
            expect(numInput).toBe(4);
            var numRec = $("div.mkws-records > div.mkws-summary").length;
            debug("Records should still be present. There are: " + numRec);
            expect(numRec).toBeGreaterThan(0);
        });
    });
});

/* done */
describe("All tests are done", function () {
    it(">>> hooray <<<", function () {
        mkws.jasmine_done = true;
        debug(">>> hooray <<<");
    });
});

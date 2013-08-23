/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * perform papzpar2 / pz2.js search & retrieve request in the browser
 *
 */

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

                var found = $("#mkwsPager").text();
                var re = /found: ([0-9]+)/;
                re.exec(found);
                var hits = -1;

                if (RegExp.$1) {
                    hits = RegExp.$1;
                    expect(hits).toBeGreaterThan(0);
                }

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

    it("Show record", function () {
        var click = $("div#mkwsRecords div.record:nth-child(3) :nth-child(2)").trigger("click");
        debug("show click is success: " + click.length);
        expect(click.length == 1).toBe(true);
    });

    /*
    it("Final success message in search input field", function () {
        $("input#mkwsQuery").val("jasmine test is done");
        expect($("input#mkwsQuery").val()).toMatch(/done/);
    });
    */
});

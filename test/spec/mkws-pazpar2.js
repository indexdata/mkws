/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * perform papzpar2 / pz2.js search & retrieve request in the browser
 *
 */

// global state object
var jasmine_state = {
    time: 0
};

function my_click(id, time) {
    setTimeout(function () {
        debug("trigger click on id: " + id);
        $(id).trigger("click");
    }, time * 1000);
}

function found(time, none) {
    setTimeout(function () {
        jasmine_state.time = time;

        var found = $("#mkwsPager").html().match(/found: ([0-9]+)/);

        describe("pazpar2 hit count", function () {
            if (none) {
                it("no results yet", function () {
                    expect(found).toBe(null);
                });
            } else {
                it("got results", function () {
                    expect(found[0]).toMatch(/^[0-9]+$/);
                });
            }
            debug("mkws pager found records: " + (found != null ? found[0] : "unknown"));
            debug("time state: " + jasmine_state.time);
        });

    }, time * 1000);
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


    // Asynchronous part
    it("check running search", function () {
        var max_time = 10;

        expect($("#mkwsPager").length == 1).toBe(true);

        runs(function () {
            // click next/prev after N seconds
            my_click("#mkwsNext", 10);
            my_click("#mkwsNext", 13);
            my_click("#mkwsPrev", 15);

            // check hit counter after N seconds
            found(0, true);
            found(5);
            found(10);
            found(15);
            found(max_time);
        });

/*
        waitsFor(function () {
            return jasmine_state.time == max_time ? true : false;
        }, "The Value should be 20 seconds", 30 * 1000); // (max_time + 1) * 1000);

	runs(function () {
	    expect($("#mkwsPager").length == 1).toBe(true);
	})
	*/

/* runs(function () {
            expect(jasmine_state.time).toEqual(max_time);
        });
	*/
    });
});

/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * perform papzpar2 / pz2.js search & retrieve request in the browser
 *
 */

function my_click(id, time) {
    setTimeout(function () {
        debug("trigger click on id: " + id);
        $(id).trigger("click");
    }, time * 1000);
}

function found(time) {
    setTimeout(function () {
        var found = $("#mkwsPager").html().match(/found: ([0-9]+)/);
        debug("mkws pager found records: " + (found != null ? found[0] : "unknown"));
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


    it("check running search", function () {
        my_click("#mkwsNext", 10);
        my_click("#mkwsNext", 13);
        my_click("#mkwsPrev", 15);

        if ($("#mkwsPager").length) {
            found(0);
            found(5);
            found(10);
            found(15);
            found(25);

        } else {
            debug("no mkws page found");
        }
    });

});

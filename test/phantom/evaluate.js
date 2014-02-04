/*
    Fetch a mkws/jasmine based page into node.js, evaluate the page and check if test status
    This should make it possible to run the test on the command line in jenkins.  e.g.:

      phantomjs evaluate.js https://mkws-dev.indexdata.com/jasmine-local-popup.html
*/

var page = require('webpage').create(),
    system = require('system');

if (system.args.length === 1) {
    console.log('Usage: screenshot.js <some URL>');
    phantom.exit();
}
var url = system.args[1];

var run_time = 8; // poll up to seconds
if (system.args[2] && parseFloat(system.args[2]) > 0) {
    run_time = parseFloat(system.args[2]);
}

page.viewportSize = {
    width: 1200,
    height: 1000
};

// 0: silent, 1: some infos,  2: display console.log() output
var debug = 2;
if (typeof system.env['DEBUG'] != 'undefined' && parseInt(system.env['DEBUG']) != NaN) {
    debug = system.env['DEBUG'];
    if (debug > 0) console.log("reset debug level to: " + debug);
}

/************************/

function wait_for_jasmine(checkFx, readyFx, failFx, timeout) {
    var max_timeout = timeout ? timeout : run_time * 1000,
        start = new Date().getTime(),
        result, condition = false;

    var interval = setInterval(function () {
        if (debug == 1) console.log(".");

        // success
        if (condition) {
            // console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
            result.time = (new Date().getTime() - start);
            readyFx(result);
            clearInterval(interval);
            phantom.exit(0);
        }

        // timeout
        else if (new Date().getTime() - start >= max_timeout) {
            result.time = (new Date().getTime() - start);
            failFx(result);
            phantom.exit(1);
        }

        // checking
        else {
            result = checkFx();
            if (result) condition = result.mkws.jasmine_done;
        }

    }, 500); //< repeat check every N ms
};

// redirect webkit console.log() output
page.onConsoleMessage = function (message) {
    if (debug >= 2) console.log(message);
};

// cat webkit alert()
page.onAlert = function (msg) {
    console.log("Alert: " + msg);
};

// display HTTP errors
page.onResourceError = function (resourceError) {
    // console.log('phantomjs error code: ' + resourceError.errorCode);
    console.log(resourceError.errorString);
    phantom.exit(3);
};

page.open(url, function (status) {
    if (debug >= 1) console.log("fetch " + url + " with status: " + status);

    if (status != 'success') {
        console.log("Failed to fetch page, give up. Network error?");
        phantom.exit(1);
    }

    if (debug >= 1) console.log("polling MKWS jasmine test status for " + run_time + " seconds");


    var exit = wait_for_jasmine(function () {
        return page.evaluate(function () {
            if (!window || !window.$ || !window.mkws) {
                return false;
            } else {
                var passing = window.$(".passingAlert").text() || window.$(".failingAlert").text();

                return {
                    mkws: window.mkws,
                    html: window.$("html").html(),
                    duration: window.$(".duration").text(),
                    passing: passing
                };
            }
        })
    },

    function (result) {
        if (debug < 1) return;

        console.log("");
        console.log("MKWS tests are successfully done in " + result.time / 1000 + " seconds. Hooray!");
        console.log("jasmine duration: " + result.duration);
        console.log("jasmine passing: " + result.passing);
    },

    function (result) {
        var error_png = "./mkws-error.png";
        var error_html = "./mkws-error.html";

        console.log("MKWS tests failed after " + result.time / 1000 + " seconds");
        console.log("keep screenshot in '" + error_png + "'");
        page.render(error_png);

        console.log("keep html DOM in '" + error_html + "'");
        var html = result.html + "\n\n<!-- mkws: " + JSON.stringify(result.mkws) + " -->\n";
        var fs = require('fs');
        fs.write(error_html, html, "wb");
    }, run_time * 1000);
});

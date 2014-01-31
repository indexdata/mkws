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

page.viewportSize = {
    width: 1200,
    height: 1000
};

var run_time = 12; // poll up to seconds

/************************/

function wait_for_jasmine(checkFx, readyFx, failFx, timeout) {
    var max_timeout = timeout ? timeout : run_time * 1000,
        start = new Date().getTime(),
        result,
        condition = false;

    var interval = setInterval(function() {
        console.log(".");

        // success
        if (condition) {
            // console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
            readyFx(result);
            clearInterval(interval);
            phantom.exit(0);
        }

        // timeout
        else if ( new Date().getTime() - start >= max_timeout ) {
            result.time = (new Date().getTime() - start);
            failFx(result);
            phantom.exit(1);
        }

        // checking
        else {
            result = checkFx();
            condition = result.mkws.jasmine_done;
        }

    }, 500); //< repeat check every N ms
};



page.open(url, function (status) {
    console.log("fetch " + url + " with status: " + status);
    console.log("polling MKWS test status...");

    var exit = wait_for_jasmine(function () {
        return page.evaluate(function () {
            return {
                mkws: window.mkws,
                duration: window.$(".duration").text(),
                passing: window.$(".passingAlert").text()
            };
        })},

        function(result) {
            if (result.mkws.jasmine_done) {
                console.log("MKWS tests are successfully done. Hooray!");
                console.log("jasmine duration: " + result.duration);
                console.log("jasmine passing: " + result.passing);
            }
        },

        function (result) {
            var error_png = "./mkws-error.png";
            console.log("MKWS tests failed after " + result.time/1000 + " seconds");
            console.log("keep screenshot in '" + error_png + "'");
            page.render(error_png);
        },
        run_time * 1000);

});

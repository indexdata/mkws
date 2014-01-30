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
page.open(url, function (status) {
    console.log("fetch " + url + " with status: " + status);
    console.log("polling MKWS test status...");

    var r;
    for (var i = 1; i <= run_time; i++) {
        setTimeout(function () {
            var result = page.evaluate(function (s) {
                // return document.querySelector(s).innerText;
                return {
                    mkws: window.mkws,
                    string: "foo"
                };
            }, 'title');

            console.log(".");
            if (result.mkws.jasmine_done) {
                console.log("MKWS tests are successfully done. Hooray!");
                phantom.exit(0);
            }
            r = result;
        }, i * 1000);
    }


    setTimeout(function () {
        var error_png = "./mkws-error.png";
        console.log("MKWS tests failed after " + run_time + " seconds");
        console.log("keep screenshot in '" + error_png + "'");

        page.render(error_png);
        phantom.exit(1);
    }, (run_time + 1) * 1000);
});

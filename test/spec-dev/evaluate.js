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

    for (var i = 1; i < run_time; i++) {
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
		console.log("successfully done");
		phantom.exit(0);
	    }
        }, i * 1000);
    }

    setTimeout(function () {
	console.log("failed after " + run_time + " seconds");
        phantom.exit(1);
    }, run_time * 1000);
});

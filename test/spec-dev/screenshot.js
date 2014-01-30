var page = require('webpage').create(),
    system = require('system');

var url = system.args[1] || 'http://www.indexdata.com/';
var file_png = system.args[2] || 'indexdata.png';

if (system.args.length === 1) {
    console.log('Usage: screenshot.js <some URL> <file.png>');
    phantom.exit();
}

// page.zoomFactor = 1.0;
page.viewportSize = {
    width: 1200,
    height: 1000
};

page.open(url, function () {
    // small delay
    setTimeout(function () {
        page.render(file_png);
        phantom.exit();
    }, 500);
});


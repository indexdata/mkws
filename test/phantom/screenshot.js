var page = require('webpage').create(),
    system = require('system');

var url = system.args[1] || 'http://www.indexdata.com/';
var file_png = system.args[2] || 'indexdata.png';
var timeout = system.args[5] ? system.args[5] : 0.2;

function usage (message) {
    if (message) {
        console.log(message + "\n");
    }
    console.log('Usage: screenshot.js <some URL> <file.png>');
    phantom.exit();
}

if (system.args.length === 1) {
    usage();
}

if (!file_png.match(/\.png$/)) {
    usage("File name has no .png extension: '" + file_png + "'");
}


// page.zoomFactor = 1.0;
page.viewportSize = {
    width: system.args[3] ? system.args[3] : 1200,
    height: system.args[4] ? system.args[4] : 1000
};

page.clipRect = {
    width: page.viewportSize.width,
    height: page.viewportSize.height
};

page.open(url, function () {
    // small delay
    setTimeout(function () {
        var ret = page.render(file_png);
        phantom.exit();
    }, timeout * 1000);
});

// EOF

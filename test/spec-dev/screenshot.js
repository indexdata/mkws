// run: phantomjs /path/to/this/file
var url = 'http://www.indexdata.com/';
var file_png = "indexdata.png";

var page = require('webpage').create();

// page.paperSize = { format: 'A4', orientation: "landscape" };
page.viewportSize = {
    width: 960,
    height: 800
};
page.zoomFactor = 1.0;

page.open(url, function () {
    // small delay
    setTimeout(function () {
        page.render(file_png);
        phantom.exit();
    }, 500);
});

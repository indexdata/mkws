// run: phantomjs /path/to/this/file

var url = 'http://www.indexdata.com/';
var file_png = "indexdata.png";

var page = require('webpage').create();

page.open(url, function () {
    page.render(file_png);
    phantom.exit();
});


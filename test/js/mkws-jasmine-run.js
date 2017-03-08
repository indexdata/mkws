/*
 * init and run jasmine
 *
 * a given delay starts the test N miliseconds later
 */

function mkws_jasmine_init(delay) {
    var currentWindowOnload = window.onload;

    window.onload = function () {
        if (currentWindowOnload) {
            currentWindowOnload();
        }
        if (delay) {
            setTimeout(function () {
                execJasmine()
            }, delay);
        } else {
            execJasmine();
        }
    };

    function execJasmine() {

        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;
        var htmlReporter = new jasmine.HtmlReporter({ env: {}});
        jasmineEnv.addReporter(htmlReporter);

        jasmineEnv.specFilter = function (spec) {
            return htmlReporter.specFilter(spec);
        };

        jasmineEnv.execute();
    }
};

mkws.$(document).ready(function () {
    mkws_jasmine_init(0);
});

/* EOF */

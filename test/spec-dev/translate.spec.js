/* Copyright (c) 2013-2015 Index Data ApS. http://indexdata.com
 *
 * perform papzpar2 / pz2.js search & retrieve request in the browser
 *
 */

var mkws = {};
var document = {};

// get references from mkws.js, lazy evaluation
var debug = function (text) {
        // use a debug function with time stamps
        console.log("Jasmine: " + text);

        //mkws.log("Jasmine: " + text)
    }

    // Define empty jasmine_config for simple applications that don't define it.
if (jasmine_config == null || typeof jasmine_config != 'object') {
    var jasmine_config = {};
}

var jasmine_status = {
    source_click: 0
};

/* check config for jasmine test
 *
 * you can override the default values in the config
 * object: jasmine_config = {};
 *
 */
function init_jasmine_config() {

    var jasmine_config_default = {
        // tune parameter for batch testing
        batch_tuning: true,

        search_query: "freebsd",
        max_time: 17,
        // in seconds
        expected_hits: 80,
        // at least expected hit counter
        second: 1000,
        // miliseconds to seconds
        show_record_url: true,
        // check for valid URL in records
        check_motd: true,

        // check sort by and per page menu
        check_sortby: false,

        dummy: false
    };

    // use default values for undefined values
    for (var key in jasmine_config_default) {
        if (!jasmine_config.hasOwnProperty(key)) {
            jasmine_config[key] = jasmine_config_default[key];
        }
        debug("jasmine config: " + key + " => " + jasmine_config[key]);
    }


    mkws.jasmine_done = false;
};

/******************************************************************************/
describe("Init jasmine config", function () {
    it("jasmine was successfully initialized", function () {
        init_jasmine_config();

        expect(jasmine_config.search_query).toMatch(/\w/);
        expect(jasmine_config.second).toBeGreaterThan(100);
        expect(jasmine_config.max_time).toBeGreaterThan(1);
        expect(jasmine_config.expected_hits).toBeGreaterThan(1);
    });
});


// temporary disabled due records without an author, MKWS-400
describe("Check translations", function () {
    var $ = function (string) {
            return string
        };

    // handle html entities, "Zur&uuml;ck" => "Zurück"
    var M = function (string) {
            return string;
        };

    function check_translation(list, text) {
        expect(list.length).toBe(text.length);

        for (var i = 0; i < text.length; i++) {
            expect($(list[i]).text().match(M(text[i]))).not.toBeNull();
        }
    }


    var locale_lang = {
        "de": {
            "Authors": "Autoren",
            "Subjects": "Schlagw&ouml;rter",
            "Sources": "Daten und Quellen",
            "source": "datenquelle",
            "Facets": "Termlisten",
            "Next": "Weiter",
            "Prev": "Zur&uuml;ck",
            "Search": "Suche",
            "Sort by": "Sortieren nach",
            "and show": "und zeige",
            "per page": "pro Seite",
            "Displaying": "Zeige",
            "to": "von",
            "of": "aus",
            "found": "gefunden",
            "Title": "Titel",
            "Author": "Autor",
            "author": "autor",
            "Date": "Datum",
            "Subject": "Schlagwort",
            "subject": "schlagwort",
            "Location": "Bestand",
            "Locations": "Bestand",
            "Records": "Datens&auml;tze",
            "Targets": "Datenbanken",
            "relevance": "Relevanz",
            "title": "Titel",
            "newest": "Neueste",
            "oldest": "&Auml;lteste",

            "dummy": "dummy"
        }
    };

    function check_translation_list(keywords, list) {
        var errors = [];
        for (var i = 0; i < keywords.length; i++) {
            if ($(list[i]).match("^" + M(keywords[i]) + ": ")) {
                debug("found: " + list[i] + " :: " + keywords[i]);
            } else {
                debug("NOT found: " + list[i] + " :: " + keywords[i]);
                errors.push(keywords[i])
            }
        }
        expect(errors.length).not.toBeGreaterThan(1);
    }


    it("record details", function () {
        var keywords = ["Title", "Date", "Author"]; // , "Subject", "Locations"];
        var list = ["Title: foo", "Date: bar", "Author: wolfram", "Location: bla"];
        var list_de = ["Titel: foo", "Datum: bar", "Autor: wolfram", "Location: bla"];
        var keywords_de = [];

        check_translation_list(keywords, list);

        for (var i = 0; i < keywords.length; i++) {
            keywords_de.push(locale_lang["de"][keywords[i]]);
        }
        debug(keywords_de);
        check_translation_list(keywords_de, list_de);
    });

});

/* done */
describe("All tests are done", function () {
    it(">>> hooray <<<", function () {
        mkws.jasmine_done = true;
        debug(">>> hooray <<<");
    });
});

/* Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com
 *
 * check mkws_config = {} object in browser
 *
 */

describe("Check for external JavaScript libs", function () {
    it("JSNlog", function () {
        expect(typeof JL).not.toBe('undefined');
    });

    it("Handlebars", function () {
        expect(typeof Handlebars).not.toBe('undefined');
    });

    it("jQuery", function () {
        expect(typeof mkws.$).not.toBe('undefined');
    });

    // jquery.json-2.4.js
    it("jQuery JSON", function () {
        expect(typeof mkws.$.toJSON).not.toBe('undefined');
    });

    it("pazpar2", function () {
        expect(typeof pz2).not.toBe('undefined');
    });

    it("jQuery UI", function () {
        // if we have a popup widget, check for the jQuery UI lib
        if (mkws.$(".mkws-popup").length > 0) {
            expect(typeof mkws.$.ui).not.toBe('undefined');
        }
    });
});

describe("Check mkws.config object", function () {
    it("mkws.config exists", function () {
        expect(mkws.config).not.toBe(undefined);
    });

    it("mkws.config locale check German", function () {
        expect(mkws.locale_lang.de.Authors).toMatch(/^Autoren$/);
        expect(mkws.locale_lang.de.Location).toMatch(/^Ort$/);
    });
    it("mkws.config locale check Danish", function () {
        expect(mkws.locale_lang.da.Authors).toMatch(/^Forfattere$/);
        expect(mkws.locale_lang.da.Location).toMatch(/^Lokation$/);
    });

/*
     * this is a test if the config value is a boolean JavaScript object: true or false
     * and nothing else (0, '0', undefined, "false" etc.)
     */
    it("mkws.config service proxy enabled/disabled", function () {
        if (mkws.config.use_service_proxy) {
            expect(mkws.config.use_service_proxy).toBe(true);
        } else {
            expect(mkws.config.use_service_proxy).toBe(false);
        }
    });

});


describe("Check pazpar2 config", function () {
    it("pazpar2_url is a path or an full URL", function () {
        expect(mkws.config.pazpar2_url).toMatch(/^(\/|https?:\/\/|undefined$)/)
    });
});

describe("Check pazpar2 runtime", function () {
    it("pazpar2 was successfully initialized", function () {
        expect(mkws.config.error).toBe(undefined);
    });
});

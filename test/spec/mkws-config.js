/* Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com
 *
 * check mkws_config = {} object in browser
 *
 */

describe("Check mkws_config object", function () {
    it("mkws_config exists", function () {
        expect(mkws_config).not.toBe(undefined);
    });

    it("mkws_config locale check German", function () {
        expect(mkws.locale_lang.de.Authors).toMatch(/^Autoren$/);
        expect(mkws.locale_lang.de.Location).toMatch(/^Ort$/);
    });
    it("mkws_config locale check Danish", function () {
        expect(mkws.locale_lang.da.Authors).toMatch(/^Forfattere$/);
        expect(mkws.locale_lang.da.Location).toMatch(/^Lokation$/);
    });

    it("mkws_config service proxy enabled/disabled", function () {
        if (mkws_config.use_service_proxy) {
            expect(mkws_config.use_service_proxy).toBe(true);
        } else {
            expect(mkws_config.use_service_proxy).toBe(false);
        }
    });

});


describe("Check pazpar2 config", function () {
    it("pazpar2path is a path or an full URL", function () {
        expect(mkws_config.pazpar2_url).toMatch(/^(\/|https?:\/\/)/)
    });
});

describe("Check pazpar2 runtime", function () {
    it("pazpar2 was successfully initialized", function () {
        expect(mkws_config.error).toBe(undefined);
    });
});

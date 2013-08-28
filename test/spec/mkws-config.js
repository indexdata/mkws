/* Copyright (c) 2013 IndexData ApS. http://indexdata.com
 *
 * check mkws_config = {} object in browser
 *
 */

describe("Check mkws_config object", function () {
    it("mkws_config exists", function () {
        expect(mkws_config).not.toBe(undefined);
    });

    it("mkws_config service proxy config", function () {
        expect(mkws_config.service_proxy_url).toBe(undefined);
    });

    it("mkws_config locale check German", function () {
        expect(mkws.locale_lang.de.Authors).toMatch(/^Autoren$/);
        expect(mkws.locale_lang.de.Location).toMatch(/^Ort$/);
    });
    it("mkws_config locale check Danish", function () {
        expect(mkws.locale_lang.da.Authors).toMatch(/^Forfattere$/);
        expect(mkws.locale_lang.da.Location).toMatch(/^Lokation$/);
    });

    it("mkws_config service proxy enabled", function () {
        expect(mkws_config.use_service_proxy).toBe(true);
    });

});


describe("Check pazpar2 config", function () {
    it("pazpar2path is a path or an full URL", function () {
        expect(pazpar2path).toMatch(/^(\/|http:\/\/)/)
    });

    it("usesessions false", function () {
        expect(usesessions).toBe(false);
    });

    it("my_paz is defined", function () {
        expect(mkws.my_paz).not.toBe(undefined);
    });
});

describe("Check pazpar2 runtime", function () {
    it("pazpar2 was successfully initialize", function () {
        expect(mkws_config.error).toBe(undefined);
    });
});

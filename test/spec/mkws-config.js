
describe("Check mkws_config object", function() {
  it("mkws_config exists", function() {
    expect(mkws_config).not.toBe(undefined);
  });

  it("mkws_config service proxy config", function() {
    expect(mkws_config.service_proxy_url).toBe(undefined);
  });

  it("mkws_config locale check German", function() {
    expect(mkws_locale_lang.de.Authors).toMatch(/^Autoren$/);
    expect(mkws_locale_lang.de.Location).toMatch(/^Ort$/);
  });
  it("mkws_config locale check Danish", function() {
    expect(mkws_locale_lang.da.Authors).toMatch(/^Forfattere$/);
    expect(mkws_locale_lang.da.Location).toMatch(/^Lokation$/);
  });

  it("mkws_config service proxy enabled", function() {
    expect(mkws_config.use_service_proxy).toBe(true);
  });
});

/*
describe("Check service proxy URL", function() {
  var timerCallback;

  beforeEach(function() {
    timerCallback = jasmine.createSpy('timerCallback');
    jasmine.Clock.useMock();
  });

  it("causes an interval to be called synchronously", function() {
    setTimeout(function() {
      timerCallback();
    }, 500);

    jasmine.Clock.tick(1501);
    expect(mkws_config.service_proxy_url).toMatch(/service-proxy/);
  });
});
*/
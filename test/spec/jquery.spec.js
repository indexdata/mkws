/*
 * jQuery test for node.js
 *
 */

var $ = jQuery = require('jquery');

describe("jQuery suite", function() {
  it("jQuery append test", function() {
    jQuery("<h1>test passes h1</h1>").appendTo("body");
    expect( $("body").html() ).toMatch(/<h1>/);

    jQuery("<p>this is a paragraph</p>").appendTo("h1");
    expect( $("body").html() ).toMatch(/this is a paragraph/);
  });

  it("$ append test", function() {
    $("<h2>test passes h2</h2>").appendTo("body");
    expect( $("body").html() ).toMatch(/<h2>/);

    $("<p>this is a second paragraph</p>").appendTo("h1");
    expect( $("body").html() ).toMatch(/this is a paragraph/);
  });

  it("more jquery tests", function() {
    // other tests
    expect( $("h2").html() ).toMatch(/test passes h2/);
    expect( $("h1").html() ).toMatch(/test passes h1/);
    expect( $("h1").html() ).not.toMatch(/^$/);
    expect( $("h1").html() ).not.toMatch(/foobar/);
  });
});


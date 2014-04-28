// Workaround for broken XML parser in node.js/jquery
// see https://github.com/coolaj86/node-jquery/issues/29
var jsdom = require("jsdom");
var DOMParser = require('xmldom').DOMParser;
var xmlstring = '<?xml version="1.0" encoding="UTF-8"?><process>yes</process>';

jsdom.env('<html/>',
// ["http://code.jquery.com/jquery.js"],

function (errors, window) {
    // var $ = window.$; 
    var $ = require('jQuery');

    // override jquery xml parser with external XML lib xmldoc.DOMParser
    $.parseXML = function (data) {
        return new DOMParser().parseFromString(data)
    };;

    // parse XML string, extract "process" node and keep the text value of the node
    var result = $($.parseXML(xmlstring)).find("process").text();

    // should output "yes"
    console.log("Testing jsdom/xmldom/jQuery $.parseXML() support: " + result);
});

(function() {
  var template = Handlebars.template, templates = mkws.defaultTemplates = mkws.defaultTemplates || {};
templates['Image'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n  <a href=\"#\" id=\"";
  if (helper = helpers.detailLinkId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.detailLinkId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" onclick=\"";
  if (helper = helpers.detailClick) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.detailClick); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n    ";
  stack1 = (helper = helpers['mkws-first'] || (depth0 && depth0['mkws-first']),options={hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth0),data:data},helper ? helper.call(depth0, (depth0 && depth0['md-thumburl']), options) : helperMissing.call(depth0, "mkws-first", (depth0 && depth0['md-thumburl']), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <br/>\n  </a>\n";
  return buffer;
  }
function program2(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n      <img src=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" alt=\""
    + escapeExpression(((stack1 = (depth1 && depth1['md-title'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    ";
  return buffer;
  }

  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.hits), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
templates['Record'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        (";
  if (helper = helpers['md-title-remainder']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-title-remainder']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <i>";
  if (helper = helpers['md-title-responsibility']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-title-responsibility']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</i>\n      ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n  <tr>\n    <th>"
    + escapeExpression((helper = helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']),options={hash:{},data:data},helper ? helper.call(depth0, "Date", options) : helperMissing.call(depth0, "mkws-translate", "Date", options)))
    + "</th>\n    <td>";
  if (helper = helpers['md-date']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-date']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n  </tr>\n  ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n  <tr>\n    <th>"
    + escapeExpression((helper = helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']),options={hash:{},data:data},helper ? helper.call(depth0, "Author", options) : helperMissing.call(depth0, "mkws-translate", "Author", options)))
    + "</th>\n    <td>";
  if (helper = helpers['md-author']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-author']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n  </tr>\n  ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n  <tr>\n    <th>"
    + escapeExpression((helper = helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']),options={hash:{},data:data},helper ? helper.call(depth0, "Links", options) : helperMissing.call(depth0, "mkws-translate", "Links", options)))
    + "</th>\n    <td>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['md-electronic-url']), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </td>\n  </tr>\n  ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <a href=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">Link";
  if (helper = helpers['mkws-index1']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['mkws-index1']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n      ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n  <tr>\n    <th>"
    + escapeExpression((helper = helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']),options={hash:{},data:data},helper ? helper.call(depth0, "Subject", options) : helperMissing.call(depth0, "mkws-translate", "Subject", options)))
    + "</th>\n    <td>\n      ";
  stack1 = (helper = helpers['mkws-first'] || (depth0 && depth0['mkws-first']),options={hash:{
    'having': ("md-subject")
  },inverse:self.noop,fn:self.program(13, program13, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.location), options) : helperMissing.call(depth0, "mkws-first", (depth0 && depth0.location), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </td>\n  </tr>\n  ";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['md-subject']), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n          ";
  stack1 = (helper = helpers['mkws-commaList'] || (depth0 && depth0['mkws-commaList']),options={hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data},helper ? helper.call(depth0, (depth0 && depth0['md-subject']), options) : helperMissing.call(depth0, "mkws-commaList", (depth0 && depth0['md-subject']), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "";
  buffer += "\n            "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0));
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", helper, options;
  buffer += "\n        "
    + escapeExpression((helper = helpers['mkws-attr'] || (depth0 && depth0['mkws-attr']),options={hash:{},data:data},helper ? helper.call(depth0, "@name", options) : helperMissing.call(depth0, "mkws-attr", "@name", options)));
  return buffer;
  }

  buffer += "\n<table>\n  <tr>\n    <th>"
    + escapeExpression((helper = helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']),options={hash:{},data:data},helper ? helper.call(depth0, "Title", options) : helperMissing.call(depth0, "mkws-translate", "Title", options)))
    + "</th>\n    <td>\n      ";
  if (helper = helpers['md-title']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-title']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['md-title-remainder']), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['md-title-responsibility']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </td>\n  </tr>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['md-date']), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['md-author']), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['md-electronic-url']), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = (helper = helpers['mkws-if-any'] || (depth0 && depth0['mkws-if-any']),options={hash:{
    'having': ("md-subject")
  },inverse:self.noop,fn:self.program(12, program12, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.location), options) : helperMissing.call(depth0, "mkws-if-any", (depth0 && depth0.location), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <tr>\n    <th>"
    + escapeExpression((helper = helpers['mkws-translate'] || (depth0 && depth0['mkws-translate']),options={hash:{},data:data},helper ? helper.call(depth0, "Locations", options) : helperMissing.call(depth0, "mkws-translate", "Locations", options)))
    + "</th>\n    <td>\n      ";
  stack1 = (helper = helpers['mkws-commaList'] || (depth0 && depth0['mkws-commaList']),options={hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.location), options) : helperMissing.call(depth0, "mkws-commaList", (depth0 && depth0.location), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </td>\n  </tr>\n</table>\n";
  return buffer;
  });
templates['Records'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n  <div class=\"";
  if (helper = helpers.containerClass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.containerClass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n    <a href=\"#\" id=\"";
  if (helper = helpers.detailLinkId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.detailLinkId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" onclick=\"";
  if (helper = helpers.detailClick) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.detailClick); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n      <b>";
  if (helper = helpers['md-title']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-title']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</b>\n    </a>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['md-title-remainder']), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['md-title-responsibility']), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.renderedDetails), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <span>";
  if (helper = helpers['md-title-remainder']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-title-remainder']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <span><i>";
  if (helper = helpers['md-title-responsibility']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-title-responsibility']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</i></span>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      ";
  if (helper = helpers.renderedDetails) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.renderedDetails); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }

  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.hits), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
templates['Reference'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n<b>";
  if (helper = helpers['md-title-remainder']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-title-remainder']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</b>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n<i>";
  if (helper = helpers['md-title-responsibility']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-title-responsibility']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</i>\n";
  return buffer;
  }

  buffer += "\n<img src=\"";
  if (helper = helpers['md-thumburl']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-thumburl']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers['md-title']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-title']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n<h1><a href=\"";
  if (helper = helpers['md-electronic-url']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-electronic-url']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers['md-title']) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0['md-title']); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></h1>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['md-title-remainder']), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['md-title-responsibility']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = (helper = helpers['mkws-paragraphs'] || (depth0 && depth0['mkws-paragraphs']),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0['md-description']), (depth0 && depth0.paragraphs), (depth0 && depth0.sentences), options) : helperMissing.call(depth0, "mkws-paragraphs", (depth0 && depth0['md-description']), (depth0 && depth0.paragraphs), (depth0 && depth0.sentences), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<p class=\"mkwsCredit\">Wikipedia</p>\n";
  return buffer;
  });
templates['Facet'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n  <div class=\"mkwsTerm\">\n    <a href=\"#\" ";
  if (helper = helpers.linkdata) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.linkdata); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ">";
  if (helper = helpers.term) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.term); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a> <span>";
  if (helper = helpers.count) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.count); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n  </div>\n";
  return buffer;
  }

  buffer += "\n\n<div class=\"mkwsFacetTitle\">";
  if (helper = helpers.caption) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.caption); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.terms), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
templates['Termlists'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, helper;
  buffer += "\n  <div class=\"mkwsFacet mkwsTeam_"
    + escapeExpression(((stack1 = (depth1 && depth1.team)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-mkws-facet=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></div>\n";
  return buffer;
  }

  buffer += "\n\n<div class=\"mkwsTermlistsTitle\">Termlists</div>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.facets), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
})();
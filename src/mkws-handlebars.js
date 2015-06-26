// Handlebars helpers

Handlebars.registerHelper('mkws-json', function(obj) {
  return mkws.$.toJSON(obj);
});


// This is intended to handle paragraphs from Wikipedia, hence the
// rather hacky code to remove numbered references.
//
Handlebars.registerHelper('mkws-paragraphs', function(obj, nPara, nSent) {
  var acc = [];

  // For some reason, Handlebars provides the value
  // {"hash":{},"data":{}} for parameters that are not provided. So we
  // have to be prepared for actual numbers, explicitly undefined
  // values and this dumb magic value.
  if (obj && (nPara === undefined || nPara.hasOwnProperty('hash') || nPara == 0 || nPara > obj.length)) {
    nPara = obj.length;
  }
  if (nSent === undefined || nSent.hasOwnProperty('hash') || nSent == 0) {
    nSent = Infinity;
  }

  for (var i = 0; i < nPara; i++) {
    // Remove numbered references such as "[1,3,4]" from text
    var text = obj[i].replace(/\[[0-9,]+\]/g, '');
    // Next line from http://stackoverflow.com/questions/18914629/split-string-into-sentences-in-javascript
    var sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    if (sentences.length > nSent)
      sentences.length = nSent;

    acc.push('<p>', sentences.join(' '), '</p>');
    nSent -= sentences.length;
    if (nSent == 0)
      break;
  }

  return acc.join('');
});


Handlebars.registerHelper('mkws-translate', function(s) {
  return mkws.M(s);
});


// We need {{mkws-attr '@name'}} because Handlebars can't parse {{@name}}
Handlebars.registerHelper('mkws-attr', function(attrName) {
  return this[attrName];
});


/*
 * Use as follows: {{#mkws-if-any NAME1 having="NAME2"}}
 * Applicable when NAME1 is the name of an array
 * The guarded code runs only if at least one element of the NAME1
 * array has a subelement called NAME2.
 */
Handlebars.registerHelper('mkws-if-any', function(items, options) {
  var having = options.hash.having;
  for (var i in items) {
    var item = items[i]
    if (!having || item[having]) {
      return options.fn(this);
    }
  }
  return "";
});


Handlebars.registerHelper('mkws-first', function(items, options) {
  var having = options.hash.having;
  for (var i in items) {
    var item = items[i]
    if (!having || item[having]) {
      return options.fn(item);
    }
  }
  return "";
});


var _urlRegexp = /^(https?:)?\/\//;
Handlebars.registerHelper('mkws-best-url', function(items) {
  for (var i in items) {
    var item = items[i]
    if (item.match(_urlRegexp)) {
      mkws.debug("'" + item + "' *is* a URL");
      return item;
    }
    mkws.debug("'" + item + "' is not a URL");
  }
  return "";
});
Handlebars.registerHelper('mkws-other-urls', function(items) {
  var res = [];
  for (var i in items) {
    var item = items[i]
    if (item.match(_urlRegexp)) {
      res.push(item);
    }
  }
  return res;
});



Handlebars.registerHelper('mkws-commaList', function(items, options) {
  var out = "";

  for (var i in items) {
    if (i > 0) out += ", ";
    out += options.fn(items[i])
  }

  return out;
});


Handlebars.registerHelper('mkws-index1', function(obj) {
  return obj.data.index + 1;
});

Handlebars.registerHelper('mkws-repeat', function(count, options) {
  var out = "";
  for (var i = 0; i < count; i++) {
    out += options.fn(this);
  }
  return out;
});

// Ridiculous that Handlebars has no way to do "or"
Handlebars.registerHelper('mkws-if-either', function(cond1, cond2, options) {
  if (typeof cond1 === 'function') { cond1 = cond1.call(this); }
  if (typeof cond2 === 'function') { cond2 = cond2.call(this); }

  if (cond1 || cond2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// Ridiculous that this, too, is not part of regular Handlebars
// This code is by Mike Griffin, taken from this blog comment:
//      http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/#comment-44

Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {
  var operators, result;

  if (arguments.length < 3) {
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }

  if (options === undefined) {
    options = rvalue;
    rvalue = operator;
    operator = "===";
  }

  operators = {
    '==': function (l, r) { return l == r; },
    '===': function (l, r) { return l === r; },
    '!=': function (l, r) { return l != r; },
    '!==': function (l, r) { return l !== r; },
    '<': function (l, r) { return l < r; },
    '>': function (l, r) { return l > r; },
    '<=': function (l, r) { return l <= r; },
    '>=': function (l, r) { return l >= r; },
    'typeof': function (l, r) { return typeof l == r; },
    'matches': function (l, r) { return l.match(r); }
  };

  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }

  result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

function _setFontSize(size) {
  console.log('setting font-size to "' + size + '"');
  // document.getElementById("top-header").style.fontSize = size;
  // document.getElementById("main-content").style.fontSize = size;
  // listStyles();
  setStyle('.header', 'font-size', size);
  setStyle('.main', 'font-size', size);
}

function smallerText() { _setFontSize('medium') }
function regularText() { _setFontSize('large') }
function biggerText() { _setFontSize('x-large') }
  

function _setColorsForClass(className, foregroundColor, backgroundColor) {
  setStyle('.' + className, 'color', foregroundColor);
  setStyle('.' + className, 'background-color', backgroundColor);
}

function _setColors(fgColor, bgColor, linkColor, currentPageFgColor, currentPageBgColor, facetTitleBgColor) {
  console.log('setting foreground=' + fgColor + ', background=' + bgColor);
  setStyle('a', 'color', linkColor);
  _setColorsForClass('main', fgColor, bgColor);
  _setColorsForClass('header', fgColor, bgColor);
  _setColorsForClass('footer', fgColor, bgColor);
  _setColorsForClass('results', fgColor, bgColor);
  _setColorsForClass('mkws-waiting', fgColor, bgColor);
  _setColorsForClass('mkws-targets', fgColor, bgColor);
  _setColorsForClass('mkws-ranking', fgColor, bgColor);
  _setColorsForClass('mkws-pager', fgColor, bgColor);
  _setColorsForClass('mkws-navi', fgColor, bgColor);
  _setColorsForClass('mkws-records', fgColor, bgColor);
  _setColorsForClass('mkws-switch', fgColor, bgColor);
  _setColorsForClass('mkws-facets', fgColor, bgColor);
  _setColorsForClass('mkws-facet-title', fgColor, facetTitleBgColor);
  _setColorsForClass('mkws-current-page', currentPageFgColor, currentPageBgColor);
}

function highContrast() { _setColors("White", "Black", "Yellow", "White", "DimGray", "DimGray") }
function defaultContrast() { _setColors("Black", "White", "DarkBlue", "White", "DarkBlue", "White") }

function listStyles() {
  console.log('there are', document.styleSheets.length, 'styleSheets:');
  for (var i = 0; i < document.styleSheets.length; i++) {
    var styleSheet = document.styleSheets[i];
    var cssRules = null;
    try {
      cssRules = styleSheet.cssRules;
    } catch (e) {
      // Sometimes accessing cssRules is deemed insecure for opaque reasons
      if (e.name === 'SecurityError') {
        console.log(' stylesheet', i, 'skipped: insecure');
        continue;
      } else {
        throw(e);
      }
    }
    if (cssRules === null) {
      // Safari doesn't throw an exception when accessing rules for a font
      continue;
    }
    console.log(' stylesheet', i, 'has', cssRules.length, 'rules:');
    for (var j = 0; j < cssRules.length; j++) {
      var rule = cssRules[j];
      var style = rule.style;
      if (!style) {
        // This happens, for example, for an "@media screen and (max-width: 640px)" rule
        console.log('  rule', i + '.' + j + ': selector "' + rule.selectorText + '" has no style');
        continue;
      }
      console.log('  rule', i + '.' + j + ': selector "' + rule.selectorText + '": ' + style.cssText);
      for (var k = 0; k < style.length; k++) {
        var key = style[k];
        console.log('   key "' + key + '" -> "' + style.getPropertyValue(key) + '"');
      }
    }
  }
}

function setStyle(selector, property, value) {
  // When the same selector occurs in multiple stylesheets, the LAST one
  // wins; so walk backwards through in order to find the one that we
  // need to change first.
  for (var i = document.styleSheets.length-1; i >= 0; i--) {
    var styleSheet = document.styleSheets[i];
    console.log('styleSheet =', styleSheet);
    var cssRules = null;
    try {
      cssRules = styleSheet.cssRules;
    } catch (e) {
      // Sometimes accessing cssRules is deemed insecure for opaque reasons
      if (e.name === 'SecurityError') {
        continue;
      } else {
        throw(e);
      }
    }
    if (cssRules === null) {
      // Safari doesn't throw an exception when accessing rules for a font
      continue;
    }
    for (var j = 0; j < cssRules.length; j++) {
      var rule = cssRules[j];
      if (rule.selectorText === selector) {
        console.log('setting CSS: ' + rule.selectorText + ' { ' + property + ': ' + value + ' }');
        rule.style.setProperty(property, value);
        return;
      }
    }
  }
}

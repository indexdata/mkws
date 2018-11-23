function _setFontSize(size) {
  console.log('setting font-size to "' + size + '"');
  document.getElementById("top-header").style.fontSize = size;
  document.getElementById("main-content").style.fontSize = size;
}

function smallerText() { _setFontSize('medium') }
function regularText() { _setFontSize('large') }
function biggerText() { _setFontSize('x-large') }
  

function _setColorsForClass(className, foregroundColor, backgroundColor) {
  var e = document.getElementsByClassName(className);
  for(var i = 0; i < e.length; i++) {
    e[i].style.color = foregroundColor;
    e[i].style.backgroundColor =  backgroundColor;
  }
}

function _setColors(foregroundColor, backgroundColor, linkColor, currentPageForegroundColor, currentPageBackgroundColor, facetTitleBackgroundColor) {
  console.log('setting foreground=' + foregroundColor + ', background=' + backgroundColor);

  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].href) {
      links[i].style.color = linkColor;
    }
  }

  _setColorsForClass('main', foregroundColor, backgroundColor);
  _setColorsForClass('header', foregroundColor, backgroundColor);
  _setColorsForClass('footer', foregroundColor, backgroundColor);
  _setColorsForClass('results', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-waiting', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-targets', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-ranking', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-pager', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-navi', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-records', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-switch', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-facets', foregroundColor, backgroundColor);
  _setColorsForClass('mkws-facet-title', foregroundColor, facetTitleBackgroundColor);
  _setColorsForClass('mkws-current-page', currentPageForegroundColor, currentPageBackgroundColor);
}

function highContrast() { _setColors("White", "Black", "Yellow", "White", "DimGray", "DimGray") }
function defaultContrast() { _setColors("Black", "White", "DarkBlue", "White", "DarkBlue", "WhiteSmoke") }

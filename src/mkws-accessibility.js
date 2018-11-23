// Increase/descrease font size

function _setFontSize(size) {
  console.log('setting font-size to "' + size + '"');
  document.getElementById("top-header").style.fontSize = size;
  document.getElementById("main-content").style.fontSize = size;
}

function smallerText() { _setFontSize('medium') }
function regularText() { _setFontSize('large') }
function biggerText() { _setFontSize('x-large') }
  

function _setColors(foregroundColor, backgroundColor, linkColor, currentPageForegroundColor, currentPageBackgroundColor, facetTitleBackgroundColor) {
  console.log('setting foreground=' + foregroundColor + ', background=' + backgroundColor);
  var links = document.getElementsByTagName("a");
  for(var i=0;i<links.length;i++)  {
        if(links[i].href)   {
            links[i].style.color = linkColor;
        }
    }

  var e =     document.getElementsByClassName('header');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }

  var e =     document.getElementsByClassName('main');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }

  var e =     document.getElementsByClassName('results');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }
  var e =     document.getElementsByClassName('mkws-waiting');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }
  var e =     document.getElementsByClassName('mkws-targets');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }
  var e =     document.getElementsByClassName('mkws-ranking');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }
  var e =     document.getElementsByClassName('mkws-pager');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }

  var e =     document.getElementsByClassName('mkws-current-page');
  e[0].style.backgroundColor =  currentPageBackgroundColor;
  e[0].style.color = currentPageForegroundColor;

  var e =     document.getElementsByClassName('mkws-navi');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }

  var e =     document.getElementsByClassName('mkws-records');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }

  var e =     document.getElementsByClassName('footer');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }
  var e =     document.getElementsByClassName('mkws-switch');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }

  var e =     document.getElementsByClassName('mkws-facets');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  backgroundColor;
    e[i].style.color = foregroundColor;
  }
  var e =     document.getElementsByClassName('mkws-facet-title');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  facetTitleBackgroundColor;
    e[i].style.color = foregroundColor;
  }
}

function highContrast() { _setColors("White", "Black", "Yellow", "White", "DimGray", "DimGray") }
function defaultContrast() { _setColors("Black", "White", "DarkBlue", "White", "DarkBlue", "WhiteSmoke") }

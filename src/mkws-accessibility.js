// Increase/descrease font size

function _setFontSize(size) {
  console.log('setting font-size to "' + size + '"');
  document.getElementById("top-header").style.fontSize = size;
  document.getElementById("main-content").style.fontSize = size;
}

function smallerText() { _setFontSize('medium') }
function regularText() { _setFontSize('large') }
function biggerText() { _setFontSize('x-large') }
  
function highContrast() {

  var links = document.getElementsByTagName("a");
  for(var i=0;i<links.length;i++)  {
        if(links[i].href)   {
            links[i].style.color = "Yellow";
        }
    }

  var e =     document.getElementsByClassName('header');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }

  var e =     document.getElementsByClassName('main');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }

  var e =     document.getElementsByClassName('results');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }
  var e =     document.getElementsByClassName('mkws-waiting');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }
  var e =     document.getElementsByClassName('mkws-targets');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }
  var e =     document.getElementsByClassName('mkws-ranking');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }
  var e =     document.getElementsByClassName('mkws-pager');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }

  var e =     document.getElementsByClassName('mkws-current-page');
  e[0].style.backgroundColor =  "DimGray";
  e[0].style.color = "White";

  var e =     document.getElementsByClassName('mkws-navi');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }

  var e =     document.getElementsByClassName('mkws-records');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }

  var e =     document.getElementsByClassName('footer');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }
  var e =     document.getElementsByClassName('mkws-switch');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "White";
  }

  var e =     document.getElementsByClassName('mkws-facets');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "Black";
    e[i].style.color = "white";
  }
  var e =     document.getElementsByClassName('mkws-facet-title');
  for(i=0; i<e.length; i++) {
    e[i].style.backgroundColor =  "DimGray";
    e[i].style.color = "white";
  }
}


function defaultContrast() {

    var links = document.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)  {
          if(links[i].href)   {
              links[i].style.color = "DarkBlue";
          }
      }

    var e =     document.getElementsByClassName('header');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }

    var e =     document.getElementsByClassName('main');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }

    var e =     document.getElementsByClassName('results');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }
    var e =     document.getElementsByClassName('mkws-waiting');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }
    var e =     document.getElementsByClassName('mkws-targets');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }
    var e =     document.getElementsByClassName('mkws-ranking');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }
    var e =     document.getElementsByClassName('mkws-pager');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }

    var e =     document.getElementsByClassName('mkws-current-page');
    e[0].style.backgroundColor =  "DarkBlue";
    e[0].style.color = "White";

    var e =     document.getElementsByClassName('mkws-navi');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }

    var e =     document.getElementsByClassName('mkws-records');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }

    var e =     document.getElementsByClassName('footer');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }
    var e =     document.getElementsByClassName('mkws-switch');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }

    var e =     document.getElementsByClassName('mkws-facets');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "White";
      e[i].style.color = "Black";
    }
    var e =     document.getElementsByClassName('mkws-facet-title');
    for(i=0; i<e.length; i++) {
      e[i].style.backgroundColor =  "WhiteSmoke";
      e[i].style.color = "Black";
    }
}

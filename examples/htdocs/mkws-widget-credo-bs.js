// The Google Images database returns links like:
//      http://images.google.com/url?q=http://eofdreams.com/fish.html&sa=U&ei=RAB-U9XNDo2Dqga1o4L4Bw&ved=0CC4Q9QEwAA&usg=AFQjCNFhRtn6GMevHbpITZ6kfx6rsHV2ow
// This Handlebars helper avoids a pointless redirect by transforming
// this to the URL of the underling page, in this case
//      http://eofdreams.com/fish.html
//
Handlebars.registerHelper('mkws-googleurl', function(obj) {
  if (!obj) {
    return "obj undefined";
  } else if (!obj[0]) {
    return "obj[0] undefined, JSON=" + $.toJSON(obj);
  } else {
    return mkws.getParameterByName('q', obj[0]);
  }
});


// ### This works inefficiently by having multiple teams all run the
// same search against different sets of targets. A much better
// approach would be run a single search, with all these panels
// members of the same team, but picking out only the results relevant
// to them. That will be more work.

mkws.registerWidgetType('Credo', function() {
  var that = this;

  this.team.registerTemplate('CredoImage', '\
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">\
       <a href="{{mkws-googleurl md-electronic-url}}" target="_blank">\
        {{#mkws-first md-thumburl}}\
	  <img src="{{this}}" alt="{{../md-title}}"/>\
        {{/mkws-first}}\
	<br/>\
       </a>\
       <p>{{{md-title}}}</p>\
      </div>\
');

  var s = []
  // Main panel: encylopaedia and images on the left, topics on the right
  s.push('<div class="row">');

  s.push('<div class="jumbotron panel col-md-8"><div class="panel-body">');
  //s.push(section('encyclopaedia', 'Topic Page: <span class="x-mkws-title"/>',
  s.push(this.subwidget('Reference', { _team: 'ref', paragraphs: 1 }));
  // The Images widget needs to be in our team so we can set its template
  s.push('</div></div>');

  s.push('<div class="col-md-4">');
  s.push(section('topics', 'Related Topics',
                 this.subwidget('Facet', { _team: 'main', facet: 'subject' })));
  s.push('</div>');

  s.push('</div>');
  
  s.push('<div class="row">');
  s.push(section('image col-md-12', 'Images', this.subwidget('GoogleImage', { maxrecs: 4, template: 'CredoImage', target: 'google_images_js' })));
  s.push('</div>');
  

  s.push('<div class="row clearfix">');
  s.push(section('entries clearfix col-md-4 col-sm-6', 'News',
                 this.subwidget('Records', { _team: 'news', targetfilter: 'categories=news', perpage: 10 })));
  s.push(section('articles clearfix col-md-4 col-sm-6', 'Articles',
                    this.subwidget('Records', { _team: 'articles', targetfilter: 'categories=articles', perpage: 10 })));
  s.push(section('books clearfix col-md-4 col-sm-6', 'Books',
                    this.subwidget('Records', { _team: 'books', targetfilter: 'categories=books', perpage: 10 })));
  s.push(section('news col-md-4 col-sm-6', 'Results from all targets',
                    this.subwidget('Records', { _team: 'main' })));
  s.push('</div>');
  this.node.html(s.join(''));

  // Fill in the titles from the query once widgets have all been prepared
  var that = this;
  this.team.queue("ready").subscribe(function() {
    var query = toTitleCase(that.config.query);
    that.log("got query '" + query + "' from team config");
    mkws.$('.x-mkws-title').html(query);
    mkws.$('title').html("MKWS: " + query);

    mkws.$(".mkwsSummary img").addClass("media-object");
    console.log(mkws.$("body").html());

    // Derived from http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      });
    }
  });


  function section(xclass, title, content) {
    var s = [];
    s.push('<div class="' + xclass + '"><div class="panel panel-default">');
    s.push('<div class="panel-heading title"><h3 class="panel-title">' + title + '</h3></div>');
    s.push('<div class="panel-body">' + content + '</div>');
    s.push('</div></div>');
    return s.join('');
  }

  function sectionRow(xclass, title, content) {
    var s = [];
    s.push('<div class="row">');
    s.push(section(xclass, title, content));
    s.push('</div>');
    return s.join('');
  }
});

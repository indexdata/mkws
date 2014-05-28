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
      <div>\
       <a href="{{mkws-googleurl md-electronic-url}}" target="_blank">\
        {{#mkws-first md-thumburl}}\
	  <img src="{{this}}" alt="{{../md-title}}"/>\
        {{/mkws-first}}\
	<br/>\
       </a>\
       <p>{{md-title}}</p>\
      </div>\
');

  var s = []
  s.push('<table>');

  // Main panel: encylopaedia and images on the left, topics on the right
  s.push('<tr class="front">');

  s.push('<td class="main">');
  s.push(section('encyclopaedia', 'Topic Page: <span class="x-mkws-title"/>',
                 this.subwidget('Reference', { _team: 'ref' })));
  // The Images widget needs to be in our team so we can set its template
  s.push(section('image', 'Images',
                 this.subwidget('GoogleImage', { maxrecs: 4, template: 'CredoImage' })));
  s.push('</td>');

  s.push('<td class="side">');
  s.push(section('mindmap', 'Create a Mind Map for <span class="x-mkws-title"/>',
                 this.subwidget('Mindmap', { _team: 'main', facet: 'subject' })));
  s.push(section('topics', 'Related Topics',
                 this.subwidget('Facet', { _team: 'main', facet: 'subject' })));
  s.push('</td>');

  s.push('</tr>');

  s.push('<tr><td colspan="2"><hr class="divider"/></td></tr>');

  s.push(sectionRow('entries', 'Credo Entries',
                    this.subwidget('Records', { _team: 'main' })));
  s.push(sectionRow('articles', 'Articles',
                    this.subwidget('Records', { _team: 'articles', targetfilter: 'categories=articles' })));
  s.push(sectionRow('books', 'Books',
                    this.subwidget('Records', { _team: 'books', targetfilter: 'categories=books' })));
  s.push(sectionRow('news', 'News',
                    this.subwidget('Records', { _team: 'news', targetfilter: 'categories=news' })));
  s.push(sectionRow('resources', 'Suggested Resources',
                    "### Not yet implemented"));

  s.push('</table>');

  this.node.html(s.join(''));

  // Fill in the titles from the query once widgets have all been prepared
  var that = this;
  this.team.queue("ready").subscribe(function() {
    var query = that.config.query;
    that.log("got query '" + query + "' from team config");
    mkws.$('.x-mkws-title').html(query);
    mkws.$('title').html("MKWS: " + query);
  });


  function section(xclass, title, content) {
    var s = [];
    s.push('<div class="' + xclass + ' section">');
    s.push('<div class="title">' + title + '</div>');
    s.push('<div class="content">' + content + '</div>');
    s.push('</div>');
    return s.join('');
  }

  function sectionRow(xclass, title, content) {
    var s = [];
    s.push('<tr>');
    s.push('<td colspan="2">');
    s.push(section(xclass, title, content));
    s.push('</td>');
    s.push('</tr>');
    return s.join('');
  }
});


mkws.registerWidgetType('Mindmap', function() {
  this.node.html("### We do not yet have a Mindmap widget");
});

// ### This works inefficiently by having multiple teams all run the
// same search against different sets of targets. A much better
// approach would be run a single search, with all these panels
// members of the same team, but picking out only the results relevant
// to them. That will be more work.

mkws.registerWidgetType('Credo', function() {
  var that = this;
  var s = []
  s.push('<table>');

  // Main panel: encylopaedia and images on the left, topics on the right
  s.push('<tr class="front">');

  s.push('<td class="main">');
  s.push(section('encyclopaedia', 'Topic Page: ### title',
                 this.subwidget('Reference', { _team: 'ref' })));
  s.push(section('image', 'Images',
                 this.subwidget('GoogleImage', { _team: 'img', maxrecs: 4 })));
  s.push('</td>');

  s.push('<td class="side">');
  s.push(section('mindmap', 'Create a Mind Map for ### title',
                 '### Is there a way to make a mind-map?'));
  s.push(section('topics', 'Related Topics',
                 1 || this.subwidget('Facet', { facet: 'subject' })));
  s.push('</td>');

  s.push('</tr>');

  s.push(sectionRow('entries', 'Credo Entries',
                    1 || this.subwidget('Records', { /* ### config */ })));
  s.push(sectionRow('articles', 'Articles',
                    1 || this.subwidget('Records', { /* ### config */ })));
  s.push(sectionRow('books', 'Books',
                    1 || this.subwidget('Records', { /* ### config */ })));
  s.push(sectionRow('news', 'News',
                    1 || this.subwidget('Records', { /* ### config */ })));
  s.push(sectionRow('resources', 'Suggested Resources',
                    1 || this.subwidget('Records', { /* ### config */ })));

  s.push('</table>');

  this.node.html(s.join(''));


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

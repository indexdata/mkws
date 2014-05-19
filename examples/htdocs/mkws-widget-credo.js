mkws.registerWidgetType('Credo', function() {
  s = []
  s.push('<table>');

  // Main panel: encylopaedia and images on the left, topics on the right
  s.push('<tr>');

  s.push('<td class="main">');

  s.push('<div class="encyclopaedia">');
  s.push('<div class="title">Topic Page: ### title</div>');
  s.push(this.subwidget('Reference'));
  s.push('</div>');

  s.push('<div class="images">');
  s.push('<div class="title">Images</div>');
  s.push(this.subwidget('Images', { /* ### config */ } ));
  s.push('</div>');

  s.push('</td>');

  s.push('<td class="side">');

  s.push('<div class="mindmap">');
  s.push('<div class="title">Create a Mind Map for ### title</div>');
  // ### Is there a way to make a mind-map?
  s.push('</div>');

  s.push('<div class="topics">');
  s.push('<div class="title">Related Topics</div>');
  s.push(this.subwidget('Facet', { facet: 'subject' }));
  s.push('</div>');

  s.push('</td>');

  s.push('</tr>');

  s.push('<tr>');
  s.push('</td>');
  s.push('<div class="entries">');
  s.push('<div class="title">Credo Entries</div>');
  s.push(this.subwidget('Records', { /* ### config */ }));
  s.push('</div>');
  s.push('</td>');
  s.push('</tr>');

  // More TRs for Articles, Books, News, Suggested Resources
  s.push('</table>');

  this.node.html(s.join(''));
});

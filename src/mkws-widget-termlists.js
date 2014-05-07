mkws.registerWidgetType('Termlists', function() {
  var that = this;

  // Initially hide the termlists; display when we get results
  $(document).ready(function() {
    $(that.node).hide();
  });
  this.team.queue("termlists").subscribe(function(data) {
    $(that.node).show();
  });

  var acc = [];
  var facets = this.config.facets;
  acc.push('<div class="title">' + mkws.M('Termlists') + '</div>');
  for (var i = 0; i < facets.length; i++) {
    acc.push('<div class="mkwsFacet mkwsTeam_', this.team.name(), '" data-mkws-facet="', facets[i], '">', '</div>');
  }
  $(this.node).html(acc.join(''));

  widget.autosearch(this);
});


mkws.registerWidgetType('Facet', function() {
  var facetConfig = {
    xtargets: [ "Sources",  16, false ],
    subject:  [ "Subjects", 10, true ],
    author:   [ "Authors",  10, true ]
  }

  var that = this;
  var name = that.config.facet;
  var ref = facetConfig[name] || alert("no facet definition for '" + name + "'");
  var caption = ref[0];
  var max = ref[1];
  var pzIndex = ref[2] ? name : null;

  that.toString = function() {
    return '[Widget ' + that.team.name() + ':' + that.type + '(' + name + ')]';
  };

  that.team.queue("termlists").subscribe(function(data) {
    data = data[name];

    var teamName = that.team.name();
    var acc = [];
    acc.push('<div class="termtitle">' + mkws.M(caption) + '</div>');
    for (var i = 0; i < data.length && i < max; i++) {
      acc.push('<div class="term">');
      acc.push('<a href="#" ');
      var action = '';
      if (!pzIndex) {
        // Special case: target selection
        acc.push('target_id='+data[i].id+' ');
        if (!that.team.targetFiltered(data[i].id)) {
          action = 'mkws.limitTarget(\'' + teamName + '\', this.getAttribute(\'target_id\'),this.firstChild.nodeValue)';
        }
      } else {
        action = 'mkws.limitQuery(\'' + teamName + '\', \'' + pzIndex + '\', this.firstChild.nodeValue)';
      }
      acc.push('onclick="' + action + ';return false;">' + data[i].name + '</a>'
               + ' <span>' + data[i].freq + '</span>');
      acc.push('</div>');
    }

    $(that.node).html(acc.join(''));
  });
});

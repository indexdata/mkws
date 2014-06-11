mkws.registerWidgetType('Termlists', function() {
  // Initially hide the termlists; display when we get results
  var that = this;
  var team = this.team;
  mkws.$(document).ready(function() {
    that.node.hide();
  });
  team.queue("termlists").subscribe(function(data) {
    that.node.show();
  });

  var template = team.loadTemplate(this.config.template || "Termlists");
  this.node.html(template({
    team: team,
    facets: this.config.facets
  }));
  this.autosearch();
});


mkws.registerWidgetType('Facet', function() {
  var facetConfig = {
    xtargets: [ "Sources",  16, false ],
    subject:  [ "Subjects", 10, true ],
    author:   [ "Authors",  10, true ]
  }
  var that = this;
  var team = this.team;
  var name = that.config.facet;
  var ref = facetConfig[name] || [ "Unknown", 10, true ];
  var caption = this.config['facet_caption_' + name] || ref[0];
  var max     = parseInt(this.config['facet_max_' + name] || ref[1]);
  var pzIndex = ref[2] ? name : null;

  that.toString = function() {
    return '[Widget ' + team.name() + ':' + that.type + '(' + name + ')]';
  };

  team.queue("termlists").subscribe(function(data) {
    data = data[name];
    var terms = [];
    var teamName = team.name();
    for (var i = 0; i < data.length && i < max; i++) {
      var linkdata = "";
      var action = "";
      if (!pzIndex) {
        // Special case: target selection
        linkdata += ('target_id='+data[i].id+' ');
        if (!team.targetFiltered(data[i].id)) {
          action = 'mkws.limitTarget(\'' + teamName + '\', this.getAttribute(\'target_id\'),this.firstChild.nodeValue)';
        }
      } else {
        action = 'mkws.limitQuery(\'' + teamName + '\', \'' + pzIndex + '\', this.firstChild.nodeValue)';
      }
      linkdata += 'onclick="' + action + ';return false;"';
      terms.push({
        term: data[i].name,
        count: data[i].freq,
        linkdata: linkdata
      }); 
    }
    var template = team.loadTemplate(that.config.template || "Facet");
    that.node.html(template({
      name: name,
      caption: caption,
      terms: terms
    }));
  });
  this.autosearch();
});

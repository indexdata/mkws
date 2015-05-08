mkws.registerWidgetType('facets', function() {
  // Initially hide the facets; display when we get results
  var that = this;
  var team = this.team;

  this.team.queue("searchtriggered").subscribe(function() {
    var op = that.config.newsearch_opacity;
    if (op !== undefined) { that.node.fadeTo(500, op); }
  });

  team.queue("facets").subscribe(function(data) {
    that.node.stop();
    that.node.css('opacity', 1);
    that.node.addClass("active");
  });

  var template = team.loadTemplate(this.config.template || "facets");
  this.node.html(template({
    team: team.name(),
    facets: this.config.facets
  }));
  this.autosearch();
});


mkws.registerWidgetType('facet', function() {
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

  team.queue("facets").subscribe(function(data) {
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
    // configured template > facet specific template > default facet template
    var template;
    if (that.config.template) {
      template = team.loadTemplate(that.config.template);
    } else {
      template = team.loadTemplate("facet-" + name);
      if (template) {
        that.info("Using facet-" + name + " template.")
      } else {
        that.info("No " + name + " specific template, using default.")
        template = team.loadTemplate("facet");
      }
    }
    that.node.html(template({
      name: name,
      caption: caption,
      terms: terms
    }));
  });
  this.autosearch();
});

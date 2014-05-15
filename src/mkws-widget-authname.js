mkws.registerWidgetType('Authname', function() {
  var that = this;

  this.team.queue("authenticated").subscribe(function(authName) {
    that.jqnode.html(authName);
  });
});

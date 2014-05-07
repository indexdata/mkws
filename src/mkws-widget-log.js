mkws.registerWidgetType('Log', function() {
  var that = this;

  this.team.queue("log").subscribe(function(teamName, timestamp, message) {
    $(that.node).append(teamName + ": " + timestamp + message + "<br/>");
  });
});

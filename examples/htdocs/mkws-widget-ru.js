var mkws_config = {
   service_proxy_auth: "http://mkws.indexdata.com/service-proxy/?command=auth&action=login&username=paratext&password=paratext_mkc"
};

mkws.registerWidgetType('ReferenceUniverse', function() {
  if (!this.config.perpage) this.config.perpage = 5;
  if (!this.config.sort) this.config.sort = "position";
  this.team.registerTemplate('ReferenceUniverse', '\
<h2>Results from Reference Universe</h2>\
<ul>\
{{#each hits}}\
  <li>\
    {{#mkws-first md-electronic-url}}\
    <a href="{{this}}">\
    {{/mkws-first}}\
      {{md-title}}\
    </a>\
  {{#if md-title-remainder}}\
    <span>{{md-title-remainder}}</span>\
  {{/if}}\
  {{#if md-title-responsibility}}\
    <span><i>{{md-title-responsibility}}</i></span>\
  {{/if}}\
  </li>\
{{/each}}\
</ul>\
');

  var that = this;
  var template = that.team.loadTemplate(that.config.template || "ReferenceUniverse");
  this.team.queue("records").subscribe(function(data) {
    that.node.html(template(data));
  }); 
  that.autosearch();
});


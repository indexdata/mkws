var mkws_config = {service_proxy_auth: "http://mkws.indexdata.com/service-proxy/?command=auth&action=login&username=paratext&password=paratext_mkc"};
console.log(JSON.stringify(mkws.config));

mkws.registerWidgetType('ReferenceUniverse', function() {
  if (!this.config.perpage) this.config.perpage = 5;
  if (!this.config.sort) this.config.sort = "position";
  this.config.template = 'ReferenceUniverse';
  this.team.registerTemplate('ReferenceUniverse', '\
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
');
  this.node.html("<h2>Reference Universe results:</h2>\n" +
                 this.subwidget('Records'));
});

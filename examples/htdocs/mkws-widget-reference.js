mkws.registerWidgetType('Reference', function() {
    mkws.promotionFunction('Record').call(this);
    if (!this.config.target) this.config.target = 'wikimedia_wikipedia_single_result';
    if (!this.config.template) this.config.template = 'Reference';

    this.team.registerTemplate('Reference', '\
<a href="{{md-electronic-url}}">\
  <h1>{{md-title}}</h1>\
</a>\
{{#if md-title-remainder}}\
  <b>{{md-title-remainder}}</b>\
{{/if}}\
{{#if md-title-responsibility}}\
  <i>{{md-title-responsibility}}</i>\
{{/if}}\
  <p>\
    <img style="float:right; margin: 0 0 1em 3em" src="{{md-thumburl}}" alt="{{md-title}}">\
    {{md-description}}\
  </p>\
');

    var that = this;
    this.team.queue("record").subscribe(function(data) {
        that.log("got data " + $.toJSON(data));
    });
});

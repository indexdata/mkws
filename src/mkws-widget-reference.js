mkws.registerWidgetType('Reference', function() {
  mkws.promotionFunction('Record').call(this);
  if (!this.config.target) this.config.target = 'wikimedia_wikipedia_single_result';
  if (!this.config.template) this.config.template = 'Reference';

  this.team.registerTemplate('Reference', '\
  <img src="{{md-thumburl}}" alt="{{md-title}}">\
  <h1><a href="{{md-electronic-url}}">{{md-title}}</a></h1>\
{{#if md-title-remainder}}\
  <b>{{md-title-remainder}}</b>\
{{/if}}\
{{#if md-title-responsibility}}\
  <i>{{md-title-responsibility}}</i>\
{{/if}}\
  {{{mkws-paragraphs md-description}}}\
  <p class="mkwsCredit">Wikipedia</p>\
');
});

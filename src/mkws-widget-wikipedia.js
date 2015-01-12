mkws.registerWidgetType('wikipedia', function() {
  mkws.promotionFunction('record').call(this);
  if (!this.config.target) this.config.target = 'wikimedia_wikipedia_single_result';
  if (!this.config.template) this.config.template = 'wikipedia';
  this.config.template_vars.paragraphs = this.config.paragraphs || 0;
  this.config.template_vars.sentences = this.config.sentences || 0;
  this.config.template_vars.credit = this.config.credit || "Wikipedia";
});
mkws.aliasWidgetType('reference', 'wikipedia');

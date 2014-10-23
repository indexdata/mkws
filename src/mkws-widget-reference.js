mkws.registerWidgetType('reference', function() {
  mkws.promotionFunction('record').call(this);
  if (!this.config.target) this.config.target = 'wikimedia_wikipedia_single_result';
  if (!this.config.template) this.config.template = 'reference';
  this.config.template_vars.paragraphs = this.config.paragraphs || 0;
  this.config.template_vars.sentences = this.config.sentences || 0;
});

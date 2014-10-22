# Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com

DEST = ../tools/htdocs

HANDLEBARS_FILE = handlebars-v2.0.0.js
JQUERY_FILE = jquery-1.10.0.min.js
JQUERY_JSON_FILE = jquery.json-2.4.js
PP2_FILE = pz2.js

HANDLEBARS_URL = http://builds.handlebarsjs.com.s3.amazonaws.com/${HANDLEBARS_FILE}
JQUERY_URL = http://code.jquery.com/${JQUERY_FILE}
JQUERY_JSON_URL = https://jquery-json.googlecode.com/files/${JQUERY_JSON_FILE}
PP2_URL = http://git.indexdata.com/?p=pazpar2.git;a=blob_plain;f=js/${PP2_FILE};hb=HEAD

VERSION = $(shell tr -d '\012' < VERSION)
HANDLEBARS = ../test/node_modules/.bin/handlebars
YUI_COMPRESSOR = $(shell which yui-compressor ../test/bin/yui-compressor | head -1)

COMPONENTS = mkws-handlebars.js \
	mkws-core.js \
	mkws-team.js \
	mkws-filter.js \
	mkws-widget.js \
	mkws-widget-main.js \
	mkws-widget-termlists.js \
	mkws-widget-authname.js \
	mkws-widget-categories.js \
	mkws-widget-log.js \
	mkws-widget-record.js \
	mkws-widget-reference.js \
	mkws-widget-builder.js \
	mkws-templates.js \
	mkws-popup.js

DOWNLOADABLE = ${HANDLEBARS_FILE} ${JQUERY_FILE} ${JQUERY_JSON_FILE} ${PP2_FILE}
RELEASABLE = mkws.js mkws.min.js mkws-complete.js mkws-complete.min.js
AVAILABLE = $(DOWNLOADABLE) $(RELEASABLE) NEWS VERSION
INSTALLED_DOWNLOADABLE = $(DOWNLOADABLE:%=$(DEST)/%)
INSTALLED_RELEASABLE = $(RELEASABLE:%=$(DEST)/%)
INSTALLED = $(AVAILABLE:%=$(DEST)/%)

all: $(INSTALLED)

$(DEST)/mkws-complete.js: Makefile $(INSTALLED_DOWNLOADABLE) $(DEST)/mkws.js
	( set -e; \
	  echo "/*! Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com"; \
	  echo "   Licence: LGPL, http://www.indexdata.com/licences/lgpl"; \
	  echo "   created at: $$(date)"; \
	  echo "   MKWS GIT id: $$(git show | head -n 1 | perl -npe 's,\S+\s+,,')"; \
	  echo "   pz2.js GIT id: $$(curl -sSf 'http://git.indexdata.com/?p=pazpar2.git;a=rss' | egrep '<guid' | head -1 | perl -ne 'print "$$1\n" if m,.*=([0-9a-f]+)</guid>,')"; \
	  echo "*/"; \
	  cat $(DEST)/${JQUERY_FILE}; \
	  cat $(DEST)/${JQUERY_JSON_FILE}; \
	  echo 'mkws_jQuery = jQuery.noConflict(true);'; \
	  cat $(DEST)/${HANDLEBARS_FILE}; \
	  cat $(DEST)/${PP2_FILE}; \
	  cat $(DEST)/mkws.js; \
	) > $@.tmp
	mv -f $@.tmp $@

%.min.js: %.js
	${YUI_COMPRESSOR} $? > $@.tmp
	mv -f $@.tmp $@

$(DEST)/${HANDLEBARS_FILE}:
	curl -sSf ${HANDLEBARS_URL} -o $@.tmp
	mv -f $@.tmp $@

$(DEST)/${JQUERY_FILE}:
	curl -sSf ${JQUERY_URL} -o $@.tmp
	perl -npe 's,sourceMappingURL=jquery.*map,,' $@.tmp > $@
	rm -f $@.tmp

$(DEST)/${JQUERY_JSON_FILE}:
	curl -sSf ${JQUERY_JSON_URL} -o $@.tmp
	mv -f $@.tmp $@

$(DEST)/${PP2_FILE}:
	curl -sSf "${PP2_URL}" -o $@.tmp
	mv -f $@.tmp $@

$(DEST)/%: %
	rm -f $@
	cp $? $@
	chmod 444 $@

release: $(RELEASABLE)
	@if [ -f ${DEST}/releases/mkws-$(VERSION).js ]; then \
		echo "*** There is already a release $(VERSION)"; \
	else \
		cp -p $(DEST)/mkws.js ${DEST}/releases/mkws-$(VERSION).js; \
		cp -p $(DEST)/mkws.min.js ${DEST}/releases/mkws-$(VERSION).min.js; \
		cp -p $(DEST)/mkws-complete.js ${DEST}/releases/mkws-complete-$(VERSION).js; \
		cp -p $(DEST)/mkws-complete.min.js ${DEST}/releases/mkws-complete-$(VERSION).min.js; \
		echo "Made release $(VERSION)"; \
	fi

$(DEST)/mkws.js: $(COMPONENTS) Makefile
	cat ${COMPONENTS} > $@.tmp
	mv -f $@.tmp $@
	chmod 444 $@

mkws-templates.js: *.templates/*.handlebars
	${HANDLEBARS} -n mkws.defaultTemplates *.templates/*.handlebars -f $@.tmp
	mv -f $@.tmp $@

# Checks that the JavaScript can be parsed
syntax-check: $(DEST)/mkws.js
	${YUI_COMPRESSOR} $(DEST)/mkws.js >/dev/null

# Emits a list of <script> elements to include in HTML applications
html-includes:
	echo $(COMPONENTS) | perl -npe "s/\s+/\0/g" | \
	  perl -n0e 'chomp(); print qq{    <script type="text/javascript" src="src/$$_"></script>\n}'

clean distclean:
	rm -f ${INSTALLED} mkws-templates.js

help:
	@echo "make [ all | clean | release ]"
	@echo "     [ syntax-check | html-includes ]"
	@echo "     [ mkws-templates.js | $(DEST)/mkws-complete.min.js ]"
	@echo ""

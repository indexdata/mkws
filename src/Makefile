# Copyright (c) 2013-2015 Index Data ApS. http://indexdata.com

DEST = ../tools/htdocs

HANDLEBARS_FILE = handlebars-v3.0.3.js
JQUERY_FILE = jquery-1.10.0.min.js
JQUERY_JSON_FILE = jquery.json-2.4.js
JSNLOG_FILE = jsnlog.min.js
PP2_FILE = pz2.js

HANDLEBARS_URL = http://builds.handlebarsjs.com.s3.amazonaws.com/${HANDLEBARS_FILE}
JQUERY_URL = http://code.jquery.com/${JQUERY_FILE}
JQUERY_JSON_URL = https://jquery-json.googlecode.com/files/${JQUERY_JSON_FILE}
JSNLOG_URL = https://raw.githubusercontent.com/mperdeck/jsnlog.js/2.7.5/${JSNLOG_FILE}
PP2_URL = https://raw.githubusercontent.com/indexdata/pazpar2/master/js/pz2.js

VERSION = $(shell tr -d '\012' < VERSION)
HANDLEBARS = ../test/node_modules/.bin/handlebars
UGLIFYJS = ../test/node_modules/.bin/uglifyjs

COMPONENTS = mkws-handlebars.js \
	mkws-core.js \
	mkws-team.js \
	mkws-filter.js \
	mkws-widget.js \
	mkws-widget-main.js \
	mkws-widget-facets.js \
	mkws-widget-authname.js \
	mkws-widget-categories.js \
	mkws-widget-log.js \
	mkws-widget-record.js \
	mkws-widget-wikipedia.js \
	mkws-widget-ru.js \
	mkws-widget-builder.js \
	mkws-templates.js \
	mkws-popup.js

DOWNLOADABLE = ${HANDLEBARS_FILE} ${JQUERY_FILE} ${JQUERY_JSON_FILE} ${JSNLOG_FILE} ${PP2_FILE}
RELEASABLE = mkws.js mkws.min.js mkws-complete.js mkws-complete.min.js
AVAILABLE = $(DOWNLOADABLE) $(RELEASABLE) NEWS VERSION
INSTALLED_DOWNLOADABLE = $(DOWNLOADABLE:%=$(DEST)/%)
INSTALLED_RELEASABLE = $(RELEASABLE:%=$(DEST)/%)
INSTALLED = $(AVAILABLE:%=$(DEST)/%)

all: $(INSTALLED)

$(DEST)/mkws-complete.js: Makefile $(INSTALLED_DOWNLOADABLE) $(DEST)/mkws.js
	( set -e; \
	  echo "/*! Copyright (c) 2013-$$(date '+%Y') Index Data ApS. http://indexdata.com"; \
	  echo "   Licence: LGPL, http://www.indexdata.com/licences/lgpl"; \
	  echo "   created at: $$(date)"; \
	  echo "   MKWS GIT id: $$(git show | head -n 1 | perl -npe 's,\S+\s+,,')"; \
	  echo "   pz2.js GIT id: $$(curl -sSf 'https://github.com/indexdata/pazpar2' | egrep '"commit-tease-sha"' | perl -ne 'print "$$1\n" if m,href=".*/([0-9a-f]+)",')"; \
	  echo "*/"; \
	  cat $(DEST)/${JQUERY_FILE}; \
	  cat $(DEST)/${JQUERY_JSON_FILE}; \
	  cat $(DEST)/${JSNLOG_FILE}; \
	  echo 'mkws_jQuery = jQuery.noConflict(true);'; \
	  cat $(DEST)/${HANDLEBARS_FILE}; \
	  cat $(DEST)/${PP2_FILE}; \
	  cat $(DEST)/mkws.js; \
	) > $@.tmp
	mv -f $@.tmp $@

%.min.js: %.js
	${UGLIFYJS} $? > $@.tmp
	mv -f $@.tmp $@

$(DEST)/${HANDLEBARS_FILE}:
	curl -sSf ${HANDLEBARS_URL} -o $@.tmp
	mv -f $@.tmp $@

$(DEST)/${JQUERY_FILE}:
	curl -sSf ${JQUERY_URL} -o $@.tmp
	perl -npe 's,sourceMappingURL=jquery.*map,,' $@.tmp | sed 's@<input>@<input/>@' > $@
	rm -f $@.tmp

$(DEST)/${JQUERY_JSON_FILE}:
	curl -sSf ${JQUERY_JSON_URL} -o $@.tmp
	mv -f $@.tmp $@

$(DEST)/${JSNLOG_FILE}:
	curl -sSf ${JSNLOG_URL} -o $@.tmp
	mv -f $@.tmp $@

$(DEST)/${PP2_FILE}:
	curl -sSf "${PP2_URL}" -o $@.tmp
	mv -f $@.tmp $@

$(DEST)/NEWS: NEWS
	rm -f $@
	cp $? $@
	chmod 444 $@

$(DEST)/VERSION: VERSION
	rm -f $@
	cp $? $@
	chmod 444 $@

release: $(INSTALLED_RELEASABLE)
	if [ -f ${DEST}/releases/mkws-$(VERSION).js ]; then \
		echo "*** There is already a release $(VERSION)"; \
	else \
		cp -p $(DEST)/mkws.js ${DEST}/releases/mkws-$(VERSION).js; \
		cp -p $(DEST)/mkws.min.js ${DEST}/releases/mkws-$(VERSION).min.js; \
		cp -p $(DEST)/mkws-complete.js ${DEST}/releases/mkws-complete-$(VERSION).js; \
		cp -p $(DEST)/mkws-complete.min.js ${DEST}/releases/mkws-complete-$(VERSION).min.js; \
		cp -p $(DEST)/mkws.css ${DEST}/releases/mkws-$(VERSION).css; \
		echo "Made release $(VERSION)"; \
	fi

$(DEST)/mkws.js: $(COMPONENTS) Makefile
	cat ${COMPONENTS} > $@.tmp
	mv -f $@.tmp $@
	chmod 444 $@

mkws-templates.js: templates/*.handlebars
	${HANDLEBARS} -n mkws.defaultTemplates templates/*.handlebars -f $@.tmp
	mv -f $@.tmp $@

# Checks that the JavaScript can be parsed
syntax-check: $(DEST)/mkws.js
	${UGLIFYJS} $(DEST)/mkws.js >/dev/null

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

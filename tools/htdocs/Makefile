# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com

SRC=   ../../src

HANDLEBARS_FILE = handlebars-v1.3.0.js
JQUERY_FILE = jquery-1.10.0.min.js
JQUERY_JSON_FILE = jquery.json-2.4.js
PP2_FILE = pz2.js

HANDLEBARS_URL = http://builds.handlebarsjs.com.s3.amazonaws.com/${HANDLEBARS_FILE}
JQUERY_URL = http://code.jquery.com/${JQUERY_FILE}
JQUERY_JSON_URL = https://jquery-json.googlecode.com/files/${JQUERY_JSON_FILE}
PP2_URL = http://git.indexdata.com/?p=pazpar2.git;a=blob_plain;f=js/${PP2_FILE};hb=HEAD

JQUERY_UI_URL =	http://code.jquery.com/ui/1.10.3/jquery-ui.js
VERSION = $(shell tr -d '\012' < ${SRC}/VERSION)
#HANDLEBARS=handlebars	
HANDLEBARS=../../test/node_modules/.bin/handlebars 

COMPONENTS = ${SRC}/mkws-handlebars.js \
	${SRC}/mkws-core.js \
	${SRC}/mkws-team.js \
	${SRC}/mkws-filter.js \
	${SRC}/mkws-templates.js \
	${SRC}/mkws-popup.js \
	${SRC}/mkws-widget.js \
	${SRC}/mkws-widget-main.js \
	${SRC}/mkws-widget-termlists.js \
	${SRC}/mkws-widget-authname.js \
	${SRC}/mkws-widget-categories.js \
	${SRC}/mkws-widget-log.js \
	${SRC}/mkws-widget-record.js \
	${SRC}/mkws-widget-reference.js \
	${SRC}/mkws-widget-builder.js

GENERATED = ${HANDLEBARS_FILE} ${JQUERY_FILE} ${JQUERY_JSON_FILE} ${PP2_FILE} \
	mkws.js mkws.min.js mkws-complete.js mkws-complete.min.js mkws-templates.js

**make-default**: all

all: mkws.min.js mkws-complete.min.js

mkws-js mkws-complete.js: Makefile mkws.js ${HANDLEBARS_FILE} ${JQUERY_FILE} ${JQUERY_JSON_FILE} ${PP2_FILE}
	( set -e; \
	  echo "/*! Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com"; \
	  echo "   Licence: GPL, http://www.indexdata.com/licences/gpl"; \
	  echo "   created at: $$(date)"; \
	  echo "   MKWS GIT id: $$(git show | head -n 1 | perl -npe 's,\S+\s+,,')"; \
	  echo "   pz2.js GIT id: $$(curl -sSf 'http://git.indexdata.com/?p=pazpar2.git;a=rss' | egrep '<guid' | head -1 | perl -ne 'print "$$1\n" if m,.*=([0-9a-f]+)</guid>,')"; \
	  echo "*/"; \
	  cat ${JQUERY_FILE}; \
	  cat ${JQUERY_JSON_FILE}; \
	  echo 'mkws_jQuery = jQuery.noConflict(true);'; \
	  cat ${HANDLEBARS_FILE}; \
	  cat ${PP2_FILE}; \
	  cat  mkws.js; \
	) > mkws-complete.js.tmp
	mv -f mkws-complete.js.tmp mkws-complete.js

%.min.js: %.js
	yui-compressor $? > $@.tmp
	mv -f $@.tmp $@

mkws-syntax-check:
	yui-compressor mkws.js >/dev/null

${HANDLEBARS_FILE}:
	curl -sSf ${HANDLEBARS_URL} -o $@.tmp
	mv -f $@.tmp $@

${JQUERY_FILE}:
	curl -sSf ${JQUERY_URL} -o $@.tmp
	perl -npe 's,sourceMappingURL=jquery.*map,,' $@.tmp > $@
	rm -f $@.tmp

${JQUERY_JSON_FILE}:
	curl -sSf ${JQUERY_JSON_URL} -o $@.tmp
	mv -f $@.tmp $@

${PP2_FILE}:
	curl -sSf "${PP2_URL}" -o $@.tmp
	mv -f $@.tmp $@

release: mkws.js mkws-complete.js mkws.min.js mkws-complete.min.js
	@if [ -f ${SRC}/releases/mkws-$(VERSION).js ]; then \
		echo "*** There is already a release $(VERSION)"; \
	else \
		cp -p mkws.js ${SRC}/releases/mkws-$(VERSION).js; \
		cp -p mkws.min.js ${SRC}/releases/mkws-$(VERSION).min.js; \
		cp -p mkws-complete.js ${SRC}/releases/mkws-complete-$(VERSION).js; \
		cp -p mkws-complete.min.js ${SRC}/releases/mkws-complete-$(VERSION).min.js; \
		echo "Made release $(VERSION)"; \
	fi

mkws.js: mkws-templates.js $(COMPONENTS) Makefile
	rm -f $@
	cat ${COMPONENTS} > $@.tmp
	mv -f $@.tmp $@
	chmod 444 $@

mkws-templates.js:
	${HANDLEBARS} -n mkws.defaultTemplates ${SRC}/*.templates/*.handlebars -f ${SRC}/mkws-templates.js

mkws-html-includes: 
	echo $(COMPONENTS) | perl -npe "s,${SRC},,g; s/\s+/\0/g" | \
	  perl -n0e 'chomp(); print qq{    <script type="text/javascript" src="src$$_"></script>\n}'

distclean: clean
	@echo "(No need for distclean, 'make clean' is fine)"

clean:
	rm -f ${GENERATED}

help:
	@echo "make [ all | release | clean | distclean ]"
	@echo "     [ mkws-syntax-check ]"

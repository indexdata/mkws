HANDLEBARS_FILE = handlebars-v1.1.2.js
JQUERY_FILE = jquery-1.10.0.min.js
JQUERY_JSON_FILE = jquery.json-2.4.js

HANDLEBARS_URL = http://builds.handlebarsjs.com.s3.amazonaws.com/${HANDLEBARS_FILE}
JQUERY_URL = http://code.jquery.com/${JQUERY_FILE}
JQUERY_JSON_URL= https://jquery-json.googlecode.com/files/${JQUERY_JSON_FILE}

JQUERY_UI_URL=	http://code.jquery.com/ui/1.10.3/jquery-ui.js
PP2_URL= 	http://git.indexdata.com/?p=pazpar2.git;a=blob_plain;f=js/pz2.js;hb=HEAD
VERSION = $(shell tr -d '\012' < VERSION)

COMPONENTS = mkws-handlebars.js \
	mkws-core.js mkws-team.js mkws-widgets.js \
	mkws-widget-termlists.js \
	mkws-widget-authname.js mkws-widget-log.js mkws-widget-record.js

PP2_FILE = pz2.js

INSTALLABLE = ${HANDLEBARS_FILE} \
	${JQUERY_FILE} ${JQUERY_JSON_FILE} \
	pz2.js mkws.js mkws-jquery.js mkws-complete.js \
	mkws.min.js mkws-complete.min.js VERSION NEWS
INSTALLED = $(INSTALLABLE:%=../tools/htdocs/%)

**make-default**: ../tools/htdocs/mkws.js

install: $(INSTALLED)

uninstall:
	rm -f $(INSTALLED)

../tools/htdocs/%: %
	rm -f $@ && cp -p $? $@ && chmod 444 $@

all: mkws.min.js mkws-complete.min.js

mkws-js mkws-complete.js: Makefile mkws.js mkws-jquery.js ${JQUERY_FILE} ${JQUERY_JSON_FILE} ${HANDLEBARS_FILE} ${PP2_FILE}
	( set -e; \
	  echo "/*! Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com"; \
	  echo "   Licence: GPL, http://www.indexdata.com/licences/gpl"; \
	  echo "   created at: $$(date)"; \
	  echo "   mkws.js GIT id: $$(git log mkws.js | head -n 1 | perl -npe 's,\S+\s+,,')"; \
	  echo "   pz2.js GIT id: $$(curl -sSf 'http://git.indexdata.com/?p=pazpar2.git;a=rss' | egrep '<guid' | head -1 | perl -ne 'print "$$1\n" if m,.*=([0-9a-f]+)</guid>,')"; \
	  echo "*/"; \
	  cat ${JQUERY_FILE}; \
	  cat ${JQUERY_JSON_FILE}; \
	  cat ${HANDLEBARS_FILE}; \
	  cat ${PP2_FILE}; \
	  cat  mkws.js; \
	  cat  mkws-jquery.js; \
	) > mkws-complete.js.new
	mv -f mkws-complete.js.new mkws-complete.js

%.min.js: %.js
	yui-compressor $? > $@.new
	mv -f $@.new $@

mkws-syntax-check:
	yui-compressor mkws.js >/dev/null

${JQUERY_FILE}:
	curl -sSf ${JQUERY_URL} -o $@.new
	perl -npe 's,sourceMappingURL=jquery.*map,,' $@.new > $@
	rm -f $@.new

${JQUERY_JSON_FILE}:
	curl -sSf ${JQUERY_JSON_URL} -o $@.tmp
	mv -f $@.tmp $@

${HANDLEBARS_FILE}:
	curl -sSf ${HANDLEBARS_URL} -o $@.tmp
	mv -f $@.tmp $@

${PP2_FILE}:
	curl -sSf "${PP2_URL}" -o $@.tmp
	mv -f $@.tmp $@

release: mkws.js mkws-complete.js mkws.min.js mkws-complete.min.js
	@if [ -f releases/mkws-$(VERSION).js ]; then \
		echo "*** There is already a release $(VERSION)"; \
	else \
		cp -p mkws.js releases/mkws-$(VERSION).js; \
		cp -p mkws.min.js releases/mkws-$(VERSION).min.js; \
		cp -p mkws-complete.js releases/mkws-complete-$(VERSION).js; \
		cp -p mkws-complete.min.js releases/mkws-complete-$(VERSION).min.js; \
		echo "Made release $(VERSION)"; \
	fi

mkws.js: $(COMPONENTS) Makefile
	rm -f $@
	cat $(COMPONENTS) > $@
	chmod 444 $@

distclean: clean
	rm -f *.orig *.bak *.rej

clean:
	rm -f ${JQUERY_FILE} ${JQUERY_JSON_FILE} ${HANDLEBARS_FILE} ${PP2_FILE} ${PP2_FILE}
	rm -f mkws.js mkws.min.js mkws-complete.js mkws-complete.min.js

help:
	@echo "make [ help | clean | mkws-js ]"
	@echo "make JQUERY_URL=http://code.jquery.com/jquery-2.0.3.min.js clean mkws-js"

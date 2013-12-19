######################################################################
# Copyright (c) 2013 IndexData ApS. http://indexdata.com
#

##############################
# select a jquery version
#
#JQUERY_URL=	http://code.jquery.com/jquery-2.0.3.min.js
JQUERY_URL=	http://code.jquery.com/jquery-1.10.0.min.js
#JQUERY_URL=	http://code.jquery.com/jquery-1.9.1.min.js
#JQUERY_URL=	http://code.jquery.com/jquery-1.8.3.min.js
#JQUERY_URL=	http://code.jquery.com/jquery-1.7.2.min.js
#JQUERY_URL=	http://code.jquery.com/jquery-1.6.4.min.js
#JQUERY_URL=	http://code.jquery.com/jquery-1.4.4.min.js

JQUERY_UI_URL=	http://code.jquery.com/ui/1.10.3/jquery-ui.js
#JQUERY_UI_URL=	http://code.jquery.com/ui/1.8.0/jquery-ui.min.js
JQUERY_JSON_URL= https://jquery-json.googlecode.com/files/jquery.json-2.4.js
HANDLEBARS_URL=	http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v1.1.2.js -o $@
VERSION = $(shell tr -d '\012' < VERSION)

MKWS_JS=	mkws-complete.js
MKWS_JS_MIN=	mkws-complete.min.js
JSMIN=		yui-compressor
PZ2API_JS=	../../../pazpar2/js/pz2.js
PZ2API_GIT=	ssh://git.indexdata.com:222/home/git/pub/pazpar2

JQUERY_FILE := $(shell basename ${JQUERY_URL})
JQUERY_JSON_FILE := $(shell basename ${JQUERY_JSON_URL})
HANDLEBARS_FILE := $(shell basename ${HANDLEBARS_URL})
##############################

DOCS = README.html README.odt README.pdf \
       whitepaper.html whitepaper.odt whitepaper.pdf

**default**: ${MKWS_JS} README.html whitepaper.html

all: ${MKWS_JS} $(DOCS)

docs: $(DOCS)

pz2api-git-checkout:
	@if ! test -e ${PZ2API_JS}; then \
	    ( cd ../../.. && git clone ${PZ2API_GIT} ); \
	fi

mkws-js ${MKWS_JS}: Makefile mkws.js ${JQUERY_JSON_FILE} ${JQUERY_FILE} ${HANDLEBARS_FILE}
	@if ! test -e ${PZ2API_JS}; then \
	    echo "The pazpar2 JS file ${PZ2API_JS} does not exists."; \
	    echo "Did you checked out the source from the git repo?"; \
	    echo ""; \
	    echo "Please run:"; \
	    echo "$$ make pz2api-git-checkout"; \
	    echo ""; \
	    exit 1; \
	fi
	( echo "/* Copyright (c) 2013 IndexData ApS. http://indexdata.com"; \
	  echo "   created at: $$(date)"; \
	  echo "   mkws.js GIT id: $$(git log mkws.js | head -n 1 | perl -npe 's,\S+\s+,,')"; \
	  echo "   $$(basename ${PZ2API_JS}) GIT id: $$(cd $$(dirname ${PZ2API_JS}) && git log $$(basename ${PZ2API_JS}) | head -n 1 | perl -npe 's,\S+\s+,,')"; \
	  echo "*/"; \
	  cat ${JQUERY_FILE}; \
	  cat ${JQUERY_JSON_FILE}; \
	  cat ${HANDLEBARS_FILE}; \
	  cat ${PZ2API_JS}; \
	  cat  mkws.js; \
	) > ${MKWS_JS}.new
	mv -f ${MKWS_JS}.new ${MKWS_JS}

mkws-js-min ${MKWS_JS_MIN}: ${MKWS_JS}
	${JSMIN} ${MKWS_JS} > ${MKWS_JS_MIN}.new
	mv -f ${MKWS_JS_MIN}.new ${MKWS_JS_MIN}

${JQUERY_JSON_FILE}:
	curl -sSf ${JQUERY_JSON_URL} -o $@

${JQUERY_FILE}:
	curl -sSf ${JQUERY_URL} -o $@.new
	perl -npe 's,sourceMappingURL=jquery.*map,,' $@.new > $@
	rm -f $@.new

${HANDLEBARS_FILE}:
	curl -sSf ${HANDLEBARS_URL} -o $@

release: mkws.js mkws-complete.js mkws-complete.min.js
	@if [ -f releases/mkws-$(VERSION).js ]; then \
		echo "*** There is already a release $(VERSION)"; \
	else \
		cp -p mkws.js releases/mkws-$(VERSION).js; \
		cp -p mkws-complete.js releases/mkws-complete-$(VERSION).js; \
		cp -p mkws-complete.min.js releases/mkws-complete-$(VERSION).min.js; \
		echo "Made release $(VERSION)"; \
	fi

# For a description of pandoc's markdown format, see:
# http://johnmacfarlane.net/pandoc/demo/example9/pandocs-markdown.html -->

# for older pandoc (<1.9) run first:
# perl -i.bak -npe 's/"(Authors|Subjects)": "(.*?)"/"$1": "test"/' tools/htdocs/whitepaper.markdown
#
%.html: %.markdown
	rm -f $@
	pandoc --standalone --toc -c mkws-doc.css $< | sed '/^<col width="[0-9]*%" \/>$//d' > $@
	chmod ugo-w $@

%.odt: %.markdown
	rm -f $@
	pandoc --standalone $< -o $@
	chmod ugo-w $@

# ### In order to compile the whitepaper, which has tables, to PDF,
# you will need to install the Debian package
#	texlive-latex-recommended
%.pdf: %.markdown
	rm -f $@
	pandoc --standalone $< -o $@
	chmod ugo-w $@

##############################
# helper targets
#
distclean: clean
	rm -f *.orig *.bak *.rej

clean:
	rm -f ${MKWS_JS} ${MKWS_JS_MIN}
	rm -f ${JQUERY_JSON_FILE} ${JQUERY_FILE} ${HANDLEBARS_FILE}
	rm -f $(DOCS)

help:
	@echo "make [ help | docs | clean ]"
	@echo "     [ mkws-js | mkws-js-min ]"
	@echo ""
	@echo "make JQUERY_URL=http://code.jquery.com/jquery-2.0.3.min.js clean mkws-js"
	@echo ""
	@echo "Please check ./README file too!"

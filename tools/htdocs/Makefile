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

MKWS_JS=	mkws-complete.js
PZ2API_JS=	../../../libjs-pz2/pz2api.1.js
PZ2API_GIT=	ssh://git.indexdata.com:222/home/git/pub/libjs-pz2

DOCS = README.html README.odt README.pdf \
       whitepaper.html whitepaper.odt whitepaper.pdf

**default**: ${MKWS_JS} README.html whitepaper.html

all: ${MKWS_JS} $(DOCS)

docs: $(DOCS)

pz2api-git-checkout: 
	@if ! test -e ${PZ2API_JS}; then \
	    ( cd $$(dirname $$(dirname ${PZ2API_JS})); git clone ${PZ2API_GIT} ); \
	fi

mkws-js ${MKWS_JS}: ${PZ2API_JS} mkws.js
	@if ! test -e ${PZ2API_JS}; then \
	    echo "The pazpar2 JS file ${PZ2API_JS} does not exists."; \
	    echo "Did you checked out the source from the git repo?"; \
	    echo "Please run: make pz2api-git-checkout"; \
	    exit 1; \
	fi
	( echo "/* created at: $$(date)"; \
	  echo "   mkws.js GIT id: $$(git log mkws.js | head -n 1 | perl -npe 's,\S+\s+,,') */"; \
	  curl -sSf ${JQUERY_URL} | perl -npe 's,sourceMappingURL=jquery.*map,,'; \
	  cat ../../../libjs-pz2/pz2api.1.js mkws.js ) > ${MKWS_JS}.new 
	mv -f ${MKWS_JS}.new ${MKWS_JS}

distclean: clean
clean:
	rm -f ${MKWS_JS} $(DOCS)

help:
	@echo "make [ help | mkws-js | docs | clean ]"
	@echo ""
	@echo "make JQUERY_URL=http://code.jquery.com/jquery-2.0.3.min.js clean mkws-js"
	@echo ""
	@echo "Please check ./README file too!"


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


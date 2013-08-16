######################################################################
# Copyright (c) 2013 IndexData ApS. http://indexdata.com
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
DOCS = README.html README.odt README.pdf \
       whitepaper.html whitepaper.odt whitepaper.pdf
**default**: ${MKWS_JS} README.html whitepaper.html
all: ${MKWS_JS} $(DOCS)

docs: $(DOCS)

mkws-js ${MKWS_JS}: ../../../libjs-pz2/pz2api.1.js mkws.js
	( echo "/* created at: $$(date)"; \
	  echo "   mkws.js GIT id: $$(git log mkws.js | head -n 1 | perl -npe 's,\S+\s+,,') */"; \
	  curl -sSf ${JQUERY_URL}; \
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

%.html: %.markdown
	rm -f $@
	pandoc --standalone -c mkws-doc.css $< -o $@
	chmod ugo-w $@

%.odt: %.markdown
	rm -f $@
	pandoc --standalone $< -o $@
	chmod ugo-w $@

%.pdf: %.markdown
	rm -f $@
	pandoc --standalone $< -o $@
	chmod ugo-w $@


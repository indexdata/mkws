######################################################################
# Copyright (c) 2013 IndexData ApS. http://indexdata.com
#

MKWS_JS=	mkws-complete.js
all: ${MKWS_JS} README.html

mkws-js ${MKWS_JS}: ../../../libjs-pz2/pz2api.1.js mkws.js
	( echo "/* created at: $$(date)"; \
 	  echo "   mkws.js GIT id: $$(git log mkws.js | head -n 1 | perl -npe 's,\S+\s+,,') */"; \
	  curl -sSf http://code.jquery.com/jquery-1.10.0.min.js; \
	  cat ../../../libjs-pz2/pz2api.1.js mkws.js ) > ${MKWS_JS}.new 
	mv -f ${MKWS_JS}.new ${MKWS_JS}

distclean: clean
clean:
	rm -f ${MKWS_JS} README.html

help:
	@echo "make [ help | mkws-js | clean ]"
	@echo ""
	@echo "Please check ./README file too!"


# For a description of pandoc's markdown format, see:
# http://johnmacfarlane.net/pandoc/demo/example9/pandocs-markdown.html -->

README.html: README.markdown
	rm -f $@
	pandoc --standalone $< > $@
	chmod ugo-w $@


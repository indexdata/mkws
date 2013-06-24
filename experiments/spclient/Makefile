######################################################################
# Copyright (c) 2013 IndexData ApS. http://indexdata.com
#

MKWS_JS=	mkws.2.js
all: ${MKWS_JS}

mkws-js ${MKWS_JS}: mkws.js
	( curl -sSf http://code.jquery.com/jquery-1.10.0.min.js; \
	  cat ../../../libjs-pz2/pz2api.1.js mkws.js ) > ${MKWS_JS}.new 
	mv -f ${MKWS_JS}.new ${MKWS_JS}

distclean: clean
clean:
	rm -f ${MKWS_JS}

help:
	@echo "make [ help | mkws-js | clean ]"
	@echo ""
	@echo "Please check ./README file too!"


######################################################################
# Copyright (c) 2013 IndexData ApS. http://indexdata.com
#

ALL=	mkws.js mkwsStyle.css
all: $(ALL)

distclean: clean
clean:
	rm -f ${ALL} libjs-pz2

$(ALL): libjs-pz2
	ln -sf ../../tools/htdocs/$@ .

libjs-pz2:
	ln -fs ../../../$@ .

help:
	@echo "make [ help | links | clean ]"
	@echo ""


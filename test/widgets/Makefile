# Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com

PHANTOMJS_TIMEOUT=18
PHANTOMJS=	../node_modules/phantomjs/bin/phantomjs
IMAGES=		./images
SCREENSHOT_WIDTH_HEIGHT=	1000 1200
PERL_SCRIPTS=	../bin/bomb.pl
PROG=	../phantom/screenshot.js
MD5=	$(shell which md5 md5sum)
TIMEOUT=5

PHANTOMJS_URL=	http://cph.koha.indexdata.com/cgi-bin/koha/opac-search.pl?q=sushi
PHANTOMJS_URL=	http://www.indexdata.com/

all: help

clean:
	rm -f mkws-error.png mkws-error.html 
	rm -f ${IMAGES}/*.png
	rm -f ${IMAGES}/index.html

distclean: clean

test: check

screenshot:
	file=$$(echo "${PHANTOMJS_URL}" | perl -npe 's,(\W),-,g'); \
	${PHANTOMJS} ${PROG} ${PHANTOMJS_URL} ${IMAGES}/$$file.png ${SCREENSHOT_WIDTH_HEIGHT} ${TIMEOUT}

screenshots:
	for i in $$(cat url.txt); do \
	  make PHANTOMJS_URL="$$i" TIMEOUT=4 screenshot; \
	done; wait
	make index

index:
	cd ${IMAGES}; ls *.png | perl -ne 'chomp; print qq{<h2>$$_</h2><img src="$$_"/><br/><br/><p/>\n}' > index.html

help:
	@echo "make [ all | clean | distclean ]"
	@echo "     [ screenshots ]"
	@echo "     [ screenshot | index ]"
	@echo ""


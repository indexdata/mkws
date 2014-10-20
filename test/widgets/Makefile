# Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com

PHANTOMJS_TIMEOUT=18
PHANTOMJS=	../node_modules/phantomjs/bin/phantomjs
IMAGES=		./images
SCREENSHOT_WIDTH_HEIGHT=	1000 1200
PERL_SCRIPTS=	../bin/bomb.pl
PROG=	../phantom/screenshot.js
MD5=	$(shell which md5 md5sum)
TESTS=	koha demos mike # koha.url
TIMEOUT=4
PREFIX=	test

PHANTOMJS_URL=	http://cph.koha.indexdata.com/cgi-bin/koha/opac-search.pl?q=sushi
PHANTOMJS_URL=	http://www.indexdata.com/

all: help

clean:
	rm -f index-*.html
	rm -f ${IMAGES}/*.png

distclean: clean
	rm -f ${IMAGES}/*.png.tmp

test: check

screenshot:
	file=${PREFIX}.$$(echo "${PHANTOMJS_URL}" | perl -npe 's,(\W),-,g; s/-$$//;'); \
	  ${PHANTOMJS} ${PROG} ${PHANTOMJS_URL} ${IMAGES}/tmp.$$file.png ${SCREENSHOT_WIDTH_HEIGHT} ${TIMEOUT}; \
	  mv -f  ${IMAGES}/tmp.$$file.png  ${IMAGES}/$$file.png

screenshots: clean estimate-time
	for t in ${TESTS}; do \
	    for i in $$(cat url.$$t); do \
	    	${MAKE} PHANTOMJS_URL="$$i" TIMEOUT=4 PREFIX=$$t screenshot; \
	    done; \
	    ${MAKE} PREFIX=$$t index; \
	done

estimate-time:
	@wc -l url.* | tail -n1 | awk '{print "Estimeate run time: " $$1 * (1 + '${TIMEOUT}'), "seconds" }'
	@echo ""

index:
	( cd ${IMAGES}; ls -tr ${PREFIX}.*.png | perl -ne 'chomp; print qq{<h2>$$_</h2><img src="'${IMAGES}/'$$_"/><br/><br/><p/>\n}' ) > index-${PREFIX}.html

help:
	@echo "make [ all | clean | distclean ]"
	@echo "     [ screenshots ]"
	@echo "     [ screenshot | index ]"
	@echo ""
	@echo "Examples: "
	@echo ""
	@echo "make TESTS=mike screenshots"


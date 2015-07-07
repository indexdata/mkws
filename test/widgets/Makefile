# Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com

PHANTOMJS_TIMEOUT=30
PHANTOMJS=	../bin/bomb --timeout=${PHANTOMJS_TIMEOUT} ../node_modules/phantomjs/bin/phantomjs
IMAGES=		./images
SCREENSHOT_WIDTH_HEIGHT=	1000 1200
PROG=	../phantom/screenshot.js
MD5=	$(shell which md5 md5sum)
TESTS=	koha demos mike # koha.url
TIMEOUT=4
PREFIX=	test
APACHE_PORT:= $(shell echo $${APACHE_PORT-4040})

PHANTOMJS_URL=	http://cph.koha.indexdata.com/cgi-bin/koha/opac-search.pl?q=sushi
PHANTOMJS_URL=	http://www.indexdata.com/

all: help

clean:
	rm -f index-*.html
	rm -f iframe-*.html
	rm -f ${IMAGES}/*.png

distclean: clean
	rm -f ${IMAGES}/*.png.tmp

test: check

screenshot:
	file=${PREFIX}.$$(echo "${PHANTOMJS_URL}" | perl -npe 's,(\W),-,g; s/-$$//;'); \
	  ${PHANTOMJS} ${PROG} "${PHANTOMJS_URL}" ${IMAGES}/tmp.$$file.png ${SCREENSHOT_WIDTH_HEIGHT} ${TIMEOUT}; \
	  mv -f  ${IMAGES}/tmp.$$file.png  ${IMAGES}/$$file.png

screenshots: clean estimate-time iframe
	set -e; \
	for t in ${TESTS}; do \
	    for i in $$(cat url.$$t); do \
	    	${MAKE} PHANTOMJS_URL="$$i" TIMEOUT=4 PREFIX=$$t screenshot & sleep 1; \
	    done; wait; \
	    ${MAKE} PREFIX=$$t index; \
	done
	${MAKE} index-widgets tidy help-url

help-url:
	@echo ""
	@echo "Please check now: "
	@echo "   http://localhost:${APACHE_PORT}/test/widgets/index.html"
	@echo ""
	@echo "You can start the web server with: make apache-start"

estimate-time:
	@wc -l url.* | tail -n1 | awk '{print "Estimeate run time: " $$1 * (1 + '${TIMEOUT}') * 0.5, "seconds" }'
	@echo ""

index:
	( cd ${IMAGES}; ls -tr ${PREFIX}.*.png | perl -ne 'chomp; print qq{<h2>$$_</h2><img src="'${IMAGES}/'$$_"/><br/><br/><p/>\n}' ) > index-${PREFIX}.html

index-widgets:
	ls -t index-*html iframe-*.html | perl -ne 'chomp; print qq{<a href="$$_">$$_</a><br/>\n}' > index.html

iframe: index-iframe-demo
index-iframe-demo:
	( egrep example.indexdata.com url.demos | perl -ne 'chomp; print qq{<h2>$$_</h2><iframe width="900px" height="600px" src="$$_"></iframe>\n}' ) > iframe-demos-example.html
	( egrep -v example.indexdata.com url.demos | perl -ne 'chomp; print qq{<h2>$$_</h2><iframe width="900px" height="600px" src="$$_"></iframe>\n}' ) > iframe-demos-other.html

tidy:
	for i in iframe-demos*.html index*.html; do \
	    tidy -i -m $$i >/dev/null 2>&1; \
	    perl -i -npe 's,(^\s*</head>),<link type="text/css" rel="stylesheet" href="screenshots.css" /> $$1,' $$i; \
	done

help:
	@echo "make [ all | clean | distclean ]"
	@echo "     [ screenshots ]"
	@echo "     [ screenshot | index | iframe | tidy ]"
	@echo ""
	@echo "Examples: "
	@echo ""
	@echo "make TESTS=mike screenshots"


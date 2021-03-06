# Copyright (c) 2013-2016 Index Data ApS. http://indexdata.com

PHANTOMJS_TIMEOUT=30
PHANTOMJS=	../bin/bomb --timeout=${PHANTOMJS_TIMEOUT} ../node_modules/phantomjs/bin/phantomjs
IMAGES=		./images
SCREENSHOT_WIDTH_HEIGHT=	1000 1200
PROG=	../phantom/screenshot.js
MD5=	$(shell which md5 md5sum)
TESTS=	example # koha indexdata 
TIMEOUT=4
PREFIX=	test
APACHE_PORT:= $(shell echo $${APACHE_PORT-4040})
PHANTOMJS_URL=	http://www.indexdata.com/

all: help

clean:
	rm -f index*.html
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
	  if [ -e url.$$t ]; then \
	    for i in $$(cat url.$$t); do \
	    	${MAKE} PHANTOMJS_URL="$$i" TIMEOUT=4 PREFIX=$$t screenshot & sleep 1; \
	    done; wait; \
	    ${MAKE} PREFIX=$$t index; \
	  fi; \
	done
	${MAKE} index-widgets tidy help-url

help-url:
	@echo ""
	@echo "Please check now: "
	@echo "   http://localhost:${APACHE_PORT}/test/widgets/index.html"
	@echo ""
	@echo "You can start the web server with: make apache-start"

estimate-time:
	@wc -l url.* | tail -n1 | awk '{print "Estimate run time: " $$1 * (1 + '${TIMEOUT}') * 0.5, "seconds" }'
	@echo ""

index:
	( cd ${IMAGES}; ls -tr ${PREFIX}.*.png | perl -ne 'chomp; print qq{<h2>$$_</h2><img src="'${IMAGES}/'$$_"/><br/><br/><p/>\n}' ) > index-${PREFIX}.html

index-widgets:
	ls -t index-*html iframe-*.html | perl -ne 'chomp; print qq{<a href="$$_">$$_</a><br/>\n}' > index.html

iframe: index-iframe
index-iframe:
	perl -ne 'chomp; print qq{<h2>$$_</h2><iframe width="900px" height="600px" src="$$_"></iframe>\n}' url.example > iframe-example.html
	if [ -e url.indexdata ]; then \
	  perl -ne 'chomp; print qq{<h2>$$_</h2><iframe width="900px" height="600px" src="$$_"></iframe>\n}' \
	 	url.indexdata > iframe-indexdata.html; \
	fi

tidy:
	for i in iframe-*.html index*.html; do \
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
	@echo "make TESTS=koha screenshots"


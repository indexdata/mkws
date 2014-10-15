# Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com

# For running on Mike's local install of node.js
MIKE = PATH=$$PATH:/usr/local/lib/node-v0.10.24-linux-x64/bin

APACHE_PORT:= $(shell echo $${APACHE_PORT-4040})

#PHANTOMJS_URL=https://mkws-dev.indexdata.com/jasmine-popup.html	
PHANTOMJS_PATH=jasmine-local-popup.html
PHANTOMJS_URL=http://localhost:${APACHE_PORT}/${PHANTOMJS_PATH}
PHANTOMJS_TIMEOUT=18

NPM_INSTALL_FLAGS=-q
JASMINE_NODE=	./node_modules/jasmine-node/bin/jasmine-node
PHANTOMJS=	./node_modules/phantomjs/bin/phantomjs
IMAGES=	./images
SCREENSHOT_WIDTH=	360 480 640 768 1024 1200 1440 2048
PERL_SCRIPTS=	bin/bomb.pl
TMP_DIR=	./logs
APACHE_HTTPD:=	$(shell env PATH=$$PATH:/usr/sbin which apache2 httpd false | head -1 )
APACHE_PORT ?= 4040

all: check

clean:
	rm -f mkws-error.png mkws-error.html 
	rm -f images/*.png

distclean: clean clean-tmp clean-error
	rm -rf node_modules
	rm -f ${TMP_DIR}/jasmine-dev*.conf
	rm -f libexec
	make -C./widgets $@

clean-error:
	rm -f mkws-error.png.* mkws-error.html.*

clean-tmp:
	rm -rf ${TMP_DIR}
	mkdir -p ${TMP_DIR}
	touch ${TMP_DIR}/.gitkeep

mkws-complete-syntax-check:
	${MAKE} -C../tools/htdocs mkws-complete.min.js

check: mkws-complete-syntax-check
	@if [ ! -e node_modules ]; then echo "please run first: make node-modules"; exit 1; fi 
	${JASMINE_NODE} --noColor --captureExceptions --forceexit ./spec

test: check

terse:
	$(MIKE) jasmine-node --noColor --captureExceptions --forceexit spec

phantomjs p: apache-stop apache-start _phantomjs 
	${MAKE} apache-stop

_phantomjs:
	perl ./bin/bomb.pl --timeout="${PHANTOMJS_TIMEOUT}.5" ${PHANTOMJS} phantom/run-jasmine.js ${PHANTOMJS_URL} ${PHANTOMJS_TIMEOUT}

phantomjs-all p-all:
	${MAKE} phantomjs PHANTOMJS_PATH=jasmine-local-popup.html
	${MAKE} phantomjs PHANTOMJS_PATH=jasmine-popup.html
	${MAKE} phantomjs PHANTOMJS_PATH=jasmine-cors-popup.html
	${MAKE} phantomjs PHANTOMJS_PATH=jasmine.html

mike-test:
	$(MAKE) _phantomjs PHANTOMJS_URL=http://x.example.indexdata.com/jasmine-popup.html

screenshot:
	${PHANTOMJS} phantom/screenshot.js ${PHANTOMJS_URL} ${IMAGES}/screenshot.png 1200 1000

screenshot-mkws:
	for i in ${SCREENSHOT_WIDTH}; do \
	    ${PHANTOMJS} phantom/screenshot.js http://mkws.indexdata.com ${IMAGES}/mkws-$$i.png $$i 1000 &  \
	done; wait
	ls -l ${IMAGES}

screenshot-indexdata:
	for i in ${SCREENSHOT_WIDTH}; do \
	    ${PHANTOMJS} phantom/screenshot.js http://www.indexdata.com ${IMAGES}/indexdata-$$i.png $$i 1000 &  \
	done; wait
	ls -l ${IMAGES}

screenshots:
	make -C ./widgets $@

jsbeautifier jsb indent:
	for i in package.json ./spec*/*.js ./js/*.js ./phantom/*.js; do \
	  jsbeautifier -j $$i > $@.tmp && mv -f $@.tmp $$i; \
	done

perltidy:
	@ls ${PERL_SCRIPTS} | xargs -n1 -P16 perl -c 2>/dev/null
	@ls ${PERL_SCRIPTS} | xargs -n2 -P8 perltidy -b


node_modules node-modules:
	npm install ${NPM_INSTALL_FLAGS}

apache-start:
	bin/apache-template-update
	${APACHE_HTTPD} -f `pwd`/${TMP_DIR}/jasmine-dev-${APACHE_PORT}.conf

APACHE_PID_FILE=${TMP_DIR}/mkws-jasmine-${APACHE_PORT}.pid 
apache-stop:
	@-if [ -e ${APACHE_PID_FILE} ]; then \
	   kill `cat ${APACHE_PID_FILE}`; \
	else \
	   killall apache2 2> /dev/null; \
	fi
	@sleep 0.6
	rm -f ${APACHE_PID_FILE}

help:
	@echo "make [ all | check | clean | distclean ]"
	@echo "     [ phantomjs | phantomjs-all ]"
	@echo "     [ jsbeautifier | perltidy | screenshot ]"
	@echo "     [ screenshots ]"
	@echo "     [ node-modules ]"
	@echo "     [ apache-stop apache-start ]"
	@echo ""
	@echo "Examples: "
	@echo ""
	@echo "make phantomjs PHANTOMJS_PATH=${PHANTOMJS_PATH}"
	@echo "DEBUG=0 APACHE_PORT=5050 make -s phantomjs PHANTOMJS_TIMEOUT=12 PHANTOMJS_PATH=${PHANTOMJS_PATH}"
	@echo "DEBUG=2 make phantomjs PHANTOMJS_TIMEOUT=12 PHANTOMJS_URL=${PHANTOMJS_URL}"
	@echo ""
	@echo "make phantomjs-all"
	@echo ""


# Copyright (c) 2013-2017 Index Data ApS. http://indexdata.com

# For running on Mike's local install of node.js
MIKE = PATH=$$PATH:/usr/local/lib/node-v0.10.24-linux-x64/bin

APACHE_PORT:= $(shell echo $${APACHE_PORT-4040})

#PHANTOMJS_URL=https://mkws-dev.indexdata.com/jasmine-popup.html
#PHANTOMJS_PATH=jasmine-local-popup.html
PHANTOMJS_PATH=jasmine-popup.html
PHANTOMJS_URL=http://localhost:${APACHE_PORT}/${PHANTOMJS_PATH}
PHANTOMJS_TIMEOUT ?= 30
PHANTOMJS_FLAGS ?=

NPM_INSTALL_FLAGS=
JASMINE_NODE=	./node_modules/jasmine-node/bin/jasmine-node

#PHANTOMJS=	/usr/local/bin/phantomjs
PHANTOMJS=	./node_modules/.bin/phantomjs

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
	${MAKE} -C./widgets $@

distclean: apache-stop clean clean-tmp clean-error
	rm -rf node_modules
	rm -f libexec

clean-error:
	rm -f mkws-error.png.* mkws-error.html.*

clean-tmp:
	rm -rf ${TMP_DIR}
	mkdir -p ${TMP_DIR}
	touch ${TMP_DIR}/.gitkeep

mkws-complete-syntax-check:
	${MAKE} -C../src ../tools/htdocs/mkws-complete.min.js

check check-js: node-modules mkws-complete-syntax-check
	${JASMINE_NODE} --noColor --captureExceptions --forceexit ./spec

check-dev: node-modules mkws-complete-syntax-check
	${JASMINE_NODE} --noColor --captureExceptions --forceexit ./spec-dev

check-node-installation:
	@if [ ! -e node_modules ]; then \
	    echo "==> please run first: make node-modules"; \
	    echo ""; \
	    exit 1; \
	fi

test: check

terse:
	$(MIKE) jasmine-node --noColor --captureExceptions --forceexit spec

phantomjs p: check-js apache-stop apache-start _phantomjs
	${MAKE} apache-stop

_phantomjs:
	./bin/bomb --timeout="${PHANTOMJS_TIMEOUT}.5" -- ${PHANTOMJS} ${PHANTOMJS_FLAGS} phantom/run-jasmine2.js ${PHANTOMJS_URL} ${PHANTOMJS_TIMEOUT}

phantomjs-all p-all:
	${MAKE} phantomjs PHANTOMJS_PATH=jasmine-local-popup.html
	${MAKE} phantomjs PHANTOMJS_PATH=jasmine-popup.html?lang=de
	${MAKE} phantomjs PHANTOMJS_PATH=jasmine-cms-popup.html?lang=en
	${MAKE} phantomjs PHANTOMJS_PATH=jasmine.html?lang=da

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

screenshots: check
	${MAKE} -C ./widgets $@

jsbeautifier jsb indent:
	for i in package.json ./spec*/*.js ./phantom/*.js; do \
	  jsbeautifier -j $$i > $@.tmp && mv -f $@.tmp $$i; \
	done

perltidy:
	@ls ${PERL_SCRIPTS} | xargs -n1 -P16 perl -c 2>/dev/null
	@ls ${PERL_SCRIPTS} | xargs -n2 -P8 perltidy -b


node_modules node-modules yarn-install: _node_modules versions
_node_modules:
	yarn install ${NPM_INSTALL_FLAGS}

versions:
	node --version
	yarn --version
	${PHANTOMJS} --version
	${JASMINE_NODE} --version

apache-start:
	bin/apache-template-update
	umask 002; ${APACHE_HTTPD} -f `pwd`/${TMP_DIR}/jasmine-dev-${APACHE_PORT}.conf

APACHE_PID_FILE=${TMP_DIR}/mkws-jasmine-${APACHE_PORT}.pid
apache-stop:
	@-if [ -e ${APACHE_PID_FILE} ]; then \
	   kill `cat ${APACHE_PID_FILE}`; \
	else \
	   killall ${APACHE_HTTPD} 2> /dev/null; \
	fi
	@sleep 0.6
	rm -f ${APACHE_PID_FILE}

help:
	@echo "make [ all | check | check-dev | clean | distclean ]"
	@echo "     [ phantomjs | phantomjs-all ]"
	@echo "     [ jsbeautifier | perltidy | screenshot ]"
	@echo "     [ screenshots ]"
	@echo "     [ yarn-install | versions ]"
	@echo "     [ apache-stop apache-start ]"
	@echo ""
	@echo "Examples: "
	@echo ""
	@echo "make phantomjs PHANTOMJS_PATH=${PHANTOMJS_PATH}"
	@echo "DEBUG=0 APACHE_PORT=5050 make -s phantomjs PHANTOMJS_TIMEOUT=16 PHANTOMJS_PATH=${PHANTOMJS_PATH}"
	@echo "DEBUG=2 make phantomjs PHANTOMJS_TIMEOUT=12 PHANTOMJS_URL=${PHANTOMJS_URL}"
	@echo ""
	@echo "make APACHE_PORT=5050 apache-start"
	@echo "make phantomjs-all"
	@echo ""

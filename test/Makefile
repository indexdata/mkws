# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com

# For running on Mike's local install of node.js
MIKE = PATH=$$PATH:/usr/local/lib/node-v0.10.24-linux-x64/bin

#PHANTOMJS_URL=https://mkws-dev.indexdata.com/jasmine-popup.html	
PHANTOMJS_URL=http://localhost:4040/jasmine-local-popup.html
PHANTOMJS_TIMEOUT=16

NPM_INSTALL_FLAGS=-q
JASMINE_NODE=	./node_modules/jasmine-node/bin/jasmine-node
PHANTOMJS=	./node_modules/phantomjs/bin/phantomjs
IMAGES=	./images
SCREENSHOT_WIDTH=	360 480 640 768 1024 1200 1440 2048
PERL_SCRIPTS=	bin/bomb.pl
TMP_DIR=	./logs
APACHE_HTTPD=	/usr/sbin/apache2

all: check

clean:
	rm -f mkws-error.png mkws-error.html 
	rm -f images/*.png

distclean: clean clean-tmp clean-error
	rm -rf node_modules
	rm -f ${TMP_DIR}/jasmine-dev

clean-error:
	rm -f mkws-error.png.* mkws-error.html.*

clean-tmp:
	rm -rf ${TMP_DIR}
	mkdir -p ${TMP_DIR}
	touch ${TMP_DIR}/.gitignore

mkws-complete-syntax-check:
	${MAKE} -C../src mkws-complete.min.js

check: mkws-complete-syntax-check
	@if [ ! -e node_modules ]; then echo "please run first: make node-modules"; exit 1; fi 
	${JASMINE_NODE} --noColor --captureExceptions --forceexit ./spec

test: check

terse:
	$(MIKE) jasmine-node --noColor --captureExceptions --forceexit spec

phantomjs p: apache-stop apache-start _phantomjs 
	${MAKE} apache-stop

_phantomjs:
	./bin/bomb.pl --timeout="${PHANTOMJS_TIMEOUT}.5" ${PHANTOMJS} phantom/run-jasmine.js ${PHANTOMJS_URL} ${PHANTOMJS_TIMEOUT}

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
	${APACHE_HTTPD} -f `pwd`/${TMP_DIR}/jasmine-dev

apache-stop:
	@-if [ -e ${TMP_DIR}/mkws-jasmine.pid ]; then \
	   kill `cat ${TMP_DIR}/mkws-jasmine.pid`; \
	else \
	   killall apache2 2> /dev/null; \
	fi
	@sleep 0.3
	rm -f ${TMP_DIR}/mkws-jasmine.pid

help:
	@echo "make [ all | check | clean | distclean ]"
	@echo "     [ phantomjs | screenshot ]"
	@echo "     [ jsbeautifier | perltidy ]"
	@echo "     [ node-modules ]"
	@echo "     [ apache-stop apache-start ]"
	@echo ""
	@echo "DEBUG=1 make phantomjs PHANTOMJS_TIMEOUT=8 PHANTOMJS_URL=${PHANTOMJS_URL}"


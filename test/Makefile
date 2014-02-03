# Copyright (c) 2013 IndexData ApS. http://indexdata.com

# For running on Mike's local install of node.js
MIKE = PATH=$$PATH:/usr/local/lib/node-v0.10.24-linux-x64/bin
NPM_INSTALL_FLAGS=-q
PHANTOMJS=	./node_modules/phantomjs/bin/phantomjs
PHANTOMJS_URL=	https://mkws-dev.indexdata.com/jasmine-popup.html	
PHANTOMJS_TIMEOUT=	12	
IMAGES=	./images
SCREENSHOT_WIDTH=	360 480 640 768 1024 1200 1440 2048

all: check

clean:
	rm -f mkws-error.png mkws-error.html images/*.png

distclean: clean
	rm -rf node_modules

mkws-complete-syntax-check:
	${MAKE} -C../tools/htdocs $@

check: mkws-complete-syntax-check
	@if [ ! -e node_modules ]; then echo "please run first: make node-modules"; exit 1; fi 
	jasmine-node --noColor --captureExceptions --forceexit ./spec
	jasmine-node --noColor --captureExceptions --forceexit ./spec-sp

test: check

terse:
	$(MIKE) jasmine-node --noColor --captureExceptions --forceexit spec

phantomjs:
	${PHANTOMJS} phantom/evaluate.js ${PHANTOMJS_URL} ${PHANTOMJS_TIMEOUT}

screenshot:
	${PHANTOMJS} phantom/screenshot.js ${PHANTOMJS_URL} ${IMAGES}/screenshot.png 1200 1000

screenshot-mkws:
	for i in ${SCREENSHOT_WIDTH}; do \
	    ${PHANTOMJS} phantom/screenshot.js http://mkws.indexdata.com ${IMAGES}/mkws-$$i $$i 2800 & \
	done; wait
screenshot-indexdata:
	for i in ${SCREENSHOT_WIDTH}; do \
	    ${PHANTOMJS} phantom/screenshot.js http://www.indexdata.com ${IMAGES}/indexdata-$$i $$i 1200 & \
	done; wait

jsbeautifier jsb indent:
	for i in ./spec*/*.js ./js/*.js ./phantom/*.js; do \
	  jsbeautifier -j $$i > $@.tmp && mv -f $@.tmp $$i; \
	done

node-modules: node_modules
node_modules:
	npm install ${NPM_INSTALL_FLAGS} jQuery xmlhttprequest jsdom request jasmine-node phantomjs

help:
	@echo "make [ all | check | clean | distclean ]"
	@echo "     [ phantomjs | screenshot ]"
	@echo "     [ jsbeautifier | node-modules ]"

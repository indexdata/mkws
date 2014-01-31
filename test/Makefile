# Copyright (c) 2013 IndexData ApS. http://indexdata.com

# For running on Mike's local install of node.js
MIKE = PATH=$$PATH:/usr/local/lib/node-v0.10.24-linux-x64/bin
NPM_INSTALL_FLAGS=-q
PHANTOMJS=	./node_modules/phantomjs/bin/phantomjs
PHANTOMJS_URL=	https://mkws-dev.indexdata.com/jasmine-popup.html	
PHANTOMJS_TIMEOUT=	8

all: check

clean:
	rm -f mkws-error.png

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

jsbeautifier jsb indent:
	for i in ./spec*/*.js ./js/*.js; do \
	  jsbeautifier -j $$i > $@.tmp && mv -f $@.tmp $$i; \
	done

node-modules: node_modules
node_modules:
	npm install ${NPM_INSTALL_FLAGS} jQuery xmlhttprequest jsdom request jasmine-node phantomjs

help:
	@echo "make [ all | check | phantomjs | clean | distclean ]"
	@echo "     [ jsbeautifier | node-modules ]"

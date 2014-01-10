# Copyright (c) 2013 IndexData ApS. http://indexdata.com

# For running on Mike's local install of node.js
MIKE = PATH=$$PATH:/usr/local/lib/node-v0.10.24-linux-x64/bin
NPM_INSTALL_FLAGS=-q

all: check

clean:

distclean:
	rm -rf node_modules

mkws-complete-syntax-check:
	${MAKE} -C../tools/htdocs $@

check: mkws-complete-syntax-check
	for i in ./spec/*.js; do \
	  echo "$$i"; \
	  jasmine-node --noColor --captureExceptions --forceexit $$i; \
	done

test: check

terse:
	$(MIKE) jasmine-node --noColor --captureExceptions --forceexit spec

jsbeautifier jsb indent:
	for i in ./spec/*.js ./js/*.js; do \
	  jsbeautifier -j $$i > $@.tmp && mv -f $@.tmp $$i; \
	done

node-modules: node_modules
node_modules:
	npm install ${NPM_INSTALL_FLAGS} jQuery xmlhttprequest jsdom request jasmine-node

help:
	@echo "make [ all | check | clean | distclean ]"
	@echo "     [ jsbeautifier | node-modules ]"

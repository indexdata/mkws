# Copyright (c) 2013 IndexData ApS. http://indexdata.com

all: check

clean:

distclean:
	rm -rf node_modules
	

check:
	for i in ./spec/*.js; do \
	  echo "$$i"; \
	  jasmine-node --captureExceptions --forceexit $$i; \
	done

test: check

jsbeautifier jsb indent:
	for i in ./spec/*.js ./js/*.js; do \
	  jsbeautifier -j $$i > $@.tmp && mv -f $@.tmp $$i; \
	done

node-modules: node_modules
node_modules:
	npm install jquery jsdom request jasmine-node

help:
	@echo "make [ all | check | clean | distclean ]"
	@echo "     [ jsbeautifier | node-modules ]"

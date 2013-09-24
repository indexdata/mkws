# Copyright (c) 2013 IndexData ApS. http://indexdata.com

all: check

clean:

distclean:
	rm -rf node_modules
	

check:
	jasmine-node ./spec 

test: check

jsbeautifier jsb indent:
	for i in ./spec/*.js ./js/*.js; do \
	  jsbeautifier -j $$i > $@.tmp && mv -f $@.tmp $$i; \
	done

node-modules: node_modules
node_modules:
	npm install jquery jsdom request jasmine-node

help:
	@echo "make [ all | clean | check | jsbeautifier | node-modules ]"

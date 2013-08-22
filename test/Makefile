# Copyright (c) 2013 IndexData ApS. http://indexdata.com

all: check

clean distclean:

check:
	jasmine-node ./spec 

test: check

jsbeautifier jsb:
	for i in ./spec/*.js ./js/*.js; do \
	  jsbeautifier -j $$i > $@.tmp && mv -f $@.tmp $$i; \
	done

help:
	@echo "make [ all | clean | check | jsbeautifier ]"

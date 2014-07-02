# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com

all:
	${MAKE} -C./src $@
	${MAKE} -C./doc $@

clean distclean:
	${MAKE} -C./src $@
	${MAKE} -C./doc $@
	${MAKE} -C./examples/htdocs $@
	${MAKE} -C./test $@

check-js:
	${MAKE} -C./test check

phantomjs p:
	${MAKE} -C./test $@

# must be called once after GIT checkout
setup:	
	${MAKE} -C./test node-modules

check: setup check-js
	@echo ""
	@echo "To run jasmine regression tests, type: make phantomjs"

help:
	@echo "make [ all | setup | clean | distclean ]"
	@echo "     [ check | check-js | phantomjs ]"


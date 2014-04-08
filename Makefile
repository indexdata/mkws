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

phantomjs:
	${MAKE} -C./test $@

# must be called once after GIT checkout
setup:	
#why?	${MAKE} -C./tools/htdocs mkws-js-min
	${MAKE} -C./test node-modules

check: setup check-js

help:
	@echo "make [ all | setup | clean | distclean ]"
	@echo "     [ check | check-js | phantomjs ]"


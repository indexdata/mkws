# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com

all:
	${MAKE} -C./tools/htdocs $@
	${MAKE} -C./doc install

clean distclean:
	${MAKE} -C./tools/htdocs $@
	${MAKE} -C./doc $@
	${MAKE} -C./examples/htdocs $@
	${MAKE} -C./test $@

check-js:
	${MAKE} -C./test check

phantomjs p jsb:
	${MAKE} -C./test $@

# must be called once after GIT checkout
setup:	
	${MAKE} -C./test node-modules

check: setup check-js phantomjs

help:
	@echo "make [ all | setup | clean | distclean ]"
	@echo "     [ check | check-js | phantomjs ]"


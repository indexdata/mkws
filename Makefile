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

phantomjs p p-all phantomjs-all jsb:
	${MAKE} -C./test $@

# must be called once after GIT checkout
setup:
	${MAKE} -C./test node-modules
	${MAKE} all

check: setup check-js phantomjs

help:
	@echo "make [ all | setup | clean | distclean ]"
	@echo "     [ check | check-js | phantomjs ]"
	@echo ""
	@echo "If 'make check' timeout is too short, extend with: make check PHANTOMJS_TIMEOUT=40"


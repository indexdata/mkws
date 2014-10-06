# Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com
#
# You need node.js to build MKWS. On caliban, get it using:
# export PATH=$PATH:/home/indexdata/node/node-v0.10.32-linux-x64/bin

all: setup
	${MAKE} -C./test node-modules
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

check: setup check-js phantomjs

help:
	@echo "make [ all | setup | clean | distclean ]"
	@echo "     [ check | check-js | phantomjs ]"
	@echo ""
	@echo "If 'make check' timeout is too short, extend with: make check PHANTOMJS_TIMEOUT=40"


# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com

all:
	${MAKE} -C./tools/htdocs $@

pz2api-git-checkout:
	${MAKE} -C./tools/htdocs $@

clean distclean:
	${MAKE} -C./tools/htdocs $@
	${MAKE} -C./examples/htdocs $@
	${MAKE} -C./test $@

check-js:
	${MAKE} -C./test check

# must be called once after GIT checkout
setup:	pz2api-git-checkout
	${MAKE} -C./tools/htdocs mkws-js-min
	${MAKE} -C./examples/htdocs jasmine-links
	${MAKE} -C./test node-modules

check: setup check-js

help:
	@echo "make [ all | setup | clean | distclean ]"
	@echo "     [ pz2api-git-checkout | check-js ]"


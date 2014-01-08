# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com

all clean distclean:
	${MAKE} -C./tools/htdocs $@
	${MAKE} -C./examples/htdocs $@
	${MAKE} -C./test $@

pz2api-git-checkout distclean:
	${MAKE} -C./tools/htdocs $@

check-js:
	${MAKE} -C./test check

setup:	pz2api-git-checkout
	${MAKE} -C./tools/htdocs mkws-js-min
	${MAKE} -C./examples/htdocs jasmine-links
	${MAKE} -C./test node-modules

check: distclean all

help:
	@echo "make [ all | setup | clean | distclean ]"
	@echo "     [ pz2api-git-checkout | check-js ]"


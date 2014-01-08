# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com

all clean:
	${MAKE} -C./tools/htdocs $@
	${MAKE} -C./examples/htdocs $@

pz2api-git-checkout distclean:
	${MAKE} -C./tools/htdocs $@

check-js:
	${MAKE} -C./test check

setup:	pz2api-git-checkout
	${MAKE} -C./tools/htdocs mkws-js-min
	${MAKE} -C./examples/htdocs jasmine-links

check: distclean all

help:
	@echo "make [ all | setup | clean ]"
	@echo "     [ pz2api-git-checkout | check-js ]"


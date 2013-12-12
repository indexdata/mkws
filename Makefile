# Copyright (c) 2013 IndexData ApS. http://indexdata.com

all clean:
	${MAKE} -C./tools/htdocs $@
	${MAKE} -C./examples/htdocs $@

pz2api-git-checkout distclean:
	${MAKE} -C./tools/htdocs $@

check-js:
	${MAKE} -C./test check

check: distclean all

help:
	@echo "make [ all | clean | pz2api-git-checkout | check-js ]"

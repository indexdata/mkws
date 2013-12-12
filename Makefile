# Copyright (c) 2013 IndexData ApS. http://indexdata.com

**default**:
	${MAKE} -C./tools/htdocs $@

clean distclean all pz2api-git-checkout:
	${MAKE} -C./tools/htdocs $@

check-js:
	${MAKE} -C./test check

check: distclean all

help:
	@echo "make [ all | clean | pz2api-git-checkout | check-js ]"

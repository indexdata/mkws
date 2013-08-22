# Copyright (c) 2013 IndexData ApS. http://indexdata.com

**default**:
	(cd tools/htdocs; $(MAKE))

clean distclean all pz2api-git-checkout:
	${MAKE} -C./tools/htdocs $@

check: distclean all

help:
	@echo "make [ all | clean | pz2api-git-checkout ]"

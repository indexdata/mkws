# Copyright (c) 2013 IndexData ApS. http://indexdata.com

**default**:
	(cd tools/htdocs; $(MAKE))

clean distclean all:
	${MAKE} -C./tools/htdocs $@

check: distclean all

help:
	@echo "make [ all | clean ]"

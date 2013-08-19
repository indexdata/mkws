# Copyright (c) 2013 IndexData ApS. http://indexdata.com

**default**:
	(cd tools/htdocs; $(MAKE))

clean distclean all:
	${MAKE} -C./tools/htdocs $@

help:
	@echo "make [ all | clean ]"

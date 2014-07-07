# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com
#
# this makefile will generate CSS files for Koha MKWS widgets

E_DIR=	../../../../examples/htdocs
COMPONENTS = ${E_DIR}/mkws-widget-reference.css koha-mkws-widget-ru.css

KOHA_CSS = koha-mkws.css 
KOHA_COMPLETE_CSS = koha-mkws-complete.css 

all: ${KOHA_COMPLETE_CSS}

clean:
	rm -f ${KOHA_COMPLETE_CSS}

${KOHA_COMPLETE_CSS}: ${COMPONENTS} ${KOHA_CSS}
	cat ${COMPONENTS} ${KOHA_CSS} > $@.tmp
	mv -f $@.tmp $@

distclean: clean
	rm -f *.orig *.bak *.rej

help:
	@echo "make [ all | clean ]"


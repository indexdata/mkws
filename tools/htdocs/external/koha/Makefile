E_DIR=	../../../../examples/htdocs
COMPONENTS = ${E_DIR}/mkws-widget-reference.css

KOHA_CSS = koha-mkws.css 
KOHA_COMPLETE_CSS = koha-mkws-complete.css 

all: ${KOHA_COMPLETE_CSS}

clean:
	rm -f ${KOHA_COMPLETE_CSS}

${KOHA_COMPLETE_CSS}:
	cat ${COMPONENTS} ${KOHA_CSS} > $@.tmp
	mv -f $@.tmp $@

distclean: clean
	rm -f *.orig *.bak *.rej


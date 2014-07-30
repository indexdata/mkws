# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com

DOCS = README.html README.odt README.pdf \
       mkws-manual.html mkws-manual.odt mkws-manual.pdf \
       library-configuration.html library-configuration.odt library-configuration.pdf

INSTALLABLE = README.html mkws-manual.html library-configuration.html mkws-doc.css
INSTALLED = $(INSTALLABLE:%=../tools/htdocs/%)

install: $(INSTALLED)

uninstall:
	rm -f $(INSTALLED)

../tools/htdocs/%: %
	rm -f $@
	cp -p $? $@
	chmod ugo-w $@

all: $(DOCS)

# For a description of pandoc's markdown format, see:
# http://johnmacfarlane.net/pandoc/demo/example9/pandocs-markdown.html -->

# for older pandoc (<1.9) run first:
# perl -i.bak -npe 's/"(Authors|Subjects)": "(.*?)"/"$1": "test"/' tools/htdocs/mkws-manual.markdown
#
%.html: %.markdown
	rm -f $@
	pandoc --standalone --toc -c mkws-doc.css $< | sed '/^<col width="[0-9]*%" \/>$//d' > $@
	chmod ugo-w $@

%.odt: %.markdown
	rm -f $@
	pandoc --standalone $< -o $@
	chmod ugo-w $@

# ### In order to compile the manual, which has tables, to PDF,
# you will need to install the Debian package
#	texlive-latex-recommended
%.pdf: %.markdown
	rm -f $@
	pandoc --standalone $< -o $@
	chmod ugo-w $@

clean:
	rm -f $(DOCS)

distclean: clean uninstall

help:
	@echo "make [ all | install | clean | distclean ]"


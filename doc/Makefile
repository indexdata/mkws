DOCS = README.html README.odt README.pdf \
       whitepaper.html whitepaper.odt whitepaper.pdf

INSTALLABLE = README.html whitepaper.html
INSTALLED = $(INSTALLABLE:%=../tools/htdocs/%)

install: $(INSTALLED)

uninstall:
	rm -f $(INSTALLED)

../tools/htdocs/%: %
	rm -f $@
	cp -p $? $@
	chmod -w $@

all: $(DOCS)

# For a description of pandoc's markdown format, see:
# http://johnmacfarlane.net/pandoc/demo/example9/pandocs-markdown.html -->

# for older pandoc (<1.9) run first:
# perl -i.bak -npe 's/"(Authors|Subjects)": "(.*?)"/"$1": "test"/' tools/htdocs/whitepaper.markdown
#
%.html: %.markdown
	rm -f $@
	pandoc --standalone --toc -c mkws-doc.css $< | sed '/^<col width="[0-9]*%" \/>$//d' > $@
	chmod ugo-w $@

%.odt: %.markdown
	rm -f $@
	pandoc --standalone $< -o $@
	chmod ugo-w $@

# ### In order to compile the whitepaper, which has tables, to PDF,
# you will need to install the Debian package
#	texlive-latex-recommended
%.pdf: %.markdown
	rm -f $@
	pandoc --standalone $< -o $@
	chmod ugo-w $@

clean:
	rm -f $(DOCS)


# Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com
#
# To build the PDFs, you will need these Debian packages:
#	texlive-latex-recommended texlive-latex-extra texlive-fonts-recommended

# Older versions of pandoc don't do PDF output, but have a companion program
MARKDOWN2PDF = $(shell if which markdown2pdf > /dev/null; then echo markdown2pdf; else echo pandoc --standalone; fi)
HAVE_PDFLATEX = $(shell which pdflatex 2>/dev/null)

DOCS = index.html \
       mkws-manual.html \
       mkws-developer.html \
       mkws-doc.css

PDFS = index.pdf \
       mkws-manual.pdf \
       mkws-developer.pdf

#
# skip PDF creation if pdflatex is not installed
# The debian tex package may download up to 650MB
#
ifneq "${HAVE_PDFLATEX}" ""
DOCS+= ${PDFS}
endif

INSTALLED = $(DOCS:%=../tools/htdocs/%)

all: $(INSTALLED)

../tools/htdocs/%: %
	rm -f $@
	cp $< $@
	chmod ugo-w $@

# For a description of pandoc's markdown format, see:
# http://johnmacfarlane.net/pandoc/demo/example9/pandocs-markdown.html

# for older pandoc (<1.9) run first:
# perl -i.bak -npe 's/"(Authors|Subjects)": "(.*?)"/"$1": "test"/' tools/htdocs/mkws-manual.markdown
#
../tools/htdocs/%.html: %.markdown tweak-html
	rm -f $@
	pandoc --standalone --toc -c mkws-doc.css $< | ./tweak-html > $@
	chmod ugo-w $@

../tools/htdocs/%.pdf: %.markdown
	rm -f $@
	$(MARKDOWN2PDF) $< -o $@
	chmod ugo-w $@

clean:
	rm -f $(INSTALLED)
	rm -f *.drupal.html

distclean: clean
	# Nothing more to remove in the doc directory

push:
	pandoc --toc index.markdown > index.drupal.html
	pandoc --toc mkws-manual.markdown > mkws-manual.drupal.html
	cat index.drupal.html | ./drupaljson.pl | curl --upload-file - http://www.indexdata.com/script/node/332?services_token=cda1e26e5733ce3f604773e94f0721df5c31a948 -v --header "Content-Type:application/json"
	cat mkws-manual.drupal.html | ./drupaljson.pl | curl --upload-file - http://www.indexdata.com/script/node/323?services_token=cda1e26e5733ce3f604773e94f0721df5c31a948 -v --header "Content-Type:application/json"

help:
	@echo "make [ all | clean | push ]"

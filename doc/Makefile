# Copyright (c) 2013-2014 Index Data ApS. http://indexdata.com

DOCS = index.html index.odt index.pdf \
       README.html README.odt README.pdf \
       mkws-manual.html mkws-manual.odt mkws-manual.pdf \
       mkws-developer.html mkws-developer.odt mkws-developer.pdf

INSTALLABLE = index.html README.html mkws-manual.html mkws-developer.html mkws-doc.css
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
%.html: %.markdown tweak-html
	rm -f $@
	pandoc --standalone --toc -c mkws-doc.css $< | ./tweak-html > $@
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
	rm -f *.drupal.html

distclean: clean uninstall

push:
	pandoc --toc README.markdown > README.drupal.html
	pandoc --toc mkws-manual.markdown > mkws-manual.drupal.html
	cat README.drupal.html | ./drupaljson.pl | curl --upload-file - http://www.indexdata.com/script/node/332?services_token=cda1e26e5733ce3f604773e94f0721df5c31a948 -v --header "Content-Type:application/json"
	cat mkws-manual.drupal.html | ./drupaljson.pl | curl --upload-file - http://www.indexdata.com/script/node/323?services_token=cda1e26e5733ce3f604773e94f0721df5c31a948 -v --header "Content-Type:application/json"

help:
	@echo "make [ all | install | clean | distclean | push ]"


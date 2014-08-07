# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com

all: apache-config.txt

apache-config.txt: ../apache2/mkws-examples-mike
	rm -f $@
	cp -p $< $@
	chmod ugo-w $@

help:
	@echo "make [ all | clean ]"

clean distclean:
	rm -f apache-config.txt
	rm -rf test jasmine


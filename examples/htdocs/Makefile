# Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com

all: apache-config.txt jasmine-links

apache-config.txt: ../apache2/mkws-examples-mike
	rm -f $@
	cp -p $< $@
	chmod ugo-w $@

jasmine-links:
	ln -fs ../jasmine .
	ln -fs ../../test .

help:
	@echo "make [ all | clean | jasmine-links ]"

clean distclean:
	rm -f apache-config.txt
	rm -rf test jasmine


######################################################################
# Copyright (c) 2013 IndexData ApS. http://indexdata.com
#

ALL= libjs-pz2 mkws.js mkwsStyle.css

all: build

mkwsStyle.css mkws.js:
	ln -fs ../../tools/htdocs/$@ .

libjs-pz2:
	ln -fs ../../../$@ .

build: ${ALL}
	
clean:
	rm -f ${ALL}

help:
	@echo "make [ help | build | clean ]"
	@echo ""
	@echo "Please check ../../README file too!"


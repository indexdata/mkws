Jasmine / jasmine-node test frame works
---------------------------------------

This directory contains the MasterKey Widget Set (MKWS) Test framework.

To install (some) prerequisites, run:

$ sudo apt-get install npm
$ sudo npm install -g

To run the tests, run:

$ make check
jasmine-node ./spec
.......................................

Finished in 2.024 seconds
39 tests, 194 assertions, 0 failures, 0 skipped


$ make phantomjs
[ headless jasmine test with console.log() messages

$ DEBUG=1 make phantomjs PHANTOM_URL=https://mkws-dev.indexdata.com/jasmine-popup.html
[ less debug noise ]

To get a basic help, run:
$ make help


File system hierarchy
--------------------------------------
./spec		contains *spec.js files
./js		jasmine runtime JS lib
./phantom	scripts for phantomjs tests


Documentation
---------------------------------------
http://pivotal.github.io/jasmine/
https://github.com/pivotal/jasmine
http://phantomjs.org/


Installation
-------------------------------------
1. install node.js, see http://nodejs.org/
2. install node modules with npm: 
$ make node-modules

--
Copyright (c) 2013-2014 IndexData ApS. http://indexdata.com
Feb 2014, Wolfram

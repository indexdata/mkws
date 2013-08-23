Jasmine / jasmine-node test frame works
---------------------------------------

This directory contains the MasterKey Widget Set (MKWS) Test framework.


to run the tests, run:

$ make check
jasmine-node ./spec
.......................................

Finished in 2.024 seconds
39 tests, 194 assertions, 0 failures, 0 skipped


To get a basic help, run:
$ make help


File system hierarchy
--------------------------------------
./spec		contains *spec.js files
./js		jasmine runtime JS lib

README.txt	this file


Documentation
---------------------------------------
http://pivotal.github.io/jasmine/
https://github.com/pivotal/jasmine


Installation
-------------------------------------
1. install node.js, see http://nodejs.org/
2. install node modules with npm

npm install jquery
npm install jsdom
npm install request
npm install jasmine-node


--
Copyright (c) 2013 IndexData ApS. http://indexdata.com
Aug 2013, Wolfram

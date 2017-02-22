Jasmine / jasmine-node test frameworks
=============================================

This directory contains the MasterKey Widget Set (MKWS) Test framework.


Installation
-------------------------------------
1. install node.js, see http://nodejs.org/


and apache2 if you have not already:

# debian8
$ sudo apt-get install apache2

# centos6
$ sudo yum install httpd


The nodejs modules are configured in ./package.json
You can install them manually with
$ make node-modules

if you want. The top level makefile in ./mkws/Makefile takes care to
checkout and update the modules automatically.


Testing
---------------------------------------


To run the tests, run:

1. basic javscript tests

$ make check
jasmine-node ./spec
.......................................

Finished in 2.024 seconds
39 tests, 194 assertions, 0 failures, 0 skipped


2. Testing the Widgets in a headless browser with Jasmine

$ make phantomjs
[ headless jasmine test with console.log() messages

$ DEBUG=1 make phantomjs PHANTOM_URL=https://example.indexdata.com/jasmine-popup.html
[ less debug noise ]


To get a basic help, run:
$ make help


File system hierarchy
--------------------------------------
./spec		contains *spec.js files for phantomjs
./spec-dev	development *spec.js files
./js		jasmine runtime JS lib
./phantom	scripts for phantomjs tests
./bin		helper scripts
./etc		configuration files
./logs		apache access and error log files
./widgets	screenshots for MKWS widgets
./images	screenshots for testing

Documentation
---------------------------------------
http://jasmine.github.io/
https://github.com/jasmine/jasmine
http://phantomjs.org/

Troubleshooting
---------------------------------------
If apache2.4 don't run, please check for the installed
apache libs. You may need to removed the deb package 'libapache2-mpm-itk' 
to get the regression test works again.

--
Copyright (c) 2013-2016 Index Data ApS. http://indexdata.com
Oct 2014, Wolfram

#!/bin/sh
# Copyright (c) 2010-2013 by Index Data ApS. http://www.indexdata.com
#
# mkws-bootstrap.sh - build the MKWS from GIT repo in a sandbox and run full tests
#

# fail on error
set -e

dir=$(mktemp -d -t mkws-bootstrap.XXXXXXXX)
cd $dir

: ${debug=""}

git clone -q ssh://git.indexdata.com:222/home/git/private/mkws.git
cd mkws

test -n "$debug" && echo "start bootstraping in $dir"
if make pz2api-git-checkout check check-js > mkws.log 2>&1; then
    test -n "$debug" && echo "Ok"
    test -z "$debug" && rm -rf $dir
    exit 0
else
    echo "Failure, see `pwd`/mkws.log"
    exit 1
fi


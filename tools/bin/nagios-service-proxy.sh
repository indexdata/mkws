#!/bin/sh
# Copyright (c) 2014 Index Data ApS, http://indexdata.com
#
# nagios test if the the service proxy is up and running

set -e
: ${mkws_host="http://mkws.indexdata.com/service-proxy/"}
: ${mkws_username="mkws"}
: ${mkws_password="mkws"}
: ${user_agent="nagios service-proxy v0.9"}

tempfile=$(mktemp)
exit=0

url="$mkws_host?command=auth&action=login&username=$mkws_username&password=$mkws_password"
if curl -sSf -A "$user_agent" "$url" > $tempfile; then
    if ! egrep -q '<status>OK</status>' $tempfile; then
	echo "status not OK"
	exit=1
    fi
    if ! egrep -q '<response jsessionId="[0-9A-F]+"' $tempfile; then
	echo "response jsessionId missing"
	exit=1
    fi
else
    echo "URL: $url failed"
    exit=1
fi

if [ $exit -gt 0 ]; then
    cat $tempfile
fi

rm -f $tempfile
exit $exit


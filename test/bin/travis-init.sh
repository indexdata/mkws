#!/bin/sh
#
# init Yarn deb repository

sources_list_d=/etc/apt/sources.list.d
indexdata_list=indexdata.list
apt_key=https://dl.yarnpkg.com/debian/pubkey.gpg
deb_url=https://dl.yarnpkg.com/debian/

set -e

init_apt() {
    file="$sources_list_d/$indexdata_list"
    os=ubuntu

    if [ ! -e $file ]; then 
	codename=stable
        wget -O- $apt_key | sudo apt-key add -
        sudo sh -c "echo deb $deb_url ${codename} main > $file.tmp"
        sudo mv -f $file.tmp $file
        sudo apt-get update -qq
    fi
}

init_apt


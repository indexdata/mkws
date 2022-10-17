#!/bin/bash

sudo mkdir /etc/masterkey/service-proxy/conf.d/mkws
sudo ln -s /home/indexdata/mkws/tools/service-proxy/service-proxy.properties /etc/masterkey/service-proxy/conf.d/mkws/service-proxy.properties
sudo ln -s /home/indexdata/mkws/tools/service-proxy/sp-mkws.indexdata.com_confd /etc/masterkey/service-proxy/sp-mkws.indexdata.com_confd
sudo ln -s /home/indexdata/mkws/tools/service-proxy/sp-mkws.indexdata.com_confd /etc/masterkey/service-proxy/sp-mkws-dal13.indexdata.com_confd
sudo ln -s /home/indexdata/mkws/tools/service-proxy/sp-mkws.indexdata.com_confd /etc/masterkey/service-proxy/sp-mkws-test.indexdata.com_confd

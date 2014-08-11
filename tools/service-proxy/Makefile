MIKE = service-proxy-mike-mac.properties

$(MIKE): service-proxy.properties Makefile
	rm -f $@
	sed 's/mkc-admin.indexdata.com/x.&:8181/g;s/,constraint,/,/;\
s;localhost:8004;x.mkc-admin.indexdata.com/cgi-bin/pazpar2;' $< > $@
	chmod 444 $@

clean:
	rm -f $(MIKE)


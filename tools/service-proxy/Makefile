MIKE = service-proxy-mike-mac.properties

$(MIKE): service-proxy.properties Makefile
	rm -f $@
	sed 's/mkc-admin.indexdata.com/x.&:8181/g' $< > $@
	chmod 444 $@

clean:
	rm -f $(MIKE)


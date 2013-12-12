all: apache-config.txt

apache-config.txt: ../apache2/mkws-examples-mike
	rm -f $@
	cp -p $< $@
	chmod ugo-w $@

clean:
	rm -f apache-config.txt


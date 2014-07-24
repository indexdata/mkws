MKWS Target Selection
=====================


MKWS accesses targets using the Pazpar2 metasearching engine. Although
Pazpar2 can be used directly, using a statically configured set of
targets, this usage is unusual. More often, Pazpar2 is fronted by the
Service Proxy (SP), which manages authentication, sessions, target
selection, etc.

This document assumes the SP is used, and explains how to go about
making a set of targets (a "library") available, how to connect your
MKWS application to that library, and how to choose which of the
available targets to use.


1. Maintaining the library
--------------------------

The service proxy accesses sets of targets that are known as
"libraries". In general, each customer will have their own library,
though some standard libraries may be shared between many customers --
for example, a library containing all open-access academic journals.
A library can also contain other configuration information, including
the set of categories by which targets are classified for the library.

Libraries are maintained using MKAdmin (MasterKey
Admin). Specifically, those used by MKWS are generally maintained on
the "MKC Admin" installation at
	http://mkx-admin.indexdata.com/console/

In general, Index Data will create a library for each customer, then
give the customer a username/password pair that they can use to enter
MKAdmin and administrate that library.

Once logged in, customers can select which targets to include (from
the list of several thousand that MKAdmin knows about), and make
customer-specific modifications -- e.g. overriding the titles of the
targets.

Most importantly, customers' administrators can add authentication
credentials that the Service Proxy will used on their behalf when
accessing subscription resources -- username/password pairs or proxies
to use for IP-based authentication. Note that IT IS THEN CRUICIAL TO
SECURE THE LIBRARY FROM USE BY UNAUTHORISED CLIENTS, otherwise the
customer's paid subscriptions will be exploited.

Access to libraries is managed by creating one or more "User Access"
records in MKAdmin, under the tab of that name. Each of these records
provides a combination of credentials and other data that allow an
incoming MKWS client to be identified as having legitimate access to
the library. The authentication process, described below, works by
searching for a matching User Access record.


2. Authenticating your MWKS application onto the library
--------------------------------------------------------

Some MKWS applications will be content to use the default library with
its selection of targets. Most, though, will want to define their own
library providing a different range of available targets. An important
case is that of applications that authenticate onto subscription
resources by means of backe-end site credentials stored in MKAdmin:
precautions must be taken so that such library accounts do not allow
unauthorised access.

Setting up such a library is a process of several stages.

Stage A: create the User Access account

Log in to MKAdmin administrate your library:
	- Go to http://mkc-admin.indexdata.com/console/
	- Enter the adminstrative username/password
	- Go to the User Access tab
	- Create an end-user account
	- Depending on what authentication method it be used, set the
	  User Access account's username and password, or IP-address
	  range, or referring URL, or hostname.

If your MWKS application runs at a well-known, permanent address --
http://yourname.com/app.html, say -- you can set the User Access
record so that this originating URL is recognised by setting it into
the "Referring URL" field.

If your application accesses the Service Proxy by a unique virtual
hostname -- yourname.sp-mkws.indexdata.com, say -- you can tie the use
of this hostname to your library by setting the User Access record's
"Host Name" field to name of the host where the SP is accessed. NOTE
THAT THIS IS NOT SECURE, AS OTHER APPLICATIONS CAN USE THIS VIRTUAL
HOSTNAME TO GAIN ACCESS TO YOUR LIBRARY.

### Authentication by IP address does not yet work correctly -- see
bug MKWS-234 ("Improve SP configuration/proxying for better
authentication").

Alternatively, your application can authenticate by username and
password credentials. This is a useful approach in several situations,
including when you need to specify the use of a different library from
usual one. To arrange for this, set the username and password as a
single string separated by a slash -- e.g. "mike/swordfish" -- into
the User Access record's Authentication field.

You can create multiple User Access records: for example, one that
uses Referring URL, and another that uses a username/password pair to
be used when running an application from a different URL.

Stage B: tell the application to use the library

In the HTML of the application, tell MKWS to authenticate on to the
Service Proxy. When IP-based, referer-based or hostname-based
authentication is used, this is very simple:

	<script type="text/javascript">
	  var mkws_config = { service_proxy_auth:
	  "//sp-mkws.indexdata.com/service-proxy/?command=auth&action=perconfig" };
        </script>

### This should be the default setting

And ensure that access to the MWKS application is from the correct
Referrer URL or IP-range.

Stage C1 (optional): access by a different virtual hostname

When hostname-based authentication is in use, it's necessary to access
the Service Proxy as the correctly named virtual host. This can be
done by setting the service_proxy_auth configuration item to a
URL containing that hostname, such as
	//yourname.sp-mkws.indexdata.com/service-proxy/?command=auth&action=perconfig

### It should be possible to change just the hostname without needing
to repeat the rest of the URL (protocol, path, query)

### When changing the SP authentication URL, the Pazpar2 URL should in
general change along with it.

Stage C2 (optional): embed credentials for access to the library

When credential-based authentication is in use (username and
password), it's necessary to pass these credentials into the Service
Proxy when establishing the session. This can most simply be done just
by setting the service_proxy_auth configuration item to a URL such as
	//sp-mkws.indexdata.com/service-proxy/?command=auth&action=perconfig&username=mike&password=swordfish

### It should be possible to add the username and password to the
configuration without needing to repeat the rest of the URL.

Stage D (optional): conceal credentials from HTML source

Using a credential-based Service-Proxy authentication URL such as the
one above reveals the the credentials to public view -- to anyone who
does View Source on the MKWS application. This may be acceptable for
some libraries, but is intolerable for those which provide
authenticated access to subscription resources.

In these circumstances, a more elaborate approach is necessary. The
idea is to make a URL local to the customer that is used for
authentication onto the Service Proxy, hiding the credentials in a
local rewrite rule. Then local mechanisms can be used to limit access
to that local authentication URL. Here is one way to do it when
Apache2 is the application's web-server, which we will call
yourname.com:

	- Add a rewriting authentication alias to the configuration:
		RewriteEngine on
		RewriteRule /spauth/ http://mkws.indexdata.com/service-proxy/?command=auth&action=check,login&username=U&password=PW [P]
	- Set thwe MKWS configuration item "service_proxy_auth" to:
		http://yourname.com/spauth/
	- Protect access to the local path http://yourname.com/spauth/
		(e.g. using a .htaccess file).


3. Choosing targets from the library
------------------------------------

MKWS applications can choose what subset of the library's targets to
use, by means of several alternative settings on individual widgets or
in the mkws_config structure:

* targets -- contains a Pazpar2 targets string, typically of the form
  "pz:id=" or "pz:id~" followed by a pipe-separated list of low-level
  target IDs.

  At present, these IDs can take one of two forms, depending on the
  configuration of the Service Proxy being used: they may be based on
  ZURLs, so a typical value would be something like:
	pz:id=josiah.brown.edu:210/innopac|lui.indexdata.com:8080/solr4/select?fq=database:4902
  Or they may be UDBs, so a typical value would be something like:
	pz:id=brown|artstor

* targetfilter -- contains a CQL query which is used to find relevant
  targets from the relvant library. For example,
	udb==Google_Images
  Or
	categories=news

* target -- contains a single UDB, that of the sole target to be
  used. For example
	Google_Images
  This is merely syntactic sugar for "targetfilter" with the query
	udb==NAME



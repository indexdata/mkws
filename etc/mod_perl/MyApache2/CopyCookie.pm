package MyApache2::CopyCookie;

use Apache2::Filter ();
use Apache2::RequestRec ();
use APR::Table ();

use Apache2::Const -compile => qw(OK);

use constant BUFF_LEN => 1024;

sub handler {
    my $f = shift;
    warn "in MyApache2::CopyCookie (f=$f)";

    # If the server generated a new cookie, make it available in a
    # header other than the magic "Cookie" that clients can't read.
    my $ho = $f->r->headers_out;
    my $cookie = $ho->get('Set-Cookie');
    $ho->set('X-Set-Cookie', $cookie);

    # If the client sent an existing cookie as X-Cookie, but didn't
    # set Cookie, copy the former to the latter.
    my $hi = $f->r->headers_in;
    $cookie = $hi->get('Cookie');
    if (!defined $cookie || $cookie eq "") {
	$cookie = $hi->get('X-Cookie');
	warn "copying X-Cookie '$cookie' to Cookie";
	$hi->set('Cookie', $cookie);
    }

    while ($f->read(my $buffer, BUFF_LEN)) {
	$f->print($buffer);
    }

    return Apache2::Const::OK;
}

1;

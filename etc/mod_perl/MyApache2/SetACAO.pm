package MyApache2::SetACAO;

use Apache2::Filter ();
use Apache2::RequestRec ();
use APR::Table ();

use Apache2::Const -compile => qw(OK);

use constant BUFF_LEN => 1024;

sub handler {
    my $f = shift;

    # If the client generated an Origin header, echo its content back
    # in an ACAO header. This is better than just using *, since it
    # doesnt prevent credentials from being accepted.
    my $hi = $f->r->headers_in;
    my $ho = $f->r->headers_out;
    my $origin = $ho->get('Origin');
    if (defined $origin && $origin ne "") {
	$ho->set('Access-Control-Allow-Origin', $origin);
    }

    while ($f->read(my $buffer, BUFF_LEN)) {
	$f->print($buffer);
    }

    return Apache2::Const::OK;
}

1;

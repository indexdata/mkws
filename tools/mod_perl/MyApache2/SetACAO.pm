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
    my $origin = $f->r->headers_in->get('Origin');
    if (defined $origin && $origin ne "") {
	$f->r->headers_out->set('Access-Control-Allow-Origin', $origin);
	warn "MyApache2::SetACAO copied Origin '$origin' to ACAO";
    }

    while ($f->read(my $buffer, BUFF_LEN)) {
	$f->print($buffer);
    }

    return Apache2::Const::OK;
}

1;

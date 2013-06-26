package MyApache2::CopyCookie;

use Apache2::Filter ();
use Apache2::RequestRec ();
use APR::Table ();

use Apache2::Const -compile => qw(OK);

use constant BUFF_LEN => 1024;

sub handler {
    my $f = shift;
    warn "in MyApache2::CopyCookie (f=$f)";

    my $ho = $f->r->headers_out;
    my $cookie = $ho->get('Set-Cookie');
    warn "MyApache2::CopyCookie headers_out='$ho', cookie='$cookie'";
    $ho->set('X-Set-Cookie', $cookie);
    my $extra = $ho->get('X-Set-Cookie');
    warn "MyApache2::CopyCookie extra cookie='$extra'";

    while ($f->read(my $buffer, BUFF_LEN)) {
	$f->print($buffer);
    }
    warn "MyApache2::CopyCookie copied data";

    return Apache2::Const::OK;
}

1;

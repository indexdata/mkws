package MyApache2::CopyCookie;

use Apache2::Filter ();
use Apache2::RequestRec ();
use APR::Table ();

use Apache2::Const -compile => qw(OK);

sub handler {
    my $f = shift;

    my $ho = $f->r->headers_out;
    my $cookie = $ho->get('Set-Cookie');
    open F, ">/tmp/mike";
    print F "MyApache2::CopyCookie headers_out='$ho', cookie='$cookie'";
    $ho->set('X-Set-Cookie', $cookie);
    my $extra = $ho->get('X-Set-Cookie');
    print F "MyApache2::CopyCookie extra cookie='$extra'";
    close F;
    return Apache2::Const::OK;
}

1;

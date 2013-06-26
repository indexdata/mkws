    package MyApache2::CopyCookie;
      use Apache2::Filter ();
      use Apache2::RequestRec ();
      use APR::Table ();

      use Apache2::Const -compile => qw(OK);

      sub handler {
	  my $f = shift;

	  my $cookie = $f->r->headers_out->get('Set-Cookie');
	  $f->r->headers_out->set('X-Set-Cookie', $cookie);
	  return Apache2::Const::OK;
      }
      1;


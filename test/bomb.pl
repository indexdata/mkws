#!/usr/bin/perl
# Copyright (c) 2014 IndexData ApS. http://indexdata.com
#
# bomb.pl - wrapper to stop a process after N seconds
#

use Getopt::Long;

use strict;
use warnings;

my $debug = 0;
my $help;
my $timeout = 100;

binmode \*STDOUT, ":utf8";
binmode \*STDERR, ":utf8";

# timeout handler
sub set_alarm {
    my $time = shift;
    my $message = shift || "";

    $time = 100 if !defined $time;

    $SIG{ALRM} = sub {

        warn "Time out alarm $time\n";

        # sends a hang-up signal to all processes in the current process group
        # and kill running java processes
        local $SIG{HUP} = "IGNORE";
        kill 1, -$$;

        local $SIG{TERM} = "IGNORE";
        kill 15, -$$;
        kill 15, -$$;

        warn "Send a hang-up to all childs.\n";

        #exit 1;
    };

    warn "set alarm time to: $time seconds $message\n" if $debug >= 1;
    alarm($time);
}

sub usage () {
    <<EOF;
usage: $0 [ options ] command args ....

--debug=0..3    debug option, default: $debug
--timeout=1..N  timeout in seconds, default: $timeout
EOF
}

GetOptions(
    "help"      => \$help,
    "debug=i"   => \$debug,
    "timeout=i" => \$timeout,
) or die usage;

my @system = @ARGV;

die usage if $help;
die usage if !@system;

set_alarm( $timeout, join( " ", @system ) );

system(@system) == 0
  or die "@system failed with exit code: $?\n";

exit(0);

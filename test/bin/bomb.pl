#!/usr/bin/perl
# Copyright (c) 2014 Index Data ApS. http://indexdata.com
#
# bomb.pl - wrapper to stop a process after N seconds
#

use Getopt::Long;
use POSIX ":sys_wait_h";

use strict;
use warnings;

my $debug = 0;
my $help;
my $timeout = 100;
my $pid;

binmode \*STDOUT, ":utf8";
binmode \*STDERR, ":utf8";

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
    "timeout=f" => \$timeout,
) or die usage;

my @system = @ARGV;

die usage if $help;
die usage if !@system;

# disabled - we set the CPU limit in the wrapper ./bomb
## set CPU limit, in case the alarm handler will
## be ignored
#eval {
#    require BSD::Resource;
#    BSD::Resource::setrlimit( "RLIMIT_CPU", $timeout, 2 * $timeout )
#      or die "Cannot set CPU limit: $!\n";
#};
#if ($@) {
#    warn
#      "WARNING: things would go more nicely with the BSD::Resource package\n";
#}

#
# configure signal handlers
#
$SIG{ALRM} = sub {
    my $pgid = getpgrp();

    warn "Alarm handler got called after $timeout seconds\n";
    warn "Kill now the process group $pgid\n\n";
    warn "Command: @system\n";

    # kill process group
    kill "INT", -$pgid;
};

# don't kill ourself
$SIG{INT} = "IGNORE";

alarm($timeout);

system(@system) == 0
  or die "system('@system') failed: ?='$?', !='$!'\n";

1;

#!/usr/bin/perl
# Copyright (c) 2014 IndexData ApS. http://indexdata.com
#
# bomb.pl - wrapper to stop a process after N seconds
#

use Getopt::Long;
use POSIX ":sys_wait_h";
use BSD::Resource qw/setrlimit/;

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

# set CPU limit, in case the alarm handler will
# be ignored
setrlimit(RLIMIT_CPU, $timeout, 2*$timeout) or die "Cannot set CPU limit: $!\n";

#
# use fork/exec instead system()
#
$pid = fork();
die "fork() failed: $!" unless defined $pid;

# child
if ($pid) {
    alarm($timeout);
    exec(@system) or die "exec @system: $!\n";
}

# parent
else { }

1;

#!/usr/bin/perl
use strict;
use warnings;
use JSON;

local $/; # enable localized slurp mode
my %rec_hash = ('body' => {'und' => [{'value' => <STDIN>}]});
my $json = encode_json \%rec_hash;
print $json;

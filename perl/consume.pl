#!/usr/bin/perl

use strict;
use warnings;

$|++;
use AnyEvent;
use Net::RabbitFoot;

my $exchange = $ARGV[0] || '';
my $routingKey = $ARGV[1] || '';

if ($exchange eq '' || $routingKey eq '') {
    die('You must define exchange and routing key. Usage: perl consume.pl my-exchange event.*');
}

# Connect RabbitMq
my $conn = Net::RabbitFoot->new()->load_xml_spec()->connect(
    host => 'rabbitmq',
    port => 5672,
    user => 'rabbitmq',
    pass => 'rabbitmq',
    vhost => '/',
);

# Create channel
my $channel = $conn->open_channel();

$channel->declare_exchange(
    exchange => $exchange,
    type => 'topic',
);

# Create exclusive queue
my $result = $channel->declare_queue(exclusive => 1);

my $queue_name = $result->{method_frame}->{queue};

# Bind queue to exchange using routingKey
$channel->bind_queue(
    exchange => $exchange,
    queue => $queue_name,
    routing_key => $routingKey,
);

sub callback {
    my $var = shift;

    printf(
        "Received message: exchange: \"%s\", routing key: \"%s\", body: \"%s\"\n",
        $exchange,
        $var->{deliver}->{method_frame}->{routing_key},
        $var->{body}->{payload}
    );
}

$channel->consume(
    on_consume => \&callback,
    no_ack => 1,
);

AnyEvent->condvar->recv;

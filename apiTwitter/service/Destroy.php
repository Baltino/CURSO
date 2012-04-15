<?php
session_start();
require_once(dirname(__FILE__) . '/../lib/twitteroauth/twitteroauth.php');
include_once('config.php');

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
$id = $_GET['ID']; 
$result = $connection->post('statuses/home_timeline/:'+$id);
?>

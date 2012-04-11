<?php
session_start();
require_once(dirname(__FILE__) . '/../lib/twitteroauth/twitteroauth.php');
include_once('config.php');

if (empty($_GET['message'])) {
    die("Tweet message emtpy!");
}

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
$content = $connection->get('account/verify_credentials');
$connection->post('statuses/update', array('status' => $_GET['message']));
echo json_encode($_GET['message']);
?>

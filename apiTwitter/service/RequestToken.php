<?php
/* Start session and load library. */
//TODO: Security session - ADD PID
session_start();
require_once(dirname(__FILE__) . '/../lib/twitteroauth/twitteroauth.php');
include_once('config.php');

/* Build TwitterOAuth object with client credentials. */
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);

/* Get temporary credentials. */
$request_token = $connection->getRequestToken(OAUTH_CALLBACK);
$_SESSION['oauth_token'] = $token = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
$url = $connection->getAuthorizeURL($request_token['oauth_token']);

header("Location: " . $url);
?>

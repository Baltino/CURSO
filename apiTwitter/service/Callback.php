<?php
/* Twitter Callback */
session_start();
require_once(dirname(__FILE__) . '/../lib/twitteroauth/twitteroauth.php');
include_once('config.php');

/* If the oauth_token is old redirect to the connect page. */
if (isset($_REQUEST['oauth_token']) && $_SESSION['oauth_token'] !== $_REQUEST['oauth_token']) {
  session_destroy();
  header('Location: /');
}

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
$result = $connection->getAccessToken($_GET['oauth_verifier']);

$_SESSION['oauth_token'] = $result['oauth_token'];
$_SESSION['oauth_verifier'] = $result['oauth_verifier'];
$_SESSION['oauth_token_secret'] = $result['oauth_token_secret'];
$_SESSION['user_id'] = $result['user_id'];
$_SESSION['screen_name'] = $result['screen_name'];

header('Location: /#dashboard');
?>

<?php
session_start();
require_once(dirname(__FILE__) . '/../lib/twitteroauth/twitteroauth.php');
include_once('config.php');

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
//$result = $connection->get('statuses/home_timeline', $_GET);


//cursor en -1 ya viene al ppio
$result = $connection->get('followers/ids',array('cursor' => $_REQUEST['cursor'], 'screen_name' => $REQUEST['screen_name']));

//quedaria continuar con https://dev.twitter.com/docs/api/1/get/users/lookup
//para usar esos ids y obtener sus datos

echo json_encode($result);
?>
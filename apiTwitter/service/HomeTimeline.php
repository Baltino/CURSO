<?php
session_start();
require_once(dirname(__FILE__) . '/../lib/twitteroauth/twitteroauth.php');
include_once('config.php');

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
//$result = $connection->get('statuses/home_timeline', $_GET);

if($_REQUEST['max_id'] == 0){//initial
    $result = $connection->get('statuses/home_timeline',array('count' => '21'));
}else{//all the consecutive gets
    $result = $connection->get('statuses/home_timeline',array('count' => '21', 'max_id' => $_REQUEST['max_id']));
}

echo json_encode($result);
?>

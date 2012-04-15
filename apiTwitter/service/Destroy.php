<?php
session_start();
require_once(dirname(__FILE__) . '/../lib/twitteroauth/twitteroauth.php');
include_once('config.php');

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
$result = $connection->post('statuses/destroy',array('id' => $_GET['ID']));

if($result->error=="No status found with that ID."){ 
    echo json_encode($result);
} else {  
    header('Location: /home.html');
} 
?>

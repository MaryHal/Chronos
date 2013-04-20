<?php
/* $data = json_decode($_POST["data"]); */

$data = get_data("http://search.twitter.com/search.json?q=hello");
header('Content-type: text/javascript');
echo json_encode($data);

function get_data($url)
{
    $ch = curl_init();
    $timeout = 5;
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

?>
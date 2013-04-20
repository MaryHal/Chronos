<?php
header('Content-Type: application/json');
include("database2.php");

$_POST["data"] = '{"userID" : "0"}';

// Test if there is json data.
if (isset($_POST["data"]))
{
    $data = $_POST["data"];
    $json = json_decode($data, true);
    $userID = $json->{"userID"};

    // Query to retrieve user data
    /* $classes = getAllClassInfo($database, $userID); */
    /* echo json_encode($classes, JSON_FORCE_OBJECT); */
}
else
{
    print("{\"error\":\"Could not retrieve user data.\"}");
}

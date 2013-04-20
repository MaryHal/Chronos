<?php
//include("database.php");
header('Content-Type: application/json');

// Database
/* $db =  */

// Test if there is json data.
if (isset($_POST["data"]))
{
    $data = $_POST["data"];
    $json = json_decode($data, true);
    $userID = $json->userID;
    $classes = $json->classes;

    // Query to modify tables


    // Success Output!
    print("{\"success\":\"User data changed.\"}");
}
else
{
    print("{\"error\":\"User data could not be changed.\"}");
}

?>

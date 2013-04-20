<?php
//include("database.php");
header('Content-Type: text/plain');

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
    print("User data successfully updated!");
}
else
{
    print("User data could not be changed.");
}

?>

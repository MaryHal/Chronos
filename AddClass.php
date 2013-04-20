<?php
header('Content-Type: application/json');
include("database.php");

$_POST["data"] = '{"userID" : 0,
                   "classes" : ["12444spr2013"]}';

// Test if there is json data.
if (isset($_POST["data"]))
{
    $data = $_POST["data"];
    $json = json_decode($data, true);
    $userID  = $json["userID"];
    $classes = $json["classes"];

    // Query to modify tables
    foreach ($classes as $class)
    {
        addClassToUser($database, $userID, $class);
    }

    // Success Output!
    print("{\"success\":\"User data successfully changed.\"}");
}
else
{
    print("{\"error\":\"User data could not be changed.\"}");
}

?>

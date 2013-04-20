<?php
header('Content-Type: application/json');
include("database.php");

$_POST["data"] = '{"userID" : 1,
                   "year" : "2013",
                   "quarter" : "SPR"}';

// Test if there is json data.
if (isset($_POST["data"]))
{
    $data = $_POST["data"];
    $json = json_decode($data, true);
    $userID = $json["userID"];

    // Query to retrieve user data
    $classes = getUserClasses($database, $userID, $json["year"], $json["quarter"]);
    echo json_encode($classes, JSON_FORCE_OBJECT);
}
else
{
    // Uh oh
    print("{\"error\":\"User data could not be changed.\"}");
}

?>

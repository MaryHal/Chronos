<?php
header('Content-Type: application/json');
include("database.php");

// Test Data
/* $_POST["action"] = "add"; */
/* $_POST["data"] = '{"userID" : "0", */
/*                    "classes" : ["12444spr2013"]}'; */

$action = null;
if (isset($_POST["action"]))
{
    $action = $_POST["action"];
}

// Test if there is json data.
if (isset($_POST["data"]))
{
    $data = $_POST["data"];
    $json = json_decode($data, true);
    $userID  = $json["userID"];
    $classes = $json["classes"];

    $success = executeAction($action, $userID, $classes);

    // Success Output!
    print("{\"success\":\"User data successfully changed.\"}");
}
else
{
    print("{\"error\":\"User data could not be changed.\"}");
}


function executeAction($action, $userID, $classes)
{
    global $database;
    switch ($action)
    {
    case "add":
        // Query to modify tables
        foreach ($classes as $class)
        {
            addClassToUser($database, $userID, $class);
        }
        break;
    case "remove":
        // Query to modify tables
        foreach ($classes as $class)
        {
            removeClass($database, $userID, $class);
        }
        break;
    default:
        print("{\"error\":\"Invalid Action.\"}");
        return false;
        break;
    }
    return true;
}

?>

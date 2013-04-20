<?php
header('Content-Type: application/json');
include("database.php");

// Test Data
/* $_GET["action"] = "add"; */
/* $_POST["userID"] = '{"userID" : "0", */
/*                    "classes" : ["12444spr2013"]}'; */

$action = null;
if (isset($_GET["action"]))
{
    $action = $_GET["action"];
}

// Test if there is json data.
if (isset($_GET["data"]))
{
    $data = $_GET["data"];
    $userID  = $_GET["userID"];
    $classes = explode(",", $_GET["classes"]);

    $success = executeAction($action, $userID, $classes);

    // Success Output!
    if ($success)
    {
        print("{\"success\":\"User data successfully changed.\"}");
    }
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

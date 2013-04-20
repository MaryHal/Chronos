<?php
header('Content-Type: application/json');
include("database.php");

$_POST["userID"]  = "0";
$_POST["year"]    = "2013";
$_POST["quarter"] = "SPR";

// Test if there is json data.
if (isset($_POST["userID"]))
{
    // Query to retrieve user data
    if ($_GET["classid"])
    {
        $details = getClassDetails($database, $_GET["classid"]);
        echo json_encode($details, JSON_FORCE_OBJECT);
    }
    else
    {
        $classes = getUserClasses($database, $_POST["userID"], $_POST["year"], $_POST["quarter"]);

        $result = array();
        foreach ($classes as $class)
        {
            array_push($result, getAllClassInfo($database, $class));
        }
        if ($_GET["pp"])
        {
            echo prettyPrintJSON(json_encode($result, JSON_FORCE_OBJECT));
        }
    }
}
else
{
    // Uh oh
    print("{\"error\":\"User data could not be retrieved.\"}");
}

?>

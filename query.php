<?php
header('Content-Type: application/json');
include("database.php");
include("printJson.php");

/* $_POST["userID"]  = "0"; */
/* $_POST["year"]    = "2013"; */
/* $_POST["quarter"] = "SPR"; */

// Query to retrieve user data
if ($_GET["classid"])
{
    $users = findSameClass($database, $_GET["classid"]);
    $details = getAllClassInfo($database, $_GET["classid"]);
    echo json_encode($details, JSON_FORCE_OBJECT);
}

// Test if there is json data.
else if (isset($_POST["userID"]))
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
    else
    {
        echo json_encode($result, JSON_FORCE_OBJECT);
    }
}
else
{
    // Uh oh
    print("{\"error\":\"User data could not be retrieved.\"}");
}

?>

<?php
header('Content-Type: application/json');
include("database.php");
include("printJson.php");

// Test if there is json data.
if (isset($_GET["query"]))
{
    // Query to retrieve user data
    $classes = getClassByQuery($database, $_GET["query"]);

    if (isset($_GET["pp"]))
    {
        echo prettyPrintJSON(json_encode($classes, JSON_FORCE_OBJECT));
    }
    else
    {
        echo json_encode($classes, JSON_FORCE_OBJECT);
    }
}
else
{
    // Uh oh
    print("{\"error\":\"No query provided.\"}");
}

?>

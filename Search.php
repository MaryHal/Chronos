<?php
header('Content-Type: application/json');
include("database.php");
include("printJson.php");

// Test if there is json data.
if (isset($_GET["query"]))
{
    /* $json = json_decode($data, true); */

    // Query to retrieve user data
    $classes = getClassByQuery($database, $_GET["query"]);

    if (isset($_GET["pp"]))
    {
        echo prettyPrintJSON(json_encode($classes[0]));
    }
    else
    {
        echo json_encode($classes[0]);
    }
}
else
{
    // Uh oh
    print("{\"error\":\"No query provided.\"}");
}

?>

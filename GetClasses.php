<?php
// include("database.php");
header('Content-Type: application/json');

// Database
$db = $database;

// Test if there is json data.
if (isset($_GET["userID"]))
{
    $userID = $_GET["userID"];

    // Query to get classes for a userID tables
    /* $statement=$db->prepare("SELECT * FROM table"); */
    /* $statement->execute(); */
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);

    // Success Output!
    print($json);
}
else
{
    // Uh oh
    print("{\"error\":\"User data could not be changed.\"}");
}

?>

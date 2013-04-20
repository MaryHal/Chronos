<?php
//include("database.php");

// Database
/* $db =  */

// Test if there is json data.
if (isset($_GET["userID"]))
{
    $userID = $_GET["userID"];

    // Query to get classes for a userID tables
    /* $statement=$pdo->prepare("SELECT * FROM table"); */
    /* $statement->execute(); */
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);

    // Success Output!
    header('Content-Type: application/json');
    print($json);
}
else
{
    header('Content-Type: text/plain');
    print("User data could not be changed.");
}

?>
<?php
$database = connectdb();
// getUserClasses($database, 50);

function connectdb() {
    $database = new PDO("mysql:dbname=chronos;host=chronos.db", "iocx", "HelloWorld");
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /* $result = $database->query("select * from UserClasses;"); */
    /* foreach($result as $item) { */
    /*   echo $item["uid"]; */
    /* } */
    return $database;
}

/*
 * Returns a list of class id's.
 */
function getUserClasses($database, $id) {
    $id = $database->quote($id);
    $query =
    "SELECT cid FROM UserClasses
       WHERE uid = ${id};";
    $result = $database->query($query);
    $classes = array();
    foreach($result as $row) {
        array_push($classes, $row["cid"]);
    }
    /*foreach($classes as $class) {
      echo $class;
      }
    */
    return $classes;
}
?>

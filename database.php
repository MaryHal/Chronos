<?php
  $database = connectdb();
  $id = 0;
  $classes = getUserClasses($database, $id);
  foreach($classes as $class) {
    getAllClassInfo($database, $id);
  }


  function connectdb() {
    $database = new PDO("mysql:dbname=chronos;host=chronos.db", "iocx", "HelloWorld");
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $result = $database->query("select * from UserClasses;");
    return $database;
  }

  /*
   * Returns an array of class id's.
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
    if (!$classes) {
      echo "no classes found\n";
    }
    /*foreach($classes as $class) {
      echo $class;
    }
     */
    return $classes;
  }

  /*
   * Returns an associative array of attributes.
   * {id, sname, fname, sec, qtr, yr, iid, credits, reqs, type,
   *  details, instructor, textbooks}
   */
  function getAllClassInfo($database, $id) {
    $id = $database->quote($id);
    $query = 
      "SELECT id, sname, fname, sec, qtr, yr, iid, credits, reqs, type
       FROM Classes
       WHERE id = ${id};";    

    $result = $database->query($query);
    $result["details"] = getClassDetails($database, $id);
    $result["instructor"] = getInstructor($database, (int) $result["iid"]);
    $result["textbooks"] = getClassDetails($database, $id);

    print_r($result);
    echo "<br />";
    return $result;
  }

  /*
   * Returns an array of {day, stime, etime, loc}.
   */
  function getClassDetails($database, $id) {
    $query =
      "SELECT day, stime, etime, loc FROM ClassDetails
      WHERE cid = ${id};";
    return $database->query($query);
  }

  /*
   * Returns the array {fname, lname}.
   */
  function getInstructor($database, $id) {
    $id = $database->quote($id);
    $query =
      "SELECT fname, lname FROM Instructors
      WHERE id = ${id};";
    $result =  $database->query($query);
    return $result[0];
  }

  /*
   * Returns an array of {title, author}.
   */
  function getTextbooks($database, $id) {
    $query =
      "SELECT title, author FROM Instructors
      WHERE cid = ${id};";
    return $database->query($query);
  }
?>





















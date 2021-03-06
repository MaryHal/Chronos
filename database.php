<?php
  $database = connectdb();
  getClassByQuery($database, "a");

  function connectdb() {
    $database = new PDO("mysql:dbname=chronos;host=chronos.db", "iocx", "HelloWorld");
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $result = $database->query("select * from UserClasses;");
    return $database;
  }

  function getClassByQuery($database, $qry) {
    $query =
      "SELECT c.id FROM Classes c, Instructors i
      WHERE c.iid = i.id
      AND (c.sname LIKE '%${qry}%' OR
           c.fname LIKE '%${qry}%' OR
           i.lname LIKE '%${qry}%' OR
           i.fname LIKE '%$qry%');";

    $result = $database->query($query);

    $allClasses = array();
    foreach($result as $class) {
      $allClasses[] = getAllClassInfo($database, $class["id"]);
    }
    return $allClasses;
  }

  /*
   * Returns an array of class id's.
   */
  function getUserClasses($database, $id, $year, $qtr) {
    $id = $database->quote($id);
    $year = $database->quote($year);
    $qtr = $database->quote($qtr);
    $query = 
      "SELECT cid FROM UserClasses uc, Classes c
      WHERE uc.cid = c.id
      AND uc.uid = ${id}
      AND c.yr = ${year}
      AND c.qtr = ${qtr};";
    $result = $database->query($query);
    $classes = array();
    foreach($result as $row) {
      array_push($classes, $row["cid"]);
    }
    return $classes;
  }

  /*
   * Returns an associative array of attributes.
   * {id, sname, fname, sec, qtr, yr, iid, credits, reqs, type,
   *  details, instructor, textbooks}
   */
  function getAllClassInfo($database, $classid) {
    $classid = $database->quote($classid);
    $query = 
      "SELECT id, sname, fname, sec, qtr, yr, iid, credits, reqs, type
       FROM Classes
       WHERE id = ${classid};";

    $result = $database->query($query);
    $result = $result->fetch(0);
    $result["details"] = getClassDetails($database, $classid);
    $result["instructor"] = getInstructor($database, $result["iid"]);
    $result["textbooks"] = getTextbooks($database, $classid);

    return $result;
  }

  /*
   * Returns an array of {day, stime, etime, loc}.
   */
  function getClassDetails($database, $classid) {
      $classid = $database->quote($classid);
    $query =
      "SELECT day, stime, etime, loc FROM ClassDetails
       WHERE cid = ${classid};";
    $results = $database->query($query);
    $details = array();
    foreach($results as $detail) {
      array_push($details, $detail);
    }
    return $details;
  }

  /*
   * Returns the array {fname, lname}.
   */
  function getInstructor($database, $id) {
    $id = $database->quote($id);
    $query =
      "SELECT fname, lname FROM Instructors
      WHERE id = ${id};";
    $result = $database->query($query);
    return $result->fetch(0);
  }

  /*
   * Returns an array of {title, author}.
   */
  function getTextbooks($database, $classid) {
    $query =
      "SELECT title, author FROM Textbooks
      WHERE cid = ${classid};";
    $results = $database->query($query);
    $textbooks = array();
    foreach($results as $textbook) {
      $textbooks[] = $textbook;
    }
    return $textbooks;
  }

  function addClassToUser($database, $uid, $classid) {
    $uid = $database->quote($uid);
    $classid = $database->quote($classid);
    $query =
      "INSERT INTO UserClasses
       VALUES ($uid, $classid);";
    $database->query($query);
  }

  function removeClass($database, $uid, $classid) {
    $uid = $database->quote($uid);
    $classid = $database->quote($classid);
    $query =
      "DELETE FROM UserClasses
       WHERE $uid = UserClasses.uid AND $classid = UserClasses.cid;";
    $database->query($query);
  }

function findSameClass($database, $classid)
{
    $classid = $database->quote($classid);

    $query =
      "SELECT uid FROM UserClasses
       WHERE cid = ${classid};";
    $result = $database->query($query);
    return $result->fetch(0);
}

function test()
{
  $id = 0;
  $classes = getUserClasses($database, $id, "2013", "SPR");
  foreach($classes as $class) {
    $info = getAllClassInfo($database, $class);
    print_r($info);
    print "<br />";
    print "<br />";
  }
}

?>

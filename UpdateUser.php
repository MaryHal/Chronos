<?php
// We can expect JSON data from them.
/* $user_name = "iocx"; */
/* $password = "HelloWorld"; */
/* $database = "172.17.0.172"; */
/* $server = "chronos.db"; */

/* mysql_connect($server, $user_name, $password); */

/* print "Connection to the Server opened"; */

$data = json_decode($_POST["data"]);

?>
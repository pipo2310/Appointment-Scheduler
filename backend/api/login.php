<?php
/**
 * Returns the valid login request.
 */
require 'database.php';

// Extract, validate and sanitize the id.
$us = ($_GET['username'] !== null)? mysqli_real_escape_string($con, $_GET['username']) : false;
$pw = ($_GET['pass'] !== null)? mysqli_real_escape_string($con, $_GET['pass']) : false;

if(!$us || !$pw)
{
  return http_response_code(400);
}

// Call function
$sql = "SELECT loginUsuario('{$us}','{$pw}') AS resultado";

$result = mysqli_query($con,$sql);

if($result)
{
  $res = mysqli_fetch_assoc($result);
  echo json_encode($res);
}
else
{
  return http_response_code(404);
}

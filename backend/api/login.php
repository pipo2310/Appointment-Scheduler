<?php
/**
 * Returns the valid login request.
 */
require 'database.php';

// Obtener los datos del input
$postdata = file_get_contents("php://input");

// Validar los datos
if(isset($postdata) && !empty($postdata))
{
  // Extracción de los datos
  $request = json_decode($postdata);

  // Validación de hileras vacías
  if(trim($request->user) === '' || $request->pass === '')
  {
    return http_response_code(400);
  }

  // Sanitización
  $us = mysqli_real_escape_string($con, trim($request->user));
  $pw = mysqli_real_escape_string($con, trim($request->pass));
 
  // Llamada a la función de verificación
  $sql = "SELECT loginUsuario('{$us}','{$pw}') AS resultado";
  $result = mysqli_query($con,$sql);

  if($result)
  {
    // Extracción del resultado
    $fetchedResult = mysqli_fetch_assoc($result);

    // Lectura del campo 'resultado'
    if ($fetchedResult['resultado']) {
      echo json_encode($fetchedResult);
    }
    else
    {
      return http_response_code(400);
    }
  }
  else
  {
    return http_response_code(404);
  }
}

/*// Extract, validate and sanitize the id.
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
*/
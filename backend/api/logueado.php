<?php
/**
 * Conmuta el boolean logueado del usuario con la especificada
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
  if(trim($request->cedula) === '')
  {
    return http_response_code(400);
  }

  // Sanitización
  $ced = mysqli_real_escape_string($con, trim($request->cedula));
	
	// Llamada
	$sql = "CALL conmutarLogueado('$ced')";
	$result = mysqli_query($con,$sql);

  	if($result)
  	{
    		http_response_code(204);
  	}
  	else
  	{
    		http_response_code(404);
  	}
}

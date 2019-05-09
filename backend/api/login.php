<?php
/**
 * Consulta si la información de login es válida y devuelve la información del usuario
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
      // Consulta de informacion del usuario
      $sql = "SELECT P.cedula, P.email, P.nombre, P.primerApellido, P.segundoApellido, (SELECT carne FROM ESTUDIANTE E WHERE E.cedula = P.cedula) AS 'carne', U.logueado, getRol(P.cedula) AS 'rol' FROM USUARIO U JOIN PERSONA P ON U.cedulaPersona = P.cedula WHERE U.nombreUsuario = '{$us}'";
      $result = mysqli_query($con,$sql);
      
      if ($result) {
        // Extracción del resultado
        $fetchedResult = mysqli_fetch_assoc($result);
        echo json_encode($fetchedResult);
      }
      else {
        return http_response_code(400);
      }
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

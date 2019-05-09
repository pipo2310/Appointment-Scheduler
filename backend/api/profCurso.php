<?php
/**
 * Obtiene la lista de profesores de un curso
 */
require 'database.php';

// Obtener los datos del input
$postdata = file_get_contents("php://input");

// Validar los datos
if(isset($postdata) && !empty($postdata))
{
  // Extracción de los datos
  $request = json_decode($postdata);

  // Sanitización
  $sig = mysqli_real_escape_string($con, trim($request->sigla));

  $profesores = [];
  $sql = "SELECT DISTINCT P.cedula, P.email, P.nombre, P.primerApellido, P.segundoApellido FROM PERSONA P JOIN IMPARTE I ON P.cedula = I.cedProf WHERE I.siglaCurso = '$sig'";

  $result = mysqli_query($con,$sql);

  if($result)
  {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $cursos[$i]['cedula'] = $row['cedula'];
      $cursos[$i]['email'] = $row['email'];
      $cursos[$i]['nombre'] = $row['nombre'];
      $cursos[$i]['primerApellido'] = $row['primerApellido'];
      $cursos[$i]['segundoApellido'] = $row['segundoApellido'];
      $i++;
    }

    echo json_encode($profesores);
  }
  else
  {
    http_response_code(404);
  }
}

<?php
/**
 * Obtiene la lista de cursos del estudiante
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
  $ced = mysqli_real_escape_string($con, trim($request->cedula));

$cursos = [];
//$ced = mysqli_real_escape_string($con, trim($_GET['cedula']));
$sql = "select C.sigla AS 'sigla', C.nombre AS 'nombre' from ESTUDIANTE join LLEVA L on ESTUDIANTE.cedula = L.cedEst join GRUPO G on L.siglaCurso = G.siglaCurso and L.numGrupo = G.numGrupo and L.semestre = G.semestre and L.anno = G.anno JOIN CURSO C on G.siglaCurso = C.sigla where ESTUDIANTE.cedula = '$ced'";

$result = mysqli_query($con,$sql);

//$result = mysqli_query($con,$sql);
  //print($sql);

  if($result)
  {
    $i = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $cursos[$i]['sigla']    = $row['sigla'];
      $cursos[$i]['nombre'] = $row['nombre'];
      $i++;
    }

    echo json_encode($cursos);
  }
  else
  {
    http_response_code(404);
  }
}
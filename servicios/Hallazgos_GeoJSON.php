<?php 
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
include_once("conexion.php"); 

global $cx;	
$arr_fila = array();
$arr_fila1 = array();
$arr_feature = array();
$i = 0;$k = 0;$j = 0;
$query_sql = "SELECT c.id
FROM control_hallazgos c left join usuarios u on (u.id=c.usuario::integer), actividades_hallazgos a 
WHERE c.id_item=a.id_item limit 1";
						
//echo "$query_sql"; 
$resultado = pg_query($cx,$query_sql) or die('No se ejecuto el SQl');
$total_filas = pg_num_rows($resultado);									//echo "Filas: $total_filas"; //exit;

$object = new stdClass(); 
$object->type="FeatureCollection";

while ($fila = pg_fetch_assoc($resultado)) {
$object1 = new stdClass(); 
$object1->type="Feature";
$object3 = new stdClass();
$object3->type="Point";	
	$fila = array_map("utf8", $fila);//echo print_r($fila);
	$object2 = (object)$fila;
	$arr_fila[$i] = $object2; //echo print_r($arr_fila[$serial2]);
	$query_sql3 = " SELECT c.id, a.descripcion_item descripcion, u.nombre usuario, fecha_registro, estado, observacion
FROM control_hallazgos c left join usuarios u on (u.id=c.usuario::integer), actividades_hallazgos a 
WHERE c.id_item=a.id_item and c.id='".$fila['id']."'::integer ; ";
	$resultado3 = pg_query($cx,$query_sql3) or die('No se ejecuto el SQl');
	while ($fila3 = pg_fetch_assoc($resultado3)) {
		
		$fila3 = array_map("utf8", $fila3);//echo print_r($fila);
		$object2 = (object)$fila3;
		$object1->Properties = $object2;
		$k++;
	}
	//$object1->Properties = $arr_fila1;
	$query_sql2 = " Select registro_longitud longitud, registro_latitud latitud from control_hallazgos where id='".$fila['id']."'::integer; ";
	$resultado2 = pg_query($cx,$query_sql2) or die('No se ejecuto el SQl');
	while ($fila2 = pg_fetch_assoc($resultado2)) {
		
		$fila2 = array_map("utf8", $fila2);//echo print_r($fila);
		$object3->coordinates = Array($fila2['longitud'],$fila2['latitud']); //echo print_r($arr_fila[$serial2]);
		$j++;
	}
	$object1->geometry=$object3;
	$arr_feature[$i] = $object1;
	$i++;
	
}
$object->features = $arr_feature;


echo json_encode($object); 

function utf8($a) {
	return htmlentities($a,ENT_QUOTES,'UTF-8');  
}
?>

<?php 
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
include_once("conexion.php"); 

global $cx;	
$arr_fila = array();
$i = 0;
$tabla="tramos";
$campos="gid, origen,destino"; if(strlen($campos) == 0) $campos="*";
$condicion="departamento='6'";
$query_sql = "SELECT ".$campos." FROM ".$tabla;
if(strlen($condicion) > 0){
$query_sql = $query_sql." WHERE ".$condicion;
} 						
//echo "$query_sql"; 
$resultado = pg_query($cx,$query_sql) or die('No se ejecuto el SQl');
$total_filas = pg_num_rows($resultado);									//echo "Filas: $total_filas"; //exit;

while ($fila = pg_fetch_assoc($resultado)) {
	$fila = array_map("utf8", $fila);//echo print_r($fila);
	$object2 = (object)$fila;
	$arr_fila[$i] = $object2; //echo print_r($arr_fila[$serial2]);
	$i++;
}

$object = new stdClass(); 
$object = $arr_fila;

echo json_encode($object); 

function utf8($a) {
	return htmlentities($a,ENT_QUOTES,'UTF-8');  
}
?>

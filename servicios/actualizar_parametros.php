<?php 
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
include_once("conexion.php"); 

function arreglo_tabla($tablap) {
	global $cx;								//echo $tablap; //$tablap = "eventos_chequeo";
	$arr_fila = array();					//INICIALIZAMOS LA MATRIZ DE RESPUESTA
	$serial2 = 0;
	$query_sql = "SELECT * FROM ".$tablap; 						//echo "$query_sql<br>"; //	echo "Hola<br>";
	$resultado = pg_query($cx,$query_sql) or die('No pudo conectarse: ');
	$total_filas = pg_num_rows($resultado);									//echo "Filas: $total_filas<br>"; //exit;
	///////////////////////////////////////
	while ($fila = pg_fetch_assoc($resultado)) {
		$fila = array_map("utf8", $fila);//echo print_r($fila)."<br><br><br><br>";
		$object2 = (object)$fila;
		$arr_fila[$serial2] = $object2;
		$serial2++;
	}
	return $arr_fila; 
}
?>
<?php
$serial = 0;
$query_sql = "select id from info_sistema where estado_sincronizar = 'SI'"; //echo "$query_sql<br>";
$resultado = pg_query($cx,$query_sql) or die('No pudo conectarse ');
$total_filas = pg_num_rows($resultado);		//echo "Filas: $total_filas<br>";

$geters = array();			//INICIALIZAMOS LA MATRIZ DE RESPUESTA
$matriz_val=array();		//INICIALIZAMOS LA MATRIZ FILAS

//DEVUELVE la entrada
$object = new stdClass(); 					//(1)
if ($total_filas == 0){
	$object->encontrado = "false";			//(2)
}else{
	$object->encontrado = "true";			//(2)	
}
$geters[$serial] = $object; 				//(3)
$serial ++;
if ($object->encontrado == "true"){
	//Trae elementos tabla por tabla
	$tabla = "eventos_chequeo"; $object = new stdClass();$matriz_val = arreglo_tabla($tabla);$object->$tabla = $matriz_val; $geters[$serial] = $object; $serial ++;
	$tabla = "actividades"; $object = new stdClass();$matriz_val = arreglo_tabla($tabla);$object->$tabla = $matriz_val; $geters[$serial] = $object; $serial ++;
	$tabla = "actividades_hallazgos"; $object = new stdClass();$matriz_val = arreglo_tabla($tabla);$object->$tabla = $matriz_val; $geters[$serial] = $object; $serial ++;
	$tabla = "constructores"; $object = new stdClass();$matriz_val = arreglo_tabla($tabla);$object->$tabla = $matriz_val; $geters[$serial] = $object; $serial ++;
	$tabla = "tramos"; $object = new stdClass();$matriz_val = arreglo_tabla($tabla);$object->$tabla = $matriz_val; $geters[$serial] = $object; $serial ++;
	$tabla = "tipo_pendientes"; $object = new stdClass();$matriz_val = arreglo_tabla($tabla);$object->$tabla = $matriz_val; $geters[$serial] = $object; $serial ++;
	$tabla = "asignacion_tramo"; $object = new stdClass();$matriz_val = arreglo_tabla($tabla);$object->$tabla = $matriz_val; $geters[$serial] = $object; $serial ++;
}


echo json_encode($geters); 

function utf8($a) {
	return htmlentities($a,ENT_QUOTES,'UTF-8');  
}
?>

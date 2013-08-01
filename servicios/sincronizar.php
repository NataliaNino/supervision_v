<?php 
header('header("Content-type: text/javascript");');
header('Access-Control-Allow-Origin: *');
require_once("conexion.php"); ?>

<?php
if ($_POST['tabla'] == "lista_chequeo"){				/*	echo "Tabla: ".$_POST['tabla']."   Cod Env&iacute;o: ".$_POST['id']."   Tramo: ".$_POST['tramo']."   constructor: ".$_POST['constructor']."   fecha_supervision: ".$_POST['fecha_supervision']."   usuario: ".$_POST['usuario']."   item: ".$_POST['item']."   respuesta: ".$_POST['respuesta']."   observacion: ".$_POST['observacion']."<br>"; */
	$id_envio = $_POST['id'];
	$item = $_POST['item'];
	$tramo = $_POST['tramo'];
	$constructor = $_POST['constructor'];
	$fecha_supervision = $_POST['fecha_supervision'];
	$usuario = $_POST['usuario'];
	$respuesta = $_POST['respuesta'];
	$observacion =$_POST['observacion'];
	//VERIFICA SI LA LISTA DE CHEQUEO EXISTE
	$query_sql2 = "select count(*) from lista_chequeo where id_envio like '$id_envio'"; 	
	$resultado2 = pg_query($cx,$query_sql2) or die(pg_last_error());
	$arr_num_reg = pg_fetch_array($resultado2, 0, PGSQL_NUM);
	$reg_encontrados =  $arr_num_reg[0];							//$total_filas2 = pg_num_rows($resultado2);		//echo "$query_sql2"."      Filas: $reg_encontrados<br>";											//echo "Filas: $reg_encontrados<br>";	
	if ($reg_encontrados == 0){	//SI NO EXISTE LA LISTA DE CHEQUEO CREA EL REGISTRO EN LA BASE DE DATOS
		$query_sql_add = "insert into lista_chequeo (tramo,constructor,fecha_supervision,usuario, fecha_envio,id_envio) values ('$tramo','$constructor','$fecha_supervision','$usuario',now(),'$id_envio')"; //echo "$query_sql<br>";
		pg_query($cx,$query_sql_add) or die(pg_last_error()); 
		unset($query_sql_add);
		pg_query($cx, "COMMIT;"); 
	}
	$query_sql3 = "select lc.id from lista_chequeo lc where id_envio = '$id_envio'";
	$resultado3 = pg_query($cx,$query_sql3) or die(pg_last_error());	//CONSULTA DE NUEVO EL ID DE LA TABLA "lista_chequeo"
	$arr = pg_fetch_array($resultado3, 0, PGSQL_NUM); 		//TRAE EL PRIMER REGISTRO
	$id_lista =  $arr[0];									//ALMACENA EL ID EN UNA VARIABLE LOCAL
	
	//VERIFICA SI LA RESPUESTA YA EXISTE PARA EL ITEM
	$query_sql3 = "select count(*) from lista_chequeo_rtas where id_envio = '$id_envio' and item = '$item'"; 	
	$resultado3 = pg_query($cx,$query_sql3) or die(pg_last_error());
	$arr_num_reg_rt = pg_fetch_array($resultado3, 0, PGSQL_NUM);
	$reg_encontrados_rt =  $arr_num_reg_rt[0];							//$total_filas2 = pg_num_rows($resultado3);		//echo "$query_sql3"."      Filas: $reg_encontrados<br>";											//echo "Filas: $reg_encontrados<br>";	
	if ($reg_encontrados_rt == 0){	//SI NO EXISTE LA LISTA DE CHEQUEO CREA EL REGISTRO EN LA BASE DE DATOS
		//ALMACENA LA RESPUESTA EN LA BASE DE DATOS
		$query_sql_rt = "insert into lista_chequeo_rtas (id_lista,item,respuesta,observacion,id_envio) values ('$id_lista','$item','$respuesta','$observacion','$id_envio')"; //echo "$query_sql<br>";
		pg_query($cx,$query_sql_rt) or die(pg_last_error()); 
	}
	echo $item;
	pg_close($cx);
}elseif ($_POST['tabla'] == "avance_obra"){		//AVANCE DE OBRA	AVANCE DE OBRA	AVANCE DE OBRA	AVANCE DE OBRA	AVANCE DE OBRA	AVANCE DE OBRA
	$id_envio = $_POST['id'];
	$id_evento = $_POST['id_evento'];
	$tramo = $_POST['tramo'];
	$fecha_registro = $_POST['fecha_registro'];
	$nro_hilos = $_POST['nro_hilos'];
	$spam = $_POST['span'];
	$abscisa_inicial = $_POST['abscisa_inicial'];
	$abscisa_final = $_POST['abscisa_final'];
	$km_instalados = $_POST['km_instalados'];
	$km_detallados = $_POST['km_detallados'];
	$km_supervisados = $_POST['km_supervisados'];
	$longitud = $_POST['longitud'];							if($longitud == "" or $longitud == "undefined") {$longitud='null';}
	$latitud = $_POST['latitud'];							if($latitud == "" or $latitud == "undefined") {$latitud='null';}
	$exactitud = $_POST['exactitud'];						if($exactitud == "" or $exactitud == "undefined") {$exactitud='null';}
	$observacion = $_POST['observacion'];
	$usuario = $_POST['usuario'];
	$foto = $_POST['foto'];
	$constructor = $_POST['constructor'];
		if (isset($foto)){
			$decoded=base64_decode($foto);
			$nom_imagen = str_replace(":","_",$id_envio);
			file_put_contents('fotos/'.$nom_imagen.'.JPG',$decoded);
		}
	//VERIFICA SI EL REGISTRO DE AVANCE DE OBRA EXISTE
	$query_sql2 = "select count(*) from avance_obra where id_envio = '$id_envio'";
	$resultado2 = pg_query($cx,$query_sql2) or die(pg_last_error());
	$arr_num_reg = pg_fetch_array($resultado2, 0, PGSQL_NUM);
	$reg_encontrados =  $arr_num_reg[0];	
	if ($reg_encontrados == 0){	//SI NO EXISTE REGISTRO DE AVANCE DE OBRA, CREA LA TUPLA EN LA BASE DE DATOS			//echo $query_sql_add;
		$query_sql_add = "insert into avance_obra (id_evento,tramo,fecha_registro,nro_hilos,spam,abscisa_inicial,abscisa_final,km_instalados,km_detallados,km_supervisados,longitud,latitud,exactitud,observacion,usuario,fecha_digitacion,id_envio,constructor,url_foto) values 
		('$id_evento','$tramo','$fecha_registro','$nro_hilos','$spam','$abscisa_inicial','$abscisa_final','$km_instalados','$km_detallados','$km_supervisados',$longitud,$latitud,$exactitud,'$observacion','$usuario',now(),'$id_envio','$constructor','$nom_imagen.JPG')"; //echo "$query_sql_add<br>";
		pg_query($cx,$query_sql_add) or die(pg_last_error()); 
		unset($query_sql_add);
		pg_query($cx, "COMMIT;");
		echo $id_envio;
	}
	pg_close($cx); 
	/*$nombre_fichero = '/path/to/foo.txt';

if (file_exists($nombre_fichero)) {
    echo "El fichero $nombre_fichero existe";
} else {
    echo "El fichero $nombre_fichero no existe";
}*/
	
	
}elseif ($_POST['tabla'] == "control_hallazgos"){
	
	$id_envio = $_POST['id'];
	$id_item = $_POST['id_item'];
	$tramo = $_POST['tramo'];
	$constructor = $_POST['constructor'];
	$usuario = $_POST['usuario'];
	$usuario_cierre = $_POST['usuario_cierre'];
	$fecha_registro = $_POST['fecha_registro'];
	$fecha_cierre = $_POST['fecha_cierre'];					if($fecha_cierre == "" or $fecha_cierre == "undefined") {$fecha_cierre="2000-01-01 00:00:00";}
	$foto_registro = $_POST['foto_registro'];
		if (isset($foto_registro)){
			$decoded=base64_decode($foto_registro);
			$nom_imagen = str_replace(":","_",$id_envio);
			file_put_contents('fotos/'.$nom_imagen.'_0.JPG',$decoded);
		}
	$foto_cierre = $_POST['foto_cierre'];
		if (isset($foto_cierre)){
			$decoded=base64_decode($foto_cierre);
			$nom_imagen = str_replace(":","_",$id_envio);
			file_put_contents('fotos/'.$nom_imagen.'_1.JPG',$decoded);
		}
	$registro_longitud = $_POST['registro_longitud'];		if($registro_longitud == "" or $registro_longitud == "undefined") {$registro_longitud='null';}
	$registro_latitud = $_POST['registro_latitud'];			if($registro_latitud == "" or $registro_latitud == "undefined") {$registro_latitud='null';}
	$registro_exactitud = $_POST['registro_exactitud'];		if($registro_exactitud == "" or $registro_exactitud == "undefined") {$registro_exactitud='null';}
	$cierre_longitud = $_POST['cierre_longitud'];			if($cierre_longitud == "" or $cierre_longitud == "undefined") {$cierre_longitud='null';}
	$cierre_latitud = $_POST['cierre_latitud'];				if($cierre_latitud == "" or $cierre_latitud == "undefined") {$cierre_latitud='null';}
	$cierre_exactitud = $_POST['cierre_exactitud'];			if($cierre_exactitud == "" or $cierre_exactitud == "undefined") {$cierre_exactitud='null';}
	$estado = $_POST['estado'];
	$observacion = $_POST['observacion'];
	$observacion_cierre = $_POST['observacion_cierre'];

	//VERIFICA SI EL HALLAZGO EXISTE
	$query_sql2 = "select count(*) from control_hallazgos where id_envio = '$id_envio' and id_item = '$id_item'";
	$resultado2 = pg_query($cx,$query_sql2) or die(pg_last_error());
	$arr_num_reg = pg_fetch_array($resultado2, 0, PGSQL_NUM);
	$reg_encontrados =  $arr_num_reg[0];	
	if ($reg_encontrados == 0){	//SI NO EXISTE EL HALLAZGO, CREA EL REGISTRO EN LA BASE DE DATOS			//echo $query_sql_add;
		$query_sql_add = "insert into control_hallazgos (id_item,tramo,usuario,observacion,registro_longitud,registro_latitud,registro_exactitud,estado,id_envio,fecha_registro,fechasis,foto_registro,foto_cierre) values ('$id_item','$tramo','$usuario','$observacion',$registro_longitud,$registro_latitud,$registro_exactitud,'$estado','$id_envio','$fecha_registro',now(),'".$nom_imagen."_0.JPG','".$nom_imagen."_1.JPG')"; //echo "$query_sql<br>";	
		pg_query($cx,$query_sql_add) or die(pg_last_error()); 
		unset($query_sql_add);
		pg_query($cx, "COMMIT;"); 
	}
	else{				
		if ($estado == "CERRADO"){
			$query_sql_add = "update control_hallazgos set fecha_cierre='$fecha_cierre', usuario_cierre='$usuario', observacion_cierre='$observacion_cierre', estado='$estado',foto_registro='$id_envio_0.JPG',foto_cierre='$id_envio_1.JPG' where id_envio = '$id_envio' and id_item = '$id_item'"; //echo "$query_sql_add;<br>";		
			pg_query($cx,$query_sql_add) or die(pg_last_error()); 
			unset($query_sql_add);
			pg_query($cx, "COMMIT;");
			echo $id_item;
		}
	}
	pg_close($cx); 
}elseif ($_POST['tabla'] == "control_de_pendientes"){		//PENDIENTES	PENDIENTES	PENDIENTES	PENDIENTES	PENDIENTES	PENDIENTES	PENDIENTES
	$id_envio = $_POST['id'];
	$tipo_pendiente = $_POST['tipo_pendiente'];
	$tramo = $_POST['tramo'];
	$constructor = $_POST['constructor'];
	$usuario = $_POST['usuario'];
	$usuario_cierre = $_POST['usuario_cierre'];
	$fecha_registro = $_POST['fecha_registro'];
	$fecha_cierre = $_POST['fecha_cierre'];					if($fecha_cierre == "" or $fecha_cierre == "undefined") {$fecha_cierre="2000-01-01 00:00:00";}
	$foto_registro = $_POST['foto_registro'];
		if (isset($foto_registro)){
			$decoded=base64_decode($foto_registro);
			$nom_imagen = str_replace(":","_",$id_envio);
			file_put_contents('fotos/'.$nom_imagen.'_0.JPG',$decoded);
		}
	$foto_cierre = $_POST['foto_cierre'];
		if (isset($foto_cierre)){
			$decoded=base64_decode($foto_cierre);
			$nom_imagen = str_replace(":","_",$id_envio);
			file_put_contents('fotos/'.$nom_imagen.'_1.JPG',$decoded);
		}
	$registro_longitud = $_POST['registro_longitud'];		if($registro_longitud == "" or $registro_longitud == "undefined") {$registro_longitud='null';}
	$registro_latitud = $_POST['registro_latitud'];			if($registro_latitud == "" or $registro_latitud == "undefined") {$registro_latitud='null';}
	$registro_exactitud = $_POST['registro_exactitud'];		if($registro_exactitud == "" or $registro_exactitud == "undefined") {$registro_exactitud='null';}
	$cierre_longitud = $_POST['cierre_longitud'];			if($cierre_longitud == "" or $cierre_longitud == "undefined") {$cierre_longitud='null';}
	$cierre_latitud = $_POST['cierre_latitud'];				if($cierre_latitud == "" or $cierre_latitud == "undefined") {$cierre_latitud='null';}
	$cierre_exactitud = $_POST['cierre_exactitud'];			if($cierre_exactitud == "" or $cierre_exactitud == "undefined") {$cierre_exactitud='null';}
	$estado = $_POST['estado'];
	$observacion = $_POST['observacion'];
	$observacion_cierre = $_POST['observacion_cierre'];
	
	//VERIFICA SI EL HALLAZGO EXISTE
	$query_sql2 = "select count(*) from control_de_pendientes where id_envio = '$id_envio' and tipo_pendiente = '$tipo_pendiente'"; 	
	$resultado2 = pg_query($cx,$query_sql2) or die(pg_last_error());
	$arr_num_reg = pg_fetch_array($resultado2, 0, PGSQL_NUM);
	$reg_encontrados =  $arr_num_reg[0];	
	if ($reg_encontrados == 0){	//SI NO EXISTE EL HALLAZGO, CREA EL REGISTRO EN LA BASE DE DATOS			//echo $query_sql_add;
		$query_sql_add = "insert into control_de_pendientes (tipo_pendiente,tramo,constructor,usuario,observacion,registro_longitud,registro_latitud,registro_exactitud,estado,id_envio,fecha_registro,fecha_cierre,fechasis,foto_registro,foto_cierre) values ('$tipo_pendiente','$tramo','$constructor','$usuario','$observacion',$registro_longitud,$registro_latitud,$registro_exactitud,'$estado','$id_envio','$fecha_registro','$fecha_cierre',now(),'".$nom_imagen."_0.JPG','".$nom_imagen."_1.JPG')"; echo "$query_sql_add<br>";	
		pg_query($cx,$query_sql_add) or die(pg_last_error()); 
		unset($query_sql_add);
		pg_query($cx, "COMMIT;"); 
	}
	else{				//echo $query_sql_add;
		if ($estado == "CERRADO"){
			$query_sql_add = "update control_de_pendientes set fecha_cierre='$fecha_cierre', usuario_cierre='$usuario', observacion_cierre='$observacion_cierre', estado='$estado' where id_envio = '$id_envio' and tipo_pendiente = '$tipo_pendiente'"; //echo "$query_sql_add;<br>";		
			pg_query($cx,$query_sql_add) or die(pg_last_error()); 
			unset($query_sql_add);
			pg_query($cx, "COMMIT;");
			echo $tipo_pendiente;
		}
	}
	pg_close($cx); 
}
?>
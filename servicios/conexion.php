<?php
/***************************************************************/
/*  Fichero: conexion.php                                        */
/*  Descripcion:                              		           */
/*  Creado por JPG 20130604                                    */
/***************************************************************/
$dbname = "supervision_fibra";
$host = "localhost"; //$host = "192.168.0.113";
$port = "5432";
$dbuser = "postgres";
$dbpsw = "P0stgr3s";
$cx = pg_connect("host=$host port=$port dbname=$dbname user=$dbuser password=$dbpsw");	
//echo "CX ok <br>";
//phpinfo();

?>
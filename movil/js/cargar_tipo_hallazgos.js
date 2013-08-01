/**
 * @author juan.garzon 2013-JUN-20
 */
 var nombre_tramo = sessionStorage.getItem("nom_tramo");
 var nombre_constructor = sessionStorage.getItem("nom_constructor");
 var id_actividad = sessionStorage.getItem("id_actividad");
 var id_tramo = sessionStorage.getItem("id_tramo");
 var id_constructor = sessionStorage.getItem("id_constructor");
 var id_usuario = sessionStorage.getItem("id");
 var id_actividad;
 
 
 $("#n_constructor").html("<strong>Constructor: "+nombre_constructor+"</strong>");
 $("#n_tramo").html("<strong>Tramo: "+nombre_tramo+"</strong><br><br><br>");
 
 var db = window.openDatabase("bdmovil", "1.0", "Proyecto Supervisión Azteca", 200000);
 

 function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
    	alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
   	}
}

function successCB() {
    //alert("TRANSACION Ok!");
}

 
function Cargar_lista(){	//alert("cargar lista");		//$("<option value='0'>juancho</option>").appendTo("#constructor");	//adicionar_cons();		//$.mobile.showPageLoadingMsg();
	var num_cons = $('#actividad option').length; //alert(num_cons);
	if (num_cons == 0)
	{
		db.transaction(ObtenerItems);
	}
}

function ObtenerItems(tx) {
    tx.executeSql('select distinct ac.id,ec.descripcion_etapa,ac.descripcion_actividad from eventos_chequeo ec inner join actividades ac on ec.id = ac.id_evento inner join actividades_hallazgos ah on ah.id_actividad = ac.id where tipo_rta = "SELECCION" order by ec.descripcion_etapa,ac.descripcion_actividad', [], MuestraItems);
}
function MuestraItems(tx, results) {
    var len = results.rows.length;	
	$("#items").html("");
    $("<option value='0'> </option>").appendTo("#actividad");												//alert(len);
    for (var i=0; i<len; i++){		//alert("<option value='"+results.rows.item(i).id+"'>"+results.rows.item(i).descripcion_pend+"</option>");
    	$("<option value='"+results.rows.item(i).id+"'>"+results.rows.item(i).descripcion_etapa+'║'+results.rows.item(i).descripcion_actividad+"</option>").appendTo("#actividad");
    }
    $("#actividad option[value=0]").attr("selected",true); 
}

function CargarObtenerItems(tx) {
	$.mobile.showPageLoadingMsg();
    tx.executeSql('SELECT * FROM actividades_hallazgos where id_actividad = "'+id_actividad+'" and tipo_rta = "SELECCION" and activo like "S%"', [], MuestraCargarObtenerItems);
    $.mobile.hidePageLoadingMsg();
}
function MuestraCargarObtenerItems(tx, results) {
	var len = results.rows.length;	//alert(len);
    $('<option value="0"></option>').appendTo("#items");	
	for (i = 0; i < len; i++){
		var id_item = results.rows.item(i).id_item;
			$("<option value='"+id_item+"'>"+results.rows.item(i).descripcion_item+"</option>").appendTo("#items");
   	}
  	
}

function GuardarItems(){
	db.transaction(GuardarItemsExe, errorCB);
}
function GuardarItemsExe(tx) {	//alert('Registro: '+fil+': '+arr_ListaTabla[fil]);				//alert('DROP TABLE IF EXISTS '+arr_ListaTabla[fil][0]+';');	//tx.executeSql('DROP TABLE IF EXISTS '+arr_ListaTabla[fil][0]);				//alert('CREATE TABLE IF NOT EXISTS '+arr_ListaTabla[fil][0]+' ('+arr_ListaTabla[fil][1]+')');	//alert('DROP TABLE IF EXISTS control_de_pendientes');
	//tx.executeSql('DROP TABLE IF EXISTS control_hallazgos');
	tx.executeSql('CREATE TABLE IF NOT EXISTS control_hallazgos ("id" CHAR,"id_item" CHAR,"tramo" CHAR,"constructor" CHAR, "usuario" CHAR, "usuario_cierre" CHAR, "fecha_registro" CHAR ,"fecha_cierre" CHAR ,"foto_registro" CHAR ,"foto_cierre" CHAR ,"registro_longitud" CHAR,"registro_latitud" CHAR,"registro_exactitud" CHAR,"cierre_longitud" CHAR ,"cierre_latitud" CHAR,"cierre_exactitud" CHAR,"estado" CHAR ,"observacion" CHAR,"observacion_cierre" CHAR)');			/*	//tx.executeSql('DROP TABLE IF EXISTS control_de_actividads');//alert('DROP TABLE IF EXISTS control_de_pendientes');	tx.executeSql('CREATE TABLE IF NOT EXISTS control_de_pendientes ("id" CHAR ,"tramo" CHAR ,"constructor" CHAR ,"usuario" CHAR ,"tipo_pendiente" CHAR ,"fecha_registro" CHAR ,"fecha_cierre" CHAR ,"foto_registro" CHAR ,"foto_cierre" CHAR ,"registro_longitud" CHAR ,"registro_latitud" CHAR ,"cierre_longitud" CHAR ,"cierre_latitud" CHAR ,"estado" CHAR ,"observacion" CHAR,"observacion_cierre" CHAR )'); */
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
	var id_unico = fecha_captura+'-'+id_tramo+'-'+id_constructor;	//alert(id_unico);	//2001-09-28 01:00:00
	var id_item = $("#items").val();
	var observacion = $("#observacion_pen").val();			//alert('INSERT INTO control_hallazgos (id,tramo,constructor,usuario,id_item,fecha_registro,estado,observacion,registro_latitud,registro_longitud,registro_exactitud,foto_registro) values ("'+id_unico+'","'+id_tramo+'","'+id_constructor+'","'+id_usuario+'","'+id_item+'","'+fecha_captura+'","ABIERTO","'+observacion+'","'+myLatitud+'","'+myLongitud+'","'+myPrecision+'","'+imagenfo+'")');
	tx.executeSql('INSERT INTO control_hallazgos (id,tramo,constructor,usuario,id_item,fecha_registro,estado,observacion,registro_latitud,registro_longitud,registro_exactitud,foto_registro) values ("'+id_unico+'","'+id_tramo+'","'+id_constructor+'","'+id_usuario+'","'+id_item+'","'+fecha_captura+'","ABIERTO","'+observacion+'","'+myLatitud+'","'+myLongitud+'","'+myPrecision+'","'+imagenfo+'")'); //
	alert("Información almacenada exitosamente");			//alert("Editar el menu");
	window.location = "Hallazgos.html"; 
}

Cargar_lista();


$(document).ready(function(){
	$("#btn_guardar").click(function () {			//alert("li Click");
		var id_pendiente = $("#actividad").val();	//alert("COns: "+id_constructor);
		if (id_pendiente == 0){
			alert("Seleccione la actividad!");
			$("#actividad").focus();
			return false;
		}
		var id_hallazgo = $("#items").val();	//alert("COns: "+id_constructor);
		if (id_hallazgo == 0){
			alert("Seleccione el Hallazgo!");
			$("#items").focus();
			return false;
		}
		var observacion_pen = $("#observacion_pen").val();
		if (observacion_pen == 0){
			alert("Ingrese la observación,  por favor!");
			$("#observacion_pen").focus();
			return false;
		}	
		//alert("Guardar");
		GuardarItems();	
	})
	
	$("#btn_cancelar").click(function () {
		window.location = "Hallazgos.html";
	})
	
	$("#actividad").change(function () {			
		id_actividad = $(this).val(); 	//alert($(this).val());
		$("#items").empty();
		if(id_actividad>0){
			db.transaction(CargarObtenerItems);		//alert("actividad: "+id_actividad);
		}
	})
})

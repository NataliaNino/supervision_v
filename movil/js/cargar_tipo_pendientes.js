/**
 * @author juan.garzon 2013-JUN-20
 */
 var nombre_tramo = sessionStorage.getItem("nom_tramo");
 var nombre_constructor = sessionStorage.getItem("nom_constructor");
 var id_actividad = sessionStorage.getItem("id_actividad");
 var id_tramo = sessionStorage.getItem("id_tramo");
 var id_constructor = sessionStorage.getItem("id_constructor");
 var id_usuario = sessionStorage.getItem("id");
 
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
	var num_cons = $('#Pendiente option').length; //alert(num_cons);
	if (num_cons == 0)
	{
		db.transaction(ObtenerItems);
	}
}
function ObtenerItems(tx) {
    tx.executeSql('SELECT * FROM tipo_pendientes', [], MuestraItems);
}

function MuestraItems(tx, results) {
    var len = results.rows.length;	
    $("<option value='0'> </option>").appendTo("#Pendiente");												//alert(len);
    for (var i=0; i<len; i++){		//alert("<option value='"+results.rows.item(i).id+"'>"+results.rows.item(i).descripcion_pend+"</option>");
    	$("<option value='"+results.rows.item(i).id+"'>"+results.rows.item(i).descripcion_pend+"</option>").appendTo("#Pendiente");
    } 
}

function GuardarItems(){
	db.transaction(GuardarItemsExe, errorCB);
}
function GuardarItemsExe(tx) {	//alert('Registro: '+fil+': '+arr_ListaTabla[fil]);				//alert('DROP TABLE IF EXISTS '+arr_ListaTabla[fil][0]+';');	//tx.executeSql('DROP TABLE IF EXISTS '+arr_ListaTabla[fil][0]);				//alert('CREATE TABLE IF NOT EXISTS '+arr_ListaTabla[fil][0]+' ('+arr_ListaTabla[fil][1]+')');
	//tx.executeSql('DROP TABLE IF EXISTS control_de_pendientes');//alert('DROP TABLE IF EXISTS control_de_pendientes');
	tx.executeSql('CREATE TABLE IF NOT EXISTS control_de_pendientes ("id" CHAR ,"tramo" CHAR ,"constructor" CHAR ,"usuario" CHAR ,"tipo_pendiente" CHAR ,"fecha_registro" CHAR ,"fecha_cierre" CHAR ,"foto_registro" CHAR ,"foto_cierre" CHAR, "registro_longitud" CHAR, "registro_latitud" CHAR, "registro_exactitud" CHAR,"cierre_longitud" CHAR, "cierre_latitud" CHAR, "cierre_exactitud" CHAR,"estado" CHAR ,"observacion" CHAR,"observacion_cierre" CHAR )');
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
	var id_unico = fecha_captura+'-'+id_tramo+'-'+id_constructor;	//alert(id_unico);	//2001-09-28 01:00:00
	var tipo_pendiente = $("#Pendiente").val();
	var observacion = $("#observacion_pen").val();			//alert('INSERT INTO control_de_pendientes (id,tramo,constructor,usuario,tipo_pendiente,fecha_registro,estado,observacion) values ("'+id_unico+'","'+id_tramo+'","'+id_constructor+'","'+id_usuario+'","'+tipo_pendiente+'","'+fecha_captura+'","ABIERTO","'+observacion+'")');
	tx.executeSql('INSERT INTO control_de_pendientes (id,tramo,constructor,usuario,tipo_pendiente,fecha_registro,foto_registro,registro_longitud,registro_latitud,registro_exactitud,estado,observacion) values ("'+id_unico+'","'+id_tramo+'","'+id_constructor+'","'+id_usuario+'","'+tipo_pendiente+'","'+fecha_captura+'","'+imagenfo+'","'+myLongitud+'","'+myLatitud+'","'+myPrecision+'","ABIERTO","'+observacion+'")');
	alert("Información almacenada exitosamente");			//alert("Editar el menu");
	window.location = "Pendientes.html";
}

Cargar_lista();
$(document).ready(function(){
	$("#btn_guardar").click(function () {			//alert("li Click");
		var id_pendiente = $("#Pendiente").val();	//alert("COns: "+id_constructor);
		if (id_pendiente == 0){
			alert("Seleccione el tipo de pendiente por favor!");
			$("#Pendiente").focus();
			return false;
		}
		var observacion_pen = $("#observacion_pen").val();
		if (observacion_pen == 0){
			alert("Ingrese la observación,  por favor!");
			$("#observacion_pen").focus();
			return false;
		}	
		GuardarItems();	
	})
	$("#btn_cancelar").click(function () {
		window.location = "Pendientes.html";
	})
})

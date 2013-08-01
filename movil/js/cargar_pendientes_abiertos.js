/**
 * @author juan.garzon 2013-JUN-30
 */
 var nombre_tramo = sessionStorage.getItem("nom_tramo");
 var nombre_constructor = sessionStorage.getItem("nom_constructor");
 var id_actividad = sessionStorage.getItem("id_actividad");
 var id_tramo = sessionStorage.getItem("id_tramo");
 var id_constructor = sessionStorage.getItem("id_constructor");
 var id_usuario = sessionStorage.getItem("id");
 
 $("#n_constructor").html("<strong>Constructor: "+nombre_constructor+"</strong>");
 $("#n_tramo").html("<strong>Tramo: "+nombre_tramo+"</strong><br><br><br>");					//$("#menu").html('<a data-role="button" data-theme="a">AFSDFASDF</a>');  //data-icon="arrow-r" data-iconpos="right"//$("#menu").html('<select name="constructor" id="constructor" data-native-menu="true"></select><br>');
	
var db = window.openDatabase("bdmovil", "1.0", "Proyecto Supervisión Azteca", 200000);

function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
    	alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
   	}
}

function error_tabla(err) {
		alert("NO hay Pendientes por cerrar");
		window.location = "Pendientes.html";
}

function successCB() {
    //alert("TRANSACION Ok!");
}

function ConsultaItems(tx) {	//alert('SELECT * FROM actividades_hallazgos');
	tx.executeSql('SELECT * FROM control_de_pendientes cp inner join tipo_pendientes tp on cp.tipo_pendiente = tp.id where tramo = '+id_tramo+' and constructor = '+id_constructor+' and estado like "ABIERTO%" order by id', [], ConsultaItemsCarga,error_tabla);
}
function ConsultaItemsCarga(tx, results) {
    var len = results.rows.length; //alert("reg: "+len);
    if (len>0){	
	    $("<option value='0'> </option>").appendTo("#Pendiente");												//alert(len);
	    for (var i=0; i<len; i++){		//alert("<option value='"+results.rows.item(i).id+"'>"+results.rows.item(i).descripcion_pend+"</option>");
	    	$("<option value='"+results.rows.item(i).id+"'>"+results.rows.item(i).descripcion_pend+'║'+results.rows.item(i).fecha_registro+'║'+results.rows.item(i).observacion+"</option>").appendTo("#Pendiente");
	    }
	}else
	{
		alert("NO hay Pendientes por cerrar");
		window.location = "Pendientes.html";
		return false;
	} 
}


function GuardarItems(){
	db.transaction(GuardarItemsExe, errorCB);
}
function GuardarItemsExe(tx) {	//alert('Registro: '+fil+': '+arr_ListaTabla[fil]);				//alert('DROP TABLE IF EXISTS '+arr_ListaTabla[fil][0]+';');	//tx.executeSql('DROP TABLE IF EXISTS '+arr_ListaTabla[fil][0]);				//alert('CREATE TABLE IF NOT EXISTS '+arr_ListaTabla[fil][0]+' ('+arr_ListaTabla[fil][1]+')');
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
	var id_pendiente = $("#Pendiente").val();
	var observacion = $("#observacion_pen").val();			//	alert('UPDATE control_de_pendientes  set estado = "CERRADO",fecha_ciere="'+fecha_captura+'",observacion_cierre = "'+observacion+'" where id= "'+id_pendiente+'"');
	tx.executeSql('UPDATE control_de_pendientes set estado = "CERRADO",fecha_cierre="'+fecha_captura+'",foto_cierre="'+imagenfo+'",cierre_longitud="'+myLongitud+'",cierre_latitud="'+myLatitud+'",cierre_exactitud="'+myPrecision+'",observacion_cierre = "'+observacion+'" where id= "'+id_pendiente+'"');
	alert("Información almacenada exitosamente");			//alert("Editar el menu");
	window.location = "Pendientes.html";
}


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

// CARGAR MENU DE LA BASE DE DATOS
db.transaction(ConsultaItems); 
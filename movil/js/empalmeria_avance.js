var db = window.openDatabase("bdmovil", "1.0", "Proyecto Supervisión Azteca", 200000);
var nombre_tramo = sessionStorage.getItem("nom_tramo");
var nombre_constructor = sessionStorage.getItem("nom_constructor");
 var id_usuario = sessionStorage.getItem("id");
 var id_tramo = sessionStorage.getItem("id_tramo");
 var id_constructor = sessionStorage.getItem("id_constructor");
var i=0;

 $("#n_constructor").html("<strong>Constructor: "+nombre_constructor+"</strong>");
 $("#n_tramo").html("<strong>Tramo: "+nombre_tramo+"</strong><br><br><br>");

function errorCB(err) {
	if (err.code != "undefined" && err.message != "undefined"){
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
	}
}
function successCB() {
    //alert("Ok!");
}

function TBLavance_obra(tx) {//Si no existe crea la talba avance_obra
	//tx.executeSql('DROP TABLE IF EXISTS avance_obra');		
	tx.executeSql('CREATE TABLE IF NOT EXISTS avance_obra (id_unico TEXT, tramo TEXT,constructor TEXT, supervisor TEXT, nro_hilos TEXT, span TEXT, abscisa_inicial TEXT, abscisa_final TEXT,km_instalados TEXT, km_detallados TEXT, km_supervisados TEXT,de_punto TEXT, a_punto TEXT, odf TEXT, fecha_registro TEXT, latitud TEXT, longitud TEXT, exactitud TEXT, foto TEXT)');
}

db.transaction(TBLavance_obra);

$(document).ready(function(){
	$("#adicionar").click( function () {	//alert('agregar');		
	i++;
	$("#t_avance").after("<div id='avance"+i+"'><br><label>Del Punto</label><input id='punto_ini"+i+"' type='number' onkeypress='if (event.keyCode< 48 || event.keyCode > 57) event.returnValue = false;' required /><br><label>Al  Punto</label><input id='punto_fin"+i+"' type='number' onkeypress='if (event.keyCode< 48 || event.keyCode > 57) event.returnValue = false;' required/><br><label>Se realiza ODF</label><input type='radio' id='odf"+i+"' name='odf"+i+"' value='SI'><label for='odf"+i+"'> SI</label></input><input type='radio' id='odf"+i+"' name='odf"+i+"' value='NO'><label for='odf"+i+"'> NO</label></input>	<button class='button medium blue_small' id='remover' onclick='remove_avance("+i+")'>--</button></div>");
	});
});

$(document).ready(function(){
	$("#guardar").click( function () {	//alert('guardar');	
	
	db.transaction(insert_avance);

	});
});


function remove_avance(j){		
	$("#avance"+j).remove();	
}

function insert_avance(tx){ //alert('insertar');	
	
		for (k = 0; k < i+1; k++){	//alert(k);
			var punto_ini = $("#punto_ini"+k).val();
			var punto_fin = $("#punto_fin"+k).val();
			var odf = $("#odf"+k).val();
			var now = new Date();
			var fecha_captura = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
			var id_unico = fecha_captura+'-'+id_tramo+'-'+id_constructor;
			//alert(hilos);
			//alert('INSERT INTO avance_obra (id_unico,tramo,constructor,supervisor,nro_hilos,span,abscisa_inicial,abscisa_final,km_instalados,km_supervisados,km_detallados,fecha_registro, latitud, longitud, exactitud, foto) values ("'+id_unico+'","'+id_tramo+'","'+id_constructor+'","'+id_usuario+'","'+hilos+'","'+span+'","'+abs_inicial+'","'+abs_final+'","'+instalados+'","'+supervisados+'","'+detallados+'","'+fecha_captura+'","'+myLatitud+'","'+myLongitud+'","'+myPrecision+'","'+imagenfo+'")');
			tx.executeSql('INSERT INTO avance_obra (id_unico,tramo,constructor,supervisor,de_punto,a_punto,odf,fecha_registro, latitud, longitud, exactitud) values ("'+id_unico+'","'+id_tramo+'","'+id_constructor+'","'+id_usuario+'","'+punto_ini+'","'+punto_fin+'","'+odf+'","'+fecha_captura+'","'+myLatitud+'","'+myLongitud+'")');
			alert("Información almacenada exitosamente");
			window.location = "Tendido.html";
		}
}


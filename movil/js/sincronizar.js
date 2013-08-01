/**
 * @author juan.garzon 2013-JUN-20
 * @Mod juan.garzon 2013-JUL-20		
 */
	var nombre_supervisor = sessionStorage.getItem("nombre");
 	var nombre_tramo = sessionStorage.getItem("nom_tramo");
 	var nombre_constructor = sessionStorage.getItem("nom_constructor");

 $("#n_supervisor").html("<strong>Supervisor: "+nombre_supervisor+"</strong><br>");
 $("#n_constructor").html("<strong>Constructor: "+nombre_constructor+"</strong>");
 $("#n_tramo").html("<strong>Tramo: "+nombre_tramo+"</strong><br><br><br>");					//$("#menu").html('<a data-role="button" data-theme="a">AFSDFASDF</a>');  //data-icon="arrow-r" data-iconpos="right"//$("#menu").html('<select name="constructor" id="constructor" data-native-menu="true"></select><br>');
	
var db = window.openDatabase("bdmovil", "1.0", "Proyecto Supervisión Azteca", 200000);

function errorCB_items(err) {
	if (err.code === undefined || err.message === undefined){
		$("#total_actualizados").before("<br>No hay Items para sincronizar.<br>");
	}else
	{ 
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);		
	}
}
function errorCB_Avance(err) {
	if (err.code === undefined || err.message === undefined){
		$("#total_actualizados").before("<br>No hay Información de Avance de Obra para sincronizar.<br>");
	}else
	{ 
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);		
	}
}
function errorCB_pendientes(err) {
	if (err.code === undefined || err.message === undefined){
		$("#total_actualizados").before("<br>No hay Pendientes para sincronizar.<br>");
	}else
	{ 
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);		
	}
	$("#btn_cancelar").show();
}
function errorCB_hallazgos(err) {
	if (err.code === undefined || err.message === undefined){
		$("#total_actualizados").before("<br>No hay Hallazgos para sincronizar.<br>");
	}else
	{ 
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);		
	}
}

function ConsultaSincronizar(tx) {
	tx.executeSql('SELECT * FROM lista_chequeo_rtas', [], ConsultaSincronizarCarga,errorCB_items);
}
function ConsultaSincronizarCarga(tx, results) {
	//$.mobile.showPageLoadingMsg();
	var len = results.rows.length;									//alert(len);
	$("#total_actualizados").before("<br>Items encontrados: "+len+".<br>");
	for (i = 0; i < len; i++){
		var parametros = new Object();
		parametros['tabla'] = 'lista_chequeo';
		parametros['id'] = results.rows.item(i).id;
		parametros['tramo'] = results.rows.item(i).tramo;
		parametros['constructor'] = results.rows.item(i).constructor;
		parametros['fecha_supervision'] = results.rows.item(i).fecha_supervision;
		parametros['usuario'] = results.rows.item(i).usuario;
		parametros['item'] = results.rows.item(i).item;
		parametros['respuesta'] = results.rows.item(i).respuesta;
		parametros['observacion'] = results.rows.item(i).observacion;
		var id_guardar = results.rows.item(i).id;

		$.ajax({
			data:  parametros,
			url:'http://200.21.69.126:8088/supervision_fibra_optica/servicios/sincronizar.php?',		//url:'http://localhost:808/servicios/sincronizar.php?',
			type:  'post',
			async: false,			// timeout: 30000,
		    beforeSend: function () {
		            $("#resultado").html("Procesando, espere por favor...");
		    },
			success: function(response){
				$("#resultado").before(response);
				db.transaction(function(tx) {
				var item_rta = response.trim();			//alert(item_rta);	//alert(id_guardar +'   ----   '+ response);	//alert(item_rta);
		          //tx.executeSql('DELETE from lista_chequeo_rtas where id = "'+id_guardar+'" and item = "'+item_rta+'"');
		        });
			},
			error: function (error) {
				$("#resultado").text('Error en el ingreso de respuestas de lista de chequeo');
		    }
		})
	
   };
   	//$.mobile.hidePageLoadingMsg();
	//alert("Sincronización Exitosa");
	//window.location = "menu_principal.html";
}

//SINCRONIZAR AVANCE DE OBRA	-	AVANCE DE OBRA		-		AVANCE DE OBRA		-		AVANCE DE OBRA
function ConsultaSincronizarAvance(tx) {
	tx.executeSql('SELECT * FROM avance_obra', [], ConsultaSincronizarAvanceCarga,errorCB_Avance);
}
function ConsultaSincronizarAvanceCarga(tx, results) {
	//$.mobile.showPageLoadingMsg();
	var len = results.rows.length;									//alert(len);
	$("#total_actualizados").before("<br>Registros de Avance de Obra encontrados: "+len+".<br>");
	for (i = 0; i < len; i++){
		var parametros = new Object();
		parametros['tabla'] = 'avance_obra';
		parametros['id'] = results.rows.item(i).id_unico;
		parametros['tramo'] = results.rows.item(i).tramo;
		parametros['constructor'] = results.rows.item(i).constructor;
		parametros['usuario'] = results.rows.item(i).supervisor;
		parametros['nro_hilos'] = results.rows.item(i).nro_hilos;
		parametros['span'] = results.rows.item(i).span;				//parametros['id_item'] = results.rows.item(i).id_item;
		parametros['abscisa_inicial'] = results.rows.item(i).abscisa_inicial;
		parametros['abscisa_final'] = results.rows.item(i).abscisa_final;
		parametros['km_instalados'] = results.rows.item(i).km_instalados;
		parametros['km_detallados'] = results.rows.item(i).km_detallados;
		parametros['km_supervisados'] = results.rows.item(i).km_supervisados;
		parametros['fecha_registro'] = results.rows.item(i).fecha_registro;
		parametros['latitud'] = results.rows.item(i).latitud;
		parametros['longitud'] = results.rows.item(i).longitud;	//alert(results.rows.item(i).registro_longitud);
		parametros['exactitud'] = results.rows.item(i).exactitud;
		parametros['foto'] = results.rows.item(i).foto;			//alert(results.rows.item(i).foto_registro);
		parametros['id_evento'] = results.rows.item(i).id_evento;
		
		var id_guardar = results.rows.item(i).id_unico;
		$.ajax({
			data:  parametros,
			url:'http://200.21.69.126:8088/supervision_fibra_optica/servicios/sincronizar.php?',		//url:'http://localhost:808/servicios/sincronizar.php?',
			type:  'post',
			async: false,		//timeout: 30000,
		    beforeSend: function () {
		            $("#resultado").html("Procesando, espere por favor...");
		    },
			success: function(response){
				$("#resultado").before(response);
				db.transaction(function(tx) {
				//var item_rta = response.trim();			//alert(item_rta);	//alert(id_guardar +'   ----   '+ response);	//alert(item_rta);
		          //tx.executeSql('DELETE from control_de_pendientes where id = "'+id_guardar+'" and id_item = "'+id_item+'"');
		        });
			},
			error: function (error) {
				$("#resultado").text('Error en ingreso de avance de Obra');
		    }
		})
	
   	}
	//alert("Sincronización Exitosa");
	//window.location = "menu_principal.html";
	//$.mobile.hidePageLoadingMsg();
}	

//SINCRONIZAR HALLAZGOS
function ConsultaSincronizarHallazgos(tx) {
	tx.executeSql('SELECT * FROM control_hallazgos', [], ConsultaSincronizarHallazgosCarga,errorCB_hallazgos);
}
function ConsultaSincronizarHallazgosCarga(tx, results) {
	//$.mobile.showPageLoadingMsg();
	var len = results.rows.length;									//alert(len);
	$("#total_actualizados").before("<br>Hallazgos encontrados: "+len+".<br>");
	for (i = 0; i < len; i++){
		var parametros = new Object();
		parametros['tabla'] = 'control_hallazgos';
		parametros['id'] = results.rows.item(i).id;
		parametros['id_item'] = results.rows.item(i).id_item;
		parametros['tramo'] = results.rows.item(i).tramo;
		parametros['constructor'] = results.rows.item(i).constructor;
		parametros['usuario'] = results.rows.item(i).usuario;
		parametros['usuario_cierre'] = results.rows.item(i).usuario_cierre;
		parametros['fecha_registro'] = results.rows.item(i).fecha_registro;
		parametros['fecha_cierre'] = results.rows.item(i).fecha_cierre;
		parametros['foto_registro'] = results.rows.item(i).foto_registro;			//alert(results.rows.item(i).foto_registro);
		parametros['foto_cierre'] = results.rows.item(i).foto_cierre;
		parametros['registro_longitud'] = results.rows.item(i).registro_longitud;
		parametros['registro_latitud'] = results.rows.item(i).registro_latitud;
		parametros['registro_exactitud'] = results.rows.item(i).registro_exactitud;
		parametros['cierre_longitud'] = results.rows.item(i).cierre_longitud;
		parametros['cierre_latitud'] = results.rows.item(i).cierre_latitud;
		parametros['cierre_exactitud'] = results.rows.item(i).cierre_exactitud;
		parametros['estado'] = results.rows.item(i).estado;
		parametros['observacion'] = results.rows.item(i).observacion;
		parametros['observacion_cierre'] = results.rows.item(i).observacion_cierre;

		//alert(results.rows.item(i).registro_longitud);

		var id_guardar = results.rows.item(i).id;
		var id_item = results.rows.item(i).id_item;
		
		$.ajax({
			data:  parametros,
			url:'http://200.21.69.126:8088/supervision_fibra_optica/servicios/sincronizar.php?',		//url:'http://localhost:808/servicios/sincronizar.php?',
			type:  'post',
			async: false,			//timeout: 30000,
		    beforeSend: function () {
		            $("#resultado").html("Procesando, espere por favor...");
		    },
			success: function(response){
				$("#resultado").before(response);
				db.transaction(function(tx) {
				//var item_rta = response.trim();			//alert(item_rta);	//alert(id_guardar +'   ----   '+ response);	//alert(item_rta);
		          //tx.executeSql('DELETE from control_hallazgos where id = "'+id_guardar+'" and id_item = "'+id_item+'"');
		        });
			},
			error: function (error) {
				$("#resultado").text('Error en el ingreso de Hallazgos');
		    }
		})
	
   	}
   	//$.mobile.hidePageLoadingMsg();
	//alert("Sincronización Exitosa");
	//window.location = "menu_principal.html";
}


//SINCRONIZAR PENDIENTES
function ConsultaSincronizarPendientes(tx) {
	tx.executeSql('SELECT * FROM control_de_pendientes', [], ConsultaSincronizarPendientesCarga,errorCB_pendientes);
}
function ConsultaSincronizarPendientesCarga(tx, results) {
	//$.mobile.showPageLoadingMsg();
	var len = results.rows.length;									//alert(len);
	$("#total_actualizados").before("<br>Pendientes encontrados: "+len+".<br>");
	for (i = 0; i < len; i++){
		var parametros = new Object();
		parametros['tabla'] = 'control_de_pendientes';
		parametros['id'] = results.rows.item(i).id;
		parametros['tramo'] = results.rows.item(i).tramo;
		parametros['constructor'] = results.rows.item(i).constructor;
		parametros['usuario'] = results.rows.item(i).usuario;
		parametros['tipo_pendiente'] = results.rows.item(i).tipo_pendiente;
		parametros['fecha_registro'] = results.rows.item(i).fecha_registro;
		parametros['fecha_cierre'] = results.rows.item(i).fecha_cierre;				//parametros['id_item'] = results.rows.item(i).id_item;
		parametros['foto_registro'] = results.rows.item(i).foto_registro;			//alert(results.rows.item(i).foto_registro);
		parametros['foto_cierre'] = results.rows.item(i).foto_cierre;
		parametros['registro_longitud'] = results.rows.item(i).registro_longitud;	//alert(results.rows.item(i).registro_longitud);
		parametros['registro_latitud'] = results.rows.item(i).registro_latitud;
		parametros['registro_exactitud'] = results.rows.item(i).registro_exactitud;
		parametros['cierre_longitud'] = results.rows.item(i).cierre_longitud;
		parametros['cierre_latitud'] = results.rows.item(i).cierre_latitud;
		parametros['cierre_exactitud'] = results.rows.item(i).cierre_exactitud;
		parametros['estado'] = results.rows.item(i).estado;
		parametros['observacion'] = results.rows.item(i).observacion;
		parametros['observacion_cierre'] = results.rows.item(i).observacion_cierre;
		
		var id_guardar = results.rows.item(i).id;
		var tipo_pendiente = results.rows.item(i).tipo_pendiente;
		
		$.ajax({
			data:  parametros,
			url:'http://200.21.69.126:8088/supervision_fibra_optica/servicios/sincronizar.php?',		//url:'http://localhost:808/servicios/sincronizar.php?',
			type:  'post',
			async: false,		//timeout: 30000,
		    beforeSend: function () {
		            $("#resultado").html("Procesando, espere por favor...");
		    },
			success: function(response){
				$("#resultado").before(response);
				db.transaction(function(tx) {
				//var item_rta = response.trim();			//alert(item_rta);	//alert(id_guardar +'   ----   '+ response);	//alert(item_rta);
		          //tx.executeSql('DELETE from control_de_pendientes where id = "'+id_guardar+'" and id_item = "'+id_item+'"');
		        });
			},
			error: function (error) {
				$("#resultado").text('Error en el ingreso de pendientes');
		    }
		})
	
   	}
   	$("#btn_cancelar").show();
	//alert("Sincronización Exitosa");
	//window.location = "menu_principal.html";
	//$.mobile.hidePageLoadingMsg();
}


// CARGAR MENU DE LA BASE DE DATOS
$("#btn_cancelar").hide();

db.transaction(ConsultaSincronizar);
db.transaction(ConsultaSincronizarAvance);
db.transaction(ConsultaSincronizarHallazgos);
db.transaction(ConsultaSincronizarPendientes);


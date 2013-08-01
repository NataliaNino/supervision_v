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

function ConsultaItems(tx) {	//alert('SELECT * FROM actividades_hallazgos');
	tx.executeSql('SELECT * FROM actividades_hallazgos where id_actividad = "'+id_actividad+'" and activo like "S%"', [], ConsultaItemsCarga);
}
function ConsultaItemsCarga(tx, results) {
	var len = results.rows.length;	//alert(len);
	for (i = 0; i < len; i++){
		var rta = results.rows.item(i).tipo_rta;
		var id_item = results.rows.item(i).id_item;
		if (rta == "SELECCION"){
			$("#items").append('<label id="pregunta'+id_item+'">'+results.rows.item(i).descripcion_item+'</label>: <br/><input type="radio" id="radiocu'+i+'" name="'+id_item+'" value="Cumple"><label for="radiocu'+i+'">Cumple</label><input type="radio" id="radionc'+i+'" name="'+id_item+'" value="No cumple"><label for="radionc'+i+'">No cumple</label><input type="radio" id="radiona'+i+'" name="'+id_item+'" value="No Aplica"><label for="radiona'+i+'">No Aplica</label><br><label for="observacion'+id_item+'">Observaci&oacute;n:</label><textarea name="observacion'+id_item+'" id="observacion'+id_item+'" width="80%"></textarea><br/><br/>');
		}else
		{
			$("#items").append('<label id="pregunta'+id_item+'">'+results.rows.item(i).descripcion_item+'</label>: <br/><label for="Cantidad'+id_item+'">Cantidad:</label><input type="number" name="'+id_item+'" id="Cantidad'+id_item+'" width="80%" onkeypress="if (event.keyCode< 48 || event.keyCode > 57) event.returnValue = false;" required /><br/><br/>');
		}
   	}
}

$(document).ready(function(){
	$("#boton").click(function() {
		var ultimo_id;
		var validacion = true;
		//RADIO BUTONS
		 $('input:radio').each(function () {
				var $this = $(this),name = $this.attr('name');//alert (name +'---'+ultimo_id) 
	            if (name != ultimo_id){
		            var myRadio = $('input[name='+name+']:checked').val();	//alert(myRadio);
		            if (myRadio === undefined){
		            	var pregunta = $("#pregunta"+name).text();
		            	$("#pregunta"+name).addClass("txt_requerido");
		            	$('input[name='+name+']:checked').focus();
		            	alert(pregunta+'?');
		            	validacion = false;
		            	return false; 
		            }
		            if(myRadio == "No cumple" || myRadio == "No Aplica"){
		            	var obs = $('#observacion'+name).val();
	            		if (obs == "" || obs == null || obs === undefined){
	            			alert("Debe ingresar la observación");
	            			$('#observacion'+name).prop("required", true);	
	            			$("#observacion"+name).focus();
	            			validacion = false;
		            		return false;
	            		}
		            }
		            ultimo_id = name;
	            }
		 });
		 if(validacion == true){
			 //CANTIDADES
	 		 $(':input[type="number"]').each(function () {
					var $this = $(this),name = $this.attr('name'); //alert (name ) 
		            var cant_val = $(this).val();	//alert(cant_val);
		            if (cant_val === undefined || cant_val == "" || cant_val == null){
		            	var pregunta = $("#pregunta"+name).text();
		            	alert(pregunta+'?');
		            	$(this).focus();
		            	validacion = false;
		            	return false; 
		            }
			 });
		 }
		 if(validacion == true){
			// CARGAR MENU DE LA BASE DE DATOS
			db.transaction(GuardarItems); 
		 }	
	});

})
// CARGAR MENU DE LA BASE DE DATOS
db.transaction(ConsultaItems); 
/**
 * @author juan.garzon 2013-JUN-20
 */
 var nombre_supervisor = sessionStorage.getItem("nombre");
 var nombre_tramo = sessionStorage.getItem("nom_tramo");
 var nombre_constructor = sessionStorage.getItem("nom_constructor");
 var id_evento = sessionStorage.getItem("id_evento");
 $("#n_supervisor").html("<strong>Supervisor: "+nombre_supervisor+"</strong><br>");
 $("#n_constructor").html("<strong>Constructor: "+nombre_constructor+"</strong>");
 $("#n_tramo").html("<strong>Tramo: "+nombre_tramo+"</strong><br><br><br>");					//$("#menu").html('<a data-role="button" data-theme="a">AFSDFASDF</a>');  //data-icon="arrow-r" data-iconpos="right"//$("#menu").html('<select name="constructor" id="constructor" data-native-menu="true"></select><br>');
	
var db = window.openDatabase("bdmovil", "1.0", "Proyecto Supervisión Azteca", 200000);
function ConsultaMenu(tx) {				//alert('SELECT * FROM actividades where id_evento = '+id_evento+' and activo = "S"');
	tx.executeSql('SELECT * FROM actividades where id_evento = "'+id_evento+'" and activo = "S"', [], ConsultaMenuCarga);
}
function ConsultaMenuCarga(tx, results) {
	var len = results.rows.length; //alert(len);
	for (i = 0; i < len; i++){
		var url = './'+results.rows.item(i).descripcion_etapa+'.html';
      $("#menu").before('<a class="button medium blue" id="'+results.rows.item(i).id+'">'+results.rows.item(i).descripcion_actividad+'</a>');	//$("#menu").before('<a href="'+url+'" class="button medium blue" id="'+results.rows.item(i).id+'">'+results.rows.item(i).descripcion_etapa+'</a>');
   	}
   	$("#menu").before('<br><br><a class="button small green" id="vmenu">Ir al menú</a>');
}
$(document).ready(function(){
	$("div,a").on("click", "a", function (event) {
	    var id_actividad = $(this).attr('id');
	    if(id_actividad == "vmenu"){
			window.location = "menu_principal.html";
	    }else{
			    var pagina = $(this).text();
				sessionStorage.setItem("id_actividad", id_actividad);
				window.location = "listado"+id_actividad+".html";
		} 
	});
})
// CARGAR MENU DE LA BASE DE DATOS
db.transaction(ConsultaMenu); 
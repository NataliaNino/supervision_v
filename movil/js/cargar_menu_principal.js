/**
 * @author juan.garzon 2013-JUN-20
 */
 var nombre_supervisor = sessionStorage.getItem("nombre");
 var nombre_tramo = sessionStorage.getItem("nom_tramo");
 var nombre_constructor = sessionStorage.getItem("nom_constructor");
 $("#n_supervisor").html("<strong>Supervisor: "+nombre_supervisor+"</strong><br>");
 $("#n_constructor").html("<strong>Constructor: "+nombre_constructor+"</strong>");
 $("#n_tramo").html("<strong>Tramo: "+nombre_tramo+"</strong><br><br><br>");					//$("#menu").html('<a data-role="button" data-theme="a">AFSDFASDF</a>');  //data-icon="arrow-r" data-iconpos="right"//$("#menu").html('<select name="constructor" id="constructor" data-native-menu="true"></select><br>');
	
var db = window.openDatabase("bdmovil", "1.0", "Proyecto Supervisión Azteca", 200000);
function ConsultaMenu(tx) {
	tx.executeSql('SELECT * FROM eventos_chequeo where activo = "S"', [], ConsultaMenuCarga);
}
function ConsultaMenuCarga(tx, results) {
	var len = results.rows.length;
	for (i = 0; i < len; i++){
		var url = './'+results.rows.item(i).descripcion_etapa+'.html';
		$("#menu").before('<a class="button medium blue" id="'+results.rows.item(i).id+'">'+results.rows.item(i).descripcion_etapa+'</a><br>');	//$("#menu").before('<a href="'+url+'" class="button medium blue" id="'+results.rows.item(i).id+'">'+results.rows.item(i).descripcion_etapa+'</a>');
   	}
   	$("#menu").before('<br><a class="button medium blue" id="s4">Sincronizar</a>');	//$("#menu").before('<a href="'+url+'" class="button medium blue" id="'+results.rows.item(i).id+'">'+results.rows.item(i).descripcion_etapa+'</a>');
   	$("#menu").before('<br><br><a class="button small green" id="vmenu">Inicio</a>');
}
$(document).ready(function(){
	$("div,a").on("click", "a", function (event) {
    var id_evento = $(this).attr('id');
    if(id_evento == "vmenu"){
		window.location = "constructor_tramo.html";
    }else{
	    var pagina = $(this).text();
		sessionStorage.setItem("id_evento", id_evento);
		window.location = pagina+".html";
	}
});

})
// CARGAR MENU DE LA BASE DE DATOS
db.transaction(ConsultaMenu); 
/**
 * @author juan.garzon 2013-JUN-20
 */
var supervisor = sessionStorage.getItem("id");

function Cargar_lista(){	//alert("cargar lista");		//$("<option value='0'>juancho</option>").appendTo("#constructor");	//adicionar_cons();
	//$.mobile.showPageLoadingMsg();
	var num_cons = $('#constructor option').length;
	if (num_cons == 0)
	{
		db.transaction(ObtenerItems);
	}
	//$.mobile.hidePageLoadingMsg();
}
function ObtenerItems(tx) {
    tx.executeSql('select tr.gid,tr.nombre_ruta,co.id,co.nombre from asignacion_tramo at inner join constructores co on at.constructor = co.id inner join tramos tr on at.tramo = tr.gid where at.supervisor = "'+supervisor+'" order by tr.nombre_ruta,co.nombre', [], MuestraItems);

}
function MuestraItems(tx, results) {
    var len = results.rows.length; //alert(len);	
    $("<option value='0'> </option>").appendTo("#constructor");												//alert(len);
    for (var i=0; i<len; i++){
    	$("<option value='"+results.rows.item(i).gid+'║'+results.rows.item(i).id+"'>"+results.rows.item(i).nombre_ruta+'║'+results.rows.item(i).nombre+"</option>").appendTo("#constructor");
    } 
	//$.mobile.hidePageLoadingMsg();
}

Cargar_lista();

$(document).ready(function(){
	$("#btn_ingresar").click(function () {			//alert("li Click");
		var id_constructor = $("#constructor").val();	//alert("COns: "+id_constructor);
		if (id_constructor == 0 || id_constructor == null){
			alert("Seleccione el Tramo - constructor por favor!");
			$("#constructor").focus();
			return;
		}
		var tramo_constructor = $("#constructor option:selected").text(); //alert(tramo_constructor); 
		var array_tramo_contructor = tramo_constructor.split('║');
		var nom_tramo = array_tramo_contructor[0];
		var nom_constructor = array_tramo_contructor[1];
		var tramo_constructor = $("#constructor option:selected").val(); //alert(tramo_constructor); 
		var array_tramo_contructor = tramo_constructor.split('║');
		var id_tramo = array_tramo_contructor[0];
		var id_constructor = array_tramo_contructor[1];
//		alert(id_constructor+" "+nom_constructor);
//		alert(id_tramo+" "+nom_tramo);
		sessionStorage.setItem("id_tramo", id_tramo);
		sessionStorage.setItem("nom_tramo", nom_tramo);
		sessionStorage.setItem("id_constructor", id_constructor);
		sessionStorage.setItem("nom_constructor", nom_constructor);
		window.location = "menu_principal.html";
		
		//alert(opcion_seleccionada);	//menu_principal.html
	
	})
})

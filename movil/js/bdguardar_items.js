/**
 * @author Juan Pablo Garzón Dueñas
 */
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

function GuardarItems(){
	db.transaction(GuardarItemsExe, errorCB);
}
function GuardarItemsExe(tx) {	//alert('Registro: '+fil+': '+arr_ListaTabla[fil]);				//alert('DROP TABLE IF EXISTS '+arr_ListaTabla[fil][0]+';');	//tx.executeSql('DROP TABLE IF EXISTS '+arr_ListaTabla[fil][0]);				//alert('CREATE TABLE IF NOT EXISTS '+arr_ListaTabla[fil][0]+' ('+arr_ListaTabla[fil][1]+')');
	tx.executeSql('CREATE TABLE IF NOT EXISTS lista_chequeo_rtas ("id" CHAR NOT NULL,"tramo" CHAR NOT NULL,"constructor" CHAR NOT NULL,"fecha_supervision" CHAR NOT NULL,"usuario" CHAR NOT NULL,"item" CHAR NOT NULL,"respuesta" CHAR NOT NULL,"observacion" CHAR )');
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
	var id_unico = fecha_captura+'-'+id_tramo+'-'+id_constructor;	//alert(id_unico);	//2001-09-28 01:00:00
	var ultimo_id;
	//RADIO BUTONS
	 $('input:radio').each(function () {
			var $this = $(this),name = $this.attr('name');//alert (name +'---'+ultimo_id) 
            if (name != ultimo_id){
	            var myResp = $('input[name='+name+']:checked').val();	//alert(myRadio);
	            var observacion = $('textarea#observacion'+name).val();		//var text = $('textarea#mytextarea').val();
	            //alert('INSERT INTO lista_chequeo_rtas (id,tramo,constructor,fecha_supervision,usuario,item,respuesta,observacion) values ("'+id_unico+'","'+id_tramo+'","'+id_constructor+'","'+fecha_captura+'","'+id_usuario+'","'+name+'","'+myResp+'","'+observacion+'")');
				tx.executeSql('INSERT INTO lista_chequeo_rtas (id,tramo,constructor,fecha_supervision,usuario,item,respuesta,observacion) values ("'+id_unico+'","'+id_tramo+'","'+id_constructor+'","'+fecha_captura+'","'+id_usuario+'","'+name+'","'+myResp+'","'+observacion+'")');
	            ultimo_id = name;
            }
	 });
	 //CANTIDADES
	 $(':input[type="number"]').each(function () {
			var $this = $(this),name = $this.attr('name'); //alert (name ) 
            var cant_val = $(this).val();	//alert(cant_val);
            tx.executeSql('INSERT INTO lista_chequeo_rtas (id,tramo,constructor,fecha_supervision,usuario,item,respuesta) values ("'+id_unico+'","'+id_tramo+'","'+id_constructor+'","'+fecha_captura+'","'+id_usuario+'","'+name+'","'+cant_val+'")');
	 });
		alert("Información almacenada exitosamente");
		window.location = "Tendido.html";
}
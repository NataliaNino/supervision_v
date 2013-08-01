var db = window.openDatabase("bdmovil", "1.0", "Proyecto Supervisión Azteca", 200000);
function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
	}
}
function successCB() {
    //alert("Ok!");
}

function TBLusuario(tx) {//Si no existe crea la talba USUARIOS	//tx.executeSql('DELETE TABLE IF EXISTS "usuario"');
	
    tx.executeSql('CREATE TABLE IF NOT EXISTS usuario ("id" INTEGER PRIMARY KEY  NOT NULL  DEFAULT (null) ,"nombre" CHAR NOT NULL ,"usuario" CHAR NOT NULL ,"contrasegna" CHAR NOT NULL  DEFAULT (null) ,"activo" CHAR NOT NULL  DEFAULT (1) )');
    db.transaction(TBLusuarioConsulta);
}
/* LOGUEADO EXITOSAMENTE*/
function TBLusuarioConsulta(tx) {
    tx.executeSql('SELECT * FROM usuario where id = "9999"', [], TBLusuarioConsultaGuarda);
}
/* LOGUEADO EXITOSAMENTE*/
function TBLusuarioConsultaGuarda(tx, results) {
	var len = results.rows.length;	//alert('Resultados: '+len);
    if(len==0){
		tx.executeSql('INSERT INTO usuario (id,nombre,usuario,contrasegna,activo) values ("9999","Supervisor Movíl","s","1","S")'); 
	}
}

/* LOGUEADO EXITOSAMENTE*/
function AlmacenaUsr(tx) {	//
	db.transaction(TBLusuario); //Crea la tabla
	db.transaction(AlmacenaUsrConsulta);			//Consulta Usuario en la bse de datos
}
/* LOGUEADO EXITOSAMENTE*/
function AlmacenaUsrConsulta(tx) {
	var id = sessionStorage.getItem("id");
	//alert('SELECT * FROM usuario  where id = "'+id+'"');
    tx.executeSql('SELECT * FROM usuario  where id = "'+id+'"', [], AlmacenaUsrConsultaGuarda);
}
/* LOGUEADO EXITOSAMENTE*/
function AlmacenaUsrConsultaGuarda(tx, results) {
	var len = results.rows.length;
    //alert('Resultados: '+len);
    if(len==0){
		var id = sessionStorage.getItem("id");  		//alert("Guarda Usuario Localmente");
		var nombre = sessionStorage.getItem("nombre");
		var usr = $("#login").val();
		var pas = $("#password").val();
		tx.executeSql('INSERT INTO usuario (id,nombre,usuario,contrasegna,activo) values ("'+id+'","'+nombre+'","'+usr+'","'+pas+'","S")'); 
	}				//alert('Ingresar');
	window.location = "constructor_tramo.html";
}
/* LOGUEADO LOCALMENTE EN EL MOVIL*/
function BuscaUsuario(tx) {
	db.transaction(TBLusuario, errorCB); //Crea la tabla
	db.transaction(BuscaUsuarioConsulta);			//Consulta Usuario en la bse de datos
}
/* LOGUEADO LOCALMENTE EN EL MOVIL*/
function BuscaUsuarioConsulta(tx) {
	var usr = $("#login").val();
	var pas = $("#password").val();					//alert('SELECT * FROM usuario  where usuario = "'+usr+'" and contrasegna = "'+pas+'"');
    tx.executeSql('SELECT * FROM usuario  where usuario = "'+usr+'" and contrasegna = "'+pas+'"', [], MuestraItems);
}
/* LOGUEADO LOCALMENTE EN EL MOVIL*/
function MuestraItems(tx, results) {
    var len = results.rows.length;	//alert('Resultados: '+len);
    if(len==0){
    	$("#equivocado").text('Usuario o contraseña no valido!');
    }else{
		$("#equivocado").text('Ingreso exitoso,espere por favor...');
	 	var id = results.rows.item(0).id;
	 	var nombre = results.rows.item(0).nombre;					//alert( "nombre = " + sessionStorage.getItem("nombre"));
	 	sessionStorage.setItem("id", id);	//setCookie("idinscripcion",idinscripcion,1);
	 	sessionStorage.setItem("nombre", nombre);		//setCookie("nombre",nombre,1);		//alert('Ingresar');
		window.location = "constructor_tramo.html";	
    }
}

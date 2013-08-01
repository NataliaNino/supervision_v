var myLatitud;
var myLongitud;
var myPrecision;
var  watchID = null;
// api-geolocation

$(window).load(function () {
	getCurrentPosition();
})

var getCurrentPosition = function() {
			
    var success = function(pos) {
		 myLatitud = pos.coords.latitude;
		 myLongitud = pos.coords.longitude;
		 myPrecision = pos.coords.accuracy;		 
         //text = "<div>Latitude: " + myLatitud + "<br/>" + "Longitude: " + myLongitud + "<br/>" + "Accuracy: " + myPrecision + " m<br/>" + "</div>";
         text = "<div>Latitud: " + myLatitud + "<br/>" + "Longitud: " + myLongitud + "<br/>" + "Precisi&oacute;n: " + myPrecision + " m <br/>Fecha: "+ new Date(pos.timestamp)+" <br/>" + "</div>";
        document.getElementById('cur_position').innerHTML = text;

    };
	
    var fail = function(error) {
        document.getElementById('cur_position').innerHTML = "Error obteniendo geolocalizaci&oacute;n: " + error.code;
        console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
    };

    document.getElementById('cur_position').innerHTML = "Esperando geolocalizaci&oacute;n . . .";
    watchID=navigator.geolocation.getCurrentPosition(success, fail,{ frequency: 15000,enableHighAccuracy: true});
};

var getCurPosition = function() {
    var success = function(pos) {
		 myLatitud = pos.coords.latitude;
		 myLongitud = pos.coords.longitude;
		 myPrecision = pos.coords.accuracy;	
		document.getElementById('cur_position').innerHTML = "";
      };
	  
    var fail = function(error) {
        document.getElementById('cur_position').innerHTML = "Error obteniendo geolocalizaci&oacute;n: " + error.code;
    };

    document.getElementById('cur_position').innerHTML = "Esperando geolocalizaci&oacute;n . . .";
    navigator.geolocation.getCurrentPosition(success, fail);
};
// api-geolocation Watch Position
var watchID = null;
function clearWatch() {
    if (watchID !== null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
        document.getElementById('cur_position').innerHTML = "";
    }
}
var wsuccess = function(pos) {
         myLatitud = pos.coords.latitude;
		 myLongitud = pos.coords.longitude;
		 myPrecision = pos.coords.accuracy; 
   /*document.getElementById('cur_position').innerHTML = "Esperando geolocalizaci&oacute;n . . .";
    var text = "<div>Latitud: " + pos.coords.latitude + "<br/>" + "Longitud: " + pos.coords.longitude + "<br/>" + "Precisi&oacute;n: " + pos.coords.accuracy + "m<br/>" + "</div>";
    document.getElementById('cur_position').innerHTML = text;*/
};
var wfail = function(error) {
    document.getElementById('cur_position').innerHTML = "Error obteniendo geolocalizaci&oacute;n: " + error.code;
    
};

var toggleWatchPosition = function() {
    if (watchID) {
        console.log("Detener b&uacute;squeda de geolocalizaci&oacute;n");
        clearWatch();  // sets watchID = null;
    } else {
	
        document.getElementById('cur_position').innerHTML = "Esperando geolocalizaci&oacute;n . . .";
        var options = { frequency: 3000, maximumAge: 30000, timeout: 30000, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(wsuccess, wfail, options);
    }
};
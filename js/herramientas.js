
var toast = function(msg, tiempo, warning)	{
	if (tiempo == undefined) {tiempo = 400;}
	let color = "black";
	let colorF = "WhiteSmoke";
	if (warning == undefined) {
		warning = "";
	} else if (warning == '1') {
		warning = "<i class='fa fa-warning fa-3x'></i>&nbsp";
		colorF = "#FF3339";
		color = "white";
	} else if (warning == '2') {
		warning = "<i class='fa fa-check fa-3x'></i>&nbsp";
		colorF = "#D3F18A";
	}
	let html = '<div class="ui-loader ui-overlay-shadow ui-body-e ui-corner-all" style="color:'+color+'; background-color:'+colorF+'; text-decoration: none">';
	html += '<table><tr><th>'+warning+'</th><th><h3 class"tituloVentana">'+msg+'</h3></th></tr></table></div>';
	$(html).css({
		display: "block",
		opacity: 0.9,
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "330px",
		left: ($(window).width() - 284)/2,
		top: $(window).height()/2 - $(window).height() * 0.2 
	})
	.appendTo('.container').delay(2500)
	.fadeOut(tiempo, function(){
		$(this).remove();
	});
}

function formatoSepMiles(valor) {
	return new Intl.NumberFormat("de-DE").format(valor);
}

function esNumero(txt) {
	if (txt == undefined){txt = ''}
	txt = txt.toString();
	let num = txt.replaceAll(',', '.');
	var rsdo = true;
	if (isNaN(num)) {rsdo = false;} 
	if (num == '') {rsdo = false;}
	return rsdo
}

function fechaAmericana(f) {
	let ano = f.substring(6, 10) * 1;
	let mes = f.substring(3, 5) * 1;
	let dia = f.substring(0, 2) * 1;
	let fecha = zfill(ano, 4)+'-'+zfill(mes, 2)+'-'+zfill(dia, 2)
	return fecha;
}

function formatoFecha(sfecha, hs) {
	if (sfecha != undefined) {        
        var fh = new Date(sfecha);
        var fhtxt = zfill(parseInt(fh.getDate()), 2) + '/' + zfill((parseInt(fh.getMonth()) + 1), 2) + "/" + parseInt(fh.getFullYear());
        if (hs == 1) { fhtxt +=  ' ' + zfill(parseInt(fh.getHours()), 2) + ':' + zfill(parseInt(fh.getMinutes()), 2) };
        return fhtxt;
    } else {
        return '';
    }
}

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del n�mero */
    var length = number.toString().length; /* Largo del n�mero */
    var zero = "0"; /* String de cero */
    if (width <= length) {
        if (number < 0) {
            return ("-" + numberOutput.toString());
        } else {
            return numberOutput.toString();
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
        } else {
            return ((zero.repeat(width - length).toString()) + numberOutput.toString());
        }
    }
}
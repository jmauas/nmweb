class Producto {
    constructor(nombre, cant, precio, boni, total) {
        this.nombre = nombre.toUpperCase();
        this.cant = parseFloat(cant);
        this.precio = parseFloat(precio);
        this.boni = parseFloat(boni);
        this.total = 0;
    }
    sumaIva() {
        this.precio = this.precio * 1.21;
    }
    subTotal() {
        let subT = Math.round(this.cant * this.precio, 0);
        this.total = Math.round(subT * ((100 - this.boni) / 100), 0);
    }

}

let productos = [];

function cargarProducto() {    
    if ($('#prod').val() == ''){
        alert("INGRESE NOMBRE DEL PRODUCTO.")
        return;
    }
    else if (!esNumero($('#cant').val())){
        alert("INGRESE CANTIDAD DEL PRODUCTO.")
        return;
    }
    else if (!esNumero($('#pr').val())){
        alert("INGRESE PRECIO DEL PRODUCTO.")
        return;
    }    
    const prod = new Producto (
                        $('#prod').val(),
                        $('#cant').val(),
                        $('#pr').val(),
                        $('#boni').val(),
                        0
                    );    
    prod.sumaIva();
    prod.subTotal();
    productos.push(prod);
    armarTablaProd(productos);
}

function armarTablaProd (prods) {
    let html = '';
    let total = 0;
    for (const prod of prods) {
        html += '<tr>';
        html += '   <td class="colProd nombre">'+prod.nombre+'</td>';
        html += '   <td class="colCant numero">'+formatoSepMiles(prod.cant)+'</td>';
        html += '   <td class="colPr numero">'+formatoSepMiles(prod.precio)+'</td>';
        html += '   <td class="colBoni numero">'+formatoSepMiles(prod.boni)+'</td>';
        html += '   <td class="colTot numero">'+formatoSepMiles(prod.total)+'</td>';
        html += '</tr>';
        total += prod.total;
    }
    localStorage.setItem("Productos", JSON.stringify(prods));
    document.getElementById('detalleFc').innerHTML = html;
    document.getElementById('total').innerHTML = formatoSepMiles(total);
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

function recuperarProd() {
    const prod = JSON.parse(localStorage.getItem('Productos'));
    if (prod != '' && prod != null) {
        armarTablaProd(prod);
        swal("Productos Recuperados","", "success");
    } else {
        swal("No se Econtraron Productos","", "error");
    }
}

function vaciarProd() {
    swal({
        title: "Confirmación",
        text: "Se Van a Eliminar Todos los Productos Guardados.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            localStorage.removeItem('Productos');
            swal("Eliminado con Éxito","", "success");
        } else {
            return;
        }
    });	    
}


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
	/* .appendTo($.mobile.pageContainer).delay(2500) */
	.appendTo('.container').delay(2500)
	.fadeOut(tiempo, function(){
		$(this).remove();
	});
}
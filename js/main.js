class producto {
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
    const prod = new producto (
                        $('#prod').val(),
                        $('#cant').val(),
                        $('#pr').val(),
                        $('#boni').val(),
                        0
                    );    
    prod.sumaIva();
    prod.subTotal();
    productos.push(prod);
    let html = '';
    let total = 0;
    for (const prod of productos) {
        html += '<tr>';
        html += '   <td class="colProd nombre">'+prod.nombre+'</td>';
        html += '   <td class="colCant numero">'+formatoSepMiles(prod.cant)+'</td>';
        html += '   <td class="colPr numero">'+formatoSepMiles(prod.precio)+'</td>';
        html += '   <td class="colBoni numero">'+formatoSepMiles(prod.boni)+'</td>';
        html += '   <td class="colTot numero">'+formatoSepMiles(prod.total)+'</td>';
        html += '</tr>';
        total += prod.total;
    }   
    $('#detalleFc').html(html);
    $('#total').text(formatoSepMiles(total));
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
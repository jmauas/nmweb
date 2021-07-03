let productos = [];
function cargarProducto() {
    let prod = {
        nombre: $('#prod').val(),
        cant: $('#cant').val(),
        pr: $('#pr').val(),
        boni: $('#boni').val(),
    }
    productos.push(prod);
    let html = '';
    let total = 0;
    for (let i = 0; i<= productos.length - 1;i++) {
        html += '<tr>';
        html += '   <td class="colProd nombre">'+productos[i]['nombre']+'</td>';
        html += '   <td class="colCant numero">'+formatoSepMiles(productos[i]['cant'])+'</td>';
        html += '   <td class="colPr numero">'+formatoSepMiles(productos[i]['pr'])+'</td>';
        html += '   <td class="colBoni numero">'+formatoSepMiles(productos[i]['boni'])+'</td>';
        html += '   <td class="colTot numero">'+formatoSepMiles(subTotal(productos[i]['cant'], productos[i]['pr'], productos[i]['boni']))+'</td>';
        html += '</tr>';
        total += subTotal(productos[i]['cant'], productos[i]['pr'], productos[i]['boni']);
    }
    $('#detalleFc').html(html);
    $('#total').text(formatoSepMiles(total));
}

function subTotal(cant, pr, boni) {
    let subT = Math.round(cant * pr, 0);
    subT = Math.round(subT * ((100 - boni) / 100), 0);
    return subT;
}

function formatoSepMiles(valor) {
	return new Intl.NumberFormat("de-DE").format(valor);
}
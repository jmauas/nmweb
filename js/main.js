const btnC = document.getElementById("btnProd");
btnC.addEventListener("click", cargarProducto);
const btnR = document.getElementById("btnRecuperar");
btnR.addEventListener("click", recuperarProd);
const btnV = document.getElementById("btnVaciar");
btnV.addEventListener("click", vaciarProd);
const btnReg = document.getElementById("btnReg");
btnReg.addEventListener("click", registrar);

let hoy = new Date();
$('#fecha').val(fechaAmericana(formatoFecha(hoy), 0));


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
        swal("INGRESE NOMBRE DEL PRODUCTO.", {
            icon: "error",
        });
        return;
    }
    else if (!esNumero($('#cant').val())){
        swal("INGRESE CANTIDAD DEL PRODUCTO.", {
            icon: "error",
        });
        return;
    }
    else if (!esNumero($('#pr').val())){
        swal("INGRESE PRECIO DEL PRODUCTO.", {
            icon: "error",
        });
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


function recuperarProd() {
    const prod = JSON.parse(localStorage.getItem('Productos'));
    if (prod != '' && prod != null) {
        armarTablaProd(prod);
        swal("Productos Recuperados", {
            icon: "success",
        });
    } else {
        swal("No se Econtraron Productos", {
            icon: "error",
        });
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

function registrar() {
    const fecha = document.getElementById('fecha');
    const vend = document.getElementById('vend');
    const cliente = document.getElementById('cliente');
    const lp = document.getElementById('lp');
    const cp = document.getElementById('cp');
    const suc = document.getElementById('suc');
    if (control("Fecha", fecha)==false) return;
    if (control("Vendedor", vend)==false) return;
    if (control("Cliente", cliente)==false) return;
    if (control("Lista de Precios", lp)==false) return;
    if (control("Condición de Pago", cp)==false) return;
    if (control("Sucursal", suc)==false) return;
    $('#tituloResumen').text("Resumen de tu Factura");
    $('#textoResumen1').text("El Importe Total de tu Compra es de $ "+$('#total').text()+".");
    $('#textoResumen2').text("Si abonás en Efectivo, podemos ofrecerte un 10 % de Bonificación Adicional. Gracias por tu Compra.");
    $('#resumen').css("display", "inline-block");
}

function control(nombre, elem) {
    if (elem.value=='' || elem.value==0) {
        swal("FALTA VALOR PARA EL CAMPO "+nombre+".", {
            icon: "error",
        });
        return false;
    } else{
        return true;
    }
}



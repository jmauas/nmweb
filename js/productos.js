
let productos = [];

// VISTA PRODUCTO
class ProductoView {
    armarTablaProd(prods) {
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
        $('#detalleFc').html(html);
        $('#total').html(formatoSepMiles(total));
        swal("Productos Recuperados", {
            icon: "success",
        });
    };

    control(nombre, elem) {
        if (elem.value=='' || elem.value==0) {
            swal("FALTA VALOR PARA EL CAMPO "+nombre+".", {
                icon: "error",
            });
            return false;
        } else{
            return true;
        }
    };

    registrar() {
        const fecha = document.getElementById('fecha');
        const vend = document.getElementById('vend');
        const cliente = document.getElementById('cliente');
        const lp = document.getElementById('lp');
        const cp = document.getElementById('cp');
        const suc = document.getElementById('suc');
        if (this.control("Fecha", fecha)==false) return;
        if (this.control("Vendedor", vend)==false) return;
        if (this.control("Cliente", cliente)==false) return;
        if (this.control("Lista de Precios", lp)==false) return;
        if (this.control("Condición de Pago", cp)==false) return;
        if (this.control("Sucursal", suc)==false) return;
        $('#tituloResumen').text("Resumen de tu Factura");
        $('#textoResumen1').text("El Importe Total de tu Compra es de $ "+$('#total').text()+".");
        $('#textoResumen2').text("Si abonás en Efectivo, podemos ofrecerte un 10 % de Bonificación Adicional. Gracias por tu Compra.");
        $('#resumen').css("display", "inline-block");
    };

    armarTablaConsulta(prods) {
        let html = ``;
        for (const i of prods){
            html += `<tr>`;
            html += `   <td>${i.fecha}</td>`;
            html += `   <td>${i.cbte}</td>`;
            html += `   <td>${i.nro}</td>`;
            html += `   <td style="text-align:right;">${formatoSepMiles(i.impo)}</td>`;
            html += `</tr>`;
        }
        $('#rsdo').html(html);
    }
}

// MODELO PRODUCTO
class ProductoModel {
    constructor(nombre, cant, precio, boni, total) {
        this.nombre = nombre;
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

    leerProductos() {
        const prod = JSON.parse(localStorage.getItem('Productos'));
        productos = prod;
        return prod;
    }

    vaciarProd() {
        localStorage.removeItem('Productos');
        swal("Eliminado con Éxito.","", "success");
    }

    registrar(callback) {
        const json = JSON.stringify(productos);
        let url = 'http://mauas.com.ar/newM/AppTv2/ws/wsch.php?m=registrarVenta';
        $.ajax({
            url : url,
            data : json,
            method : 'post', //en este caso
            dataType : 'json',
            success : function(response){
                callback(response);
            },
            error: function(error){
                console.log(error);
                 toast(error.responseText);
            }
        });
    }

    obtener(callback) {
        let url = 'http://mauas.com.ar/newM/AppTv2/ws/wsch.php?m=consultaVentas';
        $.ajax({
            url: url,
            type: 'GET',
            success: function(rsp) {
                callback(rsp[0]);
            },
            error: function(err) { 
                console.log(err)
            }
        });
    }
}

// CONTROLADOR PRODUCTO
class ProductoController {
    //CONSTRUCTOR DEL CONTROLADOR ASOCIANDO UN MODELO Y VISTA
    constructor(productoModel, productoView) {
        this.productoModel = productoModel;
        this.productoView = productoView;
    }

    cargarProducto() { 
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
        const prod = new ProductoModel(
                            $('#prod').val(),
                            $('#cant').val(),
                            $('#pr').val(),
                            $('#boni').val(),
                            0
                        );    
        prod.sumaIva();
        prod.subTotal();
        productos.push(prod);
        this.productoView.armarTablaProd(productos);
    }

    recuperarProd() {
        const prod = this.productoModel.leerProductos();
        if (prod != '' && prod != null) {
            this.productoView.armarTablaProd(prod);
        } else {
            swal("No se Econtraron Productos", {
                icon: "error",
            });
        }
    }
    vaciarProd() {
        swal({
            title: "Confirmación",
            text: "Se Van a Eliminar Todos los Productos Guardados.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.productoView.vaciarProd()
            } else {
                return;
            }
        });
    }
    registrar() {
        this.productoModel.registrar((rspta) => {
            this.productoView.registrar();
        })
    }
    consultaVentas() {
        this.productoModel.obtener((rspta) => {
            this.productoView.armarTablaConsulta(rspta);
        });
    }
}
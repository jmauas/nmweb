
$(document).ready(function () {
    const app = new ProductoController(new ProductoModel(), new ProductoView());
    $("#btnProd").click(function() {
        app.cargarProducto();
    });
    $("#btnRecuperar").click(function() {
        app.recuperarProd();
    });
    $("#btnVaciar").click(function() {
        app.vaciarProd();
    });
    $("#btnReg").click(function() {
        app.registrar();
    });

    $('#btn-buscar-ventas').click( function () {
        app.consultaVentas();
    })
    
    let hoy = new Date();
    $('#fecha').val(fechaAmericana(formatoFecha(hoy), 0));
    $('#fechaHoy').text(formatoFecha(hoy, 1));
});
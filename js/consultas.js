

//PAGINA DE CONSULTAS

$('#btn-buscar-ventas').click( function () {
    let url = 'http://mauas.com.ar/newM/AppTv2/ws/ws.php?m=consultaVentas';
    $.ajax({
        url: url,
        type: 'GET',
        success: function(rsp) {
            let html = ``;
            console.log(rsp)
            for (const i of rsp[0]){
                html += `<tr>`;
                html += `   <td>${i.fecha}</td>`;
                html += `   <td>${i.cbte}</td>`;
                html += `   <td>${i.nro}</td>`;
                html += `   <td style="text-align:right;">${formatoSepMiles(i.impo)}</td>`;
                html += `</tr>`;
            }
            console.log(html)
            $('#rsdo').html(html);
        },
        error: function(err) { 
            console.log(err)
        }
    });
})



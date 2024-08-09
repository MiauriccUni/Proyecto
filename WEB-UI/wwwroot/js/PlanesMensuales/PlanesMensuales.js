function ConsultarAsignacion() {
    const grid = new gridjs.Grid({
        search: true,
        sort: true,
        resizable: true,
        pagination: {
            limit: 5
        },
        language: {
            search: {
                placeholder: 'Buscar'
            }
        },
        columns: ['Nombre Cupón', 'Valor %', 'Cupón Validez', 'Nombre Plan', 'Precio Plan', 'Nombre Usuario'],
        server: {
            url: 'https://localhost:7253/api/PlanesMensuales/GetAllPlanesMensuales',
            then: data => data.data.map(result => [
                result.id,
                result.usuarioLis[0].nombre,
                result.usuarioLis[0].correo,
                result.citasMedicionesList[0].fecha,
            ])
        },
    }).render(document.getElementById('myGrid'));
}

generatedIds = [];

generateUniqueId = () => {
    let newId;
    do {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        newId = parseInt(randomNumber);
    } while (generatedIds.includes(newId));
    generatedIds.push(newId);
    return newId;
}
$(document).ready(function () {
    ConsultarAsignacion();
    var view = new CrearCitaMedicion();
    view.InitView();
});
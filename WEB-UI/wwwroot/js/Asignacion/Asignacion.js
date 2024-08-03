

function ConsultarAsignacion() {
    const grid = new gridjs.Grid({
        search: true,
        sort: true,
        resizable: true,
        pagination: {
            limit: 5
        },

        columns: ['id', 'Entrenador', 'Correo entrenador', 'Fecha'],
        server: {
            url: 'https://localhost:7253/api/AsignacionCita/GetAllAsignaciones',
            then: data => data.data.map(result => [
                result.id,
                result.usuarioLis[0].nombre,
                result.usuarioLis[0].correo,
                result.citasMedicionesList[0].fecha,
            ])
        },
    }).render(document.getElementById('myGrid2'));
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
   // var view = new CrearCitaMedicion();
    view.InitView();
});
function Consultar() {
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
        columns: ['Nombre de la Clase', 'Horarios', 'Cupos Disponibles', 'ID'],
        server: {
            url: 'https://localhost:7253/api/ClasesGrupales/GetAllClasesGrupales',
            then: data => data.data.map(result => [
                result.nombreClase,
                result.horarios,
                result.cuposDisponibles,
                result.id,
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
    Consultar();
    /*  var view = new CrearCitaMedicion();*/
    view.InitView();
});
function Consultar() {
    const grid = new gridjs.Grid({
        search: true,
        sort: true,
        resizable: true,
        pagination: {
            limit: 5
        },
        columns: ['Nombre del ejercicio', 'Tipo de ejercicio', 'Repeticiones', 'Serires'],
        server: {
            url: 'https://localhost:7253/api/Rutina/Getrutina',
            then: data => data.map(result => [
                result.nombreEjercicio,
                result.tipoEjercicio,
                result.repeticiones,
                result.series,
            ])
        },
    }).render(document.getElementById('myGrid'));
}

document.addEventListener("DOMContentLoaded", function () {
    Consultar();
});  
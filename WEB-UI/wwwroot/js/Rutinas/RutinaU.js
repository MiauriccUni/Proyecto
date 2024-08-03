function Consultar() {
    const grid = new gridjs.Grid({
        search: true,
        sort: true,
        resizable: true,
        pagination: {
            limit: 3
        },
        columns: ['Nombre del ejercicio', 'Tipo de ejercicio'],
        server: {
            url: 'https://localhost:7253/api/Rutina/Getrutina',
            then: data => data.map(result => [
                result.nombreEjercicio,
                result.tipoEjercicio,
            ])
        },
    }).render(document.getElementById('myGrid'));
}

document.addEventListener("DOMContentLoaded", function () {
    Consultar();
});
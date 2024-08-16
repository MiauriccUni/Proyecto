function Consultar1() {
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
            },
            pagination: {
                previous: 'Anterior',
                next: 'Siguiente',
                showing: 'Mostrando',
                results: () => 'resultados'
            }
        },
        columns: [
            'id',
            'idUsuario',
            'idClase',
        ],
        headerVisible: false,
        server: {
            url: 'https://localhost:7253/api/UsuarioClaseGrup/GetAllUsuarioClaseGr',
            then: data => data.data.map(result => [
                result.id,
                result.idUsuario,
                result.idClase,
            ])
        },
    }).render(document.getElementById('myGrid2'));
}

$(document).ready(function () {
    Consultar1();
    //view.InitView();
});
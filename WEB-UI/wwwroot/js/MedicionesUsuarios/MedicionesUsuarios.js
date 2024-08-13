let idUsuarioID = null;
let infoUsuario = [];
let selectedUser = null;

function MedicionesUsuarios() {
    this.InitView = function () {
        this.PopulateUsuarios();
    }

    // Proceso de mediciones



    // Proceso de mediciones

    this.PopulateUsuarios = function () {
        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetClientes",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoUsuario = data;
            var select = $('#idusuario');
            select.empty(); // Limpiar opciones previas
            data.forEach(row => {
                select.append(`<option value="${row.id}">${row.nombre} ${row.apellidos} ${row.timeout} ${row.rol} ${row.correo} (ID: ${row.id})</option>`);
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar los clientes: " + error
            });
        });
    }

    this.PopulateCitasMedicion = function () {
        $.ajax({
            url: "https://localhost:7253/api/CitasMedicion/GetAllUsuarios",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoUsuario = data;
            var select = $('#idmedicion');
            select.empty(); // Limpiar opciones previas
            data.forEach(row => {
                select.append(`<option value="${row.id}">${row.fecha} </option>`);
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar las fechas: " + error
            });
        });
    }

}
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
            },
            pagination: {
                previous: 'Anterior',
                next: 'Siguiente',
                showing: 'Mostrando',
                results: () => 'resultados',
                to: 'a',
                of: 'de',
            }
        },
        columns: ['Nombre Completo', 'Rol', 'Fecha de medición'],
        server: {
            url: 'https://localhost:7253/api/Usuario/GetAllUsuarios',
            then: data => data.data
                .filter(result => ["ClienteStandard", "ClientePremium"].includes(result.rol))
                .map(result => [
                    `${result.nombre} ${result.apellidos}`,
                    formatRole(result.rol),
                    formatDate(result.fecha)
                ])
        },
    }).render(document.getElementById('myGrid'));
}

// Consultar clientes de segunda tabla

function Consultar2() {
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
                results: () => 'resultados',
                to: 'a',
                of: 'de',
            }
        },
        columns: ['Nombre Completo', 'Rol', 'Peso', 'Altura', 'IMC', 'Peso Ideal'],
        server: {
            url: 'https://localhost:7253/api/Usuario/GetAllUsuarios',
            then: data => data.data
                .filter(result => ["ClienteStandard", "ClientePremium"].includes(result.rol))
                .map(result => [
                    `${result.nombre} ${result.apellidos}`,
                    formatRole(result.rol),
                ])
        },
    }).render(document.getElementById('myGridConMediciones'));
}

function formatRole(role) {
    if (role === "ClienteStandard") return "Cliente Standard";
    if (role === "ClientePremium") return "Cliente Premium";
    if (role === "Cliente1dia") return "Cliente 1 Día";
    return "Desconocido";
}

function formatDate(dateString) {
    if (!dateString) return 'No disponible'; // Manejar casos de fecha nula o indefinida
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

$(document).ready(function () {
    let view = new MedicionesUsuarios();
    view.InitView();
    Consultar();
    Consultar2();
});
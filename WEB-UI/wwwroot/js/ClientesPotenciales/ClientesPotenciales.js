let idUsuarioID = null;
let infoUsuario = [];
let selectedUser = null;

function ClientesPotenciales() {
    this.InitView = function () {
        this.PopulateUsuarios();
    }

    this.PopulateUsuarios = function () {
        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/GetClientes",
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
        columns: ['Nombre Completo', 'Correo', 'Rol', 'Valor Membresía','Fecha Matrícula', 'Fecha de facturación', 'Estatus Pago'],
        server: {
            url: 'https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/GetAllUsuarios',
            then: data => data.data
                .filter(result => ["ClienteStandard", "ClientePremium", "Cliente1dia"].includes(result.rol))
                .map(result => [
                    `${result.nombre} ${result.apellidos}`,
                    result.correo,
                    formatRole(result.rol),
                    getMembresia(result.rol),
                    formatDate(result.timeout),
                    getFechaFacturacion(result.rol, result.timeout),
                    getStatusPago(result.rol)
                ])
        },
    }).render(document.getElementById('myGridClientesGuardados'));
}

function formatRole(role) {
    if (role === "ClienteStandard") return "Cliente Standard";
    if (role === "ClientePremium") return "Cliente Premium";
    if (role === "Cliente1dia") return "Cliente 1 Día";
    return "Desconocido";
}

function getMembresia(role) {
    if (role === "ClienteStandard") return "$80";
    if (role === "ClientePremium") return "$150";
    if (role === "Cliente1dia") return "$15";
    return "Desconocido";
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function getFechaFacturacion(role, timeout) {
    const date = new Date(timeout);
    if (role === "ClienteStandard" || role === "ClientePremium") {
        // Obtener el último día del mes
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        return `${lastDay}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    }
    if (role === "Cliente1dia") {
        return formatDate(timeout);
    }
    return "Desconocido";
}

function getStatusPago(role) {
    if (role === "ClienteStandard" || role === "ClientePremium") {
        return "Pendiente";
    }
    if (role === "Cliente1dia") {
        return "Pendiente";
    }
    return "Desconocido";
}

$(document).ready(function () {
    let view = new ClientesPotenciales();
    view.InitView();
    Consultar();
});
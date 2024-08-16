idUsuarioID = null;
infoUsuario = [];
imcUsuarios = null;
pesoIdealeUsuarios = 0; 
selectedUser = null;
citasMedicionesData = [];

function MedicionesUsuarios() {
    this.InitView = function () {
        this.PopulateUsuarios();

        $('#btnMediciones').click(function (event) {
            var view = new MedicionesUsuarios();
            view.SubmitCitaMedicion();
        });
    }

    // Proceso de mediciones
    this.SubmitCitaMedicion = function () {

        if (!idUsuarioID) {
            Swal.fire({
                icon: 'error',
                text: "Por favor seleccione un usuario.",
                title: ''
            });
            return;
        }


        var medicion = {};
        medicion.id = generateUniqueId(); 
        medicion.peso = parseFloat($('#peso').val());
        medicion.altura = parseFloat($('#altura').val());
        medicion.imc = null;
        medicion.peso_meta = 80;
        medicion.idUsuarios = idUsuarioID;

        // Verificar que se haya ingresado un peso
        if (isNaN(medicion.peso) || medicion.peso <= 0) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un peso válido.",
                title: ''
            });
            return;
        }

        // Verificar que se haya ingresado una altura
        if (isNaN(medicion.altura) || medicion.altura <= 0) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique una altura válida.",
                title: ''
            });
            return;
        }

        // Calcular el IMC
        medicion.imc = medicion.peso / Math.pow(medicion.altura / 100, 2); // Convertir altura a metros


        console.log(medicion);

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: 'https://localhost:7253/api/MedicionesUsuarios/CrearCitaMedicion',
            dataType: "json",
            data: JSON.stringify(medicion), // Convierte el objeto a una cadena JSON
            hasContent: true
        }).done(function (result) {
            Swal.fire({
                title: "Éxito",
                icon: "success",
                text: "Se ha completado el registro",
            }).then(function () {
                var view = new MedicionesUsuarios();
                view.LimpiarForm();
                view.Listar();
                setTimeout(() => {
                    location.reload();
                }, 1000);
            });
        }).fail(function (error) {
            console.log(error); // Ver detalles del error en la consola
            Swal.fire({
                icon: 'error',
                text: "Error al agregar la medición",
                title: '',
            });
        });
    }


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
            select.append('<option value="" disabled selected>Seleccione un usuario</option>'); // Agrega la opción por defecto
            data.forEach(row => {
                select.append(`<option value="${row.id}">${row.nombre} ${row.apellidos} ${row.timeout} ${row.rol} ${row.correo} (ID: ${row.id})</option>`);
            })
            select.on('change', function () {
                let id = $(this).val();
                idUsuarioID = id;
                console.log("ID de Usuario Seleccionado: ", idUsuarioID); 
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
// tabla lado derecho
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
        columns: ['Nombre Completo', 'Rol'],
        server: {
            url: 'https://localhost:7253/api/Usuario/GetAllUsuarios',
            then: data => data.data
                .filter(result => ["ClienteStandard", "ClientePremium"].includes(result.rol))
                .map(result => [
                    `${result.nombre} ${result.apellidos}`,
                    formatRole(result.rol),
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
        columns: ['Nombre Completo', 'Peso', 'Altura', 'IMC', 'Peso Ideal'],
        server: {
            url: 'https://localhost:7253/api/Usuario/GetAllUsuarios',
            then: data => data.data
                .filter(result => ["ClienteStandard", "ClientePremium"].includes(result.rol))
                .map(result => [
                    `${result.nombre} ${result.apellidos}`,    // Nombre Completo
                    result.peso,                               // Peso
                    result.altura,                             // Altura
                    (result.peso / Math.pow(result.altura / 100, 2)).toFixed(2), // IMC calculado
                    result.pesoIdeal                           // Peso Ideal
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
    let view = new MedicionesUsuarios();
    view.InitView();
    Consultar();
    Consultar2();
});
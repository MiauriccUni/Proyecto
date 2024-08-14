function CrearClaseGrupal() {
    this.InitView = function () {
        $('#agregarClase').click(function (event) {
            var view = new CrearClaseGrupal();
            view.SubmitCrearClase();
        })
    }
    this.SubmitCrearClase = function () {
        var clase = {};
        clase.id = generateUniqueId();
        clase.nombreClase = $('#registerTipoClase').val();
        clase.horarios = $('#registerHorario').val();
        clase.cuposDisponibles = $('#registerCupos').val();

        if (clase.nombreClase == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el nombre de la Clase Grupal.",
                title: ''
            });
            return;
        }

        if (clase.horarios == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el horario.",
                title: ''
            });
            return;
        }

        if (clase.cuposDisponibles == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el Cupo Disponible.",
                title: ''
            });
            return;
        }

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/ClasesGrupales/CrearClasesGrupales",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(clase),
            hasContent: true
        }).done(function (result) {
            Swal.fire({
                title: "Éxito",
                icon: "success",
                text: "Se ha completado el registro de la clase",
            }).then(function () {
                var view = new CrearClaseGrupal();
                view.LimpiarForm();
            });
        }).fail(function (error) {
            Swal.fire({
                icon: 'error',
                text: "Error al registrar clase grupal",
                title: '',
            });
        });
    }
    this.LimpiarForm = function () {
        $('#registerTipoClase').val('');
        $('#registerHorario').val('');
        $('#registerCupos').val('');
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
            results: () => 'resultados'
            }
        },
        columns: ['Nombre de la Clase', 'Horarios', 'Cupos Disponibles',],
        headerVisible: false,
        server: {
            url: 'https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/ClasesGrupales/GetAllClasesGrupales',
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
/*esto es para inicializar el doc*/
$(document).ready(function () {
    Consultar();
    var view = new CrearClaseGrupal();
    view.InitView();
});
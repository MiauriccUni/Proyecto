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
            url: "https://localhost:7253/api/ClasesGrupales/CrearClasesGrupales",
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
        columns: [
            'Nombre de la Clase',
            'Horarios',
            'Cupos Disponibles',
            {
                name: 'Matricular',
                formatter: (cell, row) => {
                    return gridjs.html(`<button class="btn btn-primary" onclick="takeSpace(${row[3]})">Tomar un espacio</button>`);
                }
            }
        ],
        headerVisible: false,
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

//function takeSpace(id) {
//    // Get the current value of cuposDisponibles for the row with the given ID
//    fetch(`https://localhost:7253/api/ClasesGrupales/GetClasesGrupalesById/${id}`)
//        .then(response => response.json())
//        .then(data => {
//            const currentCuposDisponibles = data.cuposDisponibles;
//            const newCuposDisponibles = currentCuposDisponibles - 1;

//            // Update the database with the new value
//            fetch(`https://localhost:7253/api/ClasesGrupales/UpdateCuposDisponibles`, {
//                method: 'POST',
//                headers: { 'Content-Type': 'application/json' },
//                body: JSON.stringify({ id, newCuposDisponibles }),
//            })
//                .then(response => response.json())
//                .then(data => {
//                    console.log(`Cupos Disponibles Actualizado: ${newCuposDisponibles}`);
//                    // Refresh the grid to reflect the updated value
//                    Consultar();
//                })
//                .catch(error => console.error(error));
//        })
//        .catch(error => console.error(error));
//}


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
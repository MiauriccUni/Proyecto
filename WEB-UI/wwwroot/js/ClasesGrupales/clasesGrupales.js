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
        clase.cuposDisponibles = $('#registerCupos');


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
            })
        }).fail(function (error) {
            console.log("Error", error);
        })
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
            }
        },
        columns: ['Nombre de la Clase', 'Horarios', 'Cupos Disponibles', 'ID'],
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
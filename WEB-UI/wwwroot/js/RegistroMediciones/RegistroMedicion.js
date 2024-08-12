function RegMedicion() {

    this.InitView = function () {
        $('#RegMedicion').click(function (event) {
            var view = new RegMedicion();
            view.SubmitRegMedicion();
        });
    }
    this.SubmitRegMedicion = function () {
        var regMedicion = {};
        regMedicion.id = generateUniqueId();
        regMedicion.peso = $('#Peso').val();
        regMedicion.estatura = $('#Estatura').val();
        regMedicion.porcentageG = $('#Porcentage').val();
        regMedicion.notas = $('#Notas').val();
        regMedicion.medicionEs = $('#Espalda').val();
        regMedicion.medicionCin = $('#Pierna').val();
        regMedicion.medicionPier = $('#Cintura').val();
        regMedicion.idCitaAsignacion = $('#idCita').val();

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: "https://localhost:7253/api/Mediciones/CreateMediciones",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(regMedicion),
            hasContent: true
        }).done(function (result) {
            Swal.fire({
                title: "Éxito",
                icon: "success",
                text: "Se ha completado el registro de las mediciones",
            });

        }).fail(function (error) {
            Swal.fire({
                icon: 'error',
                text: "Error al registrar las mediciones",
                title: 'Error',
            });
        })
    }

   

}
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
            }
        },
        columns: ['Peso', 'Estatura', 'Porcentage en Grasa', 'Notas', 'Medición Espalda', 'Medición Cintura', 'Medición Pierna', 'Fecha'],
        server: {
            url: 'https://localhost:7253/api/Mediciones/GetAllMediciones',
            then: data => data.data.map(result => {

                const originalDate = new Date(result.asignacionCitas[0].citasMedicionesList[0].fecha,);

                const formatteDate =
                    `${(originalDate.getMonth() + 1).toString().padStart(2, '0')}/` +
                    `${originalDate.getDate().toString().padStart(2, '0')}/` +
                    `${originalDate.getFullYear()} ` +
                    `${originalDate.getHours().toString().padStart(2, '0')}:` +
                    `${originalDate.getMinutes().toString().padStart(2, '0')}`;

                return [
                    result.peso,
                    result.estatura,
                    result.porcentageG,
                    result.notas,
                    result.medicionEs,
                    result.medicionCin,
                    result.medicionPier,
                    formatteDate,
                ]
            }),
        },
    }).render(document.getElementById('myGrid3'));
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
    Consultar2();
    var view = new RegMedicion();
    view.InitView();
});
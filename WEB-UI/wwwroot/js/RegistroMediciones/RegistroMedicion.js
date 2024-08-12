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

$(document).ready(function () {
    Consultar();
    //view.InintView();
});
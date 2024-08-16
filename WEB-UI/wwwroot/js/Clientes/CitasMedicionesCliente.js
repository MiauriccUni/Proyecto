
$(document).ready(function () {
    ConsultarCitasCliente();
    view.InitView();
});

function ConsultarCitasCliente() {
    // Recuperar el correo desde sessionStorage
    correo = sessionStorage.getItem('correo');
    console.log(correo);

    // Crear la tabla usando grid.js
    const grid = new gridjs.Grid({
        search: true,
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
        columns: ['Fecha de la Cita', 'Nombre del Entrenador'],
        server: {
            // URL de la API con el correo del cliente
            url: "https://localhost:7253/api/AsignacionCita/GetAsignacionCitaByCorreo?correo=" + correo,

            // Procesar los datos de la respuesta
            then: data => {
                console.log(data); // Para verificar la estructura de la respuesta

                // Mapear los resultados para crear filas en la tabla
                return data.map(result => {
                    // Formatear la fecha
                    const originalDate = new Date(result.citasMedicionesList[0].fecha);
                    const formattedDate = `${(originalDate.getMonth() + 1).toString().padStart(2, '0')}/` +
                        `${originalDate.getDate().toString().padStart(2, '0')}/` +
                        `${originalDate.getFullYear()} ` +
                        `${originalDate.getHours().toString().padStart(2, '0')}:` +
                        `${originalDate.getMinutes().toString().padStart(2, '0')}`;

                    // Retornar la fila con la fecha y el nombre del entrenador
                    return [
                        formattedDate,
                        result.usuarioLis[0].nombre, // Nombre del entrenador
                    ];
                });;
            }
        }
    });

    // Renderizar la tabla en el elemento con id 'GridCitasMediciones'
    grid.render(document.getElementById('GridCitasMediciones'));
}




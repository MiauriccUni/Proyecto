idUsuarioID = null;
infoUsuario = [];

function CrearCitaMedicion() {

    this.InitView = function () {
        this.PopulateUsuarios();
        $('#citaMedicion').click(function (event) {
            var view = new CrearCitaMedicion();
            view.SubmitCitaMedicion();
        });
    }

    this.SubmitCitaMedicion = function () {

        var citas = {}
        citas.id = generateUniqueId();
        citas.fecha = $('#horaMedicion').val();       
        citas.idUsuarios = idUsuarioID;

        var fechaString = $('#horaMedicion').val();
        var fecha = new Date(fechaString);
        var fechaActualS = new Date().toISOString().slice(0, 16);
        var fechaActual = new Date(fechaActualS);

        var calyear = fecha.getFullYear() - fechaActual.getFullYear();
        var calhora = fecha.getHours();
        var caldias = fecha.getDay();
        var calmin = fecha.getMinutes();
        
        var cal = fecha.get - fechaActual.getDay();

        var difday = fechaActual.getTime() - fecha.getTime();
        var dif = difday / 1000 / 60 / 60 / 24;

        if (dif >= 1) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el dia siguiente.",
                title: 'Error'
            });
            return;
        }

        if (citas.fecha === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un horario.",
                title: 'Error'
            });
            return;
        }

        if (calhora < 8 || caldias > 17) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un horario entre las 8 a.m. y las 5 p.m.",
                title: 'Error'
            });
            return;
        }

        if (caldias === 0 || caldias === 6) {
            Swal.fire({
                icon: 'error',
                text: "Por favor un dia entre semana.",
                title: 'Error'
            });
            return;
        }

        if (calyear < 0) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indicar un año valido.",
                title: 'Error'
            });
            return;
        }

        if (citas.idUsuarios === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indicar un usuarios.",
                title: 'Error'
            });
            return;
        }

        if (calmin != 30 && calmin != 0) {
            
            Swal.fire({
                icon: 'error',
                text: "En el apartado de minutos debe indicar '00' o '30'.",
                title: 'Error'
            });
            return;
        }

        if (cal === 0) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el proximo día disponible.",
                title: 'Error'
            });
            return;
        }

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/CitasMedicion/CrearCitaMedicion",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(citas),
            hasContent: true
        }).done(function (result) {
            Swal.fire({
                title: "Éxito",
                icon: "success",
                text: "Se ha completado el registro",
            }).then(function () {
                var view = new CrearCitaMedicion();
                view.LimpiarForm();
                view.Listar();
                setTimeout(() => {
                    location.reload();

                },1000);
            });
        }).fail(function (error) {
            Swal.fire({
                icon: 'error',
                text: "Error al agregar la cita",
                title: 'Error',
            });
        });
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
            for (var row in data) {
                select.append('<option value=' + data[row].id + '>' + data[row].nombre + ' ' + data[row].apellidos + ', ' +data[row].correo)
            }
            select.on('change', function () {
                let id = $(this).val();
                idUsuarioID = id;
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar los usuarios" + error
            });
        });
    }

    this.LimpiarForm = function () {
        $('#horaMedicion').val('');
        $('#idusuario').val('');
    }

    this.Listar = function () {
        Consultar();
    }

}



function Consultar() {
    const grid = new gridjs.Grid({
        search: true,
        language: {
            search: {
                placeholder: 'Buscar'
            }
        },
        columns: ['Nombre del Cliente', 'Correo Cliente', 'Fecha'],
        server: {
            url: 'https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/CitasMedicion/GetAllUsuarios',
            then: data => data.data.map(result => {

                const originalDate = new Date(result.fecha);
               
                const formattedDate = `${(originalDate.getMonth() + 1).toString().padStart(2, '0')}/` +
                    `${originalDate.getDate().toString().padStart(2, '0')}/` +
                    `${originalDate.getFullYear()} ` +
                    `${originalDate.getHours().toString().padStart(2, '0')}:` +
                    `${originalDate.getMinutes().toString().padStart(2, '0')}`;

                return [
                    result.usuariosList[0].nombre,
                    result.usuariosList[0].correo,
                    formattedDate,
                ];
            }),
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

$(document).ready(function () {
    Consultar();
    var view = new CrearCitaMedicion();
    view.InitView();
});
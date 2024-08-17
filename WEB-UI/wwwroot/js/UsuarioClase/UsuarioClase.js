idUsuarios = null;
infoUsuarios = [];

idClases = null;
infoClases = [];

function AsignarClase(){
    this.InitView = function(){
        this.PopulateClientes();
        this.PopulateClases();
        $('#agregar').click(function (event) {
            var view = new AsignarClase();
            view.SubmitAgregarClase();
        });
    }

    this.SubmitAgregarClase = function () {
        var agregar = {}
        agregar.id = generateUniqueId();
        agregar.idUsuario = idUsuarios;
        agregar.idClase = idClases;

        i = agregar.idClase;
        console.log(i);
        if (agregar.idUsuarios == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor elija una usuario.",
                title: 'Error'
            });
            return;
        }

        if (agregar.idClases == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor elija una Clase.",
                title: 'Error'
            });
            return;
        }

        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/ClasesGrupales/GetClasesGrupalesByID?id=" + i,
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            var clas = result[0];
            
            if (clas.cuposDisponibles == 0) {
                Swal.fire({
                    icon: 'error',
                    text: "Por favor elija otra clase.",
                    title: 'Error'
                });

            } else if (clas.cuposDisponibles > 0) {
                num = clas.cuposDisponibles;
                c = num - 1;

                $.ajax({
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': "application/json"
                    },
                    method: "POST",
                    url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/UsuarioClaseGrup/CreateUsuarioClaseGrup",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(agregar),
                    hasContent: true
                }).done(function (result) {
                    Swal.fire({
                        title: "Éxito",
                        icon: "success",
                        text: "Se ha completado el registro",
                    }).then(function () { 
                        $.ajax({
                            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/ClasesGrupales/UpdateCupos?id=" + i + "&cupos=" + c,
                            method: "PUT",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                        }).done(function (result) {
                            console.log(result)
                        }).fail(function (error) {
                            console.log(error);
                        })
                    })
                }).fail(function (error) {
                    Swal.fire({
                        icon: 'error',
                        text: "Error al registrarse",
                        title: 'Error',
                    });
                });
            }
           
        }).fail(function (error) {
            console.log("error - " + error)
        });

    }

    this.PopulateClientes = function () {
        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/GetClientes",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoUsuarios = data;
            var select = $('#idCliente');
            for (var row in data) {
                select.append('<option value=' + data[row].id + '>' + data[row].nombre + ' - ' + data[row].correo)
            }
            select.on('change', function () {
                let id = $(this).val();
                let correo = data.find(item => item.id === parseInt(id))?.correo;
                idUsuarios = id;
                emailG = correo;
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar los Entrenadores" + error
            });
        })
    }

    this.PopulateClases = function () {
        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/ClasesGrupales/GetClasesGrupales",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoClases = data;
            var select = $('#idClase');

            for (var row in data) {
                const originalDate = new Date(data[row].horarios);
                const format =
                    `${(originalDate.getMonth() + 1).toString().padStart(2, '0')}/` +
                    `${originalDate.getDate().toString().padStart(2, '0')}/` +
                    `${originalDate.getFullYear()} ` +
                    `${originalDate.getHours().toString().padStart(2, '0')}:` +
                    `${originalDate.getMinutes().toString().padStart(2, '0')}`;

                select.append('<option value=' + data[row].id + '>' + data[row].nombreClase + ' - ' + format);
            }
            select.on('change', function () {
                let id = $(this).val();
                idClases = id;
            });
        }).fail(function (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar las clases" + error
            });
        })
    }
}

function Consultar1() {
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
            'Nombre Cliente',
            'Correo',
            'Nombre de la Clase',
            'Horario de la Clase',
        ],
        headerVisible: false,
        server: {
            url: 'https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/UsuarioClaseGrup/GetAllUsuarioClaseGr',
            then: data => data.data.map(result => {
                const originalDate = new Date(result.clasesGrupalesList[0].horarios);

                const formattedDate = `${(originalDate.getMonth() + 1).toString().padStart(2, '0')}/` +
                    `${originalDate.getDate().toString().padStart(2, '0')}/` +
                    `${originalDate.getFullYear()} ` +
                    `${originalDate.getHours().toString().padStart(2, '0')}:` +
                    `${originalDate.getMinutes().toString().padStart(2, '0')}`;

                return [
                    result.usuariosList[0].nombre,
                    result.usuariosList[0].correo,
                    result.clasesGrupalesList[0].nombreClase,
                    formattedDate,
                ]
            })
        },
    }).render(document.getElementById('myGrid2'));
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
    Consultar1();
    var view = new AsignarClase();
    view.InitView();
});
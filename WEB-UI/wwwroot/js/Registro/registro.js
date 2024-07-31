function CrearUsuario() {

    this.InitView = function () {
        $('#registro').click(function (event) {
            var view = new CrearUsuario();
            view.SubmitCrearUsuario();
        })
    }

    this.SubmitCrearUsuario = function () {

        function fillTimestamp() {
            var now = new Date();
            var year = now.getFullYear();
            var month = ('0' + (now.getMonth() + 1)).slice(-2);
            var day = ('0' + now.getDate()).slice(-2);
            var hours = ('0' + now.getHours()).slice(-2);
            var minutes = ('0' + now.getMinutes()).slice(-2);
            var seconds = ('0' + now.getSeconds()).slice(-2);
            return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
        }

        var usuario = {};
        usuario.id = generateUniqueId();
        usuario.nombre = $('#registerName').val();
        usuario.apellidos = $('#registerLastName').val();
        usuario.nacimiento = $('#BirthDay').val();
        usuario.correo = $('#registerEmail').val();
        usuario.celular = $('#Phone').val();
        usuario.contrasenna = $('#registerPassword').val();
        usuario.rol = $('#clienteTipo').find(":selected").val();
        usuario.genero = $('#Sexo').find(":selected").val();
        usuario.otp = generateUniqueOTP();
        usuario.verificar = "Incompleta";

        email = $('#registerEmail').val();
        phone = $('#Phone').val();
        gotp = usuario.otp;

        nombreCompleto = usuario.nombre + " " + usuario.apellidos;
        var time = fillTimestamp();

        usuario.timeout = time;

        var fechaNacimientoString = $('#BirthDay').val();
        var fechaNacimiento = new Date(fechaNacimientoString);
        var fechaActualString = new Date().toISOString().slice(0, 16);
        var fechaActual = new Date(fechaActualString);

        var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        localStorage.setItem('correo', usuario.correo);

        if (usuario.nombre == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique su nombre en el espacio correspondiente.",
                title: 'Error'
            });
            return;
        }

        if (usuario.apellidos == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique su apellido en el espacio correspondiente.",
                title: 'Error'
            });
            return;
        }

        if (edad < 16) {
            Swal.fire({
                icon: 'error',
                text: "La edad minima para matricular debe ser 16 años, " + "la edad indicada fue: " + edad,
                title: 'Error'
            });
            return;
        } else if (edad > 68) {
            Swal.fire({
                icon: 'error',
                text: "La edad maxima para matricular debe ser 68 años, " + "la edad indicada fue: " + edad,
                title: 'Error'
            });
            return;
        }

        if (usuario.nacimiento == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor seleccione una fecha de nacimiento.",
                title: 'Error'
            });
            return;
        }

        if (usuario.correo == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique su correo en el espacio correspondiente.",
                title: 'Error'
            });
            return;
        }

        if (usuario.celular == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique su numero celular en el espacio correspondiente.",
                title: 'Error'
            });
            return;
        }

        if (usuario.celular.length != 8) {
            Swal.fire({
                icon: 'error',
                text: "El número de teléfono debe tener 8 digitos.",
                title: 'Error'
            });
            return;
        }

        if (usuario.genero === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique su genero en el espacio correspondiente.",
                title: 'Error'
            });
            return;
        }

        if (usuario.contrasenna.length != 8) {
            Swal.fire({
                icon: 'error',
                text: "La contraseña debe tener 8 caracteres.",
                title: 'Error'
            });
            return;
        }

        var contrasenna = $('#registerPassword').val();
        var confcontrasenna = $('#confirPassword').val();

        if (contrasenna != confcontrasenna) {
            Swal.fire({
                icon: 'error',
                text: "Las contraseñas no coinciden.",
                title: 'Error'
            });
            return;
        }

        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetUserByEmail?correo=" + email,
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            var user = result[0];
            if (!user) {
                $.ajax({
                    url: "https://localhost:7253/api/Usuario/GetUserByPhone?phone=" + phone,
                    method: "GET",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json"
                }).done(function (result2) {
                    var user2 = result2[0];
                    if (!user2) {
                        $.ajax({
                            headers: {
                                'Accept': "application/json",
                                'Content-Type': "application/json"
                            },
                            method: "POST",
                            url: "https://localhost:7253/api/Usuario/CreateUsuario",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify(usuario),
                            hasContent: true
                        }).done(function (result) {
                            Swal.fire({
                                title: "Éxito",
                                icon: "success",
                                text: "Se ha completado el registro",
                            }).then(
                                function () {
                                    var view = new CrearUsuario();
                                    view.LimpiarFormulario();
                                    view.EmailService();
                                    
                                    sessionStorage.setItem('correo', email);
                                    sessionStorage.setItem('timestamp', time);

                                    window.location = "/Views/OTP/OTP"
                                }
                            )
                        }).fail(function (error) {
                            Swal.fire({
                                icon: 'error',
                                text: "Error al registrarse",
                                title: 'Error',
                            });
                        });

                    } else if (user2.celular === phone) {
                        Swal.fire({
                            icon: 'error',
                            text: "Por favor indicar un numero telefonico que no se haya registrado antes.",
                            title: 'Error'
                        });
                    }
                }).fail(function (error) {
                    console.log("Error", error);
                })

            } else if (user.correo === email) {
                Swal.fire({
                    icon: 'error',
                    text: "Por favor indicar un correo que no se haya registrado antes.",
                    title: 'Error'
                });
            }
        }).fail(function (error) {
            console.log("Error", error);
        });
    }

    this.EmailService = function () {
        cuerpo = "Hola " + nombreCompleto + "<br><br>" +
            "Gracias por registrarte. Para activar tu cuenta, por favor ingresa el siguiente código de verificación en la página: " + gotp + "." + "<br><br>" +
            "Ten en cuenta que el código expirará en un minuto." + "<br><br>" +
            "Gimnasio Rambo's Gym."

        var apiUrl = "https://localhost:7253/api/Email/SendEmail?correo=" + email + "&cuerpo=" + cuerpo + "&asunto=Verificación de cuenta";
        
        $.ajax({
            url: apiUrl,
            method: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            processData: false,
            data: JSON.stringify({}),
            headers: {
                'Content-Type': 'text/html'
            }

        }).done(function (data) {
            console.log("Se ha enviado un correo con el código OTP" + data)

        }).fail(function (xhr, textStatus, errorThrown) {
            if (xhr.responseText === "OK") {
                Swal.fire({
                    icon: 'success',
                    text: "Correo de verificación enviado con éxito, por favor revise su correo para realizar la validación",
                    title: 'Success',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    text: xhr.responseText,
                    title: 'Error',
                });
            }
        });
    }
    this.LimpiarFormulario = function () {
        $('#registerName').val('');
        $('#registerLastName').val('');
        $('#BirthDay').val('');
        $('#registerEmail').val('');
        $('#Phone').val('');
        $('#Sexo').val('');
        $('#registerPassword').val('');
        $('#confirPassword').val('');
    }
}

generateOTPS = [];

generateUniqueOTP = () => {
    let newOTP;
    do {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        newOTP = parseInt(randomNumber);
    } while (generateOTPS.includes(newOTP));
    generateOTPS.push(newOTP);
    return newOTP;
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
    var view = new CrearUsuario();
    view.InitView();
});
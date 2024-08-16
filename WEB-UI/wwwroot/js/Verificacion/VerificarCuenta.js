﻿function setCorreoValue() {
    $("#email").val(sessionStorage.getItem("correo"));
}

function VerificarCuenta() {
    this.InitView = function () {
        $("#verificar").click(function (event) {
            var view = new VerificarCuenta();
            view.SubmitVerificarCuenta();
        });

        $("#reenviar").click(function (event) {
            var view = new VerificarCuenta();
            sessionStorage.setItem("timestamp", new Date());
            view.Submitreenvio();
        });
    }

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

    this.SubmitVerificarCuenta = function () {
        var usuario = {}

        usuario.correo = $("#email").val();
        usuario.otp = $("#otp").val();

        var email = usuario.correo
        var ot = usuario.otp

        if (usuario.otp === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indicar el numero de validación enviado a su correo.",
                title: '',
                showConfirmButton: true
            });
            return;
        }

        //Se usara para generar un nuevo OTP
        var newtime = fillTimestamp();

        //Tiempo registrado desde que se genero el OTP
        var timestamp = sessionStorage.getItem("timestamp")

        //se rellena al momento de validar cuanto tiempo ha pasado
        var currentime = new Date().getTime();
        //Convierte la fecha en session storage a una fecha legible para JS
        var timeStampDateTime = new Date(timestamp).getTime();

        var dif = (currentime - timeStampDateTime) / 1000;

        if (dif < 120) {
            $.ajax({
                url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/GetUserByEmail?correo=" + email,
                method: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json"
            }).done(function (result) {
                var user = result[0];
                if (user.otp != ot) {
                    Swal.fire({
                        icon: 'error',
                        text: "El Número indicado no corresponde con el enviado al correo.",
                        title: '',
                        timer: 5000,
                        showConfirmButton: true
                    });
                } else {
                    $.ajax({
                        url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/Validacion?correo=" + email + "&verificar=Validado",
                        method: "PUT",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json"
                    }).done(function (error) {
                        console.log(error);
                    }).fail(function (error) {
                        Swal.fire({
                            icon: 'success',
                            text: "Se ha validado su correo, ahora puede iniciar sesión.",
                            title: 'Éxito',
                            timer: 5000,
                            showConfirmButton: true
                        }).then((error) => {
                            if (error.isConfirmed || error.dismiss === Swal.DismissReason.timer) {
                                window.location = "/Home/Index";
                            }
                        });
                    });
                }
            }).fail(function (error) {
                Swal.fire({
                    icon: 'error',
                    text: message,
                    title: ''
                });
            });
        } else {
            Swal.fire({
                icon: 'error',
                text: "Ha pasado más de un minuto, por favor solicitar nuevamente el codigo para realizar las validaciones.",
                title: '',
                timer: 5000,
                showConfirmButton: true
            });
        }
    }

    this.Submitreenvio = function () {
        email2 = $('#email').val();
        newOTP = generateUniqueOTP();
        newtime = fillTimestamp();
        sessionStorage.setItem('timestamp', newtime);
        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/UpdateOTP?correo=" + email2 + "&OTP=" + newOTP,
            method: "PUT",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (error) {
            console.log(error);
        }).fail(function (error) {
            Swal.fire({
                icon: 'success',
                text: "Se ha enviado un nuevo código a su correo.",
                title: 'Éxito',
                timer: 5000,
                showConfirmButton: true
            }).then((error) => {
                if (error.isConfirmed || error.dismiss === Swal.DismissReason.timer) {
                    cuerpo = "Hola" + "<br><br>" +
                        "Para activar tu cuenta, por favor ingresa el siguiente código de verificación en la página: " + newOTP + "." + "<br><br>" +
                        "Ten en cuenta que el código expirará en un dos minutos." + "<br><br>" +
                        "Gimnasio Rambo's Gym."

                    var apiUrl = "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Email/SendEmail?correo=" + email2 + "&cuerpo=" + cuerpo + "&asunto=Verificación de cuenta";

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
                                title: 'Éxito',
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
            });
        });
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

limpiarOtp = function () {
    $("#otp").val("");
}

$(document).ready(function () {
    setCorreoValue();
    var view = new VerificarCuenta();
    view.InitView();
});
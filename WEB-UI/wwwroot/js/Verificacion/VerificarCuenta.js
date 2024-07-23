function setCorreoValue() {
    $("#email").val(sessionStorage.getItem("correo"));
}

function VerificarCuenta() {
    this.InitView = function () {
        $("#verificar").click(function (event) {
            var view = new VerificarCuenta();
            view.SubmitVerificarCuenta();
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
        var ot = usuario.otp

        if (usuario.otp === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indicar el numero de validación enviado a su correo.",
                title: 'Error',
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

        if (dif < 60) {
            $.ajax({
                url: "https://localhost:7253/api/Usuario/GetUserByEmail?correo=" + usuario.correo,
                method: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json"
            }).done(function (result) {
                var user = result[0];
                if (user.otp === ot) {
                    $.ajax({
                        url: "https://localhost:7253/api/Usuario/Validacion?correo=" + usuario.correo + "&verificar=Validado",
                        method: "PUT",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json"
                    }).done(function (data) {
                        Swal.fire({
                            icon: 'success',
                            text: "Se ha validado su correo, ahora puede inidicar sesión.",
                            title: 'Success',
                            timer: 5000,
                            showConfirmButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location = "Home/Index";
                            }
                        });
                    }).fail(function (error) {
                        Swal.fire({
                            icon: 'error',
                            text: "Error al validar",
                            title: 'Error',
                            timer: 5000,
                            showConfirmButton: true
                        });

                    })
                }else {
                    Swal.fire({
                        icon: 'error',
                        text: "El Número indicado no corresponde con el enviado al correo.",
                        title: 'Error',
                        timer: 5000,
                        showConfirmButton: true
                    });
                }
            }).fail(function (error) {
                Swal.fire({
                    icon: 'error',
                    text: message,
                    title: 'Error'
                });
            })
        } else {
            Swal.fire({
                icon: 'error',
                text: "Ha pasado mas de un minuto, por favor solicitar nuevamente el codigo para realizar las validaciones.",
                title: 'Error',
                timer: 5000,
                showConfirmButton: true
            });
        }
    }
}


limpiarOtp = function () {
    $("#otp").val("");
}

$(document).ready(function () {
    console.log(sessionStorage.getItem("correo"));
    setCorreoValue();
    var view = new VerificarCuenta();
    view.InitView();
})
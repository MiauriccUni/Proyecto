function RecuContras() {
    this.InitView = function () {
        $('#verificarCorreo').click(function (event) {
            var view = new RecuContras();
            view.SubmitRecuperar();
        });
    }

    this.SubmitRecuperar = function () {

        correo = $('#email').val();
        otp = $('#otp').val();

        if (correo === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el correo correspondiente.",
                title: 'Error'
            });
            return;
        }

        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetUserByEmail?correo=" + correo,
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            var user = result[0];
            if (!user) {
                Swal.fire({
                    icon: 'error',
                    text: "El correo indicado no corresponde",
                    title: 'Error',
                });
            } else {

                newOTP = generateUniqueId();

                newtime = fillTimestamp();

                sessionStorage.setItem('timestamp', newtime);

                $.ajax({
                    url: "https://localhost:7253/api/Usuario/UpdateOTP?correo=" + correo + "&OTP=" + newOTP,
                    method: "PUT",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json"
                }).done(function (error) {
                    console.log(error);
                }).fail(function (error) {
                    Swal.fire({
                        icon: 'success',
                        text: "Se ha enviado un nuevo código a su correo.",
                        title: 'Success',
                        timer: 5000,
                        showConfirmButton: true
                    }).then((error) => {
                        if (error.isConfirmed || error.dismiss === Swal.DismissReason.timer) {
                            cuerpo = "Hola" + "<br><br>" +
                                "Para activar tu cuenta, por favor ingresa el siguiente código de verificación en la página: " + newOTP + "." + "<br><br>" +
                                "Ten en cuenta que el código expirará en un dos minutos." + "<br><br>" +
                                "Gimnasio Rambo's Gym."

                            var apiUrl = "https://localhost:7253/api/Email/SendEmail?correo=" + correo + "&cuerpo=" + cuerpo + "&asunto=Verificación de cuenta";

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
                    });
                });


            }
        }).fail(function (error) {
            console.log("Error", error);
        });

    }    
    
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
    var view = new RecuContras();
    view.InitView();
});
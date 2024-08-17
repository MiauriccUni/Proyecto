function RecuContras() {
    this.InitView = function () {
        $('#verificarCorreo').click(function (event) {
            var view = new RecuContras();
            view.SubmitRecuperar();
        });

        // Parte nueva: Agregar el evento para el botón 'verifOTPContra'
        $('#verifOTPContra').click(function () {
            var view = new RecuContras();
            view.VerificarOTP();  // Llamada a la nueva función para verificar OTP

        });
    }

    this.SubmitRecuperar = function () {

        correo = $('#email').val();
        otp = $('#otp').val();

        if (correo === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el correo correspondiente.",
                title: ''
            });
            return;
        }

        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/GetUserByEmail?correo=" + correo,
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            var user = result[0];
            if (!user) {
                Swal.fire({
                    icon: 'error',
                    text: "El correo indicado no corresponde",
                    title: '',
                });
            } else {

                newOTP = generateUniqueId();

                newtime = fillTimestamp();

                sessionStorage.setItem('timestamp', newtime);

                $.ajax({
                    url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/UpdateOTP?correo=" + correo + "&OTP=" + newOTP,
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
                        sessionStorage.setItem('correo', correo);
                        if (error.isConfirmed || error.dismiss === Swal.DismissReason.timer) {
                            cuerpo = "Hola" + "<br><br>" +
                                "Para actualizar tu contraseña, por favor ingresa el siguiente código de verificación en la página: " + newOTP + "." + "<br><br>" +
                                "Ten en cuenta que el código expirará en un dos minutos." + "<br><br>" +
                                "Gimnasio Rambo's Gym."

                            var apiUrl = "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Email/SendEmail?correo=" + correo + "&cuerpo=" + cuerpo + "&asunto=Verificación de cuenta";

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
        }).fail(function (error) {
            console.log("Error", error);
        });
    }

    this.VerificarOTP = function () {
        var correo = sessionStorage.getItem("correo")
        otp1 = $('#otp').val();
        
        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/GetUserByEmail?correo=" + correo,
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            var user = result[0];
            console.log(otp1)
            console.log(user.otp)
            if (user.otp != otp1) {
                Swal.fire({
                    icon: 'error',
                    text: "El otp no es correcto",
                    title: '',
                });
            } else if (user.otp == otp1) {
                Swal.fire({
                    icon: 'success',
                    text: "OTP validado con éxito.",
                    title: 'Éxito',
                }).then(() => {
                    sessionStorage.setItem('correo', correo);
                    window.location = "/OTP/ChangePassword"; 
                });
            }
        }).fail(function(error){
            console.log(error);
        })
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

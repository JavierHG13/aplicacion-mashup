import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { mensaje } from "./mensaje.js"; // Importa la función mensaje
const btn_registrar = document.getElementById("btn_registrar");
btn_registrar.addEventListener('click', e => {
    e.preventDefault();
    alert("Registrado");
    const txt_email = document.querySelector("#txt_email");
    const txt_password = document.querySelector("#txt_password");

    createUserWithEmailAndPassword(auth, txt_email.value, txt_password.value)
        .then((userCredential) => {
            // Usuario registrado exitosamente
            const user = userCredential.user;
            console.log("Cuenta registrada correctamente");
            console.log(user);
            mensaje("Cuenta registrada correctamente", "success");

            // Redirigir automáticamente a la página fakesstore.html
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            mensaje(`Error al registrar: ${errorMessage}`, "error");
        });
});
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { mensaje } from "./mensaje.js"; // Importa la función mensaje

const btn_login = document.getElementById("btn_login");

// Agrega un evento de escucha al botón de inicio de sesión
btn_login.addEventListener('click', e => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    const txt_email = document.querySelector("#txt_email");
    const txt_password = document.querySelector("#txt_password");

    // Intenta iniciar sesión con correo electrónico y contraseña
    signInWithEmailAndPassword(auth, txt_email.value, txt_password.value)
        .then((userCredential) => {
            // Sesión iniciada correctamente
            const user = userCredential.user;
            mensaje("Inicio de sesion exitoso", "success"); 
            console.log(user);
            localStorage.setItem('userEmail', user.email);
            // Redirige al usuario a la página 'index.html'
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000); 
        })
        .catch((error) => {
            // Muestra errores en caso de fallo
            const errorMessage = error.message;
            mensaje(errorMessage, "error"); // Muestra el mensaje de error
        });
});

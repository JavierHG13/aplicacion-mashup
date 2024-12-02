import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const btn_loginGoogle = document.getElementById("btn_loginGoogle");

// Agrega un evento de escucha al botón de inicio de sesión con Google
btn_loginGoogle.addEventListener("click", e => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    const provider = new GoogleAuthProvider();

    // Intenta iniciar sesión con Google
    signInWithPopup(auth, provider)
    .then((result) => {
        // Esto proporciona un token de acceso de Google. Se puede usar para acceder a la API de Google.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // Información del usuario que ha iniciado sesión
        const user = result.user;
        // Almacenar el correo del usuario en localStorage
        localStorage.setItem('userEmail', user.email);
        // Los datos del proveedor de identidad están disponibles usando getAdditionalUserInfo(result)
        document.location.href = "index.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
});


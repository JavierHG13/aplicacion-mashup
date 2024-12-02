import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth } from './firebase.js';

// Comprueba el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Si no hay usuario autenticado, redirige al login
        window.location.href = "login.html"; // Asegúrate de que la ruta sea correcta
    }
});

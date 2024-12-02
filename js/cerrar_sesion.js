import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { auth } from './firebase.js';

const cerrar_sesion = document.getElementById('cerrarSesion');

cerrar_sesion.addEventListener('click', async (e) => {
    e.preventDefault(); 

    const confirmarCierre = confirm("¿Estás seguro de que deseas cerrar sesión?");

    if (confirmarCierre) {
        try {
            await signOut(auth);
            console.log('Sesión cerrada');

            // Redirige a la página de inicio de sesión
            document.location.href = "./login.html";
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("Ocurrió un error al cerrar la sesión.");
        }
    }
});


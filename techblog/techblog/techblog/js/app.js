/* app.js para TechBlog Interactivo */

/*  Constantes y variables  */
const APP_NAME = "TechBlog Interactivo";
let visitas = 0; // inicializado en 0, luego cargamos localStorage si existe

/*  Helper / arrow function  */
const welcome = (nombre) => `Bienvenido ${nombre} a ${APP_NAME}`;

/* Función para reloj  */
function mostrarHora() {
  const el = document.getElementById("reloj");
  if (!el) return;
  const ahora = new Date();
  const hh = String(ahora.getHours()).padStart(2, "0");
  const mm = String(ahora.getMinutes()).padStart(2, "0");
  const ss = String(ahora.getSeconds()).padStart(2, "0");
  el.innerText = `${hh}:${mm}:${ss}`;
}

/*  DOM  */
document.addEventListener("DOMContentLoaded", () => {
  // cargar visitas desde localStorage
  const stored = localStorage.getItem("techblog_visitas");
  if (stored !== null) visitas = parseInt(stored, 10) || 0;

  // mostrar visitas
  const contadorEl = document.getElementById("contador");
  if (contadorEl) contadorEl.innerText = visitas;

  // botón de visitas
  const btnVisitas = document.getElementById("btnVisitas");
  if (btnVisitas) {
    btnVisitas.addEventListener("click", () => {
      visitas++;
      localStorage.setItem("techblog_visitas", visitas);
      if (contadorEl) contadorEl.innerText = visitas;
    });
  }

  // saludo dinámico
  const saludoEl = document.getElementById("saludo");
  if (saludoEl) {
    const ahora = new Date();
    const h = ahora.getHours();
    let saludo = "Hola";
    if (h < 12) saludo = "Buenos días";
    else if (h < 19) saludo = "Buenas tardes";
    else saludo = "Buenas noches";
    saludoEl.innerText = `${saludo}. ${welcome("lector")}`;
    console.log("✅ Saludo mostrado:", saludoEl.innerText); // depuración
  } else {
    console.warn("⚠️ No se encontró el elemento #saludo");
  }

  // reloj
  mostrarHora();
  setInterval(mostrarHora, 1000);

  // cambio de color
  const texto = document.getElementById("texto");
  const btnRojo = document.getElementById("btnRojo");
  const btnVerde = document.getElementById("btnVerde");
  const btnAzul = document.getElementById("btnAzul");

  if (btnRojo && texto) btnRojo.addEventListener("click", () => texto.style.color = "red");
  if (btnVerde && texto) btnVerde.addEventListener("click", () => texto.style.color = "green");
  if (btnAzul && texto) btnAzul.addEventListener("click", () => texto.style.color = "blue");

  // navegación activa
  const pagina = window.location.pathname.split("/").pop().replace(".html", "");
  const enlace = document.querySelector(`a[data-page="${pagina}"]`);
  if (enlace) enlace.classList.add("activo");

  /* ==========================
     VALIDACIÓN DEL FORMULARIO
     ========================== */
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // evita enviar hasta validar
      let valido = true;

      // limpiar mensajes previos
      document.querySelectorAll(".mensaje-error").forEach(div => div.innerText = "");

      // nombre
      const nombre = document.getElementById("nombre");
      if (!nombre.value.trim()) {
        document.getElementById("err-nombre").innerText = "El nombre es obligatorio.";
        valido = false;
      }

      // correo
      const correo = document.getElementById("correo");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correo.value.trim()) {
        document.getElementById("err-correo").innerText = "El correo es obligatorio.";
        valido = false;
      } else if (!emailRegex.test(correo.value)) {
        document.getElementById("err-correo").innerText = "Formato de correo inválido.";
        valido = false;
      }

      // tema
      const tema = document.getElementById("tema");
      if (!tema.value) {
        document.getElementById("err-tema").innerText = "Debes seleccionar un tema.";
        valido = false;
      }

      // mensaje
      const mensaje = document.getElementById("mensaje");
      if (!mensaje.value.trim()) {
        document.getElementById("err-mensaje").innerText = "El mensaje no puede estar vacío.";
        valido = false;
      }

      // si todo está bien
      const feedback = document.getElementById("feedback");
      if (valido) {
        feedback.innerText = "✅ Mensaje enviado con éxito.";
        form.reset();
      } else {
        feedback.innerText = "⚠️ Corrige los errores antes de enviar.";
      }
    });
  }
});

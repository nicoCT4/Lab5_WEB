// URL del servidor del chat
const urlChat = "https://chat.nrywhite.lat/chats";

// Crear contenedor principal
const app = document.createElement("div");
app.style.display = "flex";
app.style.flexDirection = "column";
app.style.height = "100vh";
app.style.width = "100vw";
app.style.fontFamily = "Arial, sans-serif";
document.body.appendChild(app);

//Preferencia
let theme = localStorage.getItem("theme") || "light";

// Contenedor de mensajes principal
const messagesContainer = document.createElement("div");
messagesContainer.style.flex = "1";
messagesContainer.style.overflowY = "auto";
messagesContainer.style.padding = "10px";
app.appendChild(messagesContainer);

// Cambiar tema
const themeButton = document.createElement("button");
themeButton.textContent = "Cambiar tema";
themeButton.style.position = "absolute";
themeButton.style.top = "10px";
themeButton.style.right = "10px";
themeButton.style.padding = "8px 16px";
themeButton.style.cursor = "pointer";
themeButton.addEventListener("click", () => {
   theme = theme === "dark" ? "light" : "dark";
   localStorage.setItem("theme", theme);
}
);
app.appendChild(themeButton);

// Contenedor de entrada de texto
const inputContainer = document.createElement("div");
inputContainer.style.display = "flex";
inputContainer.style.padding = "10px";
inputContainer.style.borderTop = "1px solid #ddd";

// Campo de entrada
const inputField = document.createElement("input");
inputField.type = "text";
inputField.placeholder = "Escribe tu mensaje...";
inputField.style.flex = "1";
inputField.style.padding = "8px";
inputField.style.fontSize = "16px";
inputField.maxLength = 140; // Límite de caracteres
inputContainer.appendChild(inputField);

// Botón de enviar
const sendButton = document.createElement("button");
sendButton.textContent = "Enviar";
sendButton.style.marginLeft = "10px";
sendButton.style.padding = "8px 12px";
sendButton.style.cursor = "pointer";
sendButton.style.backgroundColor = "#007bff";
sendButton.style.color = "white";
sendButton.style.border = "none";
sendButton.style.fontSize = "16px";
inputContainer.appendChild(sendButton);

app.appendChild(inputContainer);

// Función para obtener mensajes
async function fetchMessages() {
   try {
      const response = await fetch(urlChat);
      const messages = await response.json();
      messagesContainer.innerHTML = ""; // Limpiar mensajes previos
      messages.forEach(msg => displayMessage(msg));
   } catch (error) {
      console.error("Error obteniendo mensajes:", error);
   }
}

// Función para mostrar mensajes en el chat
function displayMessage({ username, message }) {
   const messageElement = document.createElement("div");
   messageElement.style.padding = "5px";
   messageElement.style.marginBottom = "5px";
   messageElement.style.borderRadius = "5px";
   messageElement.style.border = "1px solid #ddd";

   const userElement = document.createElement("strong");
   userElement.textContent = username + ": ";
   messageElement.appendChild(userElement);

   const textElement = document.createElement("span");
   textElement.textContent = message;
   messageElement.appendChild(textElement);

   messagesContainer.appendChild(messageElement);
}

// Preguntar usuario solo una vez y guardarlo en localStorage
let username = localStorage.getItem("username");
if (!username) {
   username = prompt("Ingresa tu nombre de usuario:");
   if (username) localStorage.setItem("username", username);
}

// Función para enviar mensajes
async function sendMessage() {
   const message = inputField.value.trim();
   if (message === "") return;

   try {
      await fetch(urlChat, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username, message })
      });
      inputField.value = "";
      fetchMessages();
   } catch (error) {
      console.error("Error enviando mensaje:", error);
   }
}


// Manejar el botón de enviar y la tecla Enter
sendButton.addEventListener("click", sendMessage);
inputField.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
      sendMessage();
   }
});

// Auto-refresh cada 5 segundos
setInterval(fetchMessages, 5000);

// Cargar mensajes al inicio
fetchMessages();

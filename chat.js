// URL del servidor del chat
const urlChat = "https://chat.nrywhite.lat/chats";

// Crear contenedor principal
const app = document.createElement("div");
app.style.cssText = `
   display: flex;
   flex-direction: column;
   height: 100vh;
   width: 90%;
   margin: 0 auto;
   max-width: 900px;
   font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   position: relative;
   overflow: hidden;
`;

document.body.appendChild(app);

// Contenedor de mensajes principal
const messagesContainer = document.createElement("div");
messagesContainer.style.cssText = `
   flex: 0.9;
   display: flex;
   flex-direction: column;
   overflow-y: auto;
   overflow-x: hidden;
   max-height: calc(100vh - 120px);
   padding: 15px;
   gap: 10px;
   background-color: #f5f5f5;
`;
app.appendChild(messagesContainer);

//----------------Blanco y Negro--------------------------

//Preferencia
let theme = localStorage.getItem("theme") || "light";


//Funcion para cambiar el tema
function changeTheme() {
   if (theme === "dark") {
      document.body.style.backgroundColor = "#121212";
      messagesContainer.style.backgroundColor = "#1e1e1e";
      messagesContainer.style.color = "#e0e0e0";
   } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      messagesContainer.style.backgroundColor = "white";
      messagesContainer.style.color = "black";
   }
}
changeTheme();

// Cambiar tema botón
const themeButton = document.createElement("button");
themeButton.textContent = "🌓 Cambiar tema";
themeButton.style.cssText = `
   position: absolute;
   top: 10px;
   right: 10px;
   padding: 8px 16px;
   cursor: pointer;
   border: none;
   border-radius: 20px;
   background-color: #4a8cff;
   color: white;
   font-weight: bold;
   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
   z-index: 100;
   transition: all 0.2s ease;
`;
themeButton.addEventListener("mouseover", () => {
   themeButton.style.transform = "scale(1.05)";
});
themeButton.addEventListener("mouseout", () => {
   themeButton.style.transform = "scale(1)";
});
themeButton.addEventListener("click", () => {
   theme = theme === "dark" ? "light" : "dark";
   changeTheme();
});
app.appendChild(themeButton);

// ------------------------------

// -----------------Boton para cambiar de usuario-----------------------

//Definir usuario, si no hay usuario se pone Anónimo
let username = localStorage.getItem("username") || "Anónimo";

const userButton = document.createElement("button");
userButton.textContent = `👤 ${username}`;
userButton.style.cssText = `
   position: absolute;
   top: 50px;
   right: 10px;
   padding: 8px 16px;
   cursor: pointer;
   border: none;
   border-radius: 20px;
   background-color: #4a8cff;
   color: white;
   font-weight: bold;
   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
   z-index: 100;
   transition: all 0.2s ease;
`;
userButton.addEventListener("mouseover", () => {
   userButton.style.transform = "scale(1.05)";
});
userButton.addEventListener("click", () => {
   const newUser = prompt("Ingresa tu nombre de usuario:", username);
   if (newUser && newUser.trim() !== "") {
      username = newUser.trim();
      localStorage.setItem("username", username);
      userButton.textContent = `👤 ${username}`;
   }
});
app.appendChild(userButton);

//cambiar de usuario
userButton.addEventListener("click", () => {
   const newUser = prompt("Ingresa tu nombre de usuario:");
   if (newUser && newUser.trim() !== "") {
      username = newUser.trim();
      localStorage.setItem("username", username);
      userButton.textContent = "Usuario: " + username;
   }
});
app.appendChild(userButton);


// -------------Contendores de mensajes-----------------

// Contenedor de entrada de texto
const inputContainer = document.createElement("div");
inputContainer.style.cssText = `
   display: flex;
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   padding: 15px;
   background-color: #d3d3d3;
   border-top: 1px solid #ddd;
   box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
`;

app.appendChild(inputContainer);

// Campo de entrada
const inputField = document.createElement("input");
inputField.type = "text";
inputField.placeholder = "Escribe tu mensaje...";
inputField.style.cssText = `
   flex: 1;
   padding: 12px 15px;
   font-size: 16px;
   border: 1px solid #ddd;
   border-radius: 25px;
   outline: none;
   transition: all 0.3s ease;
   max-width: calc(100% - 100px);
   background-color: #eaeaea
`;
inputField.maxLength = 140;
inputField.addEventListener("focus", () => {
   inputField.style.borderColor = "#4a8cff";
   inputField.style.boxShadow = "0 0 0 2px rgba(74, 140, 255, 0.2)";
});
inputField.addEventListener("blur", () => {
   inputField.style.borderColor = "#ddd";
   inputField.style.boxShadow = "none";
});
inputField.addEventListener("paste", (event) => {
   setTimeout(() => {
      const pastedText = inputField.value.trim();
      if (isValidUrl(pastedText)) {
         console.log("URL pegada:", pastedText);
      }
   }, 100);
});

inputContainer.appendChild(inputField);


// Función para verificar si es un enlace válido
function isValidUrl(string) {
   const urlPattern = new RegExp('^(https?:\\/\\/)?' + // http:// o https://
       '((([a-zA-Z0-9$_.+!*\'(),;?&=-]+)@)?' + // Usuario
       '((\\d{1,3}\\.){3}\\d{1,3}|' + // IPv4
       '([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))' + // Dominio
       '(\\:\\d+)?(\\/.*)?$', 'i'); // Puerto y ruta
   return urlPattern.test(string);
}

// Botón de enviar
const sendButton = document.createElement("button");
sendButton.textContent = "Enviar";
sendButton.style.cssText = `
   margin-left: 10px;
   padding: 0 20px;
   cursor: pointer;
   background-color: #4a8cff;
   color: white;
   border: none;
   border-radius: 25px;
   font-size: 16px;
   font-weight: bold;
   transition: all 0.2s ease;
`;
sendButton.addEventListener("mouseover", () => {
   sendButton.style.backgroundColor = "#3a7cff";
});
sendButton.addEventListener("mouseout", () => {
   sendButton.style.backgroundColor = "#4a8cff";
});
inputContainer.appendChild(sendButton);

// ------------------------------



//-----------------Funciones-----------------------
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
// Cargar mensajes al inicio
fetchMessages();

// Función para mostrar mensajes en el chat
function displayMessage({ username, message }) {
   const messageElement = document.createElement("div");
   messageElement.style.cssText = `
      padding: 12px 15px;
      margin-bottom: 5px;
      border-radius: 15px;
      background-color: ${username === localStorage.getItem("username") ? "#4a8cff" : "#e9e9e9"};
      color: ${username === localStorage.getItem("username") ? "white" : "#333"};
      word-wrap: break-word;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      position: relative;
      display: inline-block;
      max-width: 100%;
   `;
   

   const userElement = document.createElement("div");
   userElement.textContent = username;
   userElement.style.cssText = `
      font-weight: bold;
      margin-bottom: 5px;
      color: ${username === localStorage.getItem("username") ? "rgba(255,255,255,0.8)" : "#666"};
      font-size: 0.9em;
   `;
   messageElement.appendChild(userElement);

   const textElement = document.createElement("div");
   textElement.textContent = message;
   textElement.style.cssText = `
      font-size: 1em;
      line-height: 1.4;
   `;
   messageElement.appendChild(textElement);

   const urldetect = /(https?:\/\/[^\s]+)/g;
   const links = message.match(urldetect);
   if (links) {
      links.forEach(link => {
         if(isImage(link)){
            const imgPreview = document.createElement("img");
            imgPreview.src = link;
            imgPreview.style.cssText = `
               max-width: 100%;
               max-height: 200px;
               margin-top: 10px;
               border-radius: 8px;
               display: block;
               object-fit: contain;
               border: 1px solid rgba(0,0,0,0.1);
            `;
            messageElement.appendChild(imgPreview);
         } else {
            linkPreview(link, messageElement);
         }
      });
   }
   messagesContainer.appendChild(messageElement);
} 

// Función para detectar si el link es una imagen
function isImage(url) {
   return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
}

// Función para obtener título de una página web y crear una preview
async function linkPreview(url, container) {
   try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, "text/html");
      const title = doc.querySelector("title") ? doc.querySelector("title").innerText : "Vista previa";

      const linkPreview = document.createElement("div");
      linkPreview.style.marginTop = "5px";
      linkPreview.style.padding = "8px";
      linkPreview.style.border = "1px solid #ccc";
      linkPreview.style.borderRadius = "5px";
      linkPreview.style.backgroundColor = "#f8f9fa";
      linkPreview.style.cursor = "pointer";

      const linkText = document.createElement("a");
      linkText.href = url;
      linkText.textContent = title;
      linkText.style.textDecoration = "none";
      linkText.style.color = "#007bff";
      linkText.target = "_blank";

      linkPreview.appendChild(linkText);
      container.appendChild(linkPreview);
   } catch (error) {
      console.error("Error obteniendo previsualización:", error);
   }
}

// Función para enviar mensajes
async function sendMessage() {
   const message = inputField.value.trim();
   if (message === "") return;

   if (!username) username = "Anónimo";

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

// ------------------------------

// ---------------Funciones varias---------------

// Manejar el botón de enviar y la tecla Enter
sendButton.addEventListener("click", sendMessage);
inputField.addEventListener("keydown", (event) => {
   if (event.key === "Enter") {
      sendMessage();
   }
});

// Auto-refresh cada 5 segundos
setInterval(fetchMessages, 5000);


// ------------------------------


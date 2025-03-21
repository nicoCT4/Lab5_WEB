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



//----------------Blanco y Negro--------------------------
// Contenedor de mensajes principal
const messagesContainer = document.createElement("div");
messagesContainer.style.flex = "1";
messagesContainer.style.display = "flex";  // Asegura que los mensajes se acomoden en columna
messagesContainer.style.flexDirection = "column";  
messagesContainer.style.overflowY = "auto";  
messagesContainer.style.overflowX = "hidden";  
messagesContainer.style.maxHeight = "calc(100vh - 80px)";  // Evita que crezca demasiado
messagesContainer.style.maxWidth = "100%";  // Evita desbordes horizontales
messagesContainer.style.paddingBottom = "10px";  

app.appendChild(messagesContainer);


//Preferencia
let theme = localStorage.getItem("theme") || "light";


//Funcion para cambiar el tema
function changeTheme() {
   if (theme === "dark") {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      messagesContainer.style.backgroundColor = "black";
      messagesContainer.style.color = "white";
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
themeButton.textContent = "Cambiar tema";
themeButton.style.position = "absolute";
themeButton.style.top = "10px";
themeButton.style.right = "10px";
themeButton.style.padding = "8px 16px";
themeButton.style.cursor = "pointer";
themeButton.addEventListener("click", () => {
   theme = theme === "dark" ? "light" : "dark";
   localStorage.setItem("theme", theme);
   changeTheme();
}
);
app.appendChild(themeButton);

// ------------------------------

// -----------------Boton para cambiar de usuario-----------------------

//Definir usuario, si no hay usuario se pone Anónimo
let username = localStorage.getItem("username") || "Anónimo";

//Crear boton
const userButton = document.createElement("button");
userButton.textContent = "Cambiar usuario";
userButton.style.position = "absolute";
userButton.style.top = "60px";
userButton.style.right = "10px";
userButton.style.padding = "8px 16px";
userButton.style.cursor = "pointer";
userButton.style.border = "1px solid #ccc";
userButton.style.borderRadius = "5px";
userButton.style.backgroundColor = "#f8f9fa";

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
inputContainer.style.display = "flex";
inputContainer.style.position = "fixed";
inputContainer.style.bottom = "0";
inputContainer.style.margin = "0";
inputContainer.style.width = "100%";
inputContainer.style.padding = "5px";
inputContainer.style.borderTop = "1px solid #ddd";

// Campo de entrada
const inputField = document.createElement("input");
inputField.type = "text";
inputField.placeholder = "Escribe tu mensaje...";
inputField.style.flex = "0.9";
inputField.style.padding = "15px";
inputField.style.fontSize = "16px";
inputField.maxLength = 140; // Límite de caracteres
inputField.addEventListener("paste", (event) => {
   setTimeout(() => {
      const pastedText = inputField.value.trim();
      
      if (isValidUrl(pastedText)) {
         console.log("URL pegada:", pastedText);
         // Solo muestra el enlace en la consola, pero no genera preview
      }
   }, 100); // Esperamos un poco para que el input reciba el valor completo
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
sendButton.style.marginLeft = "10px";
sendButton.style.padding = "8px 19px";
sendButton.style.cursor = "pointer";
sendButton.style.backgroundColor = "#007bff";
sendButton.style.color = "white";
sendButton.style.border = "none";
sendButton.style.fontSize = "16px";
inputContainer.appendChild(sendButton);

app.appendChild(inputContainer);

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

   //Poder visualizar urls y imagenes
   const urldetect = /(https?:\/\/[^\s]+)/g;
   const links = message.match(urldetect);
   if (links) {
      links.forEach(link => {
         if(isImage(link)){
            //mostrar preview de la imagen
            const imgPreview = document.createElement("img");
            imgPreview.src = link;
            imgPreview.style.maxWidth = "100%";
            imgPreview.style.height = "100px";
            imgPreview.style.marginTop = "5px";
            imgPreview.style.borderRadius = "5px";
            imgPreview.style.display = "block";
            messageElement.appendChild(imgPreview);
         }else{
            //mostrar link
            linkPreview(link, messageElement);
         }
      }
      );
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

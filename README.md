# 🧠 Chat en JavaScript (DOM + Fetch API)

Este proyecto es un pequeño **chat en tiempo real** construido usando **JavaScript puro**, sin librerías externas. Se conecta a un servidor externo usando `fetch` con métodos **GET** y **POST**, y está diseñado para practicar el **manejo del DOM**, **async/await**, y el uso de `localStorage`.

---

## ✨ Funcionalidades principales

- 📩 Enviar y recibir mensajes en tiempo real (auto-refresh cada 5 segundos).
- 🧑 Personalización del nombre de usuario (almacenado en `localStorage`).
- 💬 Límite de 140 caracteres por mensaje.
- 🎨 Alternancia de tema claro y oscuro con botón (preferencia guardada).
- 📱 Diseño responsive para escritorio y móvil.
- 📎 Detección de imágenes y links (previsualización opcional).
- ⌨️ Envío de mensaje con tecla `Enter`.

---

## 🛠️ Tecnologías utilizadas

- **HTML** (solo estructura base)
- **JavaScript**:
  - `fetch()` para comunicación con servidor.
  - `document.createElement()` y `style` para crear y modificar elementos.
  - `localStorage` para persistencia de usuario y tema.
  - `setInterval()` para auto-actualización.
- **CSS (inyectado desde JS)** para estilos dinámicos.

---

## 🚀 Instrucciones de uso

1. Visitia: 
2. Escribe un nombre de usuario (se guarda localmente).
3. ¡Empieza a chatear! 🗨️

---

## 🧩 Requerimientos cumplidos

✅ Chat funcional conectado a `https://chat.nrywhite.lat/chats`  
✅ No se usaron librerías externas  
✅ Todo el HTML generado con JavaScript (`document.createElement`)  
✅ Campo de entrada con límite de 140 caracteres  
✅ Envío con tecla `Enter`  
✅ Auto-refresh cada 5 segundos  
✅ Scroll se mantiene al recibir nuevos mensajes  
✅ Botón para cambiar entre tema claro y oscuro (con `localStorage`)  
✅ Uso de `async/await` y desestructuración de objetos  
✅ Estilo visual personalizado sin uso de CSS externo  

---

## 📸 Vista previa



---

## 🧑‍💻 Autor

**Nicolás Concuá**  
Proyecto para práctica de JavaScript y manipulación del DOM.  

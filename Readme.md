# Ghouglify - Aplicacion de procesamiento de imágenes con IA

https://ghouglify.art

Este proyecto consta de una plataforma completa para el procesamiento de imágenes que incluye un backend, un frontend, y dos servicios independientes para la eliminación de fondos y el intercambio de caras en imágenes. Desarrollada utilizando tecnologías modernas como Deno, React, Flask y Python, esta aplicación está diseñada para ofrecer una experiencia rápida y eficiente.

## Tabla de Contenidos

Backend

Frontend

Servicios de Procesamiento

Remove Background

Face Swapping


Instalación

Variables de Entorno

Comandos

Agradecimientos



---

## Backend

El backend de la aplicación está construido con Deno y Typescript, conectándose a una base de datos MongoDB para gestionar las entidades principales: usuarios, posts y assets. El backend también interactúa con el frontend y proporciona APIs para los servicios de procesamiento de imágenes.

Requerimientos:

Deno

MongoDB


Variables de entorno necesarias:

MONGODB_URI: URI de la base de datos MongoDB.

FRONTEND_URL: URL del frontend de la aplicación.


Comandos:

Desarrollo: deno task start

Deploy: deno task deploy



---

## Frontend

El frontend está desarrollado con React, Vite y Typescript, y ofrece una interfaz web interactiva para que los usuarios puedan cargar imágenes, eliminarlas o intercambiar caras. Todas las funcionalidades están integradas directamente en esta capa.

Requerimientos:

Node.js

pnpm


Variables de entorno necesarias:

VITE_BACKEND_API_URL: URL del backend API.

VITE_REMOVE_SERVICE_URL: URL del servicio para remover el fondo de las imágenes.

VITE_SWAP_SERVICE_URL: URL del servicio para el intercambio de caras.


Comandos:

Desarrollo: pnpm run start

Build: pnpm run build



---

## Servicios de Procesamiento

Remove Background

Este servicio, implementado en Python con Flask, utiliza el modelo u2net para eliminar el fondo de las imágenes. Permite procesar imágenes en formato blob o URLs de imágenes.

Modelo usado: u2net

Inicio: python app.py


Face Swapping

Este servicio también está desarrollado con Python y Flask. Utiliza el modelo inswapper128 para intercambiar caras entre imágenes. Soporta archivos de imagen y URLs como entrada.

Modelo usado: inswapper128

Inicio: python app.py



---

## Instalación

Backend

1. Clonar el repositorio.


2. Instalar Deno y configurar las variables de entorno.


3. Ejecutar el comando deno task start para iniciar el servidor en modo desarrollo.



Frontend

1. Clonar el repositorio.


2. Instalar las dependencias con pnpm install.


3. Configurar las variables de entorno.


4. Ejecutar pnpm run start para iniciar el servidor de desarrollo.



Servicios de Procesamiento

1. Navegar a los directorios de cada servicio (remove-background y face-swapping).


2. Ejecutar python app.py para iniciar cada servicio.




---

### Variables de Entorno

Para que la aplicación funcione correctamente, asegúrate de configurar las siguientes variables de entorno:

Backend

MONGODB_URI: La URI de tu base de datos MongoDB.

FRONTEND_URL: La URL del frontend.


Frontend

VITE_BACKEND_API_URL: URL del backend.

VITE_REMOVE_SERVICE_URL: URL del servicio de eliminación de fondos.

VITE_SWAP_SERVICE_URL: URL del servicio de intercambio de caras.



---

### Comandos

Backend

Desarrollo: deno task start

Deploy: deno task deploy


Frontend

Desarrollo: pnpm run start

Build: pnpm run build


Servicios Python (Remove Background / Face Swapping)

Iniciar servicio: python app.py



---

Agradecimientos

Este proyecto no habría sido posible sin el increíble apoyo de Cloudinary por el hosting y manejo de imágenes. 
Puedes conocer más sobre mí en mi página web personal. https://therry.dev


---



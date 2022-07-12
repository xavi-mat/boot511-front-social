# Ribbit Social Network

## Ejercicio - Red Social
Último proyecto individual para el Bootcamp "Full Stack Developer MERN" en The Bridge - Digital Talent Accelerator.

### Requisitos del ejercicio
* Registro de usuarios.
* Login de usuarios.
* Que se pueda ver las publicaciones y crear nuevas.
* Que se puedan editar y eliminar las publicaciones que hace el usuario logeado
* Dar/quitar Like a post.
* Buscador de perfiles de usuario o de posts
* Que en tu perfil puedas ver tus datos y tus posts
* Que puedas comentar en las publicaciones
* Uso de ramas con git, cuando se termine el proyecto deberán quedar dos ramas la main y la develop.
* Presentación de README
* React Router
* Utilizar Redux
* Uso de SASS
* Importante el diseño
* Los componentes no podrán sobrepasar las 400 líneas de código.
* Las funciones no deberán sobrepasar las 75 líneas de código.

#### Extras
* Frontend disponible en producción (ej:Heroku).
* El usuario puede seguir a otros usuarios y tener seguidores
* CRUD de los comentarios
* Que solo puedas editar y eliminar los comentarios que tu creas.
* El usuario puede subir fotos en los posts y cambiar su foto de perfil.
* El usuario puede dar likes a los comentarios de los posts.
* El usuario en su perfil puede ver el número de seguidores y número de a cuantos sigue
* El usuario puede ver quien le sigue y a quién sigue
* Implementación de guards
* Que sea responsive

## Autor
Xavier Matoses [GitHub @xavi-mat](https://github.com/xavi-mat?tab=repositories) [LinkedIn](https://www.linkedin.com/in/xavier-matoses/)

## Estructura
El conjunto de la web es *responsive*. En el ancho máximo consiste en tres columnas.
* Columna izquierda: el menú principal, con iconos y texto de las opciones.
* Columna central: el contenido de la página requerida.
* Columna derecha: el buscador; los cuatro *posts* con más *likes*; el pie.

En **anchuras medias**, el menú izquierdo muestra solo los iconos y esconde el texto.

En **anchuras pequeñas**, desaparecen las dos columnas laterales y se muestra el logotipo Ribbit que da acceso al menú en forma de lateral deslizable (*drawer*). EL buscador aparece entonces en la parte superior de la página.

En **anchuras muy pequeñas** (por debajo de 400px), desaparecen los botones de *limpiar formulario* para evitar que se solapen con los demás botones.

### Menú principal
Los usuarios **no logueados** tienen las siguientes opciones: Inicio, Login, Registro.

Los usuarios **logueados** pueden acceder a Inicio, Perfil, Usuarios seguidos, Seguidores, Logout.

El usuario **administrador** accede, además, a la sección de administración.

## Secciones

### Registro `/register`
![](./doc/screen2.jpg)

El habitual formulario de registro: Nombre de usuario, email, contraseña y confirmación de contraseña, *checkbox* para aceptar los términos y condiciones y los botones de enviar y de limpiar formulario.

Los campos están validados e informan al usuario de posibles errores.

Debajo del formulario es visible el logo y el texto de relleno de los términos y condiciones.

### Login `/login`
![](./doc/screen3.jpg)

Formulario de acceso con email y contraseña, validación con mensajes informativos y los botones de enviar y de limpiar.

### Home `/`
![](./doc/screen1.jpg)

En la sección de inicio los usuarios logueados ven el formulario para añadir un *post* **en la parte superior**; los usuarios no logueados, en cambio, ven los botones Login y Registro.

El cuerpo principal de la página lo ocupan diez *posts* con el avatar y el nombre del autor/a, que son enlaces que llevan a al vista de ese usuario/a, el texto del *post*, la imagen opcional de ese post y, en el pie, el número de comentarios y *likes* del post. El post entero es clicable y lleva a la vista de post.

Arriba y abajo de la sección de los diez *posts* son visibles las barras de paginación, con los botones para desplazarse entre las distintas páginas, que realizan llamadas a la API y reciben los diez posts correspondientes.

### Vista de *Post* `/post/POST_ID`
![](./doc/screen4.jpg)

La vista de *post* muestra el avatar y nombre del autor/a, el texto, la imagen opcional y otros datos como el número de comentarios y de *likes*. Aparece, además, la fecha y hora de creación del *post* adaptada al idioma del navegador.

Los usuarios logueados ven también un botón para dar/quitar like al *post*.

Debajo del *post* se encuentra la sección de comentarios. En primer lugar, los usuarios logueados ven un formulario para añadir un comentario, con la posibilidad de añadir imágenes. A continuación la vista de los comentarios, igual a la del post (avatar y nombre del autor/a, texto, imagen, número de likes, fecha y hora).

En esta sección se cargan inicialmente diez comentarios. Al hacer scroll hacia abajo se dispara automáticamente la petición a la API de diez comentarios más, creando un **scroll infinito**, mientras queden comentarios que cargar.

![](./doc/screen5.jpg)

Los usuarios logueados ven, en el post y en los comentarios, los botones de Borrar y de Editar. El botón de Editar abre un formulario en una ventana modal en la que es posible cambiar el texto del propio *post*/comentario.

### Vista de usuario `/user/USER_ID`
![](./doc/screen6.jpg)
%%%

### Vista de Usuarios seguidos y de Seguidores `/following`, `/followers`

### Vista de Administrador `/admin`

### Términos y condiciones `/terms`
Texto de relleno (*Lorem ipsum*) en el que situar los términos y condiciones de uso de la web, las políticas de privacidad y de cookies.

## Funcionalidades
* **PopConfirm** antes de hacer logout, de dejar de seguir a un usuario, de borrar un *post* o comentario, y también (para el adminitrador), antes de borrar toda la base de datos.
* Escritura de *posts* y comentarios.
* **Negrita** y *cursiva* en los formularios de escritura.
* **@Menciones** en los formularios de escritura.
* Adjuntar una **imagen** opcional en los *posts* o comentarios.
* Cambiar el **avatar** del usuario/a.
* **Búsqueda** de *posts* por texto.

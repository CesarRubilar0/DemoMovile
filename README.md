# Demo-Pelis

Demo-Pelis es una aplicación de ejemplo construida con Ionic y Angular (modo standalone). Permite gestionar una biblioteca local de películas: listar, agregar, editar y eliminar entradas de películas. La aplicación está pensada como demo funcional para interfaces móviles/SPA usando los componentes UI de Ionic.

Principales características
- Listado de películas con ficha que muestra título, descripción, género, año y puntuación.
- Formulario para agregar y editar películas (formularios reactivos de Angular).
- Persistencia en el navegador mediante localStorage (clave: `demo_pelis_peliculas`).
- Seed inicial con una colección de películas incluida en el proyecto.
- Placeholders de imagen generados localmente como data-URI SVG que muestran el título de la película (sin llamadas externas).

Tecnologías y decisiones
- Ionic Framework (Ionic Angular) — la configuración del proyecto indica `type: "angular-standalone"` en `ionic.config.json`.
- Angular 20 con componentes standalone: las páginas se definen como componentes `standalone: true` y se cargan con `loadComponent()` en las rutas.
- Ionic CLI y Angular CLI son las herramientas usadas para desarrollo y construcción (scripts disponibles en `package.json`).

Estructura principal
- `src/app/services/pelicula.service.ts` — servicio central que gestiona el CRUD de películas y la persistencia en localStorage. Contiene también la semilla (`getDefaultSeed()`) y un método `resetSeed()` para restaurarla.
- `src/app/pages/` — carpeta con las páginas principales (home, login, registro, lista-peliculas, agregar-pelicula, editar-pelicula).
- `src/app/app.routes.ts` — rutas del proyecto usando `loadComponent()` para lazy-loading de páginas standalone.

Cómo funciona (resumen de flujo)
1. Al iniciar, el servicio de películas intenta leer `demo_pelis_peliculas` desde localStorage.
2. Si no existe la clave, el servicio escribe un seed con una colección de ejemplo y expone los datos vía `BehaviorSubject`.
3. La página de lista se suscribe a ese observable y renderiza las tarjetas de película. Si una película no tiene `imagen`, la vista muestra un placeholder generado en formato data-URI SVG con el título.
4. El formulario de agregar crea nuevas películas y guarda el objeto en localStorage a través del servicio.

Comandos útiles
- Instalar dependencias (si las necesitas):
  - `npm install`
- Compilar / servir en desarrollo:
  - `npx ionic build --no-open`
  - `npx ionic serve --no-open`
- Ejecutar tests:
  - `npm test`

Referencias
- Documentación de componentes Ionic (consultada para implementar la UI):
  https://ionicframework-com.translate.goog/docs/components?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc&_x_tr_hist=true

Apoyo en la implementación
- Se contó con asistencia puntual de una herramienta de ayuda para resolver dudas funcionales y errores concretos durante el desarrollo (soporte en diseño de soluciones y corrección de fallos cuando fue necesario).

Ruta para empezar a explorar
- Abre el proyecto en tu editor y navega a `src/app/services/pelicula.service.ts` para ver la fuente de datos y la semilla.
- Inicia la app con `ionic serve` y visita la ruta de lista de películas para explorar los datos.



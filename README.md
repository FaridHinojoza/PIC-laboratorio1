## Propuesta del emprendimiento

| Campo | Descripción |
|---|---|
| **Nombre** | Café Raíz |
| **Problema que resuelve** | Los consumidores que buscan café de calidad no encuentran fácilmente opciones artesanales con trazabilidad de origen en un solo lugar. La oferta masiva oculta el sabor real del grano. |
| **Cliente objetivo** | Adultos de 20‑40 años, amantes del café, que valoran la calidad sobre la cantidad y prefieren marcas con historia y propósito. |

---

## Integrantes del equipo

| Integrante | Rol asignado | Responsabilidades principales |
|---|---|---|
| **Denilson Celi** | Líder de equipo | Coordinación general del proyecto, revisión de arquitectura de software y aseguramiento de calidad técnica. |
| **Farid Hinojoza** | Desarrollador | Implementación de la lógica del componente web, definición del Shadow DOM y gestión de atributos observados. |
| **Andres Pozo** | Desarrollador | Diseño de la hoja de estilos encapsulada (`:host`), maquetación de la grilla de productos e integración en `index.html`. |
| **Fernando Camaton** | Desarrollador | Pruebas de compatibilidad, validación de contenido de respaldo en slots y redacción de la documentación técnica. |

---

## Registro PASO 1 — Módulo y etiqueta

- **Etiqueta registrada:** `<tarjeta-producto>`
- **¿Por qué lleva guion?**  
  La especificación de *Custom Elements* exige que el nombre tenga al menos un guion (`-`). Esto diferencia los elementos personalizados de las etiquetas HTML nativas (como `<div>` o `<section>`) y evita colisiones con futuras etiquetas del estándar.
- **¿Cómo importa la página el módulo?**  
  Con un `<script type="module">`:
  ```html
  <script type="module" src="./components/tarjeta-producto.js"></script>
  ```
  `type="module"` activa el sistema de módulos ES del navegador, que permite usar `import`/`export` y garantiza que el código se ejecute en modo estricto.

---

## Registro PASO 2 — Plantilla, Shadow DOM y slots

- **Slots de la plantilla:**

  | Nombre del slot | Elemento que acepta | Contenido de respaldo |
  |---|---|---|
  | `foto` | `<img slot="foto">` | Emoji ☕ dentro de `.foto-respaldo` |
  | `nombre` | `<h3 slot="nombre">` | Texto `Sin nombre` |
  | _(sin nombre, default)_ | Cualquier contenido | Texto `Sin descripción` |

  Cada slot define su propio contenido de respaldo, de modo que la tarjeta se ve correcta incluso sin datos.

- **¿Qué pasaría si no clonaras la plantilla?**  
  `render()` construye el Shadow DOM con `this.shadowRoot.replaceChildren(template.content.cloneNode(true))`. Si en vez de clonar se pasara `template.content` sin más, sus nodos se **moverían** al Shadow DOM de la primera instancia y las demás quedarían vacías. Con `cloneNode(true)` cada instancia recibe su **propia copia** de los nodos.

- **Estructura interna:** `article.tarjeta` contiene `.caja-foto` (con el slot `foto`) y `.detalles` (título, descripción y `.pie` con el precio y el botón `.btn-comprar`). El botón «Comprar» hoy es solo visual: aún no tiene manejador de eventos.

---

## Registro PASO 3 — Atributo `precio` y estilos con `:host`

- **Método que reacciona al cambio de `precio`:**  
  `attributeChangedCallback(name, oldValue, newValue)`.  
  El método primero descarta los casos que no le interesan —nombre distinto de `precio`, valor que no cambió realmente (`oldValue === newValue`) o ausencia de `shadowRoot`—. Si pasa ese filtro, busca el `<span id="precio-display">` dentro del Shadow DOM y actualiza su `textContent` con `$${newValue}`. Declarar `precio` en `observedAttributes` es requisito para que el navegador llame a este método.

- **Render inicial y `cloneNode`:**  
  El valor inicial del precio se pinta en `render()`, invocado desde `connectedCallback()`, clonando la plantilla con `template.content.cloneNode(true)` y escribiendo el precio en `#precio-display`. Durante el *upgrade* del elemento, `attributeChangedCallback` se ejecuta antes de que exista el contenido del Shadow DOM, por lo que en esa primera llamada `querySelector("#precio-display")` devuelve `null` y es `render()` quien deja la tarjeta lista.

- **Sincronización getter / setter:**
  ```js
  get precio() { return this.getAttribute("precio") ?? ""; }
  set precio(v) { this.setAttribute("precio", v); }
  ```

- **Color de marca:** `#6f4e37` (café tostado oscuro)  
- **Variable CSS:** `--color-marca`, definida en `:root` de `estilos.css` y consumida por el componente a través de `:host`.
- **Valor de respaldo dentro del componente:** `#6f4e37`  
  ```css
  color: var(--color-marca, #6f4e37);
  ```
  Si la página no define `--color-marca`, el componente usa el respaldo y sigue viéndose bien.

- **Prueba en consola del navegador:** cambia el precio en caliente y el Shadow DOM se actualiza al instante.
  ```js
  document.querySelector("tarjeta-producto").setAttribute("precio", "25");
  ```

---

## Registro PASO 4 — Tres productos del emprendimiento

| # | id de la tarjeta | Nombre | Descripción breve | Precio (`precio`) |
|---|---|---|---|---|
| 1 | `tarjeta-cafe` | *(usa el respaldo del slot: "Sin nombre")* | *(usa el respaldo: "Sin descripción")* | `18` |
| 2 | `tarjeta-latte` | Latte Artesanal | Espresso doble con leche vaporizada, arte latte | `12` |
| 3 | `tarjeta-coldbrew` | Cold Brew Artesanal | Infusión en frío 18 h, botella 355 ml | `10` |

> La primera tarjeta (`#tarjeta-cafe`) se deja sin contenido en los slots a propósito, para demostrar el contenido de respaldo que definen los `<slot>` del componente (`Sin nombre`, `Sin descripción` y el emoji ☕ como foto).

---

## Registro PASO 5 — Repositorio del equipo

- **Enlace al repositorio:** https://github.com/FaridHinojoza/PIC-laboratorio1
<!--- **¿Qué hizo cada integrante?**
  - _(completa aquí)_-->

---

## Declaración de uso de IA

Este proyecto fue desarrollado con la asistencia de **Antigravity (Google DeepMind)** para generar la estructura base de los archivos, las imágenes de producto y el README. Todo el código fue revisado y validado por el equipo, y refleja los patrones aprendidos en clase (Custom Elements, Shadow DOM, slots, `observedAttributes`, `:host` y variables CSS).

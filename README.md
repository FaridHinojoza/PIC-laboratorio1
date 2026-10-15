# README · Café Raíz — Actividad 8 · PIC 2026

---

## Propuesta del emprendimiento

| Campo | Descripción |
|---|---|
| **Nombre** | Café Raíz |
| **Problema que resuelve** | Los consumidores que buscan café de calidad no encuentran fácilmente opciones artesanales con trazabilidad de origen en un solo lugar. La oferta masiva oculta el sabor real del grano. |
| **Cliente objetivo** | Adultos de 20‑40 años, amantes del café, que valoran la calidad sobre la cantidad y prefieren marcas con historia y propósito. |

---

## Integrantes del equipo

| Nombre | Rol en esta entrega |
|---|---|
| _(completa con tu nombre)_ | Desarrollador principal |
| _(completa con tu nombre)_ | Diseño y README |

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

  | Nombre del slot | Elemento que acepta | Uso en `index.html` |
  |---|---|---|
  | `foto` | `<img slot="foto">` | Foto del producto |
  | `nombre` | `<h3 slot="nombre">` | Nombre del producto |
  | _(sin nombre, default)_ | Cualquier contenido | Descripción del producto |

- **Texto de respaldo del slot sin nombre:** `Sin descripción`  
  El slot foto tiene un emoji ☕ como respaldo visual.

- **¿Qué pasaría si no clonaras la plantilla?**  
  El primer `appendChild(template.content)` movería los nodos originales al Shadow DOM de la primera instancia. Las demás instancias encontrarían el `content` vacío y no mostrarían nada. Con `cloneNode(true)` cada instancia recibe su **propia copia** de los nodos.

---

## Registro PASO 3 — Atributo `precio` y estilos con `:host`

- **Método que reacciona al cambio de `precio`:**  
  `attributeChangedCallback(name, oldValue, newValue)`.  
  El método busca el `<span id="precio-display">` dentro del Shadow DOM y actualiza su `textContent`. Declarar `precio` en `observedAttributes` es requisito para que el navegador llame a este método.

- **Sincronización getter / setter:**
  ```js
  get precio() { return Number(this.getAttribute("precio")); }
  set precio(v) { this.setAttribute("precio", v); }
  ```

- **Color de marca:** `#6f4e37` (café tostado oscuro)  
- **Variable CSS:** `--color-marca`  
- **Valor de respaldo dentro del componente:** `#6f4e37`  
  ```css
  color: var(--color-marca, #6f4e37);
  ```
  Si la página no define `--color-marca`, el componente usa el respaldo y sigue viéndose bien.

- **Prueba en consola del navegador:**
  ```js
  document.querySelector("tarjeta-producto").setAttribute("precio", "25000");
  ```

---

## Registro PASO 4 — Tres productos del emprendimiento

| # | Nombre | Descripción breve | Precio |
|---|---|---|---|
| 1 | **Café Negro Tostado Oscuro** | Grano entero 250 g, notas de chocolate y caramelo | $18.000 |
| 2 | **Latte Artesanal** | Espresso doble con leche vaporizada, arte latte | $12.000 |
| 3 | **Cold Brew Artesanal** | Infusión fría 18 h, botella 355 ml | $9.500 |

---

## Registro PASO 5 — Repositorio del equipo

- **Enlace al repositorio:** _(pega aquí el enlace de GitHub una vez que lo subas)_
- **¿Qué hizo cada integrante?**
  - _(completa aquí)_

---

## Declaración de uso de IA

Este proyecto fue desarrollado con la asistencia de **Antigravity (Google DeepMind)** para generar la estructura base de los archivos, las imágenes de producto y el README. Todo el código fue revisado y validado por el equipo, y refleja los patrones aprendidos en clase (Custom Elements, Shadow DOM, slots, `observedAttributes`, `:host` y variables CSS).

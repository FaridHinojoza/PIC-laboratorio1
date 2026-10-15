const tarjetaProductoTemplate = `
    <article class="tarjeta">
        <div class="caja-foto">
            <slot name="foto">
                <div class="foto-respaldo">☕</div>
            </slot>

            <span class="badge-destacado">⭐ Destacado</span>
        </div>

        <div class="detalles">
            <h3 class="titulo">
                <slot name="nombre">Sin nombre</slot>
            </h3>

            <p class="descripcion">
                <slot>Sin descripción</slot>
            </p>

            <div class="pie">
                <span class="precio" id="precio-display"></span>
                <button class="btn-comprar">Comprar</button>
            </div>
        </div>
    </article>
`;

const tarjetaProductoStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

    :host {
        display: block;
        font-family: 'Inter', Arial, sans-serif;
        border: 2px solid var(--color-marca, #6f4e37);
        border-radius: 16px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 4px 20px rgba(0,0,0,0.10);
        transition: transform 0.25s ease, box-shadow 0.25s ease;
        width: 300px;
        min-width: 260px;
    }

    :host(:hover) {
        transform: translateY(-6px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.18);
    }

    :host([destacado]) {
        border: 3px solid gold;
        box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.25),
                    0 8px 28px rgba(0,0,0,0.15);
    }

    :host([destacado]) .badge-destacado {
        display: flex;
    }

    .caja-foto {
        position: relative;
        width: 100%;
        height: 200px;
        background: linear-gradient(135deg, #f5f0eb 0%, #ede0d4 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    ::slotted(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }

    :host(:hover) ::slotted(img) {
        transform: scale(1.06);
    }

    .foto-respaldo {
        font-size: 5rem;
        opacity: 0.5;
    }

    .badge-destacado {
        display: none;
        position: absolute;
        top: 12px;
        right: 12px;
        background: gold;
        color: #3a2a00;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 20px;
        align-items: center;
        gap: 4px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .detalles {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .titulo {
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--color-marca, #6f4e37);
        margin: 0;
        line-height: 1.3;
    }

    .descripcion {
        font-size: 0.88rem;
        color: #666;
        margin: 0;
        line-height: 1.55;
        min-height: 40px;
    }

    .pie {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        padding-top: 12px;
        border-top: 1px solid #f0e8e0;
    }

    .precio {
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--color-marca, #6f4e37);
    }

    .btn-comprar {
        background: var(--color-marca, #6f4e37);
        color: #fff;
        border: none;
        padding: 9px 18px;
        border-radius: 30px;
        font-size: 0.82rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        cursor: pointer;
        transition: opacity 0.2s, transform 0.15s;
    }

    .btn-comprar:hover {
        opacity: 0.85;
        transform: scale(1.04);
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${tarjetaProductoStyles}</style>
    ${tarjetaProductoTemplate}
`;

class TarjetaProducto extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["precio"];
  }

  get precio() {
    return this.getAttribute("precio") ?? "";
  }

  set precio(value) {
    this.setAttribute("precio", value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== "precio" || oldValue === newValue || !this.shadowRoot) {
      return;
    }

    const precioDisplay = this.shadowRoot.querySelector("#precio-display");
    if (precioDisplay) {
      precioDisplay.textContent = `$${newValue ?? ""}`;
    }
  }

  render() {
    this.shadowRoot.replaceChildren(template.content.cloneNode(true));
    this.shadowRoot.querySelector("#precio-display").textContent = `$${this.precio}`;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("tarjeta-producto", TarjetaProducto);

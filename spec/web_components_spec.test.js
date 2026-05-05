/** Aquests tests són per a web components i es van a implementar amb dos filosofies: tests unitaris i tests al navegador. 
 * 
 * Aquests tests són per a practicar el mode browser de Vitest i comparar-lo amb el mode node. En el mode browser, els tests s'executen en un navegador real, mentre que en el mode node s'executen en un entorn de servidor amb jsdom.
 */

/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, vi } from "vitest";

import { Alerta } from "../src/web_components.js";

describe("Alerta Web Component", () => {
    customElements.define("alerta-component", Alerta);
    test("Debería renderizar correctamente el componente con los atributos proporcionados", () => {
        const alerta = document.createElement("alerta-component");
        alerta.setAttribute("title", "Alerta de prueba");
        alerta.setAttribute("created", "2024-06-01");
        alerta.setAttribute(
            "problems",
            JSON.stringify([{ riskStatement: "Riesgo alto" }])
        );
        alerta.setAttribute(
            "details",
            JSON.stringify([{ productName: "Producto peligroso" }])
        );

        document.body.appendChild(alerta);

        const shadowRoot = alerta.shadowRoot;
        expect(shadowRoot.querySelector("h2").textContent).toBe("Alerta de prueba");
        expect(shadowRoot.querySelector("h3").textContent).toBe("2024-06-01");
        expect(shadowRoot.querySelector(".problems li").textContent).toBe("Riesgo alto");
        expect(shadowRoot.querySelector(".details li").textContent).toBe(
            "Producto peligroso"
        );
    });
});

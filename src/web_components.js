/** Aquests tests són per a web components i es van a implementar amb dos filosofies: tests unitaris i tests al navegador. 
 * 
 * Aquests tests són per a practicar el mode browser de Vitest i comparar-lo amb el mode node. En el mode browser, els tests s'executen en un navegador real, mentre que en el mode node s'executen en un entorn de servidor amb jsdom.
 */


export class Alerta extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title");
    const created = this.getAttribute("created");
    const problems = JSON.parse(this.getAttribute("problems"));
    const details = JSON.parse(this.getAttribute("details"));

    this.shadowRoot.innerHTML = `
      <h2>${title}</h2>
      <h3>${created}</h3>
      <h4>Problems:</h4>
      <ul class="problems"></ul>
      <h4>Details:</h4>
      <ul class="details"></ul>
    `;

    const problemsList = this.shadowRoot.querySelector(".problems");
    problems.forEach((problem) => {
      const li = document.createElement("li");
      li.textContent = problem.riskStatement;
      problemsList.appendChild(li);
    });

    const detailsList = this.shadowRoot.querySelector(".details");
    details.forEach((detail) => {
      const li = document.createElement("li");
      li.textContent = detail.productName;
      detailsList.appendChild(li);
    });
  }
}

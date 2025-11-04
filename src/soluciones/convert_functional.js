// Observa este código que funciona pero no cumple reglas de la programación funcional

/*
En el fichero spec/convert_functional_spec.test.js puedes ver los tests que deben pasar y las funciones que hay que crear


*/
/*
let alertasFavoritas = [];

function addFavorita() {
  alertasFavoritas.push(this);
  console.log(alertasFavoritas);
  let alertasDivs = document.querySelectorAll(".alerta");
  alertasDivs.forEach(function (a) {
    a.classList.remove("favorita");
    alertasFavoritas.forEach(function (fav) {
      if (a === fav) {
        a.classList.add("favorita");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://data.food.gov.uk/food-alerts/id?_limit=100").then((response) =>
    response.json().then((data) => {
      const alertes = data.items;
      for (let alerta of alertes) {
        const divAlerta = document.createElement("div");
        divAlerta.classList.add("alerta");
        divAlerta.innerHTML = `
                <h2>${alerta.title}</h2>
                <h3>${alerta.created}</h3>
                <h4>Problems:</h4>
                <ul class="problems"></ul>
                <h4>Details:</h4>
                <ul class="details"></ul>
                `;
        for (let p of alerta.problem) {
          const liProblem = document.createElement("li");
          liProblem.textContent = p.riskStatement;
          divAlerta.querySelector("ul.problems").append(liProblem);
        }
        if (alerta.productDetails) {
          for (let p of alerta.productDetails) {
            const liDetail = document.createElement("li");
            liDetail.textContent = p.productName;
            divAlerta.querySelector("ul.details").append(liDetail);
          }
        }

        document.querySelector("#container").append(divAlerta);
        divAlerta.addEventListener("click", addFavorita);
      }
    })
  );
});*/

export const getAlerts = async (n) => {
  const result = await fetch(
    `https://data.food.gov.uk/food-alerts/id?_limit=${n}`
  );
  const data = await result.json();
  return data;
};

export const mapFavorites = (favorites) => (alerts) =>
  alerts.map((a) => ({ ...a, favorite: favorites.has("@id") }));

export const toggleToFavorites = (favorites) => (alertId) => {
  const setCopy = new Set(favorites);
  setCopy[setCopy.has(alertId) ? "delete" : "add"](alertId);
  return setCopy;
};

export const createAlertDiv = (alerta) => {
  const divAlerta = document.createElement("div");
  divAlerta.classList.add("alerta");
  divAlerta.dataset.id = alerta["@id"];
  divAlerta.innerHTML = `
            <h2>${alerta.title}</h2>
            <h3>${alerta.created}</h3>
            <h4>Problems:</h4>
            <ul class="problems"></ul>
            <h4>Details:</h4>
            <ul class="details"></ul>
            `;
  const ulProblems = divAlerta.querySelector("ul.problems");
  const ulDetails = divAlerta.querySelector("ul.details");
  for (let p of alerta.problem) {
    const liProblem = document.createElement("li");
    liProblem.textContent = p.riskStatement;
    ulProblems.append(liProblem);
  }
  if (alerta.productDetails) {
    for (let p of alerta.productDetails) {
      const liDetail = document.createElement("li");
      liDetail.textContent = p.productName;
      ulDetails.append(liDetail);
    }
  }
  return divAlerta;
};


export const createAlertsDivs = (alerts) => alerts.map(createAlertDiv);

export const addClickListeners = (divs, handler) =>
    divs.map(div => {
      const divClone = div.cloneNode(true);
      divClone.addEventListener("click", handler);
      return divClone;
    });

export const markFavorites = (favorites) => (divs) =>
  divs.forEach(div => {
    div.classList.remove("favorita");
    favorites.has(div.dataset.id) && div.classList.add("favorita")
  });


document.addEventListener("DOMContentLoaded", async () => {
  const alerts = (await getAlerts(100)).items;
  let favorites = new Set();
  const divs = addClickListeners(createAlertsDivs(alerts),(event)=>{
    const id = event.currentTarget.dataset.id;
    favorites = toggleToFavorites(favorites)(id);
    markFavorites(favorites)(divs);
  });
  document.querySelector("#container").append(...divs);

});
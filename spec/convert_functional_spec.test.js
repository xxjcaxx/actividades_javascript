/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, vi } from "vitest";

import * as convert from "../src/convertir_a_funcional/index.js";

const alertExample = {
  "@id": "http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018",
  title: "James Hall recalls BBQ Pulled Pork because it may contain Salmonella",
  notation: "FSA-PRIN-01-2018",
  created: "2018-01-18",
  modified: "2018-01-29T16:25:08+00:00",
  type: [
    "http://data.food.gov.uk/food-alerts/def/Alert",
    "http://data.food.gov.uk/food-alerts/def/PRIN",
  ],
  shortTitle:
    "James Hall recalls BBQ Pulled Pork because it may contain Salmonella",
  status: {
    "@id": "http://data.food.gov.uk/codes/alerts/def/status/published",
    label: "Published",
  },
  alertURL: "https://www.food.gov.uk/news-alerts/alert/FSA-PRIN-01-2018",
  reportingBusiness: {
    commonName: "James Hall",
  },
  problem: [
    {
      "@id":
        "http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018/problem/0",
      riskStatement:
        "The products listed above might be contaminated with salmonella. Symptoms caused by salmonella usually include fever, diarrhoea and abdominal cramps.",
    },
  ],
  productDetails: [
    {
      "@id":
        "http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018/productDetails/0",
      productName: "SPAR BBQ Pulled Pork 2 for £3.50",
    },
    {
      "@id":
        "http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018/productDetails/1",
      productName: "Woodland BBQ Pulled Pork 2 for £3.50",
    },
  ],
};

describe("Convert to Functional", () => {
  describe("fetch", () => {
    const result = convert.getAlerts(2);
    test("Debe retornar una promesa", () => {
      expect(result).toBeInstanceOf(Promise);
    });
    test("La promesa debe retornar un objeto", async () => {
      expect(await result).toBeInstanceOf(Object);
    });
    test("La promesa debe retornar un objeto", async () => {
      expect((await result).items).toBeInstanceOf(Array);
    });
  });

  describe("Conversión de datos", () => {
    const alerts = [alertExample];
    const favorites = new Set([
      "http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018",
    ]);
    const alertsMapFunction = convert.mapFavorites(favorites);
    const alertMapped = alertsMapFunction(alerts);
    test("mapFavorites debe retornar una función", () => {
      expect(alertsMapFunction).toBeInstanceOf(Function);
    });
    test("la función que retorna mapFavorites debe retornar un array", () => {
      expect(alertMapped).toBeInstanceOf(Array);
    });
    test.each(alertMapped)(
      "El array de alertas retornado debe tener un atributo favorite que sea booleano",
      (i) => {
        expect(typeof i.favorite).toBe("boolean");
      }
    );
    test.each(alerts)("la función no debe mutar el array original", (i) => {
      expect("favorite" in i).toBe(false);
    });
  });

  describe("Favorites",()=>{
    const favorites = new Set([
        "http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018",
      ]);
      const toggleFavoritesFunction = convert.toggleToFavorites(favorites);
      const newFavorites1 = toggleFavoritesFunction("http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018")
      const newFavorites2 = toggleFavoritesFunction("http://data.food.gov.uk/food-alerts/id/xxxxxxxxxxxxxx")
      test("toggleToFavorites debe retornar una función", () => {
        expect(toggleFavoritesFunction).toBeInstanceOf(Function);
      });
      test("la función retornará un Set que no será el original", ()=>{
        expect(newFavorites1).toBeInstanceOf(Set);
        expect(newFavorites1).not.toBe(favorites);
      });
      test("la función añadirá o quitará elementos al Set", ()=>{
        expect(newFavorites1.has("http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018")).toBe(false)
        expect(newFavorites2.has("http://data.food.gov.uk/food-alerts/id/xxxxxxxxxxxxxx")).toBe(true);
        expect(newFavorites2.has("http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018")).toBe(true);
      });
      test("la función markFavorites añadirá o quitará la clase favorite al div", ()=>{
        const div = document.createElement("div");
        div.dataset.id = "http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018";
        const divs = [div];
        const exampleFavorites = new Set(["http://data.food.gov.uk/food-alerts/id/FSA-PRIN-01-2018"])
        const markFavoritesFunction = convert.markFavorites(exampleFavorites);
        markFavoritesFunction(divs);
        expect(div.classList.contains("favorita")).toBe(true);
      });
  });

  describe("Render Alertas", () => {
    const alertaDiv = convert.createAlertDiv(alertExample);
    test("createAlertDiv Debe retornar un div", () => {
      expect(alertaDiv).toBeInstanceOf(HTMLDivElement);
      expect(alertaDiv.tagName).toBe("DIV");
      expect(alertaDiv.querySelector("h2")?.textContent).toBe(
        "James Hall recalls BBQ Pulled Pork because it may contain Salmonella"
      );
      expect(alertaDiv.querySelector("h3")?.textContent).toBe("2018-01-18");
      const problemsList = alertaDiv.querySelector(".problems");
      expect(problemsList).not.toBeNull();
      expect(problemsList.querySelectorAll("li").length).toBeGreaterThan(0);
    });
    test("createAlertsDivs debe retornar un array de alertas", ()=>{
        const alerts = [alertExample,alertExample];
        const alertDivs = convert.createAlertsDivs(alerts);
        expect(alertDivs).toBeInstanceOf(Array);
        expect(alertDivs.every(el => el instanceof HTMLDivElement)).toBe(true);
    });
  });



  describe("addClickListeners", () => {
    test("retorna clones de los divs con el evento click", () => {
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const divs = [div1, div2];
      const handler = vi.fn();
      const clones = convert.addClickListeners(divs, handler);
      expect(clones).toHaveLength(divs.length);
      clones.forEach((clone, i) => {
        expect(clone).toBeInstanceOf(HTMLDivElement);
        expect(clone).not.toBe(divs[i]);
      });
      clones[0].click();
      clones[1].click();
      expect(handler).toHaveBeenCalledTimes(2);
    });
  });
  
});

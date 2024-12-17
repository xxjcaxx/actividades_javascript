/**
 * Hay una dificultad añadida a la hora de testar Web Components.
 * Por un lado se trata de clases con métodos, muchos de ellos no son
 * funciones puras y usan this. 
 * Por otro lado está el tema del DOM y el Shadow DOM. Al testar desde 
 * Nodejs se hace necesario jsdom y este no es tan completo como el API
 * de un navegador. 
 * También está el tema de registrarlos para poder usarlos.
 * 
 * A lo largo de estos tests vamos a explorar opciones que tenemos para 
 * testarlos.
 */

export {BasicCustomElement,
    BasicAttrCustomElement,
    BasicConstructorCustomElement
    ,BasicSlotCustomElement
    ,BasicTextCustomElement}


/** CUSTOM ELEMENTS */

class BasicCustomElement extends HTMLElement {
 /*
 Haz un custom element que agregue a partir de su etiqueta un <span> 
 con el texto "Basic Custom"
 */
 connectedCallback() {
    this.innerHTML = `<span>Basic Custom</span>`
  }

}

class BasicTextCustomElement extends HTMLElement {
    /*
    Haz un custom element que agregue a partir de su etiqueta un <span> 
    con el texto que tenga en data-texto
    */
    connectedCallback() {
        this.innerHTML = `<span>${this.dataset.texto}</span>`
      }
}

class BasicConstructorCustomElement extends HTMLElement {
    /*
    Haz un custom element que agregue a partir de su etiqueta un <span> 
    con el texto que se ha pasado como parámetro en su constructor()

    Este tipo de Custom Elements excluye el uso de la etiqueta en un
    HTML. La forma de crear un Web Component sería la siguente:
        const myComponent = new BasicConstructorCustomElement(text);
        document.body.appendChild(myComponent);
    */
   constructor(text){
    super();
    this.text = text;
   }
   connectedCallback() {
    this.innerHTML = `<span>${this.text}</span>`
  }
}

class BasicAttrCustomElement extends HTMLElement {
    /*
    Haz un custom element que agregue a partir de su etiqueta un <span> 
    con el texto que tenga en el atributo "custom_text"

    Además, ha de atender al cambio del atributo para modificar su
    contenido
    */
    connectedCallback() {
        this.innerHTML = `<span>${this.getAttribute('custom_text')}</span>`
      }
}


class BasicSlotCustomElement extends HTMLElement {
    /*
    Haz un custom element que agregue a partir de su etiqueta un <span> 
    con el texto que tenga en un slot de nombre "custom_text"
    */
}





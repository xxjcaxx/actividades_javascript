/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, it, vi, beforeEach, beforeAll, afterAll, afterEach } from "vitest";
import * as WC from "../src/webcomponents"
/*
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM(`<!DOCTYPE html><html><body></body></html>`)).window;
*/

describe('Web Components', function () {

    beforeAll(()=>{
        customElements.define("c-basic",WC.BasicCustomElement);
        customElements.define("c-basictext",WC.BasicTextCustomElement);
        customElements.define("c-basicconstructor",WC.BasicConstructorCustomElement);
        customElements.define("c-basicattribute",WC.BasicAttrCustomElement);
    })

    describe('Basic Web Components', function () {
        test('BasicCustomElement',function(){
            const element = document.createElement('c-basic');
            document.body.append(element);
            expect(element.tagName).toBe("C-BASIC");
            expect(element.querySelector('span').textContent).toBe("Basic Custom");
        });
        test('BasicTextCustomElement',function(){
            const element = document.createElement('c-basictext');
            element.dataset.texto = "Basic Text Custom"
            document.body.append(element);
            //console.log(element.outerHTML);
            expect(element.tagName).toBe("C-BASICTEXT");
            expect(element.querySelector('span').textContent).toBe("Basic Text Custom");
        });
        test('BasicConstructorCustomElement',function(){
            const element = new WC.BasicConstructorCustomElement("Basic Constructor Custom")
            document.body.append(element);
            //console.log(element.outerHTML);
            expect(element.tagName).toBe("C-BASICCONSTRUCTOR");
            expect(element.querySelector('span').textContent).toBe("Basic Constructor Custom");
        });
        test('BasicAttrCustomElement',function(){
            const element = document.createElement('c-basicattribute');
            element.setAttribute('custom_text',"Basic Text Custom"); 
            document.body.append(element);
            //console.log(element.outerHTML);
            expect(element.tagName).toBe("C-BASICATTRIBUTE");
            expect(element.querySelector('span').textContent).toBe("Basic Text Custom");
            element.setAttribute('custom_text',"Basic Attribute Custom"); 
            expect(element.querySelector('span').textContent).toBe("Basic Attribute Custom");

        });
    });



});
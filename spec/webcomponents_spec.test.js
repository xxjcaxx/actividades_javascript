/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, it, vi, beforeEach, beforeAll, afterAll, afterEach } from "vitest";
import * as WC from "../src/webcomponents"



describe('Web Components', function () {

    beforeAll(()=>{
        customElements.define("c-basic",WC.BasicCustomElement);
    })

    describe('Basic Web Components', function () {
        test('BasicCustomElement',function(){
            const element = document.createElement('c-basic');
            const parent = document.createElement('div');
            parent.append(element);

            expect(element.tagName).toBe("C-BASIC");
        });
    });



});
/**
 * E2E testing using vitest
 */

import { mount } from '@vue/test-utils'
import sampleComponent from '../components/sampleComponent.vue'
import DocItem from '../components/DocItem.vue'
import { describe } from 'node:test'



describe("Testing display message"); {
    test('displays message', () => {
        const wrapper = mount(DocItem, {
            props: {
                doc: { _id: 55, title: "titel", content: "hejsan" }
            }
        }
        )

        // Assert the rendered text of the component
        const title = wrapper.find("#title");
        const content = wrapper.find("#content");
        const id = wrapper.find("#id");

        expect(title.element.textContent).toBe("titel")
        expect(content.element.textContent).toBe("hejsan")
        expect(id.element.textContent).toBe("55")
    })
}

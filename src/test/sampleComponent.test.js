/**
 * E2E testing using vitest
 */

import { render } from '@testing-library/vue'
import sampleComponent from '../components/sampleComponent.vue'

test('Hello world', () => {
    const { getByText } = render(sampleComponent, {
        props: {
            msg: "string"
        },
    })

    // assert output
    getByText("Hello")
})
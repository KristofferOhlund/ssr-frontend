import { mount } from '@vue/test-utils';
import { expect } from "vitest";
import DocItem from '../components/DocItem.vue';
import { ref } from 'vue'
import DocumentList from '../components/DocumentList.vue';
import DocumentsView from '../views/DocumentsView.vue';


test("DocumentList is in DocumentView", () => {
    const _loading = { value: false }

    const mockResponse = {
        loading: _loading,
        allDocs: {
            data: [{ _id: 55, title: "title", content: "content" },
            { _id: 55, title: "title", content: "content" }
            ]
        }
    };

    // Here we tell Vitest to mock fetch on the `window` object.
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockResponse),
        })
    );
    const wrapper = mount(DocumentsView);

    const docList = wrapper.findAllComponents(DocumentList);
    expect(docList).toHaveLength(1);

});


test("Mounting DocumentList", async () => {
    const _loading = ref(true);
    const wrapper = mount(DocumentList, {
        props: {
            allDocs: {
                data: [{ _id: 55, title: "title", content: "content" },
                { _id: 55, title: "title", content: "content" }
                ]
            },
            loading: _loading
        }
    });

    const _docItem = await wrapper.findAllComponents(DocItem);

    expect(wrapper.props("allDocs").data).toHaveLength(2);
    expect(wrapper.props("loading").value).toBe(true);
    expect(_docItem).toHaveLength(2);

});

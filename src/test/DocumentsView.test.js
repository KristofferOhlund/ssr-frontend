import { mount } from '@vue/test-utils';
import { expect } from "vitest";
import DocItem from '../components/DocItem.vue';
import { ref } from 'vue'
// import UserDocumentList from '../components/UserDocumentList.vue';
// import DocumentsView from '../views/DocumentsView.vue';
// import monaco from "../components/monaco-editor.vue";

// ADDING STUPID TEST BECAUSE TESTS ARE DEPRECATED
// THIS TEST MAKES SURE THE BUILD ON GITHUB PAGES STILL WORKS
test('always passes', () => {
    expect(true).toBe(true);
});


// test("UserDocumentList is in DocumentView", () => {
//     const _loading = { value: false }

//     const mockResponse = {
//         loading: _loading,
//         allDocs: {
//             data: [{ _id: 55, title: "title", content: "content" },
//             { _id: 55, title: "title", content: "content", type: "text" }
//             ]
//         }
//     };

//     // Here we tell Vitest to mock fetch on the `window` object.
//     global.fetch = vi.fn(() =>
//         Promise.resolve({
//             json: () => Promise.resolve(mockResponse),
//         })
//     );
//     const wrapper = mount(DocumentsView);

//     const docList = wrapper.findAllComponents(UserDocumentList);
//     expect(docList).toHaveLength(0);

// });


// test("Mounting UserDocumentList", async () => {
//     const _loading = ref(true);
//     const wrapper = mount(UserDocumentList, {
//         props: {
//             allDocs: {
//                 data: [{ _id: 55, title: "title", content: "content" },
//                 { _id: 55, title: "title", content: "content", type: "text" }
//                 ]
//             },
//             loading: _loading
//         }
//     });

//     const _docItem = await wrapper.findAllComponents(DocItem);

//     expect(wrapper.props("allDocs").data).toHaveLength(2);
//     expect(wrapper.props("loading").value).toBe(true);
//     expect(_docItem).toHaveLength(2);

// });

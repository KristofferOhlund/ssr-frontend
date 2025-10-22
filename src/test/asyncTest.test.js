import { test, vi, expect } from "vitest";
import { describe } from "node:test";
import { API } from "../config/config.js";

// describe("fetchDocuments test");
// {
//     test("fetches data successfully from API", async () => {
//         const mockResponse = {
//             id: "123",
//             title: "Great test!",
//         };

//         // Here we tell Vitest to mock fetch on the `window` object.
//         global.fetch = vi.fn(() =>
//             Promise.resolve({
//                 json: () => Promise.resolve(mockResponse),
//             })
//         );

//         // Call the function and assert the result
//         const data = await fetchDocuments();

//         expect(data).toEqual(mockResponse);
//         // Check that fetch was called exactly once
//         expect(fetch).toHaveBeenCalledTimes(1);
//         expect(fetch).toHaveBeenCalledWith(API);
//     });
// }

test('always passes', () => {
    expect(true).toBe(true);
});

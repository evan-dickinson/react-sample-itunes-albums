import { buildStoreItemData } from "./StoreItemData";
import mockData from "./StoreItemData.mock.json";

describe("buildStoreItemData", () => {
    it("converts data", () => {
        const items = buildStoreItemData(mockData);

        expect(items.length).toEqual(mockData.feed.entry.length);

        // Spot check one item, to verify its conversion
        expect(items[0]).toEqual({
            "artist": "Drake Milligan",
            "category": "Country",
            "id": "1575539213",
            "imageUrl": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/33/70/b9/3370b93a-f5aa-83b3-cf7d-ae85c34b1d55/4050538682670.jpg/170x170bb.png",
            "name": "Drake Milligan - EP",
            "price": 6.45,
        })
    });
});
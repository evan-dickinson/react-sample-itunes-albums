import { AxiosError } from "axios";
import invariant from "invariant";
import _ from "lodash";

// Data model for one item in the store. 
export interface StoreItemData {
    name: string;
    artist: string;
    category: string;
    imageUrl: string;
    // NOTE - This assumes USD; other currencies are out of scope for this demo
    price: number;

    id: string;
}

export const TOP_ALBUMS_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

// NOTE - I'm not thrilled about the use of `any` as the paramter type,
// or about the lack of error handling in the functrion body. In a more
// robust app, I'd dive more into the schema to better understand what
// might fail. I'd also look into generating TypeScript definitions from
// the API schema.
function buildOneStoreItemData(apiEntry: any): StoreItemData {
    return {
        name: apiEntry["im:name"].label,
        artist: apiEntry["im:artist"].label,
        category: apiEntry.category.attributes.label,
        imageUrl: apiEntry["im:image"]
            .filter((image: any) => image.attributes.height === "170")
            .map((image: any) => image.label)
            [0],
        price: +apiEntry["im:price"].attributes.amount,
        id: apiEntry.id.attributes["im:id"],
    }
}

export function buildStoreItemData(apiResponse: any): StoreItemData[] {
    return apiResponse.feed.entry.map((entry: any) => buildOneStoreItemData(entry))
}
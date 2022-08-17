
// Data model for one item in the store. 
export interface StoreItemData {
    name: string;
    artist: string;
    category: string;
    imageUrl: string;
    // XXX This assumes USD; other currencies are out of scope for this demo
    price: number;

    id: string;
}
